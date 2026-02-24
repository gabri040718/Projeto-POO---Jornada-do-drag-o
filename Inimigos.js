import promptSync from 'prompt-sync';
const prompt = promptSync();

// ==========================
// Classe Inimigo Base
// ==========================
export class Inimigo {
  #nome;
  #vida;
  #vidaMaxima;
  #ataque;
  #defesa;
  #experienciaReward;
  #descricao;

  constructor(nome, vida, ataque, defesa, xpReward, descricao) {
    this.#nome = nome;
    this.#vida = vida;
    this.#vidaMaxima = vida;
    this.#ataque = ataque;
    this.#defesa = defesa;
    this.#experienciaReward = xpReward;
    this.#descricao = descricao;
  }

  get nome() { return this.#nome; }
  get vida() { return this.#vida; }
  get vidaMaxima() { return this.#vidaMaxima; }
  get ataque() { return this.#ataque; }
  get defesa() { return this.#defesa; }
  get experienciaReward() { return this.#experienciaReward; }
  get descricao() { return this.#descricao; }
  get estaVivo() { return this.#vida > 0; }

  atacar(jogador) {
    let dano = this.#ataque + Math.floor(Math.random() * 4); // 1d4
    console.log(` ${this.#nome} ataca por ${dano} de dano!`);
    return jogador.receberDano(dano);
  }

  receberDano(dano) {
    this.#vida = Math.max(0, this.#vida - dano);
    console.log(`💔 ${this.#nome} recebe ${dano} de dano! Vida: ${this.#vida}/${this.#vidaMaxima}`);
    return this.#vida <= 0;
  }

  mostrarStatus() {
    console.log(`\n🔴 ${this.#nome}`);
    console.log(`❤️  Vida: ${this.#vida}/${this.#vidaMaxima}`);
    console.log(`⚔️  Ataque: ${this.#ataque} | 🛡️ Defesa: ${this.#defesa}`);
  }
}

// ==========================
// Inimigo da Cabana (Tutorial)
// ==========================
export class GoblinLadrao extends Inimigo {
  constructor() {
    super(
      "Goblin Ladrão",
      25, // vida baixa para tutorial
      6,  // ataque baixo
      1,  // defesa baixa
      30, // XP
      "🧌 Um pequeno goblin verde surge das sombras da cabana, protegendo ferozmente uma chave brilhante! Seus olhos vermelhos brilham com malícia, e ele range os dentes afiados em sua direção!"
    );
  }

  // Goblin tem uma chance de esquivar
  receberDano(dano) {
    if (Math.random() < 0.2) { // 20% chance de esquivar
      console.log(` ${this.nome} esquiva do ataque!`);
      return false;
    }
    return super.receberDano(dano);
  }
}

// ==========================
// Inimigo do Templo (Boss)
// ==========================
export class GuardiaoAncestral extends Inimigo {
  #usouHabilidadeEspecial;

  constructor() {
    super(
      "Guardião Ancestral",
      60, // vida alta para ser desafiante
      12, // ataque médio-alto
      3,  // defesa média
      80, // XP alto
      " Uma figura encapuzada e etérea emerge das pedras antigas do templo! Este guardião ancestral protege os segredos sagrados há milênios. Seus olhos azuis brilham com poder mágico, e uma aura de mistério o envolve!"
    );
    this.#usouHabilidadeEspecial = false;
  }
  
  // Boss tem habilidade especial
  atacar(jogador) {
    // 30% chance de usar habilidade especial, mas só uma vez
    if (Math.random() < 0.3 && !this.#usouHabilidadeEspecial) {
      this.#usouHabilidadeEspecial = true;
      return this.raioEspiritual(jogador);
    }
    return super.atacar(jogador);
  }
  
  raioEspiritual(jogador) {
    let dano = 15 + Math.floor(Math.random() * 6);
    console.log(` ${this.nome} lança um Raio Espiritual devastador!`);
    console.log(` A energia ancestral crackle pelo ar!`);
    return jogador.receberDano(dano);
  }

  // Boss regenera um pouco a cada turno
  mostrarStatus() {
    if (this.vida > 0 && this.vida < this.vidaMaxima) {
      let cura = Math.floor(Math.random() * 3) + 1; // 1-3 HP
      this.receberDano(-cura); // Cura negativa = regeneração
      console.log(` ${this.nome} regenera ${cura} pontos de vida!`);
    }
    super.mostrarStatus();
  }
}

// ==========================
// Sistema de Combate
// ==========================
export class SistemaCombate {
  static iniciarCombate(jogador, inimigo, engine) {
    console.log(`\n ===============================`);
    console.log(`     COMBATE INICIADO! `);
    console.log(` ===============================`);
    console.log(`${inimigo.descricao}`);
    console.log(`\n ${jogador.nome} vs ${inimigo.nome}!`);
    
    let turno = 1;
    
    while (jogador.estaVivo && inimigo.estaVivo) {
      console.log(`\n =================== TURNO ${turno} ===================`);
      
      // Turno do jogador
      console.log(`\n---  Turno de ${jogador.nome} ---`);
      console.log(`👤 Sua situação:`);
      console.log(`❤️ Vida: ${jogador.vida}/${jogador.vidaMaxima} | 🔵 Mana: ${jogador.mana}/${jogador.manaMaxima}`);
      
      inimigo.mostrarStatus();
      
      console.log(`\n O que você deseja fazer?`);
      console.log(`1.  Atacar`);
      console.log(`2.  Habilidade Especial`);
      console.log(`3.  Fugir`);
      
      let escolha = prompt("Digite sua escolha (1-3): ");
      
      switch(escolha) {
        case "1":
          let inimigoMorreu = jogador.atacar(inimigo);
          if (inimigoMorreu) {
            console.log(`\n ${inimigo.nome} foi derrotado!`);
            console.log(` Vitória conquistada!`);
            jogador.ganharExperiencia(inimigo.experienciaReward);
            return true; // Vitória
          }
          break;
          
        case "2":
          let usouHabilidade = jogador.habilidadeEspecial(inimigo);
          if (usouHabilidade) {
            if (!inimigo.estaVivo) {
              console.log(`\n ${inimigo.nome} foi derrotado pela habilidade especial!`);
              console.log(` Que golpe espetacular!`);
              jogador.ganharExperiencia(inimigo.experienciaReward);
              return true; // Vitória
            }
          } else {
            console.log(" Você perdeu o turno...");
          }
          break;
          
        case "3":
          console.log(` ${jogador.nome} fugiu do combate!`);
          console.log(` Às vezes a prudência é a melhor escolha...`);
          return false; // Fuga
          
        default:
          console.log(" Ação inválida! Você perdeu o turno.");
          break;
      }
      
      // Turno do inimigo (se ainda estiver vivo)
      if (inimigo.estaVivo) {
        console.log(`\n---  Turno de ${inimigo.nome} ---`);
        let jogadorMorreu = inimigo.atacar(jogador);
        if (jogadorMorreu) {
          console.log(`\n ${jogador.nome} foi derrotado!`);
          console.log(` GAME OVER!`);
          console.log(` Não desista! Tente novamente e use estratégias diferentes.`);
          engine.indicaFimDeJogo();
          return false; // Derrota
        }
      }
      
      turno++;
      
      // Pausa dramática entre turnos
      console.log(`\n Pressione Enter para continuar...`);
      prompt("");
    }
    
    return false;
  }
}