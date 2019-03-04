export class Producto {
    public id_producto: number;
    public nombre_producto: string;
    public descripcion: string;
    public id_cocina: number;
    public precio: number;
    public cantidad: number = 0;
    public imagen:string;

    constructor() { }

    public existeEnLaLista(listadoProductos: Producto[], producto: Producto): boolean {
        listadoProductos.forEach(element => {

            if (element.id_producto == producto.id_producto) {
                return true;
            }

        });

        return false;
    }

    public static ListaActualizada(listaCompleta: Producto[], listadoProductos: any[]): Producto[] {
       
        //evaluo si está en la lista completa le zeteo la cantidad 
        for (let i = 0; i < listaCompleta.length; i++) {
       
            for (let j = 0; j < listadoProductos.length; j++) {            
              
                if (listaCompleta[i].id_producto == listadoProductos[j].id_producto) {
                    listaCompleta[i].cantidad = listadoProductos[j].cantidad_producto;
                   // console.log(listaCompleta[i].nombre_producto + "cantidad: "+ listadoProductos[j].cantidad);
                }
            }
        }

        return listaCompleta;
    }

    public static EstaEnOriginal(listaModificada: Producto[], listaOrignal: any[]): boolean
    {
        //evaluo si está en la lista completa le zeteo la cantidad 
        for (let i = 0; i < listaModificada.length; i++) {
       
            for (let j = 0; j < listaOrignal.length; j++) {
              
                if (listaModificada[i].nombre_producto == listaOrignal[j].nombre_producto) {
                    return true;
                   // console.log(listaCompleta[i].nombre_producto + "cantidad: "+ listadoProductos[j].cantidad);
                }
            }
        }
        return false;
    }


    public static fueModificado(producto: Producto, listaOrignal: any[]): boolean
    {
        //evaluo si está en la lista completa le zeteo la cantidad 
        for (let i = 0; i < listaOrignal.length; i++)
        {                            
            if(producto.nombre_producto == listaOrignal[i].nombre_producto)
            {
                if(producto.cantidad != listaOrignal[i].cantidad_producto)
                {                    
                    return true;
                }
                else
                {
                    return false;
                }
            }                      
        }
        return false;
    }


    public static FueAgregado(producto: Producto, listaOrignal: any[]): boolean
    {
        console.log(listaOrignal);
        //evaluo si está en la lista completa le zeteo la cantidad 
        for (let i = 0; i < listaOrignal.length; i++)
        {                            
            if(producto.nombre_producto == listaOrignal[i].nombre_producto)
            {
                return false;
            }          
            
        }
        return true;
    }

}
