import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { PokemonModel } from '../../models/pokemon.model';
import { PokedexService } from '../../services/pokedex.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})

export class PokemonComponent implements OnInit {
  pokemon: PokemonModel = new PokemonModel();

  constructor(private pokedexService: PokedexService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.pokedexService.getPokemon(id)
      .subscribe((resp: PokemonModel) => {
        this.pokemon = resp;
        this.pokemon.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();



    let peticion: Observable<any>;

    if (this.pokemon.id) {
      peticion = this.pokedexService.actualizarPokemon(this.pokemon);
    } else {
      peticion = this.pokedexService.crearPokemon(this.pokemon);
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.pokemon.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });

  }
}



