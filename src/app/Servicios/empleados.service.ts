import { Injectable } from '@angular/core';
import { GeneralService} from './general.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  public respuestaGenerica:any;

  constructor(public servicioGeneral:GeneralService) { }


  // procesarMesasPost(parametros:string):Observable<any>
  // {
    
  //  return  this.servicioGeneral.AltaComanda(parametros);
    
  // }

  procesarEmpleados(tarea:string, parametros:string)
  {

    if(tarea == "ListarEmpleados")
    {      
      
      return this.servicioGeneral.TraerEmpleados();      
    }
    else if(tarea == "AltaEmpleado")
    {
      return this.servicioGeneral.AltaEmpleado(parametros);
    }    
    else if(tarea == "BajaEmpleado")
    {
      return this.servicioGeneral.BajaEmpleado(parametros);
    }    

    // else if(tarea == "TraerPedidosMesa")
    // {
    //   return this.servicioGeneral.TraerPedidosMesa(parametros);      
   
    // }
    // else if(tarea == "TraerMesas")
    // {
    //   return this.servicioGeneral.TraerMesas();      
   
    // }   
    // else if(tarea == "CerrarMesa")
    // {
    //   return this.servicioGeneral.CerrarMesa(parametros);   
    // }

  }
}
