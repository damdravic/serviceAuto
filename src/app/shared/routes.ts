import { Routes } from "@angular/router";
import { LoginComponent } from "../layout/login/login.component";

export const content :Routes = [
 {
    path: '',
    loadChildren: () => import('../modules/themes/themes.module').then(m => m.ThemesModule)

 },

]