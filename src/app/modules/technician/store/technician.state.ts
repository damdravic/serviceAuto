
import { Technician } from '../models/technician';

export interface TechnicianState { 
    technicians: Technician[];
    error : string;
    status:'pending' | 'success' |'failure' | 'loading'; 
    
}


export const initialTecniciansState : TechnicianState = {
    technicians : [],
    error : null,
    status : 'pending'
}