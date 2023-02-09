import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto permite que el servicio sea inyectable en cualquier componente
})
export class PresupuestoService {
  presupuesto:number;
  restante:number;
  private gastos$ = new Subject<any>(); // Este es el subject que se va a usar para enviar los gastos a los suscriptores

  constructor() { // Este constructor se ejecuta cuando se crea una instancia de este servicio
  this.presupuesto = 0; // Inicializa el presupuesto en 0
  this.restante = 0; // Inicializa el restante en 0
  }

  agregarGasto(gasto:any){
    this.restante = this.restante - gasto.cantidadGasto; // Resta el gasto al restante
    this.gastos$.next(gasto); // Envía el gasto a los suscriptores
  }

  getGastos(): Observable<any>{
    return this.gastos$.asObservable(); // Devuelve el subject como observable para que los componentes puedan suscribirse
  }

}
