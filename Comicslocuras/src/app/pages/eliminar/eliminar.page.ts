import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {

  nombreProducto: string = '';
  producto: any;

  constructor() { }

  ngOnInit() {
  }

  buscarProducto() {
   //buscar el producto por su nombre 
    const productos = [
      { nombre: 'Producto 1', precio: 100 },
      { nombre: 'Producto 2', precio: 200 },
    ];

    this.producto = productos.find(p => p.nombre === this.nombreProducto);
  }

  eliminarProducto() {
    if (this.producto) {
      //  eliminar el producto.
      console.log(`Producto eliminado: ${this.producto.nombre}`);

      // Limpiar el formulario después de eliminar el producto
      this.producto = null;
      this.nombreProducto = '';
    }
  }
}
