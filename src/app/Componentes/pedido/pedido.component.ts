import { Component, OnInit, Input } from '@angular/core';
import { PedidosService } from './../../Servicios/pedidos.service';
import { Pedido } from '../../Clases/pedido';
import { PedidosComponent } from '../pedidos/pedidos.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  @Input() pedido: Pedido;

  public tarea: string = "Alta";
  public tiempoEstimado: number;
  public parametrosPedido:string;
  public servicePedidos: PedidosService;
  public show:boolean = false;
  public showAlerta:boolean = false;


  public misPedidos:PedidosComponent = new PedidosComponent(this.servicePedidos);


  @Input()
  set name(name: string) {
    this.tarea = (name && name.trim()) || 'AltaPipe';
  }


  constructor(public service: PedidosService) { }

  ngOnInit() {
  }

  modificarPedido(pedido:Pedido) {
    //console.log(pedido);
    
    this.parametrosPedido = 'id_cocina=' + this.obtenerIdCocina()    
    +'&id_comanda='+pedido.id_comanda
    +'&id_producto='+pedido.id_producto
    +'&id_empleado='+localStorage.getItem("id_empleado");

    document.getElementById('modalPedido').style.display = 'block';
   

  }

  tomarPedido() {
    
    //http://localhost:8080/Resto/API/pedido/tomarPedido?id_cocina=3&id_comanda=AA001&id_producto=9&id_empleado=6&minutos_estimados=90

    let parametros  = this.parametrosPedido + '&minutos_estimados='+this.tiempoEstimado;

    console.log(parametros);
   // document.getElementById('modalPedido').style.display = 'none';
    
    
    this.service.procesarPedidos("TomarPedido", parametros)
      .then((d: any[]) => {

        console.log(d);
        this.misPedidos.traerMisPedidos();
  

      });
  }

  obtenerIdCocina():number{

    let cocina:number;

    let rol = localStorage.getItem("rol");

    if (rol == "5") cocina = 3;

    if (rol == "4") cocina = 2;

    if (rol == "6") cocina = 4;


    return cocina;
  }


}


