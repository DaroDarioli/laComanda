import { Component, OnInit } from '@angular/core';
import { Empleado } from './../../Clases/empleado';
import { EmpleadosService } from '../../Servicios/empleados.service';
import { Respuesta } from './../../Clases/respuesta';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  public listadoEmpleados: Empleado[];
  public showMesas: boolean = false;
  public showPedidos: boolean = false;
  public esPanelAdmin: boolean = false;
  public empleadoAlta:Empleado;
  public empleadoBaja:Empleado = new Empleado();
  public mensajeBaja:string;


  constructor(public servicioEmpleados: EmpleadosService) { }

  ngOnInit() {
    this.cargarEmpleados();
  }

  altaEmpleado()
  {
    this.empleadoAlta = new Empleado();
    document.getElementById('modalAltaEmpleado').style.display = 'block';

  }


  eliminarEmpleado(empleado:Empleado){
    this.empleadoBaja = empleado;
    this.mensajeBaja = "¿Está seguro de que desea dar de baja al empleado: "+this.empleadoBaja.nombre_completo+" Id:"+this.empleadoBaja.id_empleado;
    document.getElementById('modalBajaEmpleado').style.display = 'block';    
  }


  bajaEmpleado() {


    let parametros = 'id_empleado=' + this.empleadoBaja.id_empleado;
    
    this.servicioEmpleados.procesarEmpleados("BajaEmpleado", parametros)
      .then((respuesta: Respuesta) => {        
        console.log(respuesta)
        
        if(respuesta.itsOk)
        {
          this.cargarEmpleados();
          document.getElementById('modalBajaEmpleado').style.display = 'none';          
        }
        else{
          this.mensajeBaja = respuesta.mensaje;
        }
        
      });
  }


  seHizoAlta(alta:boolean){

    if(alta){
      this.cargarEmpleados();
      document.getElementById('modalAltaEmpleado').style.display = 'none'; 

    }

  }

  cargarEmpleados() {

    this.servicioEmpleados.procesarEmpleados("ListarEmpleados", "")
      .then((res: Empleado[]) => {
        this.listadoEmpleados = res;
      });
  }

}
