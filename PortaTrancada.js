import { Objeto } from "../basicas.js";
import { Chave } from "../ferramentas/Chave.js";

export class PortaTrancada extends Objeto {
  constructor(engine) {
    super("porta", "Uma imponente porta trancada bloqueia a passagem", "A porta se abre, revelando o que estava escondido em seu interior.",engine);
  }
  usar(ferramenta) {
    if (ferramenta instanceof Chave && ferramenta.usar()) {
      this.acaoOk = true;
      return true;
    }
    return false;
  }
}
