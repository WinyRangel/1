import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import {Title} from '@angular/platform-browser';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cliente';
  isLoggedIn = false; // Definir la propiedad isLoggedIn como un booleano

  constructor(private authService: AuthService, private TitleService: Title, private BreadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.BreadcrumbService.breadcrumbChanged.subscribe( crumbs => {
      this.TitleService.setTitle(this.createTitle(crumbs))
    }) 
  }

  private createTitle(routesCollection: Breadcrumb[]){
    const title = 'Angular Demo';
    const titles = routesCollection.filter((route) => route.displayName);

    if(!titles.length) {return title;}

    const routeTitle = this.titlesToString(titles);
    return `${routeTitle} ${title}`;
  }

  private titlesToString(titles: { displayName: string }[]) {
    return titles.reduce((prev: string, curr: { displayName: string }) => {
      const displayName = curr.displayName || ''; // Si curr.displayName no está definido, asigna una cadena vacía
      return `${displayName} ${prev}`; // Se cambia "-" por " " para separar los títulos con un espacio en lugar de un guion
    }, '');
  }

}
