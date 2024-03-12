import { ListarRecursoComponent } from './components/listar-recurso/listar-recurso.component';
import { CrearRecursoComponent } from './components/crear-recurso/crear-recurso.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EliminarRecursoComponent } from './components/eliminar-recurso/eliminar-recurso.component';
import { EditRecursoComponent } from './components/edit-recurso/edit-recurso.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { InicioComponent } from './components/inicio/inicio/inicio.component';
import { ListarEmpleadosComponent } from './components/listar-empleados/listar-empleados/listar-empleados.component';
import { RegistroComponent } from './registro/registro/registro.component';
import { MapaComponent } from './mapa/mapa/mapa.component';
import { Error404Component } from './components/error404/error404/error404.component';
import { SigninComponent } from './components/signin/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: InicioComponent,  canActivate: [AuthGuard], data: { breadcrumb: 'Inicio'}},
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Inicio'}},
  { path: 'mapa', component: MapaComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Mapa del Sitio'}},
  {path: 'listar-empleados', component: ListarEmpleadosComponent,  canActivate: [AuthGuard],  data: { breadcrumb: 'Empleados'}},
  {path: 'registro', component: RegistroComponent,  canActivate: [AuthGuard],  data: { breadcrumb: 'Empleados > Registrar Empleado'}},
  {path: 'editar-empleado/:id', component: RegistroComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Empleados > Editar Empleados'}},
  { path: 'listar-recurso', component: ListarRecursoComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos'}},
  { path: 'crear-recurso', component: CrearRecursoComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos > Crear Recursos'}},
  { path: 'editar-recurso/:id', component: CrearRecursoComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos > Editar Recursos'}},
  { path: 'eliminar-recurso/:id', component: EliminarRecursoComponent,  canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos > Eliminar Recursos'}},
  { path: 'edit-recurso/:id', component: EditRecursoComponent,  canActivate: [AuthGuard], data: { breadcrumb: 'Recursos > Editar Recursos'}},
  {path: 'asignacion', component: AsignacionComponent,  canActivate: [AuthGuard], data: { breadcrumb: 'Asignacion'}},
  {path: 'contacto', component: ContactoComponent, data: { breadcrumb: 'Contacto'}},
  {path: 'error404', component: Error404Component, data: { breadcrumb: 'Error 404'}},
  {path: 'signin', component: SigninComponent, data: { breadcrumb: 'Acceso'}},
  {path: 'signup', component: SignupComponent, data: { breadcrumb: 'Registro'}},
  { path: '**', redirectTo: 'error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
