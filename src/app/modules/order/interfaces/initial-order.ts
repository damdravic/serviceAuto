import { Order } from "./order";

export const initialOrder : Order = {
    orderId: 0,
    workshopId: 0,
    vehicleId: 0,
    description: "",
    dateReceived: undefined,
    technicianId: 0,
    diagnosis: "",
    parts: [],
    estimatedCost: 0,
    estimatedCompletionDate: undefined,
    status: "",
    totalCost: 0
}
