import { Objeto } from "../basicas.js";
import { Pa } from "../ferramentas/Pa.js";
import { LivroMisterioso } from "../ferramentas/LivroMisterioso.js";

export class Altar extends Objeto {
  constructor(engine) {
    super("altar", 
          "Um altar antigo, coberto de inscrições enigmáticas, apresentava uma fresta que sugeria a existência de algo enterrado.", 
          "Ao cavar o altar, você encontrou um baú com um livro misterioso, cuja capa exibia o símbolo ancestral da água.!",engine);
  }
  usar(ferramenta) {
    if (ferramenta instanceof Pa) {
      this.acaoOk = true;
      this.engine.salaCorrente.ferramentas.set("livro", new LivroMisterioso());
      return true;
    }
    return false;
  }
}