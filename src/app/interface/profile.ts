import { Role } from "./role";
import { User } from "./user";

export interface Profile {
 
       user ?: User;
       accessToken ?: string;
       refreshToken ?: string;
       isUsingMfa ?: boolean;
       roles ?: Role[];




}
