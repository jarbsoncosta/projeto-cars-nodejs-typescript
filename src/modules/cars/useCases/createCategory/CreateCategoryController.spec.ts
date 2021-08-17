import request from 'supertest'
import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm'
import {Connection} from 'typeorm'
import { hash } from 'bcryptjs';
import {v4 as uuidv4} from 'uuid'


let connection: Connection;

describe("Create Category Controller", () => {

    beforeAll(async() => {
        connection = await createConnection("database")
        await connection.runMigrations()
        const id = uuidv4();
        const password = await hash('admin', 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}' ,'admin','admin@rentx.com.br', '${password}', true, now(), 'XXXX')
        `,
    );
    })
    
    afterAll(async() => {
        await connection.dropDatabase();
        await connection.close()

    })

    //será possivel cadastrar uma nova categoria
    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password:"admin"
        })
        const {refresh_token} = responseToken.body
    const response =await request(app).post("/categories")
            .send({
                name: "sedan",
                description: "carro passeio"

            }).set({
                Authorization: `Bearer ${refresh_token}`
            })
        expect(response.status).toBe(201)
    })

    //não será possivel crear uma nova categoria com nome ja existente 
      it("shoutd not be able to create a new category with name exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password:"admin"
        })
        const {refresh_token} = responseToken.body
    const response =await request(app).post("/categories")
            .send({
                name: "sedan",
                description: "carro passeio"

            }).set({
                Authorization: `Bearer ${refresh_token}`
            })
        expect(response.status).toBe(400)
    })
})