import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular'; // Asegúrate de importar NavController

@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.page.html',
  styleUrls: ['./detalleproducto.page.scss'],
})
export class DetalleproductoPage implements OnInit {
  producto: any;
  cart: any[] = []; // Declaración del array cart

  constructor(
    private router: Router, 
    private activerouter: ActivatedRoute,
    private navCtrl: NavController // Inyección de NavController
  ) {
    this.activerouter.paramMap.subscribe(params => {
      if (router.getCurrentNavigation()?.extras.state) {
        this.producto = router.getCurrentNavigation()?.extras?.state?.['prod'];
      }
    })
  }

  ngOnInit() {}

  addToCart(producto: any) {
    const existingProducto = this.cart.find(item => item.nombre === producto.nombre);
    if (existingProducto) {
      existingProducto.quantity += 1;
    } else {
      this.cart.push({ ...producto, quantity: 1 });
    }
  }

  // Eliminar producto del carrito
  removeFromCart(producto: any) {
    this.cart = this.cart.filter(item => item.nombre !== producto.nombre);
  }

  // Vaciar el carrito
  clearCart() {
    this.cart = [];
  }

  // Navegar al carrito de compras
  goToCart() {
    this.navCtrl.navigateForward('/carritocompras', {
      state: { cart: this.cart }
    });
  }
}
