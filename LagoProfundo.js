import { Objeto } from "../basicas.js";
import { Tocha } from "../ferramentas/Tocha.js";
import { LivroMisterioso } from "../ferramentas/LivroMisterioso.js";
import { TemploSecreto } from "../salas/TemploSecreto.js";

export class LagoProfundo extends Objeto {
  #descoberto;
  #escadaria;
  
  constructor(engine) {
    super("lago", 
          "Águas profundas e escuras, envoltas por uma neblina densa e enigmática.", 
          "Você descobriu a silhueta de um templo sinistro submerso nas águas sombrias do lago",engine);
    this.#descoberto = false;
    this.#escadaria = false;
  }
  
  usar(ferramenta) {
    if (ferramenta instanceof Tocha && !this.#descoberto) {
      this.acaoOk = true;
      this.#descoberto = true;
      return true;
    }
    
    if (ferramenta instanceof LivroMisterioso && this.#descoberto && !this.#escadaria) {
      console.log("Você lê o livro misterioso... Uma escadaria secreta se abre!");
      this.#escadaria = true;
      let temploSecreto = new TemploSecreto(this.engine);
      this.engine.salaCorrente.portas.set("TemploSecreto", temploSecreto);
      return true;
    }
    
    return false;
  }
}