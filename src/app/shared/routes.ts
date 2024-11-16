import { Routes } from "@angular/router";
import { LoginComponent } from "../pages/login/login.component";

export const content :Routes = [
 {
    path: '',
    loadChildren: () => import('../modules/themes/themes.module').then(m => m.ThemesModule)

 },

]