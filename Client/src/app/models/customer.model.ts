import {Order} from "./order.model"
import {Deserializable} from "./deserializable.model";


export class Customer implements Deserializable {
    id: number;
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    createdAt: string;
    updatedAt: string;
    order: Order[];

    deserialize(input: any): this {
        Object.assign(this,input);
        return this;
    }
}