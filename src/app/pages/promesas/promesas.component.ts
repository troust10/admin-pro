import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Inicio del componente');
    const promesa = new Promise((resolve, reject) => {
      if (false) {
        resolve('Correcto');
      } else {
        reject('Rechazado');
      }
    });

    promesa
      .then(mensaje => {
        console.log('Todo salio bien: ' + mensaje);
      })
      .catch(mensaje => {
        console.log('Todo salio mal: ' + mensaje);
      });

    console.log('Final del componente');

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });
  }

  getUsuarios() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    });
  }
}
