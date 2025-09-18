import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { VerifyCodeComponent } from './auth/components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';


import { DashboardInicioComponent } from './dashboard/dashboard-inicio/dashboard-inicio';
import { DashboardCargosComponent } from './dashboard/dashboard-cargos/dashboard-cargos';
import { DashboardExtrasComponent } from './dashboard/dashboard-extras/dashboard-extras';
import { DashboardReportesComponent } from './dashboard/dashboard-reportes/dashboard-reportes';
import { DashboardFuncionariosComponent } from './dashboard/dashboard-funcionarios/dashboard-funcionarios';

//CARGOS
import { CreateCargoComponent } from './modules/cargos/components/create-cargo/create-cargo-page';
import { ListCargoComponent } from './modules/cargos/components/list-cargo/list.cargo.component';

//EXTRAS
import { CreateHorasExtrasComponent } from './modules/horas-extras/components/create-extras/create-horas-extras-components';
import { ListHorasExtrasComponent } from './modules/horas-extras/components/list-extras/list-horas-extras.component';

//FUNCIONARIOS
import { CreateFuncionariosComponent } from './modules/funcionarios/components/create-funcionarios/create-funcionarios-page';
import { ListFuncionariosComponent } from './modules/funcionarios/components/list-funcionarios/list-funcionarios-page';

// GUARD
import { AuthGuard } from './auth/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-code', component: VerifyCodeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'inicio', component: DashboardInicioComponent },
      { path: 'cargos', component: DashboardCargosComponent, 
        children: [
          { path: 'crearCargo', component: CreateCargoComponent},
          { path: 'listarCargo', component: ListCargoComponent}
        ]
      },
      { path: 'extras', component: DashboardExtrasComponent, 
        children:[
          { path: 'crearExtra', component: CreateHorasExtrasComponent},
          { path: 'listarExtra', component: ListHorasExtrasComponent}
        ]
      },
      { path: 'funcionarios', component: DashboardFuncionariosComponent, 
        children: [
          { path: 'crearFuncionario', component: CreateFuncionariosComponent},
          { path: 'listarFuncionario', component: ListFuncionariosComponent}
        ]
      },
      { path: 'reportes', component: DashboardReportesComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' } // por defecto va a inicio
      // { path: 'register', component: RegisterPageComponent },
      
    ]
  },
  { path: '**', redirectTo: 'login' }
];
