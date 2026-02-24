import { Sala } from "../basicas.js";
import { Altar } from "../objetos/Altar.js";
import { GuardiaoAncestral, SistemaCombate } from "../combat/Inimigos.js";

// ==========================
// Templo Modificado (com Guardião)
// ==========================

export class Templo extends Sala {
  #inimigo;
  #combateResolvido;
  #altar;
  
  constructor(engine) {
    super("Templo", engine);
    this.#inimigo = new GuardiaoAncestral();
    this.#combateResolvido = false;
    this.#altar = new Altar(engine);
    this.objetos.set("altar", this.#altar);
  }

  get inimigo() { return this.#inimigo; }
  get combateResolvido() { return this.#combateResolvido; }

  // Override do método usa
  usa(nomeFerramenta, nomeObjeto) {
    if (!this.#combateResolvido) {
      console.log(" O Guardião Ancestral protege o altar sagrado!");
      console.log(" Sua presença etérea bloqueia qualquer tentativa de profanação!");
      console.log(" Você deve provar seu valor em combate primeiro!");
      console.log(" Use 'atacar' para desafiar o guardião!");
      return false;
    }
    return super.usa(nomeFerramenta, nomeObjeto);
  }

  // Método para iniciar combate
  atacar() {
    if (this.#combateResolvido) {
      console.log(" Não há mais inimigos aqui.");
      console.log(" O templo agora reconhece você como digno.");
      return false;
    }

    if (!this.#inimigo.estaVivo) {
      console.log(" O guardião já foi derrotado.");
      return false;
    }

    console.log(`\n Você se aproxima do altar sagrado...`);
    console.log(` O Guardião Ancestral se materializa lentamente!`);
    console.log(` A energia mágica crackle pelo ar!`);
    console.log(` "Quem ousa profanar este lugar sagrado?" ecoa uma voz etérea.`);
    
    let vitoria = SistemaCombate.iniciarCombate(this.engine.jogador, this.#inimigo, this.engine);
    
    if (vitoria) {
      this.#combateResolvido = true;
      console.log("\n ================== VITÓRIA ÉPICA! ==================");
      console.log(" O Guardião Ancestral sussurra com respeito:");
      console.log(" 'Você provou ser digno... Os segredos são seus...'");
      console.log(" O altar agora pode ser usado com segurança!");
      console.log(" A energia sagrada do templo o abençoa!");
      console.log(" Use 'usa pa altar' para escavar os segredos!");
      console.log(" ==============================================");
    } else {
      console.log("\ O guardião se mostra muito poderoso...");
      console.log(" Dica: Ganhe mais experiência ou tente estratégias diferentes!");
    }
    
    return vitoria;
  }

  // Override da descrição da sala
  textoDescricao() {
    let descricao = " Você está no " + this.nome + "\n";
    
    if (!this.#combateResolvido && this.#inimigo.estaVivo) {
      descricao += " PERIGO: Um Guardião Ancestral protege este lugar sagrado!\n";
      descricao += " Uma figura etérea paira sobre o altar, emanando poder mágico.\n";
      descricao += " A energia ancestral pulsa através das pedras antigas.\n";
      descricao += " Use 'atacar' para desafiá-lo em combate!\n";
      descricao += " Objetos: altar ( PROTEGIDO - derrote o guardião primeiro)\n";
      descricao += " Ferramentas: Nenhuma\n";
    } else {
      descricao += " O templo está sereno, e você sente uma presença benevolente.\n";
      descricao += " A energia sagrada o protege e abençoa.\n";
      // Comportamento normal após combate
      if (this.objetos.size == 0) {
        descricao += " Objetos: Nenhum\n";
      } else {
        descricao += " Objetos: " + this.objetosDisponiveis() + "\n";
      }
      if (this.ferramentas.size == 0) {
        descricao += " Ferramentas: Nenhuma\n";
      } else {
        descricao += " Ferramentas: " + this.ferramentasDisponiveis() + "\n";
      }
    }
    
    descricao += " Portas: " + this.portasDisponiveis() + "\n";
    return descricao;
  }
}