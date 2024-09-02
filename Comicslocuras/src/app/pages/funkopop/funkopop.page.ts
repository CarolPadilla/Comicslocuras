import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funkopop',
  templateUrl: './funkopop.page.html',
  styleUrls: ['./funkopop.page.scss'],
})
export class FunkopopPage implements OnInit {
// Arreglo contiene la lista de productos Funkopop
products = [
  {
    name: 'One Pice',
    price: 14000,
    description: '"¡Añade a tus aventuras con este Funkopop de One Piece! Detallado y coleccionable, ideal para fans que quieren tener a sus personajes favoritos siempre a la vista."',
    image: 'https://img.elo7.com.br/product/685x685/4DF6C48/luffy-one-piece-funko-pop-personalizado.jpg'
  },
  {
    name: 'Boruto',
    price: 12000,
    description: '"¡Completa tu colección con este Funkopop de Boruto! Detallado y dinámico, perfecto para los fans que quieren tener a la nueva generación ninja siempre a su lado."',
    image: 'https://http2.mlstatic.com/D_NQ_NP_895042-MLA54764095888_032023-O.webp'
  },
  {
    name: 'Sailor Moon',
    price: 10000 ,
    description: '"¡Encanta tu colección con este Funkopop de Sailor Moon! Detallado y lleno de magia, ideal para los fans que quieren tener a la guerrera lunar siempre cerca."',
    image: 'https://dojiw2m9tvv09.cloudfront.net/68793/product/sailormoon33117809.jpg'
  },
  {
    name: 'Superman',
    price: 12000 ,
    description: '"¡Añade poder a tu colección con este Funkopop de Superman! Detallado y heroico, perfecto para los fans que quieren tener al Hombre de Acero siempre a su lado."',
    image: 'https://gcjuegos.cl/1401-large_default/funko-pop-movies-justice-league-superman-special-edition-1123.jpg'
  },
  {
    name: 'Batman',
    price: 12000 ,
    description: '"¡Potencia tu colección con este Funkopop de Batman! Detallado y enigmático, ideal para los fans que quieren tener al Caballero de la Noche siempre a la vista."',
    image: 'https://gwshop.cl/wp-content/uploads/2022/05/889698592765-3-1.jpg'
  },
  {
    name: 'Wolverine',
    price: 14000 ,
    description: '"¡Refuerza tu colección con este Funkopop de Wolverine! Detallado y feroz, perfecto para los fans que quieren tener al mutante más indomable siempre a su lado."',
    image: 'https://gwshop.cl/wp-content/uploads/2024/06/4285440-3203227.jpg'
  },
  {
    name: 'Joker',
    price: 13000 ,
    description: '"¡Agrega un toque de caos a tu colección con este Funkopop del Joker! Detallado y intrigante, ideal para los fans que quieren tener al Príncipe Payaso del Crimen siempre cerca."',
    image: 'https://http2.mlstatic.com/D_NQ_NP_603953-MLB46885502810_072021-O.webp'
  },
  {
    name: 'Harley Quinn ',
    price: 13000 ,
    description: '"¡Desata la diversión con este Funkopop de Harley Quinn! Detallado y lleno de personalidad, perfecto para los fans que quieren tener a la Reina del Crimen siempre a la vista."',
    image: 'https://i0.wp.com/existen.es/wp-content/uploads/img_62211_4bad7374e62068cc79c84372f1f998af_1.jpg?fit=800%2C800&ssl=1&w=640'
  },
  {
    name: 'Capitan America',
    price: 12000 ,
    description: '"¡Fortalece tu colección con este Funkopop del Capitán América! Detallado y heroico, ideal para los fans que quieren tener al primer Vengador siempre a su lado."',
    image: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/114146906_02/w=800,h=800,fit=pad'
  },
  {
    name: 'Iron Man',
    price: 12000 ,
    description: '"¡Añade un toque de tecnología a tu colección con este Funkopop de Iron Man! Detallado y brillante, perfecto para los fans que quieren tener al genio, millonario, playboy y filántropo siempre a la vista."',
    image: 'https://cdn.awsli.com.br/600x700/84/84034/produto/90992014/funko-pop--marvel-avengers-iron-man-634-exclusivo-cc-800-sy77hetoyg.jpg'
  },
  {
    name: 'Naruto',
    price: 13000 ,
    description: '"¡Completa tu colección con este Funkopop de Naruto! Detallado y lleno de energía, ideal para los fans que quieren tener al ninja más determinado siempre a su lado."',
    image: 'https://www.playgames.cl/cdn/shop/files/NarutoUzumaki727-1.jpg?v=1687795640'
  },
  {
    name: 'Shin Chan ',
    price: 1000 ,
    description: '"¡Agrega un toque de diversión a tu colección con este Funkopop de Shin Chan! Detallado y travieso, perfecto para los fans que quieren tener al pequeño bromista siempre cerca."',
    image: 'https://http2.mlstatic.com/D_NQ_NP_679183-CBT78401103355_082024-O.webp'
  },
  
  
  // Añadir más productos aquí
];

  constructor() { }

  ngOnInit() {
  }

}
