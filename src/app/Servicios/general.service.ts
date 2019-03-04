import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Empleado } from '../Clases/empleado';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  url: string = "http://localhost:8080/Resto/API";
  urlWeb: string = "http://darodarioli.tech/API";
  public respuesta: any = "";


  constructor(private http: HttpClient) { }


  //======================Region Logueo

  Logueo(datos: string): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + "/login/", datos, { headers: headers });
  }


  TraerLogueos() {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + "/informes/logueos", "", { headers: headers });
  }


  TraerEmpleadosTransacciones() {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + "/informes/operaciones/sector", "", { headers: headers });
  }

  public TraerEmpleado(parametros: string) {

    this.http.get(this.url + "login/get?" + parametros).toPromise()
      .then((resp: any[]) => {

        this.respuesta = resp;

      })

    return this.respuesta;

  }


  //======================Region Mesas

  TraerMesas() {
    return this.http.get(this.url + "/mesa/listado").toPromise()
  }


  CambiarEstadoMesa(parametros: string) {
    return this.http.get(this.url + "/mesa/modificar?" + parametros).toPromise()
  }


  TraerPedidosMesa(parametros: string) {
    return this.http.get(this.url + "/pedido/pedidosDeUnaComanda?" + parametros).toPromise()
  }


  CerrarMesa(parametros: string) {
    return this.http.get(this.url + "/mesa/estado?" + parametros).toPromise()
  }

  //======================Region Pedidos

  TraerTodosLosPedidos() {
    return this.http.get(this.url + "/pedido/listado").toPromise()
  }

  TraerPedidosPendientesSector(parametros: string) {
    return this.http.get(this.url + "/pedido/listadoPendientesSector?" + parametros).toPromise()
  }


  TomarPedido(parametros: string) {
    return this.http.get(this.url + "/pedido/tomarPedido?" + parametros).toPromise();
  }


  AgregarPedido(parametros: string) {

    return this.http.get(this.url + "/pedido/agregar?" + parametros).toPromise();
  }


  ModificarPedido(parametros: string) {

    return this.http.get(this.url + "/pedido/modificarCantidad?" + parametros).toPromise()
  }


  AltaComanda(datos: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post<string>(this.url + "/comanda/alta", datos, httpOptions)
      .pipe(
        // catchError(this.handleError())
      );

  }

  //======================Region Empleados


  // AltaProducto(datos: string): Observable<any> {

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     })
  //   };

  //   return this.http.post<string>(this.url + "/producto/cargar", datos, httpOptions)
  //     .pipe(
  //     );
  // }

  // modificaProducto(parametros: string) {
  //   return this.http.get(this.url + "/producto/modifica?" + parametros).toPromise()
  // }


  TraerEmpleados() {

    //  console.log("en listar empleados general")
    return this.http.get(this.url + "/empleados/listar").toPromise()

  }

  AltaEmpleado(parametros:string) {
  //  http://localhost:8080/Resto/API/empleados/alta?usuario=apellido1&nombre_completo=nombre1&id_rol=2&fecha_ingreso=2020-01-02&fecha_egreso=2020-02-02&clave=1234&sueldo=3
    //  console.log("en listar empleados general")
    return this.http.get(this.url + "/empleados/alta?"+parametros).toPromise()

  }


  BajaEmpleado(parametros:string) {
    //  http://localhost:8080/Resto/API/empleados/alta?usuario=apellido1&nombre_completo=nombre1&id_rol=2&fecha_ingreso=2020-01-02&fecha_egreso=2020-02-02&clave=1234&sueldo=3
      //  console.log("en listar empleados general")
      return this.http.get(this.url + "/empleados/borrar?"+parametros).toPromise()
  
    }
  //======================Region Productos


  AltaProducto(datos: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post<string>(this.url + "/producto/cargar", datos, httpOptions)
      .pipe(
      );
  }

  modificaProducto(parametros: string) {
    return this.http.get(this.url + "/producto/modifica?" + parametros).toPromise()
  }


  TraerProductos() {

    return this.http.get(this.url + "/producto/listado").toPromise()

  }


  //======================Region Captcha

  TraerCaptchas() {
    return this.http.get(this.url + "/login/captcha").toPromise()
  }

  EvaluarCaptcha(parametros: string) {

    return this.http.get(this.url + "/login/respuestas?" + parametros).toPromise()
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    // return throwError(
    //   'Something bad happened; please try again later.');
  };




  // AltaProducto(datos: string): Observable<any> {

  //   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  //   console.log(this.url + "/producto/cargar" + datos)
  //   return this.http.post(this.url + "/producto/cargar", datos, { headers: headers })
  //   // .pipe(
  //   //catchError(this.handleError(this.respuesta))
  //   // );

  // }



}
