import { uuid } from 'uuidv4';

class Specification {
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export default Specification;
