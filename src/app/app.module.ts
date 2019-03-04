import { BrowserModule } from '@angular/platform-browser';
import {SlideshowModule} from 'ng-simple-slideshow';
import { NgModule } from '@angular/core';
//import { AlertModule } from 'ngx-bootstrap';
import {RouterModule, Routes} from '@angular/router';


import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { MesasComponent } from './Componentes/mesas/mesas.component';
import { PedidosComponent } from './Componentes/pedidos/pedidos.component';
import { AdministracionComponent } from './Componentes/administracion/administracion.component';
import { RuteandoModule} from '../app/ruteando/ruteando.module';
import { ErrorComponent } from './Componentes/error/error.component';
import { Angular2CsvComponent } from 'angular2-csv';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
//import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
import { Angular2CsvModule } from 'angular2-csv';


import { FormsModule } from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms';
import { ProductoComponent } from './Componentes/producto/producto.component';
import { ProductosComponent } from './Componentes/productos/productos.component';

import { RecaptchaModule } from 'ng-recaptcha';
import { PedidoComponent } from './Componentes/pedido/pedido.component';
import { SafePipe } from './Pipes/safe.pipe';
import { NavComponent } from './Componentes/nav/nav.component';
import { EmpleadosComponent } from './Componentes/empleados/empleados.component';
import { EmpleadoComponent } from './Componentes/empleado/empleado.component';
import { AltaEmpleadoComponent } from './Componentes/alta-empleado/alta-empleado.component';
// import { AcabezalesComponent } from './Componentes/acabezales/acabezales.component';
//import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MesasComponent,
    PedidosComponent,
    AdministracionComponent,
    ErrorComponent,
    ProductoComponent,
    ProductosComponent,
    PedidoComponent,
    SafePipe,
    NavComponent,
    EmpleadosComponent,
    EmpleadoComponent,
    AltaEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    SlideshowModule,
    HttpClientModule,
    RuteandoModule,
    Ng2GoogleChartsModule,
    Angular2CsvModule,
    FormsModule,
    RecaptchaModule,
    ChartModule 
  
  ],
  providers: [Angular2CsvComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
