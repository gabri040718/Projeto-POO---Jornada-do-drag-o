import { Sala } from "../basicas.js";
import { PortaTrancada } from "../objetos/PortaTrancada.js";

export class Caverna extends Sala {
  constructor(engine) {
    super("Caverna", engine);
    this.objetos.set("porta", new PortaTrancada(engine));
  }
}
