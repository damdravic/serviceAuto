import { TechnicianState } from "../modules/technician/store/technician.state";
import { UserState } from "../modules/user/store/user.reducer";

export interface AppState {
    technicianState : TechnicianState;
    userState : UserState;
}