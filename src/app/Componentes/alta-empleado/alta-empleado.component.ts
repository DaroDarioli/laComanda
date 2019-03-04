import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Empleado } from './../../Clases/empleado';
import { EmpleadosService } from '../../Servicios/empleados.service';
import { Respuesta } from './../../Clases/respuesta';


@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.css']
})
export class AltaEmpleadoComponent implements OnInit {

  submitted = false;

  public empleado: Empleado;
  public respuesta: Respuesta;
  public seHizoAlta = false;

  @Output() altaNueva = new EventEmitter<boolean>();

  get diagnostic() { return JSON.stringify(this.empleado); }

  constructor(public servicioEmpleados: EmpleadosService) {
    this.empleado = new Empleado();
  }

  ngOnInit() {
  }

  altaEmpleado() {

    this.submitted = true;

    let parametros = 'usuario=' + this.empleado.usuario
      + '&nombre_completo=' + this.empleado.nombre_completo
      + '&id_rol=' + this.empleado.id_rol
      + '&fecha_ingreso=' + this.empleado.fecha_ingreso
      + '&fecha_egreso=' + this.empleado.fecha_egreso
      + '&clave=' + this.empleado.clave
      + '&sueldo=' + this.empleado.sueldo;
    
    this.servicioEmpleados.procesarEmpleados("AltaEmpleado", parametros)
      .then((respuesta: Respuesta) => {        
        this.AltaTerminada(respuesta.itsOk);
      });
  }


  AltaTerminada(altaHecha: boolean) {
    this.altaNueva.emit(altaHecha);
    this.seHizoAlta = true;
  }

}











