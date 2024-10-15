
import { User  } from '../../../interface/user';

export interface Technician{
    id: number;
    isActive: boolean;
    workshop : string;
    technicianExperience : number;
    techicianSpecialization : string;
}