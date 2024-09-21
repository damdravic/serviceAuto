
import { Technician } from '../models/technician';

export interface TechnicianState { 
    technicians: Technician[];
    technician: Technician;
    technicianError: string;
    TechnicianLoading: boolean;
    
}