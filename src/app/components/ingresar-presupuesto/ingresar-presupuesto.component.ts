import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-presupuesto',
  templateUrl: './ingresar-presupuesto.component.html',
  styleUrls: ['./ingresar-presupuesto.component.css']
})
export class IngresarPresupuestoComponent implements OnInit {
  cantidad: number;
  cantidadIncorrecta: boolean;

  constructor(private presupuestoService: PresupuestoService,
              private router: Router){
    this.cantidad = 0;
    this.cantidadIncorrecta = false;
  }

  ngOnInit(): void {}

  agregar(){
    if(this.cantidad > 0){
      this.cantidadIncorrecta = false;
      this.presupuestoService.presupuesto = this.cantidad; // Inicializa el presupuesto con el valor ingresado en la variable cantidad
      this.presupuestoService.restante = this.cantidad; // Inicializa el restante con el mismo valor que el presupuesto
      this.router.navigate(['/gastos']); // Redirecciona a la ruta /gastos
    }else{
      this.cantidadIncorrecta = true;
    }

  }


}
