import {Vehicle} from "./vehicle.model";
import {Order} from "./order.model";
import {Deserializable} from "./deserializable.model";

export class Worker implements Deserializable {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    role: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    vehicle: Vehicle;
    orders: Order[];

    deserialize(input: any): this {
        return Object.assign(this,input);
}
}