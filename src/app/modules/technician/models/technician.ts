
import { User  } from '../../../interface/user';

export class Technician{
    id: number;
    techName:string;
    userId : number;
    isActive: boolean;
    workshop : string;
    experience : number;
    specialization : string;


constructor(techName:string, 
   userId : number,
    isActive: boolean,
     workshop : string, 
     experience : number, 
     specialization : string){
    this.techName = techName;
    this.userId = userId;
    this.isActive = isActive;
    this.workshop = workshop;
    this.experience = experience;
    this.specialization = specialization;


}}