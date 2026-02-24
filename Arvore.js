import { Objeto } from "../basicas.js";
import { Pa } from "../ferramentas/Pa.js";
import { EstatuaDragao } from "../ferramentas/EstatuaDragao.js";

export class Arvore extends Objeto {
  constructor(engine) {
    super("arvore", 
          "Uma árvore estranha, cujo tronco tem o formato peculiar de um crânio de serpente, parece esconder algo enterrado sob suas raízes.", 
          "A árvore foi removida, revelando sob suas raízes uma estátua de dragão negro, com olhos vermelhos como chamas!",engine);
  }
  usar(ferramenta) {
    if (ferramenta instanceof Pa) {
      this.acaoOk = true;
      this.engine.salaCorrente.ferramentas.set("estatua", new EstatuaDragao());
      return true;
    }
    return false;
  }
}