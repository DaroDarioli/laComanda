import { Component, OnInit } from '@angular/core';
import { GeneralService } from './../../Servicios/general.service';
import { Empleado } from '../../Clases/empleado';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public fotoTacos: string = '../../../assets/IMG/taco.jpg';
  public fotoTacos2: string = '../../../assets/IMG/taco2.jpg';
  public fotoFajitas: string = '../../../assets/IMG/fajitas.jpg';
  public fotoMargarita: string = '../../../assets/IMG/margarita.jpg';

  public imageUrlArray: string[];
  public mensajeAlerta:string  = "";
 


  public usuario: string = "";
  public pass: string = "";

  public empleado: Empleado;

  public respuestaGenerica: any;

  constructor(public ruta1: Router, public servicioGeneral: GeneralService, route: ActivatedRoute) { }

  ngOnInit() {

    this.imageUrlArray = new Array(3);

    this.imageUrlArray[0] = this.fotoTacos;
    this.imageUrlArray[1] = this.fotoFajitas;
    this.imageUrlArray[2] = this.fotoMargarita;
    this.imageUrlArray[3] = this.fotoTacos2;

    // this.empleado = new Empleado();
    // this.empleado.clave = "xxxx";
    // this.empleado.id_empleado  = 1111;
    // this.empleado.usuario = "web";

    // this.servicioGeneral.Agregar(this.empleado).toPromise().then((resp: any[]) => {

    //   this.respuestaGenerica = resp;
    //   console.log("Agrego empleado");
    //   console.log(this.respuestaGenerica);

    // })

    // ============================================================
  }

  public ingresar() {

    //lo que necesito enviar
    //http://localhost:8080/Resto/API/login/get?usuario=ggritz&clave=1234


    this.usuario = (<HTMLInputElement>document.getElementById('inputUsuario')).value;
    this.pass = (<HTMLInputElement>document.getElementById('inputPass')).value;

    let datos = "usuario=" + this.usuario + "&clave=" + this.pass;


    this.servicioGeneral.Logueo(datos).subscribe(
      response => {
        if (response.code === 200) {
          //console.log("respuesta codigo 200")
        } else {

          
          //console.log(response);

          if (response.itsOK == true) {

            localStorage.setItem("rol",response.elEmpleado.id_rol);
            localStorage.setItem("id_empleado",response.elEmpleado.id_empleado);
            localStorage.setItem("usuario",response.elEmpleado.nombre_completo);
 

            if (response.elEmpleado.id_rol == 1) {
              this.ruta1.navigate(['Administracion']);
            }
            else if (response.elEmpleado.id_rol == 2) {
              this.ruta1.navigate(['Mesas']);
            }
            else {
              this.ruta1.navigate(['Pedidos']);
            }
          }
          else {

            this.mensajeAlerta = "Usuario o contraseñas inválidos. Favor verificar";
            document.getElementById('divAlerta').style.display = "block";
          }
        }
      },
      error => {
      //  console.log(<any>error);
      }
    );

  }


  moduloIngreso() {

    let contenido = '<form><div class="form-group">';
    contenido += '<label for="exampleInputEmail1">Usuario</label>';
    contenido += '<input  [(ngModel)]="usuario" name="this.usuario" type="text" class="form-control" id="inputUsuario" placeholder="Ingresar usuario..">';
    contenido += '<div class="form-group"><label for="exampleInputPassword1">Contraseña</label>';
    contenido += '<input  [(ngModel)]="pass" name="this.pass" type="password" class="form-control" id="inputPass" placeholder="Ingresar contraseña">';
    contenido += '</div><div class="form-check"><input type="checkbox" class="form-check-input" id="exampleCheck1">';
    contenido += '<label class="form-check-label" for="exampleCheck1">Recordarme</label>';
    contenido += '</div></form>';
    // contenido += '</div><a type="button" class="btn" onclick="this.ingresar()">Ingresar</a></form>';

    document.getElementById('contenidoModal').innerHTML = contenido;


    document.getElementById('modal01').style.display = 'block'
  }


}
