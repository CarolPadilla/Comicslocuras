import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Crud } from './crud';
import { Usuario } from './usuario';
import { Venta } from './venta';
import { Categoria } from './categoria';
import { Comuna } from './comuna';
import { Rol } from './rol';
import { Direccion } from './direccion';
import { Detalle } from './detalle';


/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//STORAGESERVICE
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //variable de conexión a la base de datos

  public database!: SQLiteObject;

  //variable creacion tablas
  tablaCategoria: string = "CREATE TABLE if not exits categoria (id_categoria INTEGER(12) PRIMARY KEY, nombre_ca VARCHAR(12);)";
  tablaDetalle: string = "CREATE TABLE if not exits detalle (id_detalle INTEGER(12), cantidad_d INTEGER(9), total_d INTEGER(9);)";
  tablaVenta: string = "CREATE TABLE if not exits venta (id_venta INTEGER(12) PRIMARY KEY, fec_venta DATE(12), carrito_v VARCHAR(9), total_v INTEGER(12);)";
  tablaRol: string = "CREATE TABLE if not exits rol (id_rol INTEGER(12) PRIMARY KEY, nombre_r VARCHAR(9);)";
  tablaComuna: string = "CREATE TABLE if not exits comuna (id_comuna INTEGER(12) PRIMARY KEY, nombre_c VARCHAR(9);)";
  tablaCrud: string = "CREATE TABLE if not exits crud (id_producto INTEGER(12) autoincrement PRIMARY KEY, nombre_p VARCHAR(12), precio_p INTEGER (9), stock INTEGER (9), descripcion VARCHAR(30), foto_p VARCHAR(9);)";
  tablaUsuario: string = "CREATE TABLE if not exits usuario (id_usuario INTEGER(12) autoincrement PRIMARY KEY, correo_u VARCHAR(20), clave_u INTEGER (9), rut_u INTEGER (9), fecha_nac DATE(12), foto_u VARCHAR(20), token INTEGER(20);)";
  tablaDireccion: string = "CREATE TABLE if not exits direccion (id_direccion INTEGER(20) PRIMARY KEY, calle_di VARCHAR(15), numero_di INTEGER(8);)";

  //variables para los insert por defecto en nuestras tablas
  registroCrud: string = "INSERT or IGNORE INTO crud (id_producto, nombre_p, precio_p, stock, descripcion, foto_p) VALUES (1, 'producto 1', 10500, 10, 'historia de un tipo que revive y que pasa', '')";
  registroUsuario: string = "INSERT or IGNORE INTO usuario (id_usuario, correo_u, clave_u, rut_u, fecha_nac, foto_u, token) VALUES (1, 'hector@gmail.com', 123456, 123456789, '2020-01-01', 'https://avatars0.githubusercontent.com/u/329917?s=460&u=e1a8c4e8d4c0c7a9a2e5b2b7c9c8b9d0&v=4', 123456)";
  registroDireccion: string = "INSERT or IGNORE INTO direccion (id_direccion, calle_di, numero_di) VALUES (1, 'calle 1', 1)";
  registroComuna: string = "INSERT or IGNORE INTO comuna (id_comuna, nombre_c) VALUES (1, 'comuna 1')";
  registroRol: string = "INSERT or IGNORE INTO rol (id_rol, nombre_r) VALUES (1, 'rol 1')";
  registroVenta: string = "INSERT or IGNORE INTO venta (id_venta, fec_venta, carrito_v, total_v) VALUES (1, '2020-01-01', 'carrito 1', 100)";
  registroDetalle: string = "INSERT or IGNORE INTO detalle (id_detalle, cantidad_d, total_d) VALUES (1, 1, 100)";
  registroCategoria: string = "INSERT or IGNORE INTO categoria (id_categoria, nombre_ca) VALUES (1, 'categoria 1')";

  //variables para guardar los datos de las consultas en las tablas
  listadoCrud = new BehaviorSubject([]);
  listadoUsuario = new BehaviorSubject([]);
  listadoVenta = new BehaviorSubject([]);
  listadoCategoria = new BehaviorSubject([]);
  listadoComuna = new BehaviorSubject([]);
  listadoRol = new BehaviorSubject([]);
  listadoDireccion = new BehaviorSubject([]);
  listadoDetalle = new BehaviorSubject([]);
  
  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isDBReadyUsuario: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isDBReadyVenta: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isDBReadyCategoria: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isDBReadyComuna: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isDBReadyRol: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isDBReadyDireccion: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isDBReadyDetalle: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.createBD() /*creacion de la base de datos*/
    this.createBDUsuario(); /*creacion de la base de datos*/
    this.createBDVenta(); /*creacion de la base de datos*/
    this.createBDCategoria(); /*creacion de la base de datos*/
    this.createBDComuna(); /*creacion de la base de datos*/
    this.createBDRol(); /*creacion de la base de datos*/
    this.createBDDireccion(); /*creacion de la base de datos*/    
    this.createBDDetalle(); /*creacion de la base de datos*/

  }
  
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
    return this.listadoCrud.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]>{
    return this.listadoUsuario.asObservable();
  }

  fetchVenta(): Observable<Venta[]>{
    return this.listadoVenta.asObservable();
  }

  fetchCategoria(): Observable<Categoria[]>{
    return this.listadoCategoria.asObservable();
  }

  fetchComuna(): Observable<Comuna[]>{
    return this.listadoComuna.asObservable();
  }

  fetchRol(): Observable<Rol[]>{
    return this.listadoRol.asObservable();
  }

  fetchDireccion(): Observable<Direccion[]>{
    return this.listadoDireccion.asObservable();
  }

  fetchDetalle(): Observable<Detalle[]>{
    return this.listadoDetalle.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }


  //función para crear la Base de Datos CRUD
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


///////////////////////USUARIO
  createBDUsuario(){
    this.sqlite.create({
      name: 'usuario.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      this.database = db;
      this.crearTablas();
    }).catch(e=>{
      this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
    })
  }

  
///////////////////////VENTA
  createBDVenta(){
    this.sqlite.create({
      name: 'venta.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      this.database = db;
      this.crearTablas();
    }).catch(e=>{
      this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
    })
  }

    
///////////////////////CATEGORIA
  createBDCategoria(){
    this.sqlite.create({
      name: 'categoria.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      this.database = db;
      this.crearTablas();
    }).catch(e=>{
      this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
    })
  }

  
///////////////////////COMUNA
  createBDComuna(){
    this.sqlite.create({
      name: 'comuna.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      this.database = db;
      this.crearTablas();
    }).catch(e=>{
      this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
    })
  }

  
///////////////////////ROL
  createBDRol(){
    this.sqlite.create({
      name: 'rol.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      this.database = db;
      this.crearTablas();
    }).catch(e=>{
      this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
    })
  }

  
///////////////////////DIRECCION
  createBDDireccion(){
    this.sqlite.create({
      name: 'direccion.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      this.database = db;
      this.crearTablas();
    }).catch(e=>{
      this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
    })
  }

  
///////////////////////DETALLE
  createBDDetalle(){
    this.sqlite.create({
      name: 'detalle.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      this.database = db;
      this.crearTablas();
    }).catch(e=>{
      this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
    })
  }


  async crearTablas(){
    try{
      //ejecuto la creación de Tablas
      await this.database.executeSql(this.tablaCrud, []);

      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.tablaCrud, []);

      this.seleccionarCrud();

      //modifico el estado de la Base de Datos
      this.isDBReady.next(true);

    }catch(e){
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

  /*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  //CRUD
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  seleccionarCrud(){
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
       this.listadoCrud.next(items as any);

    })
  }

  eliminarCrud(id:string){
    return this.database.executeSql('DELETE FROM crud WHERE id_producto = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Producto Eliminado");
      this.seleccionarCrud();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  modificarCrud(id:string, nombre:string, precio: string, stock: string, descripcion: string, foto: string){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE crud SET nombre_p = ?, precio_p = ?, stock = ?, descripcion = ?, foto_p = ? WHERE id_producto = ?',[foto,descripcion,stock,precio,nombre,id]).then(res=>{
      this.presentAlert("Modificar","Producto Modificado");
      this.seleccionarCrud();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }

  insertarCrud(id:string, nombre:string, precio: string, stock: string, descripcion: string, foto: string){
    return this.database.executeSql('INSERT INTO crud(id,nombre,precio,stock,descripcion,foto) VALUES (?,?,?,?,?,?)',[id,nombre,precio,stock,descripcion,foto]).then(res=>{
      this.presentAlert("Insertar","Noticia Registrada");
      this.seleccionarCrud();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }


  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  //USUARIO
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  seleccionarUsuario(id:string){
    return this.database.executeSql('SELECT * FROM Usuario WHERE id_usuario = ?',[id]).then(res=>{      
      //valido si trae al menos un registro
      if(res.rows.length > 0){
        //agrego los registros a mi lista
        let items: Usuario = new Usuario();
        items.id_usuario = res.rows.item(0).id_usuario;
        items.correo_u = res.rows.item(0).correo_u;
        items.clave_u = res.rows.item(0).clave_u;
        items.nombre_u = res.rows.item(0).nombre_u;
        items.rut_u = res.rows.item(0).rut_u;
        items.fecha_nac = res.rows.item(0).fecha_nac;
        items.id_rol = res.rows.item(0).id_rol;
        items.foto_u = res.rows.item(0).foto_u;
        items.token = res.rows.item(0).token;
        //actualizar el observable
        this.listadoUsuario.next(items as any);
      }
      
    })
  }
  

  eliminarUsuario(id:string){
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Usuario Eliminado");
      this.seleccionarUsuario(id);
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }



  modificarUsuario(id:string, correo:string, clave: string, rut: string, fecha: string, foto: string, token: string, rol: string){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE usuario SET correo_u = ?, clave_u = ?, rut_u = ?, fecha_nac = ?, foto_u = ?, token = ?, id_rol = ? WHERE id_usuario = ?',[correo,clave,rut,fecha,foto,token,rol,id]).then(res=>{
      this.presentAlert("Modificar","Usuario Modificado");      
      this.seleccionarUsuario(id);
    }).catch(e=>{      
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));      
    })    
  }
  

  insertarUsuario(id:string, correo:string, clave: string, rut: string, fecha: string, foto: string, token: string){
    return this.database.executeSql('INSERT INTO usuario(id_usuario, correo_u, clave_u, rut_u, fecha_nac, foto_u, token) VALUES (?,?,?,?,?,?,?)',[id,correo,clave,rut,fecha,foto,token]).then(res=>{
      this.presentAlert("Insertar","Usuario Registrado");
      this.seleccionarUsuario(id);
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }


  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  //VENTA
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  seleccionarVenta(){
    return this.database.executeSql('SELECT * FROM Venta', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Venta[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            id_venta: res.rows.item(i).id_venta,
            fec_venta: res.rows.item(i).fec_venta,
            carrito_v: res.rows.item(i).carrito_v,
            total_v: res.rows.item(i).total_v,
          })
        }
        
       }
       //actualizar el observable
       this.listadoVenta.next(items as any);

    })
  }


  eliminarVenta(id:string){
    return this.database.executeSql('DELETE FROM venta WHERE id_venta = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Venta Eliminado");
      this.seleccionarVenta();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }


  modificarVenta(id:string, fecha: string, carrito: string, total: string){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE venta SET fec_venta = ?, carrito_v = ?, total_v = ? WHERE id_venta = ?',[fecha,carrito,total,id]).then(res=>{
      this.presentAlert("Modificar","Venta Modificado");
      this.seleccionarVenta();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }


  insertarVenta(id:string, fecha: string, carrito: string, total: string){
    return this.database.executeSql('INSERT INTO venta(id,fec_venta,carrito_v,total_v) VALUES (?,?,?,?)',[id,fecha,carrito,total]).then(res=>{
      this.presentAlert("Insertar","Venta Registrada");
      this.seleccionarVenta();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }


  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  //CATEGORIA
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  seleccionarCategoria(){
    return this.database.executeSql('SELECT * FROM Categoria', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Categoria[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            id_categoria: res.rows.item(i).id_categoria,
            nombre_ca: res.rows.item(i).nombre_ca,
          })
        }
        
       }
       //actualizar el observable
       this.listadoCategoria.next(items as any);

    })
  }


  eliminarCategoria(id:string){
    return this.database.executeSql('DELETE FROM categoria WHERE id_categoria = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Categoria Eliminado");
      this.seleccionarCategoria();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }


  modificarCategoria(id:string, nombre: string){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE categoria SET nombre_ca = ? WHERE id_categoria = ?',[nombre,id]).then(res=>{
      this.presentAlert("Modificar","Categoria Modificado");
      this.seleccionarCategoria();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }


  insertarCategoria(id:string, nombre: string){
    return this.database.executeSql('INSERT INTO categoria(id,nombre_ca) VALUES (?,?)',[id,nombre]).then(res=>{
      this.presentAlert("Insertar","Categoria Registrada");
      this.seleccionarCategoria();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }


  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  //COMUNA
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  seleccionarComuna(){
    return this.database.executeSql('SELECT * FROM Comuna', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Comuna[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            id_comuna: res.rows.item(i).id_comuna,
            nombre_c: res.rows.item(i).nombre_c,
          })
        }
        
       }
       //actualizar el observable
       this.listadoComuna.next(items as any);

    })
  }


  eliminarComuna(id:string){
    return this.database.executeSql('DELETE FROM comuna WHERE id_comuna = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Comuna Eliminado");
      this.seleccionarComuna();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }


  modificarComuna(id:string, nombre: string){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE comuna SET nombre_c = ? WHERE id_comuna = ?',[nombre,id]).then(res=>{
      this.presentAlert("Modificar","Comuna Modificado");
      this.seleccionarComuna();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }


  insertarComuna(id:string, nombre: string){
    return this.database.executeSql('INSERT INTO comuna(id,nombre_c) VALUES (?,?)',[id,nombre]).then(res=>{
      this.presentAlert("Insertar","Comuna Registrada");
      this.seleccionarComuna();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }


  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  //ROL
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  
  seleccionarRol(){
    return this.database.executeSql('SELECT * FROM Rol', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Rol[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            id_rol: res.rows.item(i).id_rol,
            nombre_r: res.rows.item(i).nombre_r,
          })
        }
        
       }
       //actualizar el observable
       this.listadoRol.next(items as any);

    })
  }


  eliminarRol(id:string){
    return this.database.executeSql('DELETE FROM rol WHERE id_rol = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Rol Eliminado");
      this.seleccionarRol();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }


  modificarRol(id:string, nombre: string){
    this.presentAlert("service","ID: " + id);        
    return this.database.executeSql('UPDATE rol SET nombre_r = ? WHERE id_rol = ?',[nombre,id]).then(res=>{
      this.presentAlert("Modificar","Rol Modificado");
      this.seleccionarRol();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }


  insertarRol(id:string, nombre: string){
    return this.database.executeSql('INSERT INTO rol(id,nombre_r) VALUES (?,?)',[id,nombre]).then(res=>{
      this.presentAlert("Insertar","Rol Registrado");
      this.seleccionarRol();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }


  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  //DIRECCION
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  seleccionarDireccion(){
    return this.database.executeSql('SELECT * FROM Direccion', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Direccion[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            id_direccion: res.rows.item(i).id_direccion,
            calle_di: res.rows.item(i).calle_di,
            numero_di: res.rows.item(i).numero_di,
          })
        }
        
       }
       //actualizar el observable
       this.listadoDireccion.next(items as any);

    })
  }


  eliminarDireccion(id:string){
    return this.database.executeSql('DELETE FROM direccion WHERE id_direccion = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Direccion Eliminado");
      this.seleccionarDireccion();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }


  modificarDireccion(id:string, calle: string, numero: string){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE direccion SET calle_di = ?, numero_di = ? WHERE id_direccion = ?',[calle,numero,id]).then(res=>{
      this.presentAlert("Modificar","Direccion Modificado");
      this.seleccionarDireccion();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }


  insertarDireccion(id:string, calle: string, numero: string){
    return this.database.executeSql('INSERT INTO direccion(id,calle_di,numero_di) VALUES (?,?,?)',[id,calle,numero]).then(res=>{
      this.presentAlert("Insertar","Direccion Registrada");
      this.seleccionarDireccion();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }


  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  //DETALLE
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  seleccionarDetalle(){
    return this.database.executeSql('SELECT * FROM Detalle', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Detalle[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            id_detalle: res.rows.item(i).id_detalle,
            cantidad_d: res.rows.item(i).cantidad_d,
            total_d: res.rows.item(i).total_d,
          })
        }
        
       }
       //actualizar el observable
       this.listadoDetalle.next(items as any);

    })
  }


  eliminarDetalle(id:string){
    return this.database.executeSql('DELETE FROM detalle WHERE id_detalle = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Detalle Eliminado");
      this.seleccionarDetalle();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }


  modificarDetalle(id:string, cantidad: string, total: string){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE detalle SET cantidad_d = ?, total_d = ? WHERE id_detalle = ?',[cantidad,total,id]).then(res=>{
      this.presentAlert("Modificar","Detalle Modificado");
      this.seleccionarDetalle();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }

  
  insertarDetalle(id:string, cantidad: string, total: string){
    return this.database.executeSql('INSERT INTO detalle(id,cantidad_d,total_d) VALUES (?,?,?)',[id,cantidad,total]).then(res=>{
      this.presentAlert("Insertar","Detalle Registrado");
      this.seleccionarDetalle();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  } 
}

