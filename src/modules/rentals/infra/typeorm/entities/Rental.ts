import {
    Column,
    CreateDateColumn,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

class Rental {
    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    start_date: Date;
    @CreateDateColumn()
    end_date: Date;
    @CreateDateColumn()
    expected_return_date: Date;
    @Column()
    total: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
export { Rental };
