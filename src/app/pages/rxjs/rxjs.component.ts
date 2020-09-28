import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    // this.retornaObservable().subscribe(
    //   datos => {
    //     console.log(`El valor devuelto es ${datos}`);
    //   },
    //   error => { console.warn('Error: ' + error); },
    //   () => { console.log('termino el observer'); }
    // );
    this.subscription = this.retornaIntervalo().subscribe(
      (valor) => { console.log(valor); }
    );
  }

  retornaIntervalo(): Observable<number> {
    return interval(500)
      .pipe(
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0) ? true : false),
        // take(10),
      );
  }

  retornaObservable(): Observable<number> {
    let i: number = -1;
    return new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        // console.log('tick');
        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
