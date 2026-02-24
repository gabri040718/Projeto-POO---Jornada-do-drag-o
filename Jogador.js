// ==========================
// Classe Jogador - Sistema de Personagens
// ==========================

export class Jogador {
  #nome;
  #tipo;
  #nivel;
  #experiencia;
  #vida;
  #vidaMaxima;
  #mana;
  #manaMaxima;
  #forca;
  #agilidade;
  #inteligencia;

  constructor(nome, tipo = "Explorador") {
    this.#nome = nome;
    this.#tipo = tipo;
    this.#nivel = 1;
    this.#experiencia = 0;
    
    // Stats base dependem do tipo
    this.aplicarBonusClasse();
  }

  aplicarBonusClasse() {
    switch(this.#tipo) {
      case "Explorador":
        this.#vida = 100;
        this.#vidaMaxima = 100;
        this.#mana = 50;
        this.#manaMaxima = 50;
        this.#forca = 10;
        this.#agilidade = 15; // Bonus +5
        this.#inteligencia = 10;
        break;
      case "Mistico":
        this.#vida = 80;
        this.#vidaMaxima = 80;
        this.#mana = 80; // Bonus +30
        this.#manaMaxima = 80;
        this.#forca = 8;
        this.#agilidade = 10;
        this.#inteligencia = 15; // Bonus +5
        break;
      case "Guerreiro":
        this.#vida = 150; // Bonus +50
        this.#vidaMaxima = 150;
        this.#mana = 30;
        this.#manaMaxima = 30;
        this.#forca = 15; // Bonus +5
        this.#agilidade = 8;
        this.#inteligencia = 8;
        break;
      case "Ladino":
        this.#vida = 90;
        this.#vidaMaxima = 90;
        this.#mana = 60;
        this.#manaMaxima = 60;
        this.#forca = 9;
        this.#agilidade = 15; // Bonus +5
        this.#inteligencia = 12;
        break;
    }
  }

  // Getters
  get nome() { return this.#nome; }
  get tipo() { return this.#tipo; }
  get nivel() { return this.#nivel; }
  get experiencia() { return this.#experiencia; }
  get vida() { return this.#vida; }
  get vidaMaxima() { return this.#vidaMaxima; }
  get mana() { return this.#mana; }
  get manaMaxima() { return this.#manaMaxima; }
  get forca() { return this.#forca; }
  get agilidade() { return this.#agilidade; }
  get inteligencia() { return this.#inteligencia; }
  get estaVivo() { return this.#vida > 0; }

  // Combate
  atacar(inimigo) {
    let danoBase = this.#forca + Math.floor(Math.random() * 6); // 1d6
    let danoFinal = Math.max(1, danoBase - inimigo.defesa);
    
    console.log(`⚔️ ${this.#nome} ataca por ${danoFinal} de dano!`);
    return inimigo.receberDano(danoFinal);
  }

  receberDano(dano) {
    this.#vida = Math.max(0, this.#vida - dano);
    console.log(`💔 ${this.#nome} recebe ${dano} de dano! Vida: ${this.#vida}/${this.#vidaMaxima}`);
    return this.#vida <= 0;
  }

  curar(quantidade) {
    this.#vida = Math.min(this.#vidaMaxima, this.#vida + quantidade);
    console.log(`💚 ${this.#nome} se cura em ${quantidade} pontos! Vida: ${this.#vida}/${this.#vidaMaxima}`);
  }

  ganharExperiencia(xp) {
    this.#experiencia += xp;
    console.log(`⭐ +${xp} XP! Total: ${this.#experiencia}`);
    
    let xpNecessario = this.#nivel * 100;
    if (this.#experiencia >= xpNecessario) {
      this.subirNivel();
    }
  }

  subirNivel() {
    this.#nivel++;
    this.#forca += 2;
    this.#agilidade += 2;
    this.#inteligencia += 2;
    this.#vidaMaxima += 20;
    this.#manaMaxima += 10;
    this.#vida = this.#vidaMaxima; // Cura completa
    this.#mana = this.#manaMaxima;
    
    console.log(`🎉 LEVEL UP! Agora você é nível ${this.#nivel}!`);
    console.log(`📈 Todos os stats aumentaram! Vida/Mana restauradas!`);
  }

  // Habilidades especiais por classe
  habilidadeEspecial(alvo = null) {
    switch(this.#tipo) {
      case "Explorador":
        return this.golpePreciso(alvo);
      case "Mistico":
        return this.bolaDeFogo(alvo);
      case "Guerreiro":
        return this.ataquePoderoso(alvo);
      case "Ladino":
        return this.ataqueSubito(alvo);
    }
    return false;
  }

  golpePreciso(inimigo) {
    if (this.#mana < 15) {
      console.log("❌ Mana insuficiente! (Necessário: 15)");
      return false;
    }
    this.#mana -= 15;
    let dano = this.#agilidade + 10; // Sempre acerta
    console.log(`🎯 ${this.#nome} usa Golpe Preciso!`);
    return inimigo.receberDano(dano);
  }

  bolaDeFogo(inimigo) {
    if (this.#mana < 20) {
      console.log("❌ Mana insuficiente! (Necessário: 20)");
      return false;
    }
    this.#mana -= 20;
    let dano = this.#inteligencia + 15;
    console.log(`🔥 ${this.#nome} lança uma Bola de Fogo!`);
    return inimigo.receberDano(dano);
  }

  ataquePoderoso(inimigo) {
    if (this.#mana < 10) {
      console.log("❌ Mana insuficiente! (Necessário: 10)");
      return false;
    }
    this.#mana -= 10;
    let dano = this.#forca * 2;
    console.log(`💪 ${this.#nome} usa Ataque Poderoso!`);
    return inimigo.receberDano(dano);
  }

  ataqueSubito(inimigo) {
    if (this.#mana < 12) {
      console.log("❌ Mana insuficiente! (Necessário: 12)");
      return false;
    }
    this.#mana -= 12;
    let dano = this.#agilidade + this.#inteligencia;
    console.log(`🗡️ ${this.#nome} ataca pelas costas!`);
    return inimigo.receberDano(dano);
  }

  mostrarStatus() {
    console.log(`\n=== ${this.#nome} (${this.#tipo}) - Nível ${this.#nivel} ===`);
    console.log(`❤️  Vida: ${this.#vida}/${this.#vidaMaxima}`);
    console.log(`🔵 Mana: ${this.#mana}/${this.#manaMaxima}`);
    console.log(`⚔️  Força: ${this.#forca} | 🏃 Agilidade: ${this.#agilidade} | 🧠 Inteligência: ${this.#inteligencia}`);
    console.log(`⭐ XP: ${this.#experiencia}/${this.#nivel * 100}`);
    
    // Mostra habilidade especial
    switch(this.#tipo) {
      case "Explorador":
        console.log(`🎯 Habilidade: Golpe Preciso (15 mana)`);
        break;
      case "Mistico":
        console.log(`🔥 Habilidade: Bola de Fogo (20 mana)`);
        break;
      case "Guerreiro":
        console.log(`💪 Habilidade: Ataque Poderoso (10 mana)`);
        break;
      case "Ladino":
        console.log(`🗡️ Habilidade: Ataque Súbito (12 mana)`);
        break;
    }
    console.log(`=======================================`);
  }

  // Métodos especiais por classe (fora de combate)
  podeUsarForcaBruta() {
    return this.#tipo === "Guerreiro" && this.#forca >= 12;
  }

  podeFazerLockpick() {
    return this.#tipo === "Ladino" && Math.random() < 0.6;
  }

  podeSentirElementos() {
    return this.#tipo === "Mistico" && this.#mana >= 10;
  }

  ferramentaDuraMais() {
    return this.#tipo === "Explorador" && Math.random() < 0.5;
  }
}