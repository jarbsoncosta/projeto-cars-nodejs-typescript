import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import Category from '@modules/cars/infra/typeorm/entities/Category';

@Entity('cars')
class Car {
    @PrimaryColumn()
    id?: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    daily_rate: number;
    @Column()
    available = true;
    @Column()
    license_plate: string;
    @Column()
    fine_amount: number;
    @Column()
    brand: string;
    nu;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @CreateDateColumn()
    category_id: string;
    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
export { Car };
