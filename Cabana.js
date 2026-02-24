import { Sala } from "../basicas.js";
import { Chave } from "../ferramentas/Chave.js";
import { GoblinLadrao, SistemaCombate } from "../combat/Inimigos.js";

// ==========================
// Cabana Modificada (com Goblin)
// ==========================

export class Cabana extends Sala {
  #inimigo;
  #combateResolvido;
  
  constructor(engine) {
    super("Cabana", engine);
    this.#inimigo = new GoblinLadrao();
    this.#combateResolvido = false;
  }

  get inimigo() { return this.#inimigo; }
  get combateResolvido() { return this.#combateResolvido; }

  // Override do método pega
  pega(nomeFerramenta) {
    if (!this.#combateResolvido) {
      console.log(" O Goblin Ladrão bloqueia seu caminho!");
      console.log(" Ele rosna ameaçadoramente protegendo seus tesouros!");
      console.log(" Use 'atacar' para enfrentá-lo!");
      return false;
    }
    return super.pega(nomeFerramenta);
  }

  // Novo método para iniciar combate
  atacar() {
    if (this.#combateResolvido) {
      console.log(" Não há mais inimigos aqui.");
      console.log(" A cabana está pacífica agora.");
      return false;
    }

    if (!this.#inimigo.estaVivo) {
      console.log(" O inimigo já foi derrotado.");
      return false;
    }

    console.log(`\n Você se aproxima cautelosamente do Goblin Ladrão...`);
    console.log(` Ele percebe sua presença e se prepara para lutar!`);
    
    let vitoria = SistemaCombate.iniciarCombate(this.engine.jogador, this.#inimigo, this.engine);
    
    if (vitoria) {
      this.#combateResolvido = true;
      // Adiciona a chave após vitória
      this.ferramentas.set("chave", new Chave());
      console.log("\n =================== VITÓRIA! ===================");
      console.log(" O Goblin deixou cair uma chave brilhante!");
      console.log(" A cabana agora está segura para explorar!");
      console.log(" Use 'pega chave' para coletá-la!");
      console.log(" =============================================");
    } else {
      console.log("\n Talvez você precise se preparar melhor...");
      console.log(" Dica: Explore outras áreas para ganhar experiência!");
    }
    
    return vitoria;
  }

  // Override da descrição da sala
  textoDescricao() {
    let descricao = " Você está na " + this.nome + "\n";
    
    if (!this.#combateResolvido && this.#inimigo.estaVivo) {
      descricao += " PERIGO: Um Goblin Ladrão espreita nas sombras!\n";
      descricao += " Ele está agachado sobre um baú, protegendo algo valioso.\n";
      descricao += " Use 'atacar' para iniciar o combate!\n";
      descricao += " Objetos: Nenhum (bloqueado pelo goblin)\n";
      descricao += " Ferramentas: Nenhuma (bloqueado pelo goblin)\n";
    } else {
      descricao += " A cabana está tranquila após a batalha.\n";
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