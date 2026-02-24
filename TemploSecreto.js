import { Sala } from "../basicas.js";
import { AltarDragao } from "../objetos/AltarDragao.js";

export class TemploSecreto extends Sala {
  constructor(engine) {
    super("TemploSecreto", engine);
    this.objetos.set("altar_dragao", new AltarDragao(engine));
  }
}