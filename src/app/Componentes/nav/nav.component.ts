import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() show: boolean = false;
  @Input() showPedidos:boolean = false;
  @Input() showMesas:boolean = false;

  @Input() esPanelAdmin: boolean;


  usuario: string = "Sin loguearse";

  constructor(public ruta1: Router) { }

  ngOnInit() {

    this.InicializarComponente();

  }

  InicializarComponente() {

    this.usuario = localStorage.getItem("usuario");

    let rol: string = localStorage.getItem("rol");

    this.esPanelAdmin = this.esPanelAdmin;

    console.log("Rol: " + rol);

    if (rol == "1" && this.esPanelAdmin == false) {
      this.show = true;
    }
    else {

      this.show = false;
    }
  }

  salir() {
    this.ruta1.navigate(['']);
    localStorage.setItem("rol", "");
    localStorage.setItem("id_empleado", "");
    localStorage.setItem("usuario", "");
    localStorage.setItem("token", "");
  }

  accederPanelAdmin() {
    this.ruta1.navigate(['Administracion']);

  }

  accederMesas()
  {
    this.ruta1.navigate(['Mesas']);
  }

  accederPedidos(){
    this.ruta1.navigate(['Pedidos']);
  }

}
