interface ICreateEquipmentDTO {
    id?: string;
    description?: string;
    manufacturer: string;
    customer_id: string;
    patrimony?: number;
    serial?: string;
    supply: string;
    count_initial: string;
    count_final?: string;
    status: string;
    obs: string;
}
export { ICreateEquipmentDTO };
