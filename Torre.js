import { Sala } from "../basicas.js";
import { Tocha } from "../ferramentas/Tocha.js";

export class Torre extends Sala {
  constructor(engine) {
    super("Torre", engine);
    this.ferramentas.set("tocha", new Tocha());
  }
}
