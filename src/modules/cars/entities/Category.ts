import { uuid } from 'uuidv4';
import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm'


@Entity("categories")

class Category {
    @PrimaryColumn()
    id?: string;
    @Column()
    name: string;
    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export default Category;
