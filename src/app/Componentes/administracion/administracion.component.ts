import { Component, OnInit } from '@angular/core';
import { GeneralService } from './../../Servicios/general.service';
import { InformesService } from './../../Servicios/informes.service';
import { AdministracionService } from './../../Servicios/administracion.service';
import { Respuesta } from './../../Clases/respuesta';
import { Angular2CsvComponent } from 'angular2-csv';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Chart } from 'angular-highcharts';


//import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {


  public pieChartData: any;
  public respuestaGenerica: any;
  public opciones: string[] = ['opcion 1', 'opcion 2 ', 'opcion 3'];
  public radioRespuesta: string;
  public listadoEmpleadosTransacciones: any;
  public chart: Chart;
  public show: boolean = false;
  public showMesas: boolean = true;
  public showPedidos: boolean = true;
  public mensajeCaptcha: string = "Hacer click sobre el resultado de la ecuación"
  public sumaActual: string = "suma1"
  public sourceSuma: string = "./../../../assets/captchaSuma/suma5.jpg";
  myRecaptcha: boolean

  constructor(public ruta1: Router, public unCSV: Angular2CsvComponent, public servicioAdmin: AdministracionService, public servicioInformes: InformesService, public servicioGeneral: GeneralService) { }

  ngOnInit() {

  }

  abmEmpleados() {
    document.getElementById('moduloCaptcha').style.display = 'block';
  }


  abmProductos() {
    document.getElementById('moduloCaptchaGoogle').style.display = 'block';
  }


  public resolved(captchaResponse: string) {

    if (captchaResponse.length > 0) {
      this.ruta1.navigate(['Productos']);
    }

  }

  clickRespuesta(event) {

    let respuestaCaptcha = event.target.attributes.id.nodeValue;
    let parametros = "suma=" + this.sumaActual + '&respuesta=' + respuestaCaptcha;

    this.servicioAdmin.procesarServicio("evaluarCaptcha", parametros)
      .then((respuesta: Respuesta) => {

        if (respuesta.itsOk == true) {

          document.getElementById('moduloCaptcha').style.display = 'none';
          this.ruta1.navigate(['Empleados']);

        }
        else {
          console.log("Respuesta Equivocada");
          this.mensajeCaptcha = "Por favor una vez más";

          let numeroRandom = Math.floor(Math.random() * (4 - 1)) + 1;

          if (numeroRandom == 1) {
            this.sourceSuma = "./../../../assets/captchaSuma/suma5.jpg";
            this.sumaActual = "suma1";
          }
          else if (numeroRandom == 2) {
            this.sourceSuma = "./../../../assets/captchaSuma/suma6.jpg";
            this.sumaActual = "suma2";
          }
          else {
            this.sourceSuma = "./../../../assets/captchaSuma/suma7.jpg";
            this.sumaActual = "suma3";
          }
        }
      });
  }


  listadoProductos() {
    let encabezados: any = ['id_producto', 'nombre_producto', 'descripcion', 'id_cocina', 'precio'];
    let titulo: string = "Listado de Productos";

    this.servicioGeneral.TraerProductos()
      .then((d: any[]) => {
        this.crearCSV(d, encabezados, titulo);
      });

  }


  crearCSV(pDatos: any, pEncabezados: any, pTitulo: string) {

    this.unCSV = new Angular2CsvComponent();
    this.unCSV.data = pDatos;
    this.unCSV.options.filename = pTitulo;
    this.unCSV.options.fieldSeparator = ',';
    this.unCSV.options.quoteStrings = '"';
    this.unCSV.options.decimalseparator = '.';
    this.unCSV.options.showLabels = false;
    this.unCSV.options.headers = [];
    this.unCSV.options.showTitle = true;
    this.unCSV.options.title = pTitulo;
    this.unCSV.options.useBom = false;
    this.unCSV.options.removeNewLines = true;
    this.unCSV.options.keys = pEncabezados;
    this.unCSV.generateCsv();
  }

  
  traerTransaccionesEmpleados() {

    let encabezados: any = ['numero', 'id_empleado', 'fecha', 'tarea'];
    let titulo: string = "Informe Logueos";

    this.servicioGeneral.TraerLogueos().subscribe(
      response => {

        this.crearCSV(response, encabezados, titulo);
      });
  }

  
  public mostrarGraficoOperaciones() {
    this.servicioGeneral.TraerEmpleadosTransacciones().subscribe(
      response => {

        this.armarChart(response);
      });
  }

  
  armarChart(listado: any) {

    let objeto = JSON.stringify(listado)
    let listado2 = JSON.parse(objeto);

    var claves = [];
    var arr = [];

    for (var x in listado2) {
      claves.push(x);
      arr.push(listado2[x]);
    }

    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: claves
        //categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      },
      series: [
        {
          name: 'Line 1',
          data: arr
        }
      ],
      navigation: {
        buttonOptions: {
          enabled: true
        }
      }
    });

    //  this.chart.addPoint(1);    
    document.getElementById('modalChart').style.display = 'block';

  }

}




