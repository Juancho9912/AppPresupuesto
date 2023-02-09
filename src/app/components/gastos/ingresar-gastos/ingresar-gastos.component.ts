import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gastos',
  templateUrl: './ingresar-gastos.component.html',
  styleUrls: ['./ingresar-gastos.component.css']
})
export class IngresarGastosComponent implements OnInit  {
  nombreGasto:string;
  cantidadGasto: number;
  formularioIncorrecto: boolean;
  textoIncorrecto: string;

  constructor(private presupuestoService: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidadGasto = 0;
    this.formularioIncorrecto = false;
    this.textoIncorrecto = '';
  
  }

  ngOnInit(): void {}

  agregarGasto(){

    if(this.cantidadGasto > this.presupuestoService.restante){
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Cantidad ingresada es mayor al restante';
      return;
    }

    if(this.nombreGasto === '' || this.cantidadGasto <= 0){ // si el nombre del gasto esta vacio o la cantidad es menor o igual a 0
      this.formularioIncorrecto = true; // mostrar mensaje de error
      this.textoIncorrecto = 'Nombre gasto o cantidad incorrecta';
    }else{

      // Creamos el objeto gasto
      const gasto = {
        nombreGasto: this.nombreGasto,
        cantidadGasto: this.cantidadGasto
      }

      //Enviamos el objeto a los suscriptores via subjet  
      this.presupuestoService.agregarGasto(gasto);

      //Reseteamos formulario
      this.formularioIncorrecto = false; // ocultar mensaje de error
      this.nombreGasto = ''; // limpiar el input
      this.cantidadGasto = 0; // limpiar el input
    }
  }
  

}
