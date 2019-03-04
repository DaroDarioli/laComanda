import { Injectable } from '@angular/core';
import { GeneralService} from './general.service';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  public respuestaGenerica: any;

  constructor(public servicioGeneral:GeneralService) { }

  traerInformes(tarea:string, parametros:any):any
  {
    if(tarea == "tareasSector")
    {
      this.servicioGeneral.TraerEmpleadosTransacciones().subscribe(
        response => {
  
          this.respuestaGenerica = response;

          return this.respuestaGenerica;
  
        });        
    }
    else if(tarea == "listadoProductos")
    {
      return this.servicioGeneral.TraerProductos()

    }

    
  }
}
