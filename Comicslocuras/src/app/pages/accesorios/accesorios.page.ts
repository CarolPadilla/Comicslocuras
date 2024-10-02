import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.page.html',
  styleUrls: ['./accesorios.page.scss'],
})
export class AccesoriosPage implements OnInit {
//accesorios de comics llavero, marca pagina, estuche, lapices 
productos = [
  {
    id: 43,
    name: 'One Piece LLavero',
    price: 4000,
    description: '"¡Lleva la aventura contigo con este llavero de One Piece! Compacto, detallado y perfecto para mostrar tu amor por la serie en cada momento. ¡No dejes que tu pasión se quede en casa!"',
    image: 'https://down-co.img.susercontent.com/file/cn-11134207-7qukw-lk0fm2i2c2r874_tn.webp'
  },
  {
    id: 44,
    name: 'Sailor Moon Marca Paginas',
    price: 3000,
    description: '"¡Añade un toque mágico a tu lectura con este marca páginas de Sailor Moon! Elegante y encantador',
    image: 'https://i.pinimg.com/736x/71/48/d5/7148d55d4f0d94931812c2034303eeb6.jpg'
  },
  {
    id: 45,
    name: 'Boruto Estuchera',
    price: 10000,
    description: '"¡Organiza tu equipo ninja con este estuche de Boruto! Compacto, resistente y perfecto para mantener tus útiles a salvo con estilo."',
    image: 'https://http2.mlstatic.com/D_NQ_NP_905516-CBT77943489448_082024-O.webp'
  },
  {
    id: 46,
    name: 'Dragon Ball Lapices ',
    price: 8000,
    description: '"¡Dibuja tu fuerza con estos lápices de Dragon Ball! Coloridos, duraderos y perfectos para fans que quieren agregar un toque de poder a su escritura."',
    image: 'https://dojiw2m9tvv09.cloudfront.net/26518/product/screenshot2021-12-08at18-17-23sr73501jpg-jpegimage-709x709pixels8254.png'
  },
  {
    id: 47,
    name: 'Shin Chan Llavero',
    price: 2500,
    description: '"¡Haz que tu día sea más divertido con este llavero de Shin Chan! Pequeño, juguetón y perfecto para mostrar tu amor por el travieso protagonista en cada aventura." ',
    image: 'https://m.media-amazon.com/images/I/71RwahxQCjL._AC_UF894,1000_QL80_.jpg'
  },
  {
    id: 48,
    name: 'Iron Man Llavero',
    price: 10000,
    description: '"¡Lleva la tecnología a todas partes con este llavero de Iron Man! Compacto, elegante y perfecto para mostrar tu pasión por el Hombre de Acero en cada llave."',
    image: 'https://http2.mlstatic.com/D_NQ_NP_971928-MLC74488807005_022024-O.webp'
  }
  

    // Añadir más productos aquí
  ];

  constructor() { }

  ngOnInit() { }

  // Función para manejar la compra de un producto
  comprarProducto(id: number) {
    const productoSeleccionado = this.productos.find(producto => producto.id === id);
    if (productoSeleccionado) {
      console.log('Producto seleccionado:', productoSeleccionado);
      // Aquí puedes agregar la lógica de compra o navegación
    }
  }
}



