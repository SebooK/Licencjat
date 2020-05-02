import {Vehicle} from "./vehicle.model";
import {Deserializable} from "./deserializable.model";

export class SemiTrailer implements  Deserializable{
    id: number;
    vehicleId: number;
    registrationNumber: string;
    semiTrailerType: string;
    createdAt: string;
    updatedAt: string;
    vehicle: Vehicle;

    deserialize(input: any): this {
         Object.assign(this,input);
         return this;
    }
}