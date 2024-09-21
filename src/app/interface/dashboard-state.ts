import { DataState } from "./data-state";
import { User } from './user';

export interface DashboardState{
    dataState: DataState;
    error?: string;
    message?: string;
    
}