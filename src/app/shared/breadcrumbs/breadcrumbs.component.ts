import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;

  constructor(private router: Router, private title: Title, private meta: Meta) {

    this.getDataRoute()
    .subscribe(data => {
      console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
          name: 'description',
          content: this.titulo
      };

      console.log(metaTag);

      this.meta.updateTag(metaTag);

    });

   }

  ngOnInit() {
  }

  getDataRoute() {

  return this.router.events.pipe(
      // * si esto es una instacia de activationEnd
      filter(evento => evento instanceof ActivationEnd),
      /// * Si evento de tipo ActivationEnd, si evento firsctChild es === nuil, solo traime ese ActivationEnd
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),

      // * el operator map, sirve para filtrar o mostrar solo lo que sesdesea de un objeto que en este caso es de ActivatedEnd
      // * y devuelte del objeto ActivatedEnd la data, la cual se va escalñando del objeto
      map( (evento: ActivationEnd) => evento.snapshot.data)

    );
  }

}
