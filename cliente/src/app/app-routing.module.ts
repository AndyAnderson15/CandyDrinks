import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { InfoProductoComponent } from './components/info-producto/info-producto.component';
import { ListarProductoComponent } from './components/listar-producto/listar-producto.component';

const routes: Routes = [
  { path: '', component: ListarProductoComponent},
  { path: 'info-producto', component: InfoProductoComponent},
  { path: 'crear-producto', component: CrearProductoComponent},
  { path: 'editar-producto/:id', component: CrearProductoComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
