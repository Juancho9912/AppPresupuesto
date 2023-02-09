import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresupuestoService } from '../../../services/presupuesto.service';

@Component({
  selector: 'app-listar-gastos',
  templateUrl: './listar-gastos.component.html',
  styleUrls: ['./listar-gastos.component.css']
})
export class ListarGastosComponent implements OnInit, OnDestroy {
  subscription: Subscription; // Variable para almacenar la suscripción
  presupuesto: number;
  restante: number;
  listaGastos: any[] = [];

  constructor(private presupuestoService: PresupuestoService ) { 
    this.presupuesto = 0; //Para hacer las variables dinamicas
    this.restante = 0; //Para hacer las variables dinamicas
    this.subscription = this.presupuestoService.getGastos().subscribe(gasto => { // Suscribe al subject del servicio
      this.restante = this.restante -  gasto.cantidadGasto; // Resta el gasto al restante
      this.listaGastos.push(gasto); // Agrega el gasto a la lista de gastos
    })
  }

  ngOnInit(): void {
    this.presupuesto = this.presupuestoService.presupuesto;
    this.restante = this.presupuestoService.restante;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Desuscribe del subject del servicio Elimina la subscripción
  }
  aplicarColorRestante() {
    if (this.presupuesto / 4 > this.restante) { // Si el restante es menor al 25% del presupuesto retorna la clase de bootstrap para el color rojo
      return 'alert alert-danger';
    } else if (this.presupuesto / 2 > this.restante) {
      return 'alert alert-warning';
    } else {
      return 'alert alert-secondary';
    }
  }

}
