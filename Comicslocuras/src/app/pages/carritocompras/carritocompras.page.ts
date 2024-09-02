import { Component } from '@angular/core';

@Component({
  selector: 'app-carritocompras',
  templateUrl: './carritocompras.page.html',
  styleUrls: ['./carritocompras.page.scss'],
})
export class CarritocompraPage {
  // Lista de productos en el carrito
  cartItems = [
    {
      name: 'Producto 1',
      price: 10,
      quantity: 1,
      image: 'assets/img/product1.jpg',
    },
    {
      name: 'Producto 2',
      price: 15,
      quantity: 2,
      image: 'assets/img/product2.jpg',
    },
  ];

  // Calcular el total del carrito
  get total(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  // Método para eliminar un item del carrito
  removeItem(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  // Método para finalizar la compra
  checkout() {
    alert('Compra finalizada. ¡Gracias por tu compra!');
    this.cartItems = []; // Vaciar el carrito
  }
}