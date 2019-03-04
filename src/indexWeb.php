<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once __DIR__ .'/../composer/vendor/autoload.php';

require_once './clases/AccesoDatos.php';
require_once './clases/producto.php';
require_once './clases/productoApi.php';
require_once './clases/empleado.php';
require_once './clases/empleadoApi.php';
require_once './clases/cliente.php';
require_once './clases/clienteApi.php';
require_once './clases/mesa.php';
require_once './clases/mesaApi.php';
require_once './clases/comanda.php';
require_once './clases/comandaApi.php';
require_once './clases/pedidoApi.php';
require_once './clases/pedido.php';
require_once './clases/encuestaApi.php';
require_once './clases/encuesta.php';
require_once './clases/informesApi.php';

require_once './clases/baseApi.php';

require_once './clases/AutentificadorMW.php';
require_once './clases/AutentificadorJWT.php';
require_once './clases/MWparaCORS.php';

date_default_timezone_set('America/Argentina/Buenos_Aires');

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);
   
$app->group('/loginWEB', function () {
   
    $this->get('/',\empleadoApi::class . ':TraerUnEmpleado');     
         
});

$app->group('/log', function () {
          
    $this->get('/',\baseApi::class . ':TraerArray'); 
    
    $this->get('/registro',\baseApi::class . ':CargarJugador'); 

    $this->get('/login',\baseApi::class . ':TraerUnJugador'); 

    $this->get('/listado',\baseApi::class . ':TraerJugadores'); 

    $this->get('/puntos',\baseApi::class . ':CargarPuntos'); 

	$this->get('/puntos/actualizar',\baseApi::class . ':ActualizarPuntos');

	$this->get('/puntaje',\baseApi::class . ':TraerPuntajeJugadores');  

         
})->add(\MWparaCORS::class . ':HabilitarCORSTodos');


$app->group('/login', function () {
   
    $this->post('/',\empleadoApi::class . ':TraerUnEmpleado');     
         
})->add(\MWparaCORS::class . ':HabilitarCORS4200');

//->add(\AutentificadorMW::class . ':VerificarLogueo')->add(\MWparaCORS::class . ':HabilitarCORS4200');


//===========Se verificaron todos los métodos usados
$app->group('/comanda', function () {
     
    /**Alta comanda  * @param    id_mesa, id_cliente, pedidos, cantidades */

    #used
   $this->post('/alta',\comandaApi::class . ':CargarComanda'); 

     /**consulta comanda  * @param    id_comanda */
   $this->post('/consulta',\comandaApi::class . ':TraerUnaComanda');

   /**Listar comandas  * @param   token */ 
   $this->put('/listado',\comandaApi::class . ':TraerComandas'); 

   /**Modifica estado y mozo comanda  * @param    id_comanda id_empleado id_estado_pedido */
   $this->get('/modificar',\comandaApi::class . ':ModificarComanda'); 

    /**Borrar */
   $this->delete('/borrar/{id}',\comandaApi::class . ':BorrarComanda');


   $this->get('/cerrar',\pedidoApi::class . ':TraerPedidosComanda');
            
   
});
//->add(\AutentificadorMW::class . ':VerificarAccesoUnico')->add(\MWparaCORS::class . ':HabilitarCORSTodos');


$app->group('/pedido', function () {        
   
      $this->post('/modificaCantidad/{cantidad}',\pedidoApi::class . ':ModificaCantidadPedido');
  
      $this->get('/listadoPendientes',\pedidoApi::class . ':TraerPendientes'); 

      $this->get('/listado',\pedidoApi::class . ':TraerPedidos'); 
      
      $this->get('/pedidosmozo',\pedidoApi::class . ':PedidosPorMozo'); 
 
      $this->get('/listadoPendientesSector',\pedidoApi::class . ':TraerTodosLosPendientesSector');
  
      $this->get('/tomarPedido',\pedidoApi::class . ':TomarUnPedido'); 
 
      $this->get('/finalizarPedido',\pedidoApi::class . ':FinalizarUnPedido'); 

      $this->delete('/borrar',\pedidoApi::class . ':BorrarUnPedido');
      
      $this->get('/pedidoComanda',\pedidoApi::class . ':TraerPedidosComanda'); 

      $this->get('/pedidosDeUnaComanda',\pedidoApi::class . ':TraerPedidosDeComanda');

      $this->get('/agregar',\pedidoApi::class . ':AgregarPedidoAComanda');      

   
              
  });
  //->add(\AutentificadorMW::class . ':VerificarAccesoUnico')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  

$app->group('/empleados', function () {   
       
    $this->post('/traerUno',\empleadoApi::class . ':TraerUnEmpleadoId'); 
   
    $this->get('/alta',\empleadoApi::class . ':CargarEmpleado');   
    
    $this->put('/listar',\empleadoApi::class . ':TraerEmpleados'); 

    $this->get('/listar/Excel',\empleadoApi::class . ':TraerDatosParaExportarExcel');
    
    $this->put('/desactivar',\empleadoApi::class . ':DesactivarUnEmpleado');

    $this->put('/activar',\empleadoApi::class . ':ActivarUnEmpleado');
    
    $this->get('/modificar',\empleadoApi::class . ':ModificarEmpleado'); 
    
    $this->delete('/borrar',\empleadoApi::class . ':BorrarEmpleado');//->add(\MWparaCORS::class . ':HabilitarCORSTodos'); 
     
         
});
//->add(\AutentificadorMW::class . ':VerificarAccesoUnico')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->group('/AccesoClientes', function () {
    
    $this->post('/encuesta',\encuestaApi::class . ':CargarEncuesta');   
   
    $this->get('/',\pedidoApi::class . ':TraerTiempoFaltante');
        
});

$app->group('/informes', function () {

    $this->post('/logueos',\informesApi::class . ':InformesLogueos');
    
    $this->post('/productos/cantidades',\informesApi::class . ':TraerProductosCantidades');

    $this->post('/ListadoPedidos',\pedidoApi::class . ':TraerPedidos');

    $this->post('/operaciones/sector',\informesApi::class . ':TareasSector'); 
    
    $this->post('/operaciones/empleado',\informesApi::class . ':TransaccionesEmpleado'); 

    $this->post('/operaciones/empleado/sector',\informesApi::class . ':TransaccionesEmpleadoSector');
    
    $this->post('/pedidos',\informesApi::class . ':PedidoMasVendido'); 
    
    $this->post('/pedidos/borrados',\informesApi::class . ':TraerPedidosEliminados'); 
  
    $this->post('/mesas/uso/mayor',\comandaApi::class . ':MesaMayorOcupacion');
     
    $this->post('/mesas/uso/menor',\comandaApi::class . ':MesaMenorOcupacion');
    
    $this->post('/mesas/facturacion/mayor',\comandaApi::class . ':MesaMayorFacturacion');

    $this->post('/mesas/facturacion/menor',\comandaApi::class . ':MesaMenorFacturacion');

    $this->post('/mesas/facturacion/mejor',\comandaApi::class . ':MesaFacturacionMasAlta');

    $this->post('/mesas/facturacion/peor',\comandaApi::class . ':MesaFacturacionMasBaja');

    $this->post('/mesas/facturacion/fecha',\comandaApi::class . ':MesaFacturacionFecha');

    $this->post('/pedidos/demorados',\pedidoApi::class . ':PedidosDemorados');

    $this->post('/encuestas/mejor',\informesApi::class . ':MejorNota');

    $this->post('/encuestas/peor',\informesApi::class . ':PeorNota');    
 
        
});
//->add(\AutentificadorMW::class . ':VerificarAccesoInformes')->add(\MWparaCORS::class . ':HabilitarCORSTodos');


//===========Se verificaron todos los métodos usados
$app->group('/producto', function () {
   
    $this->post('/cargar',\productoApi::class . ':CargarProducto');     

    $this->get('/listado',\productoApi::class . ':TraerProductos'); 

    $this->get('/consulta',\productoApi::class . ':TraerUnProducto'); 

    $this->put('/modifica',\productoApi::class . ':ModificarProducto'); 

    $this->delete('/borra', \productoApi::class . ':BorrarProducto'); 
    
            
})->add(\MWparaCORS::class . ':HabilitarCORSTodos');


$app->group('/cliente', function () {   

    $this->post('/alta',\clienteApi::class . ':CargarElemento'); 

    $this->post('/login',\clienteApi::class . ':TraerUnElemento');

    $this->get('/listado',\clienteApi::class . ':TraerElementos'); 

    $this->put('/modificar',\clienteApi::class . ':ModificarElemento'); 

    $this->delete('/borrar/{id}',\clienteApi::class . ':BorrarElemento')->add(\MWparaCORS::class . ':HabilitarCORSTodos'); 
        
        
});

$app->group('/mesa', function () {

        $this->post('/alta',\mesaApi::class . ':CargarMesa'); 

        $this->post('/consulta',\mesaApi::class . ':TraerMesa');
        
        $this->put('/estado',\mesaApi::class . ':ModificarEstadoMesa');

        $this->get('/listado',\mesaApi::class . ':TraerMesas'); 

        $this->get('/modificar',\mesaApi::class . ':ModificarMesa'); 

        $this->delete('/borrar/{id_mesa}',\mesaApi::class . ':BorraMesa')->add(\MWparaCORS::class . ':HabilitarCORSTodos'); 

        
});
//->add(\AutentificadorMW::class . ':VerificarAccesoUnico')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
//localhost/resto/API/crearToken/?id_empleado=2&nombre_completo=Juan Gritz&id_rol=2&clave=1234

 

$app->run();