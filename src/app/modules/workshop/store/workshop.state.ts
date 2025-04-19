import { Workshop } from 'src/app/modules/workshop/interfaces/workshop';

export interface WorkshopState {
  workshops: Workshop[];
  error: string;
  status: 'pending' | 'success' | 'failure' | 'loading';
}

export const initialWorkshopState: WorkshopState = {
  workshops: [],
  error: null,
  status: 'pending',
};
