import { Routes } from "@angular/router";
import { LoginComponent } from "../pages/login/login.component";
import { OrderModule } from "../modules/order/order.module";

export const content: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../modules/themes/themes.module').then((m) => m.ThemesModule),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('../modules/order/order.module').then((m) => OrderModule),
  },
  {
    path: 'workshop',
    loadChildren: () =>
      import('../modules/workshop/workshop.module').then(
        (m) => m.WorkshopModule
      ),
  },
  {
    path: 'technician',
    loadChildren: () =>
      import('../modules/technician/technician.module').then((m) => m.TechnicianModule),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('../modules/customer/customer.module').then((m) => m.CustomerModule),
  },
];