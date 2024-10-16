import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.page.html',
  styleUrls: ['./detalleproducto.page.scss'],
})
export class DetalleproductoPage implements OnInit {
  producto: any;
  constructor(private router: Router, private activerouter: ActivatedRoute) {
    this.activerouter.paramMap.subscribe(params => {
      if (router.getCurrentNavigation()?.extras.state) {
        this.producto = router.getCurrentNavigation()?.extras?.state?.['prod'];
      }
    })
  }

  
  ngOnInit() {

    comprarProducto();

}
}
function comprarProducto() {
  throw new Error('Function not implemented.');
}

