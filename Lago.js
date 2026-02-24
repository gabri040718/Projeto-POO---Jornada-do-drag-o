import { Sala } from "../basicas.js";
import { LagoProfundo } from "../objetos/LagoProfundo.js";

export class Lago extends Sala {
  constructor(engine) {
    super("Lago", engine);
    this.objetos.set("lago", new LagoProfundo(engine));
  }
}
