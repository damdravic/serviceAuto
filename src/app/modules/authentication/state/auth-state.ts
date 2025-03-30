import { User } from 'src/app/interface/user';
import { DataStatus } from './data-status';


export interface AuthState {
  user?: User | null;
  token?: string | null;
  status: DataStatus;
  error?: string;
  isUsingMfa?: boolean;
  phone?: string;
}

export const initialState: AuthState  = {
    
    status: DataStatus.Idle,
    isUsingMfa: false
   
}
