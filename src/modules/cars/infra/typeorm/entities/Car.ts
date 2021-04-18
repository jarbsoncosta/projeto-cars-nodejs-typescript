import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'uuidv4';

// @Entity('cars')
class Car {
    // @PrimaryColumn()
    id?: string;
    // @Column()
    name: string;
    // @Column()
    description: string;
    // @Column()
    daily_rate: number;
    // @Column()
    license_plate: string;
    // @Column()
    fine_amount: number;
    // @Column()
    brand: string;
    // @Column()
    category_id: string;
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
export { Car };
