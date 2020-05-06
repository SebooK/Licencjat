import {Worker} from "./worker.model";
import {Customer} from "./customer.model";
import {Deserializable} from "./deserializable.model";

export class Order implements Deserializable{
    id: number;
    workerId: number;
    orderNumber: number;
    cargo: string;
    vehicle: number;
    customerId: number;
    loadingPlace: string;
    unloadingPlace: string;
    createdAt: string;
    updatedAt: string;
    customer: Customer;
    worker: Worker

    deserialize(input: any): this {
        Object.assign(this,input);
        return this;
    }
}