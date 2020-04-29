import {Worker} from "./worker.model";
import {Customer} from "./customer.model";

export class Order {
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

    deserialize(orders: any) {
        return undefined;
    }
}