import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Crud } from './crud';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //variable de conexión a la base de datos

  public database!: SQLiteObject;

  //variable creacion tablas/categoria
  tablecategoria: string = "CREATE TABLE if not exits categoria (id_categoria INTEGER(12) PRIMARY KEY, nombre_ca VARCHAR(12);)";

  //variable creacion tablas/detalle
  tabladetalle: string = "CREATE TABLE if not exits detalle (id_detalle INTEGER(12), cantidad_d INTEGER(9), total_d INTEGER(9);)";

  //variable creacion tablas/venta
  tablaventa: string = "CREATE TABLE if not exits venta (id_venta INTEGER(12) PRIMARY KEY, fec_venta DATE(12), carrito_v VARCHAR(9), total_v INTEGER(12);)";

  //variable creacion tablas/rol
  tablarol: string = "CREATE TABLE if not exits rol (id_rol INTEGER(12) PRIMARY KEY, nombre_r VARCHAR(9);)";

  //variable creacion tablas/comuna
  tablacomuna: string = "CREATE TABLE if not exits comuna (id_comuna INTEGER(12) PRIMARY KEY, nombre_c VARCHAR(9);)";

  //variables de creación de Tablas/producto
  tablaproducto: string = "CREATE TABLE if not exits producto (id_producto INTEGER(12) autoincrement PRIMARY KEY, nombre_p VARCHAR(12), precio_p INTEGER (9), stock INTEGER (9), descripcion VARCHAR(30), foto_p VARCHAR(9);)";

  //variables de creación de Tablas/usuario
  tablausuario: string = "CREATE TABLE if not exits usuario (id_usuario INTEGER(12) autoincrement PRIMARY KEY, correo_u VARCHAR(20), clave_u INTEGER (9), rut_u INTEGER (9), fecha_nac DATE(12), foto_u VARCHAR(20), token INTEGER(20);)";

  //variables de creación de Tablas/direccion
  tabladireccion: string = "CREATE TABLE if not exits direccion (id_direccion INTEGER(20) PRIMARY KEY, calle_di VARCHAR(15), numero_di INTEGER(8);)";

  //variables para los insert por defecto en nuestras tablas
  tablacrud: string = "INSERT or IGNORE INTO crud (id_producto, nombre_p, precio_p, stock, descripcion, foto_p) VALUES (1, ' Re:Zero ', 10500, 10, ' Historia de un tipo que revive y que pasa', '')";

  //variables para guardar los datos de las consultas en las tablas
  listadoProducto = new BehaviorSubject([]);

  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {}

  async presentAlert(titulo: string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //metodos para manipular los observables
  fetchCrud(): Observable<Crud[]>{
    return this.listadoProducto.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }

  //función para crear la Base de Datos
  createBD(){
    //varificar si la plataforma esta disponible
    this.platform.ready().then(()=>{
      //crear la Base de Datos
      this.sqlite.create({
        name: 'crud.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        //capturar la conexion a la BD
        this.database = db;
        //llamamos a la función para crear las tablas
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      })
    })
  }

  async crearTablas(){
    try{
      //ejecuto la creación de Tablas
      await this.database.executeSql(this.tablaproducto, []);

      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.tablacrud, []);

      this.seleccionarProducto();

      //modifico el estado de la Base de Datos
      this.isDBReady.next(true);

    }catch(e){
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

  seleccionarProducto(){
    return this.database.executeSql('SELECT * FROM Crud', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Crud[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            id_producto: res.rows.item(i).id_producto,
            nombre_p: res.rows.item(i).nombre_p,
            precio_p: res.rows.item(i).precio_p,
            stock: res.rows.item(i).stock,
            descripcion: res.rows.item(i).descripcion,
            foto_p: res.rows.item(i).foto_p,
          })
        }
        
       }
       //actualizar el observable
       this.listadoProducto.next(items as any);

    })
  }

  eliminarProducto(id:string){
    return this.database.executeSql('DELETE FROM crud WHERE id_producto = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Producto Eliminado");
      this.seleccionarProducto();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  modificarProducto(id:string, nombre:string, precio: string, stock: string, descripcion: string, foto: string){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE crud SET nombre_p = ?, precio_p = ?, stock = ?, descripcion = ?, foto_p = ? WHERE id_producto = ?',[foto,descripcion,stock,precio,nombre,id]).then(res=>{
      this.presentAlert("Modificar","Producto Modificado");
      this.seleccionarProducto();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }


  insertarProducto(id:string, nombre:string, precio: string, stock: string, descripcion: string, foto: string){
    return this.database.executeSql('INSERT INTO crud(id,nombre,precio,stock,descripcion,foto) VALUES (?,?,?,?,?,?)',[id,nombre,precio,stock,descripcion,foto]).then(res=>{
      this.presentAlert("Insertar","Noticia Registrada");
      this.seleccionarProducto();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  
}


