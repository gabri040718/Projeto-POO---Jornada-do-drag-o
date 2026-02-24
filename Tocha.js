import { Ferramenta } from "../basicas.js";

// pode ser usada 3 vezes
export class Tocha extends Ferramenta {
  #energia;
  constructor() {
    super("tocha");
    this.#energia = 3; 
  }
  usar() {
    if (this.#energia > 0) {
      this.#energia--;
      return true;
    }
    return false;
  }
}
