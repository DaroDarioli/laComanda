import { Injectable } from '@angular/core';
import { GeneralService} from './general.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public respuestaGenerica:any;


  constructor(public servicioGeneral:GeneralService) { }



  procesarProductosPost(parametros:string):Observable<any>
  {
    
   return  this.servicioGeneral.AltaProducto(parametros);
    
  }


  procesarProducto(tarea:string, parametros:string)
  {

    if(tarea == "ModificarProducto")
    {
      return this.servicioGeneral.modificaProducto(parametros);      
    }

  }
}

