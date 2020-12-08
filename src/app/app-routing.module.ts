import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';

const routes: Routes = [
  { path: 'pokedex', component: PokedexComponent },
  { path: 'pokemon/:id', component: PokemonComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'pokedex' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
