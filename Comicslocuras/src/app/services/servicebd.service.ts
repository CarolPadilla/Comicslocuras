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


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //variable de conexión a la base de datos

  public database!: SQLiteObject;

  /// Variable creación tablas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY, nombre_r VARCHAR(9));";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (nombre_u varchar(250),id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, correo_u VARCHAR(250), clave_u VARCHAR(250), rut_u  VARCHAR(20), fecha_nac VARCHAR(20), foto_u BLOB , token Number, id_rol INTEGER,FOREIGN KEY(id_rol) REFERENCES categoria(id_rol));";
  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna (id_comuna INTEGER PRIMARY KEY, nombre_c VARCHAR(9));";
  tablaDireccion: string = "CREATE TABLE IF NOT EXISTS direccion (id_direccion INTEGER PRIMARY KEY, calle_di VARCHAR(15), numero_di INTEGER,id_comuna INTEGER, id_usuario INTEGER, FOREIGN KEY(id_comuna) REFERENCES comuna(id_comuna), FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario));";
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria (id_categoria INTEGER PRIMARY KEY, nombre_ca VARCHAR(12));";
  tablaCrud: string = "CREATE TABLE IF NOT EXISTS crud(idcrud INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, descripcion VARCHAR(250) NOT NULL, imagen BLOB, precio INTEGER NOT NULL, idCategoria INTEGER NOT NULL, FOREIGN KEY(idCategoria) REFERENCES categoria(id_categoria));";
  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta (id_venta INTEGER PRIMARY KEY, fec_venta DATE, carrito_v INTEGER, total_v INTEGER, id_usuario INTEGER, id_direccion INTEGER, FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY(id_direccion) REFERENCES direccion(id_direccion));";
  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle (id_detalle INTEGER PRIMARY KEY, cantidad_d INTEGER, total_d INTEGER, id_venta INTEGER,id_crud INTEGER, FOREIGN KEY(id_venta) REFERENCES venta(id_venta), FOREIGN KEY(id_crud) REFERENCES crud(idcrud));";
  
  

  

  
  
  
  
  
  
  // Variables para los insert por defecto en nuestras tablas
  
  registroComuna: string = "INSERT OR IGNORE INTO comuna (id_comuna, nombre_c) VALUES (1, 'Huechuraba')";
  registroComuna2: string = "INSERT OR IGNORE INTO comuna (id_comuna, nombre_c) VALUES (2, 'Lo Espejo')";
  registroRol: string = "INSERT OR IGNORE INTO rol (id_rol, nombre_r) VALUES (1, 'Cliente')";
  registroRol2: string = "INSERT OR IGNORE INTO rol (id_rol, nombre_r) VALUES (2, 'Administrador')";
  
  registroCategoria: string = "INSERT OR IGNORE INTO categoria (id_categoria, nombre_ca) VALUES (1, 'Comics')";
  registroCategoria2: string = "INSERT OR IGNORE INTO categoria (id_categoria, nombre_ca) VALUES (2, 'Mangas')";
  registroCategoria3: string = "INSERT OR IGNORE INTO categoria (id_categoria, nombre_ca) VALUES (3, 'Accesorios')";
  registroCategoria4: string = "INSERT OR IGNORE INTO categoria (id_categoria, nombre_ca) VALUES (4, 'Peluches')";
  registroCategoria5: string = "INSERT OR IGNORE INTO categoria (id_categoria, nombre_ca) VALUES (5, 'Funkopop')";
  
  resgistroAdmin: string = "INSERT OR IGNORE INTO usuario (nombre_u, correo_u, clave_u, rut_u, fecha_nac, foto_u, token, id_rol) VALUES ('Admin', 'admin@gmail.com', '123456', '1111111111', '2000-01-01', null, null, 2)";
  //variables para guardar los datos de las consultas en las tablas
  listadoCrud = new BehaviorSubject<Crud[]>([]);/*con esto no se necesita hacer registro insert de arriba */

  listadoUsuario = new BehaviorSubject<Usuario[]>([]);

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
  fetchcrud(): Observable<Crud[]> {
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
  createBD() {
    // Verificar si la plataforma está disponible
    this.platform.ready().then(() => {
      // Crear la Base de Datos
      this.sqlite.create({
        name: 'tienda.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        // Capturar la conexión a la BD
        this.database = db;
        // Llamamos a la función para crear las tablas
        this.crearTablas();
        this.isDBReady.next(true);
      }).catch(e => {
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      });
    });
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaComuna, []);
      await this.database.executeSql(this.tablaDireccion, []);
      await this.database.executeSql(this.tablaCategoria, []);
      await this.database.executeSql(this.tablaCrud, []);
      await this.database.executeSql(this.tablaVenta, []);
      await this.database.executeSql(this.tablaDetalle, []);
      
      //insertr por defecto
      await this.database.executeSql(this.registroComuna, []);
      await this.database.executeSql(this.registroComuna2, []);
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroRol2, []);
      await this.database.executeSql(this.registroCategoria, []);
      await this.database.executeSql(this.registroCategoria2, []);
      await this.database.executeSql(this.registroCategoria3, []);
      await this.database.executeSql(this.registroCategoria4, []);
      await this.database.executeSql(this.registroCategoria5, []);
      await this.database.executeSql(this.resgistroAdmin, []);
    } catch (e) {
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

  seleccionarCrud() {
    return this.database.executeSql('SELECT * FROM crud', []).then(res => {
      let items: Crud[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idcrud: res.rows.item(i).idcrud,
            nombre: res.rows.item(i).nombre,
            descripcion: res.rows.item(i).descripcion,
            imagen: res.rows.item(i).imagen,
            precio: res.rows.item(i).precio,
            idcategoria: res.rows.item(i).idCategoria 
          });
        }
      }
      this.listadoCrud.next(items);
    });
  }

  seleccionarCrudCat(id:any) {
    return this.database.executeSql('SELECT * FROM crud WHERE idcategoria = ?', [id]).then(res => {
      let items: Crud[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idcrud: res.rows.item(i).idcrud,
            nombre: res.rows.item(i).nombre,
            descripcion: res.rows.item(i).descripcion,
            imagen: res.rows.item(i).imagen,
            precio: res.rows.item(i).precio,
            idcategoria: res.rows.item(i).idCategoria 
          });
        }
      }
      this.listadoCrud.next(items);
    });
  }

  eliminarCrud(id: string) {
    return this.database.executeSql('DELETE FROM crud WHERE idcrud = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Producto Eliminado");
      this.seleccionarCrud();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }

  modificarCrud(id: string, nombre: string, descripcion: string, imagen: any, precio: number, idcategoria: number) {
    return this.database.executeSql('UPDATE crud SET nombre = ?, descripcion = ?, imagen = ?, precio = ?, idCategoria = ? WHERE idcrud = ?', [nombre, descripcion, imagen, precio, idcategoria, id]).then(res => {
      this.presentAlert("Modificar", "Producto Modificado");
      this.seleccionarCrud();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }

  insertarCrud(nombre: string, descripcion: string, imagen: any, precio: number, idcategoria: number) {
    return this.database.executeSql('INSERT INTO crud(nombre, descripcion, imagen, precio, idCategoria) VALUES (?, ?, ?, ?, ?)', [nombre, descripcion, imagen, precio, idcategoria]).then(res => {
      this.presentAlert("Insertar", "Producto Registrado");
      this.seleccionarCrud();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }


  seleccionarUsuario() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre_u: res.rows.item(i).nombre_u,
            correo_u: res.rows.item(i).correo_u,
            foto_u: res.rows.item(i).foto_u,
            clave_u: res.rows.item(i).clave_u,
            id_rol: res.rows.item(i).id_rol,
            fecha_nac: res.rows.item(i).fecha_nac,
            rut_u: res.rows.item(i).rut_u,
            token: res.rows.item(i).token

          });
        }
      }
      this.listadoUsuario.next(items);
    });
  }
  codigo: number = 1;
login(correo:string, clave: string){
  this.database.executeSql('SELECT * FROM usuario WHERE correo_u = ? and clave_u = ?', [correo, clave]).then(res => {
    let items: Usuario[] = [];
    let c;
    if (res.rows.length > 0) {
      this.presentAlert("Login", "Bienvenido al sistema");
      for (var i = 0; i < res.rows.length; i++) {
        this.codigo = res.rows.item(i).id_usuario;
      }
    }
    else{
      this.presentAlert("Login", "Usuario o Clave incorrecta");
      this.codigo = 0;
    }
    
  });

  //this.presentAlert("a","aqui");
  return this.codigo;
}

  eliminarUsuario(id:string){
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Usuario Eliminado");
      this.seleccionarUsuario();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }



  modificarUsuario( nombre:string, id:string, correo:string, clave: string, rut: string, fecha: string, foto: string, token: string, rol: string){
    this.presentAlert("service","ID: " + id);
    return this.database.executeSql('UPDATE usuario SET nombre_u = ?,correo_u = ?, clave_u = ?, rut_u = ?, fecha_nac = ?, foto_u = ?, token = ?, id_rol = ? WHERE id_usuario = ?',[nombre,correo,clave,rut,fecha,foto,token,rol,id]).then(res=>{
      this.presentAlert("Modificar","Usuario Modificado");      
      this.seleccionarUsuario();
    }).catch(e=>{      
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));      
    })    
  }
  

  insertarUsuario(nombre:string, correo:string, clave: string){
    return this.database.executeSql('INSERT INTO usuario( nombre_u, correo_u, clave_u) VALUES (?,?,?)',[nombre,correo,clave]).then(res=>{
      this.presentAlert("Insertar","Usuario Registrado");
      //this.seleccionarUsuario();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }
  
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


  
  seleccionarCategoria(){
    return this.database.executeSql('SELECT * FROM categoria', []).then(res=>{
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

