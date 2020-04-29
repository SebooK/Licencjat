import {Order} from "./order.model"


export interface Customer {
    id: number;
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    createdAt: string;
    updatedAt: string;
    order: Order[];

}