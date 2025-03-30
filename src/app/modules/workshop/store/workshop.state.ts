import { Workshop } from "src/app/core/interfaces/workshop";

export interface WorkshopState {
    workshops: Workshop[];
    error: string;
    status: 'pending' | 'success' | 'failure' | 'loading';
    
}

export const initialWorkshopState : WorkshopState = {
    workshops : [],
    error : null,
    status : 'pending'
}