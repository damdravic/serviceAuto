import { Labor } from './labor';

export interface OrderLaborItem{
    labor: Labor;
    quantity: number;
    discount: number;
}