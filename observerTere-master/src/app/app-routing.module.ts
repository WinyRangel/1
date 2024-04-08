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
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductosComponent } from './components/productos/productos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { AuthGuard } from './auth.guard';
import { NosotrosComponent } from './components/nosotros/nosotros.component';


const routes: Routes = [
  { path: '', component: InicioComponent,  canActivate: [AuthGuard], data: { breadcrumb: 'Inicio'}},
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Inicio'}},
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Proveedores', expectedRoles: ['administrador']}},
  { path: 'mapa', component: MapaComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Mapa del Sitio'}},
  {path: 'listar-empleados', component: ListarEmpleadosComponent,  canActivate: [AuthGuard],  data: { breadcrumb: 'Empleados', expectedRoles: ['administrador']}},
  {path: 'registro', component: RegistroComponent,  canActivate: [AuthGuard],  data: { breadcrumb: 'Empleados > Registrar Empleado', expectedRoles: ['administrador']}},
  {path: 'editar-empleado/:id', component: RegistroComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Empleados > Editar Empleado', expectedRoles: ['administrador']}},
  { path: 'listar-recurso', component: ListarRecursoComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos', expectedRoles: ['administrador'] }},
  { path: 'crear-recurso', component: CrearRecursoComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos > Crear Recursos', expectedRoles: ['administrador']}},
  { path: 'editar-recurso/:id', component: CrearRecursoComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos > Editar Recursos', expectedRoles: ['administrador']}},
  { path: 'eliminar-recurso/:id', component: EliminarRecursoComponent,  canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos > Eliminar Recurso', expectedRoles: ['administrador']}},
  { path: 'edit-recurso/:id', component: EditRecursoComponent,  canActivate: [AuthGuard], data: { breadcrumb: 'Recursos > Editar Recursos', expectedRoles: ['administrador']}},
  { path: 'productos', component: ProductosComponent,  canActivate: [AuthGuard], data: { breadcrumb: 'Productos'}},
  { path: 'solicitudes', component: SolicitudesComponent,  canActivate: [AuthGuard], data: { breadcrumb: 'Solicitudes'}},
  {path: 'asignacion', component: AsignacionComponent,  canActivate: [AuthGuard], data: { breadcrumb: 'Asignacion', expectedRoles: ['administrador']}},
  {path: 'contacto', component: ContactoComponent, data: { breadcrumb: 'Contacto'}},
  {path: 'error404', component: Error404Component, data: { breadcrumb: 'Error 404'}},
  {path: 'signin', component: SigninComponent, data: { breadcrumb: 'Acceso'}},
  {path: 'signup', component: SignupComponent, data: { breadcrumb: 'Registro'}},
  {path: 'recuperar-contraseña', component: RecuperarContrasenaComponent, data: { breadcrumb: 'Recuperar Contraseña'}},
  {path: 'sobre-nosotros', component: NosotrosComponent, data: { breadcrumb: 'Sobre Nosotros'}},
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
