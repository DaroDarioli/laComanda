import { Injectable } from '@angular/core';
import { GeneralService} from './general.service';

import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(public servicioGeneral:GeneralService) { }


  procesarServicio(tarea:string, parametros:string)
  {
  
    //console.log(parametros)
    
    if(tarea == "opcionesCaptcha")
    {
      return this.servicioGeneral.TraerCaptchas();
    }
    else if(tarea == "evaluarCaptcha")
    {
      return this.servicioGeneral.EvaluarCaptcha(parametros);
    } 

  }   

}
