import { Injectable } from '@angular/core';
import { GeneralService} from './general.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  public respuestaGenerica:any;

  constructor(public servicioGeneral:GeneralService) { }



  // TraerLasMesas(): any {

  //  return this.servicioGeneral.TraerMesas();
  // }


  procesarMesasPost(parametros:string):Observable<any>
  {
    
   return  this.servicioGeneral.AltaComanda(parametros);
    
  }

  procesarMesas(tarea:string, parametros:string)
  {

    if(tarea == "ClientesComiendo")
    {
      return this.servicioGeneral.CambiarEstadoMesa(parametros + '&id_estado_mesa=2');
    }
    else if(tarea == "ClientesEsperandoCuenta")
    {
      return this.servicioGeneral.CambiarEstadoMesa(parametros + '&id_estado_mesa=3');
    }    
    else if(tarea == "TraerPedidosMesa")
    {
      return this.servicioGeneral.TraerPedidosMesa(parametros);      
   
    }
    else if(tarea == "TraerMesas")
    {
      return this.servicioGeneral.TraerMesas();      
   
    }   
    else if(tarea == "CerrarMesa")
    {
      return this.servicioGeneral.CerrarMesa(parametros);   
    }

  }
}