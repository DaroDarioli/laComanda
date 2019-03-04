import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  public respuestaGenerica: any;
  constructor(public servicioGeneral: GeneralService) { }

  procesarPedidos(tarea: string, parametros: string) {

    if (tarea == "PendientesMiSector") {
      //TraerPedidosPendientesSector

      return this.servicioGeneral.TraerPedidosPendientesSector(parametros)
    }
    else if (tarea == "TomarPedido") {
      return this.servicioGeneral.TomarPedido(parametros)
    }
    else if (tarea == "AgregarPedido") {
      return this.servicioGeneral.AgregarPedido(parametros);
    }
    else if(tarea == "ModificarPedido")
    {
      return this.servicioGeneral.ModificarPedido(parametros);             
    }
    else if(tarea == "TodosLosPedidos"){
      return this.servicioGeneral.TraerTodosLosPedidos();
    }

  }
}
