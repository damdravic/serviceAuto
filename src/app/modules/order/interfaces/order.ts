export interface Order {
    
  orderId :number;
  workshopId : number;
  vehicleId : number;
  description : string;
  dateReceived : Date;
  technicianId : number;
  diagnosis : string;
  parts : string[];
  estimatedCost: number;
  estimatedCompletionDate: Date;
  status : string;
  totalCost: number;


}
