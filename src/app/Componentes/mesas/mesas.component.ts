import { Component, OnInit } from '@angular/core';
import { GeneralService } from './../../Servicios/general.service';
import { MesasService } from './../../Servicios/mesas.service';
import { PedidosService } from './../../Servicios/pedidos.service';

import { InformesService } from './../../Servicios/informes.service';
import { Producto } from './../../Clases/producto';
import { Respuesta } from './../../Clases/respuesta';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})


export class MesasComponent implements OnInit {

  public mesaActual: number;
  public listadoProductos: Producto[];
  public listadoOriginalProductos: Producto[];
  public idCliente: number;
  public respuestaGenerica: any;
  public show: boolean = true;
  public esPanelAdmin: boolean = false;
  public showAlerta: boolean = false;
  public mensajeAlerta: string = "";
  public esAltaComanda: boolean = true;
  public respuesta: Respuesta;
  public showMesas:boolean = false;
  public showPedidos:boolean = true;


  constructor(public servicioPedidos: PedidosService, public servicioMesas: MesasService, public servicioInformes: InformesService) { }

  ngOnInit() {

    this.cargarMesas();
  }


  //==============================Región manejo de mesas

  cargarMesas() {

    this.respuestaGenerica = this.servicioMesas.procesarMesas("TraerMesas", "")
      .then((listado: any[]) => {
        this.respuestaGenerica = listado;
        this.seteaMesas(this.respuestaGenerica);
      })
  }


  seteaMesas(pListado: any) {

    pListado.forEach(element => {

      document.getElementById(element.id_mesa).innerText = element.id_mesa;

      if (element.id_estado_mesa == 1) {
        //rojo
        document.getElementById(element.id_mesa).className = "btnGrande mesaEsperando";

      }
      else if (element.id_estado_mesa == 2) {
        //azul
        document.getElementById(element.id_mesa).className = "btnGrande mesaComiendo";

      }
      else if (element.id_estado_mesa == 3) {
        //amarillo
        document.getElementById(element.id_mesa).className = "btnGrande mesaPagando";

      }
      else {
        document.getElementById(element.id_mesa).className = "btnGrande mesaLibre";
      }
    });
  }


  accionMesa(evento) {

    this.mesaActual = evento.toElement.id;

    if (evento.toElement.className == "btnGrande mesaLibre") {
      this.mostrarModuloComandas(evento.toElement.id);

    }
    else if (evento.toElement.className == "btnGrande mesaEsperando") {
      document.getElementById('moduloPedidos').style.display = "block";

    }
    else if (evento.toElement.className == "btnGrande mesaComiendo") {
      document.getElementById('moduloClientesPagando').style.display = "block";
    }
    else if (evento.toElement.className == "btnGrande mesaPagando") {
      this.mostrarModuloCerrarMesa(evento.toElement.id);
    }

  }

  //==============================Región manejo estados de mesa

  cambiarMesaAClientesComiendo() {
    let parametros = 'id_mesa=' + this.mesaActual;

    this.servicioMesas.procesarMesas("ClientesComiendo", parametros)
      .then((respuesta: Respuesta) => {

        if (respuesta.resultado == true) {
          document.getElementById('moduloPedidos').style.display = 'none';
          this.mensajeAlerta = "Se pasó a clientes comiendo";
          this.cargarMesas();

        }
      });
  }

  informarPidieronCuenta() {
    let parametros = 'id_mesa=' + this.mesaActual;

    this.servicioMesas.procesarMesas("ClientesEsperandoCuenta", parametros)
      .then((respuesta: Respuesta) => {

        if (respuesta.resultado == true) {
          document.getElementById('moduloClientesPagando').style.display = 'none';
          this.mensajeAlerta = "Se pasó a clientes esperando la cuenta";
          this.cargarMesas();

        }
      });
  }

  cerrarMesa() {

    let data = 'id_mesa=' + this.mesaActual + '&id_estado_mesa=4';

    this.servicioMesas.procesarMesas("CerrarMesa", data)
      .then((respuesta: Respuesta) => {

        if (respuesta.resultado == true) {
          document.getElementById('modalAviso').style.display = 'none';
          this.mensajeAlerta = "Se cerró la mesa";
          this.cargarMesas();

        }
      });
  }


  //==============================Región manejo de comanda
  cargarProductos() {


    if (this.esAltaComanda) {
      this.cargarNuevaComanda();
    }
    else {
      this.actualizarComanda();
    }
  }


  cargarNuevaComanda() {

    let productos: number[] = [];
    let cantidades: number[] = [];
    let idEmpleado = localStorage.getItem("id_empleado");

    this.listadoProductos.forEach(prod => {

      if (prod.cantidad > 0) {
        productos.push(prod.id_producto);
        cantidades.push(prod.cantidad);
      }

    });

    let data = 'id_mesa=' + this.mesaActual + '&id_cliente=' + this.idCliente
      + '&pedidos=' + productos + '&cantidades=' + cantidades + '&id_mozo=' + idEmpleado;

    this.servicioMesas.procesarMesasPost(data).subscribe(
      respuesta => this.comandaCargada(respuesta));
  }

  
  comandaCargada(respuesta: Respuesta) {

    if (respuesta.itsOk == true) {
      this.cargarMesas();
      document.getElementById('modalMesas').style.display = 'none';
    }
  }


  actualizarComanda() {

    let parametros = 'id_mesa=' + this.mesaActual;

    this.respuestaGenerica = this.servicioMesas.procesarMesas("TraerPedidosMesa", parametros)
      .then((listado: any[]) => {


        this.listadoProductos.forEach(element => {

          if (Producto.FueAgregado(element, listado)) {

            if (element.cantidad > 0) {

              let parametros = "id_comanda=" + listado[0].id_comanda + "&id_producto="
                + element.id_producto + "&cantidad_producto=" + element.cantidad;

              this.servicioPedidos.procesarPedidos("AgregarPedido", parametros)
                .then((respuesta: Respuesta) => {
                  //console.log(respuesta);                
                });

            }
          }
          else if (Producto.fueModificado(element, listado)) {

            if (element.cantidad == 0) {
              //borrar
            }
            else {

              //modifico

              let parametros = "id_comanda=" + listado[0].id_comanda + "&id_producto="
                + element.id_producto + "&cantidad=" + element.cantidad;

              this.servicioPedidos.procesarPedidos("ModificarPedido", parametros);

            }
          }

        });

        document.getElementById('modalMesas').style.display = "none";
      });
  }


  modificarPedido() {

    document.getElementById('moduloPedidos').style.display = "none";
    this.esAltaComanda = false;
    this.cargarListaPedidos();
  }


  cargarListaPedidos() {
    let parametros = 'id_mesa=' + this.mesaActual;

    this.respuestaGenerica = this.servicioMesas.procesarMesas("TraerPedidosMesa", parametros)
      .then((listado: any[]) => {

        console.log("Pedidos hechos");
        console.log(listado);


        let listaTemporal: any[] = listado;
        this.servicioInformes.traerInformes("listadoProductos", "")
          .then((d: any[]) => {
            this.listadoProductos = d;

            this.listadoOriginalProductos = d;
            this.listadoProductos = Producto.ListaActualizada(this.listadoProductos, listaTemporal);
          });
      })
    document.getElementById('modalMesas').style.display = 'block';
  }


  //==============================Región mostrar módulos

  mostrarModuloComandas(idMesa) {

    this.esAltaComanda = true;

    this.servicioInformes.traerInformes("listadoProductos", "")
      .then((d: any[]) => {
        this.listadoProductos = d;

      });
    document.getElementById('modalMesas').style.display = 'block';
  }


  mostrarModuloCerrarMesa(idMesa) {

    let rol = localStorage.getItem("rol");
    let contenido = '<form><div class="form-group">';

    if (rol == "1") {
      contenido += '<label for="exampleInputEmail1">Cerrar mesa</label>';
      contenido += '<div><a type="button" class="btn" *ngIf="show" (click)="cerrarMesa()">Cerrar Mesa: {{mesaActual}}</a></div>';
    }
    else {

      this.mensajeAlerta = "Para cerrar la mesa debe ser administrador";
      this.show = false;
      this.showAlerta = true;
      //contenido += '<label for="exampleInputEmail1">Para cerrar la mesa debe ser administrador</label>';
    }
    contenido += '</div></form>';

    //document.getElementById('contenidoModal').innerHTML = contenido;

    document.getElementById('modalAviso').style.display = 'block'
  }

}