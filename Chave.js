import { Ferramenta } from "../basicas.js";

export class Chave extends Ferramenta {
  #usos;
  constructor() {
    super("chave");
    this.#usos = 1;
  }
  usar() {
    if (this.#usos > 0) {
      this.#usos--;
      return true;
    }
    return false;
  }
}
