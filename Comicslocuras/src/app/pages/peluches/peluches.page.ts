import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-peluches',
  templateUrl: './peluches.page.html',
  styleUrls: ['./peluches.page.scss'],
})
export class PeluchesPage implements OnInit {
 //peluches nombre descripcion y precio e imagen url
productos = [
  {
    id: 19,
    name: ' One Pice ',
    price: 10000,
    description: '"¡Lleva la aventura a casa con este adorable peluche de One Piece! Suave, detallado y perfecto para cualquier fan de la serie. ¡No te quedes sin el tuyo!"',
    image: 'https://http2.mlstatic.com/D_NQ_NP_843522-MLC69248331841_052023-O.webp'
  },
  {
    id: 20,
    name: 'Boruto',
    price: 8000,
    description: '"¡Hazte con el peluche de Boruto! Suave, detallado y listo para acompañarte en cada aventura. Ideal para fans de la nueva generación ninja."',
    image: 'https://cdn.shopify.com/s/files/1/0445/3357/9943/products/boruto-plush-naruto.png?v=1617504773'
  },
  {
    id: 21,
    name: 'Sailor Moon',
    price: 9000 ,
    description: '"¡Despierta el poder del amor y la justicia con este adorable peluche de Sailor Moon! Perfecto para añadir un toque mágico a tu colección."',
    image: 'https://http2.mlstatic.com/D_NQ_NP_884636-MLC49592825460_042022-O.webp'
  },
  {
    id: 22,
    name: 'Superman',
    price: 10000 ,
    description: '"¡Trae la fuerza de Superman a tu hogar con este increíble peluche! Suave y heroico, es el compañero perfecto para cualquier fan del Hombre de Acero."',
    image: 'https://http2.mlstatic.com/D_NQ_NP_789484-MLU74005405862_012024-O.webp'
  },
  {
    id: 23,
    name: 'Batman',
    price: 10000 ,
    description: '"¡Sumérgete en la oscuridad con este impresionante peluche de Batman! Suave, misterioso y listo para defender tu colección como el Caballero de la Noche."',
    image: 'https://www.blasterchile.cl/cdn/shop/products/889698592772.jpg?v=1657309743'
  },
  {
    id: 24,
    name: 'Wolverine',
    price: 10000 ,
    description: '"¡Libera tu lado salvaje con este feroz peluche de Wolverine! Suave, resistente y siempre listo para la acción. Ideal para cualquier fan del mutante más indomable."',
    image: 'https://entelequia.com.ar/api/storage/product_arch/uB6DXLZfIs8U0NMR7NKsP2OeLVcKPLiIutb3wwgr.jpg'
  },
  {
    id: 25,
    name: 'Joker',
    price: 8000 ,
    description: '"¡Añade un toque de caos con este intrigante peluche del Joker! Suave, astuto y siempre listo para una sonrisa diabólica. Perfecto para los fans del Príncipe Payaso del Crimen."',
    image: 'https://toyslandchile.cl/wp-content/uploads/2024/06/JOKER-PELUCHE-TRAPO-1.jpg'
  },
  {
    id: 26,
    name: 'Harley Quinn ',
    price: 8000 ,
    description: '"¡Desata la diversión con este vibrante peluche de Harley Quinn! Suave, juguetona y llena de actitud, es el compañero ideal para los fans de la Reina del Crimen."',
    image: 'https://toyslandchile.cl/wp-content/uploads/2024/06/PELUCHE-HARLEY-TRAPO-1.jpg'
  },
  {
    id: 27,
    name: 'Capitan America',
    price: 7000 ,
    description: '"¡Defiende la justicia con este icónico peluche del Capitán América! Suave, valiente y siempre listo para la acción. Perfecto para cualquier fan del primer Vengador."',
    image: 'https://http2.mlstatic.com/D_NQ_NP_890857-MLU69098329339_042023-O.webp'
  },
  {
    id: 28,
    name: 'Iron Man',
    price: 7000 ,
    description: '"¡Impulsa tu colección con este impresionante peluche de Iron Man! Suave, tecnológico y siempre listo para salvar el día. Ideal para los fans del genio, millonario, playboy y filántropo."',
    image: 'https://home.ripley.cl/store/Attachment/WOP/D175/2000387344405/2000387344405_2.jpg'
  },
  {
    id: 29,
    name: 'Naruto',
    price: 8000 ,
    description: '"¡Aventura y valentía en un peluche con Naruto! Suave, audaz y listo para seguir el camino del Hokage. Perfecto para los fans del ninja más determinado."',
    image: 'https://m.media-amazon.com/images/I/61xGEQ79XrL._AC_UF894,1000_QL80_.jpg'
  },
  {
    id: 30,
    name: 'Shin Chan ',
    price: 8000 ,
    description: '"¡Diviértete con el peluche de Shin Chan! Suave, travieso y con todo el encanto del pequeño bromista. Ideal para añadir un toque de humor y alegría a tu colección."',
    image: 'https://cdnx.jumpseller.com/japan-market-chile/image/21452674/shin_1.jpg?1641254861'
  }
    // Añadir más productos aquí
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  // Función para manejar la compra de un producto
  vermasProducto(producto: any) {
    //redirigir los datos del producto a un html interior
    let navigationsextras: NavigationExtras = {
      state: {
        prod: producto
      }
    }
    this.router.navigate(['/detalleproducto'], navigationsextras);

    /*
    const productoSeleccionado = this.productos.find(producto => producto.id === id);
    if (productoSeleccionado) {
      console.log('Producto seleccionado:', productoSeleccionado);
      // Aquí puedes agregar la lógica de compra o navegación
    }*/
  }
}
