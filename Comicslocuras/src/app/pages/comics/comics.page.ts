import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss'],
})
export class ComicsPage implements OnInit {

  //productos nombre,precio,descripcion,imagen
  products = [
    {
      name: 'Wolverine',
      price: 10000,
      description: 'Wolverine es un feroz mutante de Marvel con garras de adamantium, un factor de curación increíble y una actitud indomable. Es un miembro clave de los X-Men',
      image: 'assets/img/wolverine.jpg' //esta es la imagen descargada de comics 
    },
    {
      name: 'Superman',
      price: 10000,
      description: 'Superman es un superhéroe de DC Comics, un extraterrestre de Krypton con poderes sobrehumanos, que protege la Tierra como Clark Kent.',
      image: 'assets/img/superman.jpg'
    },
    {
      name: 'Batman',
      price: 10000 ,
      description: 'Batman es un millonario de Gotham City que lucha contra el crimen como el vigilante enmascarado, usando habilidades y tecnología sin superpoderes.',
      image: 'assets/img/batman.jpg'
    },
    {
      name: 'Jocker',
      price: 10000 ,
      description: 'El Joker es el enemigo loco y caótico de Batman, conocido por su estilo de payaso y su deseo de causar caos.',
      image: 'assets/img/jocker.jpg'
    },
    {
      name: 'Harley Queen',
      price: 10000 ,
      description: 'Harley Quinn es una villana de DC Comics, ex psiquiatra del Joker, conocida por su estilo excéntrico y caos.',
      image: 'assets/img/harley.jpg'
    },
    {
      name: 'Ironman',
      price: 10000 ,
      description: 'Iron Man es un superhéroe de Marvel, creado por Tony Stark, un genio millonario que construye una avanzada armadura de alta tecnología. ',
      image: 'assets/img/ironman.jpg'
    },
    {
      name: 'Capitan America',
      price: 10000 ,
      description: 'Capitán América es el símbolo del heroísmo y la justicia en Marvel Comics. Steve Rogers, un soldado mejorado con el suero del supersoldado',
      image: 'assets/img/capitanamerica.jpg'
    },
    {
      name: 'Bruja Scarlet',
      price: 10000 ,
      description: 'Bruja Escarlata, también conocida como Wanda Maximoff, es una poderosa hechicera del universo Marvel. Con habilidades para manipular la realidad',
      image: 'assets/img/brujascarlet.jpg'
    },
    {
      name: 'Vision',
      price: 10000 ,
      description: 'Visión es un sintetoide creado por Marvel, mezcla de tecnología avanzada y humanidad. Con la capacidad de alterar su densidad, volar y emitir rayos de energía',
      image: 'assets/img/vision.jpg'
    }
    // Añadir más productos aquí
  ];
 // Constructor vacío 
  constructor() { }
 // Método que se llama cuando se inicializa el componet
  ngOnInit() {
   
  }

}