import { Sala } from "../basicas.js";
import { Pa } from "../ferramentas/Pa.js";
import { Arvore } from "../objetos/Arvore.js";

export class Floresta extends Sala {
  constructor(engine) {
    super("Floresta", engine);
    this.ferramentas.set("pa", new Pa());
    this.objetos.set("arvore", new Arvore(engine));
  }
}
