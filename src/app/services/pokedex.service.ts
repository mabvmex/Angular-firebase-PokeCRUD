import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonModel } from '../models/pokemon.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private url = 'https://login-app-4ac00.firebaseio.com';

  constructor( private http: HttpClient ) { }


  borrarPokemon( id: string ) {
    return this.http.delete(`${this.url}/pokedex/${id}.json`);
  }

  getPokemon(id: string){
    return this.http.get(`${this.url}/pokedex/${id}.json`);
  }

  crearPokemon( pokemon: PokemonModel ) {
     return this.http.post(
       `${this.url}/pokedex.json`, pokemon
     )
     .pipe(
       map((resp: any) => {
         pokemon.id = resp.name;
         return pokemon;
       })
     );
  }

  actualizarPokemon(pokemon: PokemonModel){
    const pokemonTemp = {
      ...pokemon
    };

    delete pokemonTemp.id;

    return this.http.put(`${this.url}/pokedex/${pokemon.id}.json`, pokemonTemp);
  }

  obtenerPokedex() {
    return this.http.get(`${this.url}/pokedex.json`)
    .pipe(
      map(this.crearArreglo),
      delay(0)
    );
  }


private crearArreglo(pokedexObj: object){

  const pokedex: PokemonModel[] = [];

  if (pokedexObj === null ) {return []; }

  Object.keys(pokedexObj).forEach(key => {
    const pokemon: PokemonModel = pokedexObj[key];

    pokemon.id = key;

    pokedex.push(pokemon);
  });

  return pokedex;
}


}



