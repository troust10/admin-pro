import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  titulo: string;
  tituloSubscription: Subscription;

  constructor(private router: Router) {
    this.tituloSubscription = this.getArgumentosRuta().subscribe((data) => {
      console.log(data);
      this.titulo = data.titulo;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.tituloSubscription.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );
  }

}
