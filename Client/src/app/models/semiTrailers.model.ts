import {Vehicle} from "./vehicle.model";
import {Deserializable} from "./deserializable.model";

export interface SemiTrailer {
    id: number;
    vehicleId: number;
    registrationNumber: string;
    semiTrailerType: string;
    createdAt: string;
    updatedAt: string;
    vehicle: Vehicle;

}