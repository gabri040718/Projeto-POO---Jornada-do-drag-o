import { Engine } from "./basicas.js";
import { Jogador } from "./combat/Jogador.js";
import { Floresta } from "./salas/Floresta.js";
import { Cabana } from "./salas/Cabana.js";
import { Caverna } from "./salas/Caverna.js";
import { Lago } from "./salas/Lago.js";
import { Torre } from "./salas/Torre.js";
import { Templo } from "./salas/Templo.js";
import { TemploSecreto } from "./salas/TemploSecreto.js";
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class JogoFloresta extends Engine {
  constructor() {
    super();
    this.selecionarClasse();
    this.criaCenario();
  }

  selecionarClasse() {
    console.log("\n ==========================================");
    console.log("      BEM-VINDO À AVENTURA! ");
    console.log(" ==========================================");
    console.log("\nVocê está prestes a embarcar em uma jornada épica");
    console.log("em busca da lendária Espada Ancestral do Fogo Negro!");
    console.log("\nMas primeiro, escolha sua classe de aventureiro:");
    console.log("\n ======== CLASSES DISPONÍVEIS ========");
    console.log("1. 🗺️  EXPLORADOR");
    console.log("   • Especialista em ferramentas e exploração");
    console.log("   • Bonus: +5 Agilidade, ferramentas duram mais");
    console.log("   • Habilidade: Golpe Preciso (15 mana)");
    console.log("\n2. 🔮 MÍSTICO");
    console.log("   • Mestre dos elementos mágicos");
    console.log("   • Bonus: +5 Inteligência, +30 Mana");
    console.log("   • Habilidade: Bola de Fogo (20 mana)");
    console.log("\n3. ⚔️  GUERREIRO");
    console.log("   • Força bruta e resistência");
    console.log("   • Bonus: +5 Força, +50 Vida");
    console.log("   • Habilidade: Ataque Poderoso (10 mana)");
    console.log("\n4. 🗡️  LADINO");
    console.log("   • Rápido, esperto e furtivo");
    console.log("   • Bonus: +5 Agilidade, +10 Mana");
    console.log("   • Habilidade: Ataque Súbito (12 mana)");
    
    let escolha = prompt("\n🎮 Digite o número da sua escolha (1-4): ");
    let nome = prompt(" Digite o nome do seu personagem: ") || "Aventureiro";
    
    let tipoEscolhido;
    switch(escolha) {
      case "1":
        tipoEscolhido = "Explorador";
        break;
      case "2":
        tipoEscolhido = "Mistico";
        break;
      case "3":
        tipoEscolhido = "Guerreiro";
        break;
      case "4":
        tipoEscolhido = "Ladino";
        break;
      default:
        console.log(" Escolha inválida, selecionando Explorador...");
        tipoEscolhido = "Explorador";
        break;
    }
    
    this.jogador = new Jogador(nome, tipoEscolhido);
    
    console.log("\n ==========================================");
    console.log(` ${nome} o ${tipoEscolhido} foi criado!`);
    console.log(" ==========================================");
    this.jogador.mostrarStatus();
    console.log("\n Sua jornada épica está prestes a começar...");
    console.log(" Objetivo: Encontrar a Espada Ancestral do Fogo Negro!");
    console.log("\n Dica: Use 'ajuda' para ver todos os comandos disponíveis.");
    console.log(" Prepare-se para enfrentar desafios e inimigos!");
    
    console.log("\n Pressione Enter para iniciar a aventura...");
    prompt("");
  }

  criaCenario() {
    let floresta = new Floresta(this);
    let cabana = new Cabana(this);
    let caverna = new Caverna(this);
    let lago = new Lago(this);
    let torre = new Torre(this);
    let templo = new Templo(this);

    // Conectando as salas
    floresta.portas.set(cabana.nome, cabana);
    floresta.portas.set(caverna.nome, caverna);
    cabana.portas.set(floresta.nome, floresta);
    caverna.portas.set(floresta.nome, floresta);
    caverna.portas.set(lago.nome, lago);
    lago.portas.set(caverna.nome, caverna);
    lago.portas.set(torre.nome, torre);
    torre.portas.set(lago.nome, lago);
    torre.portas.set(templo.nome, templo);
    templo.portas.set(torre.nome, torre);

    this.salaCorrente = floresta;
    
    console.log("\n ==========================================");
    console.log("         CENÁRIO CRIADO! ");
    console.log(" ==========================================");
    console.log(" Você se encontra na entrada de uma floresta misteriosa...");
    console.log(" Sua busca pela Espada Ancestral do Fogo Negro começa AGORA!");
  }

  // Override do método joga para mostrar dicas especiais
  joga() {
    console.log("\n ==========================================");
    console.log("          JOGO INICIADO! ");
    console.log(" ==========================================");
    console.log(" DICAS IMPORTANTES:");
    console.log("• Use 'atacar' quando encontrar inimigos");
    console.log("• Use 'status' para ver suas informações");
    console.log("• Gerencie sua mana para habilidades especiais");
    console.log("• Explore todas as salas para encontrar itens");
    console.log("• Alguns puzzles podem ter soluções alternativas baseadas na sua classe");
    
    super.joga();
  }
}