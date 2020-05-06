import {Worker} from "./worker.model"
import {SemiTrailer} from "./semiTrailers.model";
import {Deserializable} from "./deserializable.model";


export class Vehicle implements Deserializable{
    id: number;
    registrationNumber: string;
    vehicleNumber: string;
    vehicleType: string;
    localization: string;
    workerId: number;
    createdAt: string;
    updatedAt: string;
    worker:Worker;
    semiTrailer : SemiTrailer;

    deserialize(input: any): this {
        Object.assign(this,input);
        return this;
    }
}