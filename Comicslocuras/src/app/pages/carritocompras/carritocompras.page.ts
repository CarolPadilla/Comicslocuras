import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-carritocompras',
  templateUrl: './carritocompras.page.html',
  styleUrls: ['./carritocompras.page.scss'],
})
export class CarritoComprasPage implements OnInit {
  cart: any[] = []; // Inicialización del carrito

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController // Inyecta AlertController
  ) {}

  ngOnInit() {
    // Acceder al estado de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras['state']) {
      this.cart = navigation.extras['state']['cart'] || []; // Acceso usando notación de índice
    }
  }

  addToCart(product: any) {
    const existingProduct = this.cart.find(item => item.nombre === product.nombre);
    if (existingProduct) {
      existingProduct.quantity += 1; // Incrementa la cantidad si ya existe
    } else {
      this.cart.push({ ...product, quantity: 1 }); // Agrega el producto con cantidad 1
    }
  }

  removeFromCart(product: any) {
    this.cart = this.cart.filter(item => item.nombre !== product.nombre);
  }

  clearCart() {
    this.cart = []; // Vacía el carrito
  }

  getTotal() {
    return this.cart.reduce((acc, product) => acc + (product.precio * (product.quantity || 1)), 0);
  }

  goToCart() {
    this.router.navigate(['/carritocompras'], {
      state: { cart: this.cart } // Pasa el carrito al navegar
    });
  }

  // Función para mostrar la alerta de compra exitosa
  async finalizarCompra() {
    const alert = await this.alertController.create({
      header: 'Compra exitosa',
      message: 'Gracias por su compra',
      buttons: ['OK']
    });

    await alert.present();
    
    // Después de mostrar la alerta, limpiar el carrito
    this.clearCart();
  }
}
