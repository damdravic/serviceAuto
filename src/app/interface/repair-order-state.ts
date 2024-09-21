import { DataState } from "./data-state";
import { RepairOrder } from "./repair-order";



export interface RepairOrderState{
    dataState: DataState;
    error?: string;
    repairOrders?: RepairOrder[];
    message?: string;
    
    
}