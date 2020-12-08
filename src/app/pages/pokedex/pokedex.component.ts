import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../../services/pokedex.service';
import { PokemonModel } from '../../models/pokemon.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent implements OnInit {

  pokedex: PokemonModel[] = [];
  cargando = false;



  constructor(private pokedexService: PokedexService) {}

  ngOnInit(): void {

    this.cargando = true;

    this.pokedexService
      .obtenerPokedex()
      .subscribe((resp) => {
          this.pokedex = resp;
          this.cargando = false;
        });
  }

  borrarPokemon(pokemon: PokemonModel, i: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción no puede deshacerse: Eliminar a ${pokemon.nombre}.`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.pokedex.splice(i, 1);
        this.pokedexService.borrarPokemon(pokemon.id).subscribe();
      }
    });
  }
}
