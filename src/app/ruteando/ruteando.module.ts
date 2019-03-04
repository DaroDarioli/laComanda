
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MesasComponent} from '../Componentes/mesas/mesas.component';
import {AdministracionComponent} from '../Componentes/administracion/administracion.component';
import { EmpleadosComponent} from '../Componentes/empleados/empleados.component';
import {PedidosComponent} from '../Componentes/pedidos/pedidos.component';
import {InicioComponent} from '../Componentes/inicio/inicio.component';
import {ProductoComponent} from '../Componentes/producto/producto.component';
import {ProductosComponent} from '../Componentes/productos/productos.component';
import {ErrorComponent}from '../Componentes/error/error.component';

import { RouterModule, Routes } from '@angular/router';

const MiRuteo = [
  {path: '' , component: InicioComponent},
  {path: 'Pedidos' , component: PedidosComponent},
  {path: 'Mesas' , component: MesasComponent},
  {path: 'Empleados' , component: EmpleadosComponent},
  {path: 'Administracion' , component: AdministracionComponent},
  {path:'Producto',component:ProductoComponent},
  {path:'Productos',component:ProductosComponent},
  {path: '**' , component: ErrorComponent}];

  
  @NgModule({
    imports: [
      RouterModule.forRoot(MiRuteo)
    ],
    exports: [
      RouterModule
    ]
  })
  export class RuteandoModule { }