import { Component, OnInit } from '@angular/core';
import { InformesService } from './../../Servicios/informes.service';
import { GeneralService } from './../../Servicios/general.service';
import { Producto } from './../../Clases/producto';
import { Cocina } from './../../Clases/cocina';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public listadoProductos: Producto[];
  public esAlta : boolean = false;
//  public producto:Producto;

  constructor(public ruta1: Router, public servicioInformes: InformesService, public servicioGeneral: GeneralService) { }

  ngOnInit() {

    //this.producto = new Producto();
    this.cargarProductos();

  }

  altaProducto()
  {
    //document.getElementById('divAlta').style.display = 'block';
    this.ruta1.navigate(['Producto']);  
  }

  cargarProductos() {

    this.servicioInformes.traerInformes("listadoProductos", "")
    .then((res: any[]) => {
          this.listadoProductos = res;          
          //console.log(this.listadoProductos);
        });

  }

}
