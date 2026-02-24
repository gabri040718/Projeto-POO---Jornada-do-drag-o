import { Objeto } from "../basicas.js";
import { EstatuaDragao } from "../ferramentas/EstatuaDragao.js";

export class AltarDragao extends Objeto {
  constructor(engine) {
    super("altar_dragao", 
          "Um pequeno altar negro, vazio em seu centro, exibia uma imagem de asas vermelhas como chamas. Ao seu redor, um círculo de fogo dançava com intensidade.", 
          "As paredes começam a se mover! Do fundo, surge uma imensa chama negra, revelando a Espada Ancestral do Fogo Negro em toda a sua imponência e glória."
          ,engine);
        }
  
  usar(ferramenta) {
    if (ferramenta instanceof EstatuaDragao) {
      this.acaoOk = true;
      console.log("Você coloca a estátua do dragão no altar...");
      console.log("As paredes começam a se mexer violentamente!");
      console.log("Uma grande chama surge ao fundo revelando...");
      console.log("🔥 A ESPADA ANCESTRAL DO FOGO NEGRO! 🔥");
      console.log("Parabéns pela sua jornada épica, guerreiro!");
      this.engine.indicaFimDeJogo();
      return true;
    }
    return false;
  }
}