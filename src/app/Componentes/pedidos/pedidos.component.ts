import { Component, OnInit } from '@angular/core';
import { PedidosService } from './../../Servicios/pedidos.service';
import { Pedido } from './../../Clases/pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})


export class PedidosComponent implements OnInit {

  public listado: Pedido[];
  public show: boolean = true;
  public esAdmin: boolean = false;
  public noEesAdmin: boolean = true;
  public showMesas:boolean = false;
  public showPedidos:boolean = false;
  public esPanelAdmin:boolean = false;

  constructor(public service: PedidosService) { }

  ngOnInit() {

    let rol = localStorage.getItem("rol");

    if (rol == "1") {
      this.esAdmin = true;
      this.noEesAdmin = false;
      this.showMesas = true;
     
    }
    else if (rol == "2") {
      this.esAdmin = false;
      this.noEesAdmin = false;
      this.showMesas = true;
      this.traerMisPedidos();
    }

    else {
      this.esAdmin = false;
      this.noEesAdmin = true;
    }
  }


  public traerPedidosPorEstado(event) {
    
    var target = event.target;
    let idAttr = target.attributes.id;
    var estado = idAttr.nodeValue;

    this.service.procesarPedidos("TodosLosPedidos", "")
      .then((listadosTemporal: Pedido[]) => {

        if (estado == "opcionPendientes") {
          this.listado = listadosTemporal.filter(this.filtraPedidoPendiente);
        }
        else if (estado == "opcionEnPreparacion") {
          this.listado = listadosTemporal.filter(this.filtraPedidoEnPreparacion);
        }
        else if (estado == "opcionListos") {
          this.listado = listadosTemporal.filter(this.filtraPedidoListoParaServir);
        }
        else {
          this.listado = listadosTemporal;
        }
      });
  }


  public filtraPedidoPendiente(element: Pedido, index, array) {
    return (element.estado_pedido == 1);
  }

  public filtraPedidoEnPreparacion(element: Pedido, index, array) {
    return (element.estado_pedido == 2);
  }

  public filtraPedidoListoParaServir(element: Pedido, index, array) {
    return (element.estado_pedido == 3);
  }


  public traerTodosLosPedidos() {
    this.service.procesarPedidos("TodosLosPedidos", "")
      .then((resp: any[]) => {
        this.listado = resp;
      });
  }


  public traerPedidosMiSector() {

    let rol = localStorage.getItem("rol");

    if (rol == "1") {

    }
    else if (rol == "2") {

    }
    else {
      this.trearPedidosPorCocina(rol);
    }
  }


  public trearPedidosPorCocina(rol: string) {

    let cocina;

    if (rol == "3") cocina = 1;

    if (rol == "4") cocina = 2;
    
    if (rol == "5") cocina = 3;    

    if (rol == "6") cocina = 4;

    let parametros = 'id_cocina=' + cocina;
    this.service.procesarPedidos("PendientesMiSector", parametros)
      .then((resp: any[]) => {
        this.listado = resp;
      });
  }


  public traerMisPedidos() {

    this.service.procesarPedidos("TodosLosPedidos", "")
      .then((listadosTemporal: Pedido[]) => {

        this.listado = listadosTemporal.filter(this.filtrarPedidoPorEmpleado);

      });
  }


  public filtrarPedidoPorEmpleado(element: Pedido, index, array) {
    let idEmpelado = localStorage.getItem("id_empleado");
    return (element.id_empleado == idEmpelado);
  }

}


