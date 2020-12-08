export class PokemonModel {
    id: string;
    nombre: string;
    ataque: string;
    atrapado: boolean;
    herramienta: string;

    constructor() {
        this.atrapado = false;
    }
}