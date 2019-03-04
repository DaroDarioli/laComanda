import { Component, OnInit, Input } from '@angular/core';
import {Empleado} from './../../Clases/empleado';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {


  @Input() empleado: Empleado;

  constructor() { }

  ngOnInit() {
  }

  accionEmpleado(emp:Empleado)
  {

    console.log(emp.nombre_completo);
    console.log(emp.activo);

  }

  borrarEmpleado(emp:Empleado)
  {

  }

}
