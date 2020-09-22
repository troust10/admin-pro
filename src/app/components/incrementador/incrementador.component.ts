import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 40;
  @Output() valorSalida: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  cambiarValor(valor: number, forzar: string = 'N') {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      this.progreso = 100;
    } else if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      this.progreso = 0;
    } else {
      if (forzar === 'N') {
        const resultadoValor: number = this.progreso + valor;
        this.valorSalida.emit(resultadoValor);
        this.progreso = this.progreso + valor;
      }
      else {
        if (!isNaN(valor)) {
          this.valorSalida.emit(valor);
          this.progreso = valor;
        } else {
          this.valorSalida.emit(0);
          this.progreso = 0;
        }
      }
    }
  }

  ejecutarCambio(valor: string) {
    this.cambiarValor(parseInt(valor, 10), 'S');
  }
}
