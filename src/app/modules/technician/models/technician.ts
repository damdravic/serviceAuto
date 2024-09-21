
import { User  } from '../../../interface/user';

export interface Technician{
    id: number;
    user : User;
    isActive: boolean;
    workshop : string;
    technicianExperience : number;
    techicianSpecialization : string;
}