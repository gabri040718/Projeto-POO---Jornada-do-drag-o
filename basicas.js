import promptSync from 'prompt-sync';
const prompt = promptSync();

// ==========================
// Classe Mochila
// ==========================
export class Mochila {
  #ferramentas;
  constructor() { this.#ferramentas = []; }
  guarda(ferramenta) {
    validate(ferramenta, Ferramenta);
    this.#ferramentas.push(ferramenta);
  }
  pega(nomeFerramenta) {
    validate(arguments, ["String"]);
    let ferramenta = this.#ferramentas.find(f => f.nome === nomeFerramenta);
    return ferramenta; 
  }
  tem(nomeFerramenta) {
    validate(arguments, ["String"]);
    return this.#ferramentas.some(f => f.nome === nomeFerramenta);
  }
  inventario() {
    return this.#ferramentas.map(obj => obj.nome).join(", ");
  }
}

// ==========================
// Classe Ferramenta
// ==========================
export class Ferramenta {
  #nome;
  constructor(nome) {
    validate(nome, "String");
    this.#nome = nome;
  }
  get nome() { return this.#nome; }
  usar() { return true; }
}

// ==========================
// Classe Objeto
// ==========================
export class Objeto {
  #nome;
  #descricaoAntesAcao;
  #descricaoDepoisAcao;
  #acaoOk;
  #engine; 
  
  constructor(nome, descricaoAntesAcao, descricaoDepoisAcao, engine = null) {
    validate(arguments, ["String","String","String"]);
    this.#nome = nome;
    this.#descricaoAntesAcao = descricaoAntesAcao;
    this.#descricaoDepoisAcao = descricaoDepoisAcao;
    this.#acaoOk = false;
    this.#engine = engine; 
  }
  
  get nome(){ return this.#nome; }
  get acaoOk(){ return this.#acaoOk; }
  get engine(){ return this.#engine; } 
  
  set acaoOk(acaoOk){
    validate(acaoOk,"Boolean");
    this.#acaoOk = acaoOk;
  }
  
  set engine(engine){ 
    this.#engine = engine;
  }
  
  get descricao(){
    if (!this.acaoOk){
      return this.#descricaoAntesAcao;
    } else {
      return this.#descricaoDepoisAcao;
    }
  }
  
  usar(ferramenta){ 
    return false; 
  }
}

// ==========================
// Classe Sala
// ==========================
export class Sala {
  #nome;
  #objetos;
  #ferramentas;
  #portas;
  #engine;
  constructor(nome, engine){
    validate(arguments,["String",Engine]);
    this.#nome = nome;
    this.#objetos = new Map();
    this.#ferramentas = new Map();
    this.#portas = new Map();
    this.#engine = engine;
  }
  get nome(){ return this.#nome; }
  get objetos(){ return this.#objetos; }
  get ferramentas(){ return this.#ferramentas; }
  get portas(){ return this.#portas; }
  get engine(){ return this.#engine; }

  objetosDisponiveis(){
    let arrObjs = [...this.#objetos.values()];
    return arrObjs.map(obj => obj.nome+":"+obj.descricao);
  }
  ferramentasDisponiveis(){
    let arrFer = [...this.#ferramentas.values()];
    return arrFer.map(f => f.nome);
  }
  portasDisponiveis(){
    let arrPortas = [...this.#portas.values()];
    return arrPortas.map(sala => sala.nome);
  }
  pega(nomeFerramenta){
    validate(nomeFerramenta,"String");
    let ferramenta = this.#ferramentas.get(nomeFerramenta);
    if (ferramenta != null){
      this.#engine.mochila.guarda(ferramenta);
      this.#ferramentas.delete(nomeFerramenta);
      return true;
    } else {
      return false;
    }
  }
  sai(porta){
    validate(porta,"String");
    return this.#portas.get(porta);
  }
  textoDescricao(){
    let descricao = "Você está no "+this.nome+"\n";
    if (this.objetos.size == 0){
      descricao += "Não há objetos na sala\n";
    } else {
      descricao += "Objetos: "+this.objetosDisponiveis()+"\n";
    }
    if (this.ferramentas.size == 0){
      descricao += "Não há ferramentas na sala\n";
    } else {
      descricao += "Ferramentas: "+this.ferramentasDisponiveis()+"\n";
    }
    descricao += "Portas: "+this.portasDisponiveis()+"\n";
    return descricao;
  }
  usa(nomeFerramenta, nomeObjeto){
    let ferramenta = this.#engine.mochila.pega(nomeFerramenta);
    if (!ferramenta) {
      return false; 
    }
    
    let objeto = this.#objetos.get(nomeObjeto);
    if (!objeto) {
      return false; 
    }
    
    return objeto.usar(ferramenta);
  }

  // Novo método para combate
  atacar() {
    console.log("Não há inimigos nesta sala.");
    return false;
  }
}

// ==========================
// Classe Engine
// ==========================
export class Engine {
  #mochila;
  #jogador;
  #salaCorrente;
  #fim;
  
  constructor(){
    this.#mochila = new Mochila();
    this.#jogador = null;
    this.#salaCorrente = null;
    this.#fim = false;
  }
  
  get mochila(){ return this.#mochila; }
  get jogador(){ return this.#jogador; }
  get salaCorrente(){ return this.#salaCorrente; }
  
  set jogador(jogador){ this.#jogador = jogador; }
  set salaCorrente(sala){
    validate(sala,Sala);
    this.#salaCorrente = sala;
  }
  
  indicaFimDeJogo(){ this.#fim = true; }
  criaCenario(){} 
  selecionarClasse(){}

  joga(){
    let novaSala = null;
    let acao = "";
    let tokens = null;

    while (!this.#fim){
      console.log("-------------------------");
      console.log(this.salaCorrente.textoDescricao());
      
      // Mostra status do jogador se existir
      if (this.#jogador) {
        console.log(`\n👤 ${this.#jogador.nome} (${this.#jogador.tipo}) - Nível ${this.#jogador.nivel}`);
        console.log(`❤️ ${this.#jogador.vida}/${this.#jogador.vidaMaxima} | 🔵 ${this.#jogador.mana}/${this.#jogador.manaMaxima}`);
      }
      
      acao = prompt("\nO que você deseja fazer? ");
      tokens = acao.split(" ");
      
      switch(tokens[0]){
        case "fim":
          this.#fim = true;
          break;
          
        case "pega":
          if (this.salaCorrente.pega(tokens[1])){
            console.log("Ok! " + tokens[1] + " guardado!");
          } else {
            console.log("Objeto " + tokens[1] + " não encontrado.");
          }
          break;
          
        case "inventario":
          console.log("Ferramentas disponíveis: " + this.#mochila.inventario());
          break;
          
        case "usa":
          if (this.salaCorrente.usa(tokens[1],tokens[2])){
            console.log("Feito!!");
            if (this.#fim == true){
              console.log("Parabéns, você venceu!");
            }
          } else {
            console.log("Não é possível usar " + tokens[1] + " sobre " + tokens[2]);
          }
          break;
          
        case "sai":
          novaSala = this.salaCorrente.sai(tokens[1]);
          if (novaSala == null){
            console.log("Sala desconhecida...");
          } else {
            this.#salaCorrente = novaSala;
          }
          break;
          
        case "atacar":
        case "ataca":
          this.salaCorrente.atacar();
          break;
          
        case "status":
          if (this.#jogador) {
            this.#jogador.mostrarStatus();
          } else {
            console.log("Nenhum personagem selecionado.");
          }
          break;
          
        case "ajuda":
        case "help":
          console.log("=== COMANDOS DISPONÍVEIS ===");
          console.log("• pega <ferramenta> : Pega ferramentas da sala atual");
          console.log("• usa <ferramenta> <objeto> : Usa ferramenta do inventário em objeto da sala");
          console.log("• sai <porta> : Vai para outra sala através da porta");
          console.log("• inventario : Mostra suas ferramentas");
          console.log("• atacar : Inicia combate com inimigos na sala");
          console.log("• status : Mostra informações do seu personagem");
          console.log("• ajuda : Exibe esta mensagem");
          console.log("• fim : Encerra o jogo");
          console.log("============================");
          break;
          
        default:
          console.log("Comando desconhecido: " + tokens[0]);
          console.log("Digite 'ajuda' para ver os comandos disponíveis.");
          break;
      }
    }
    console.log("Jogo encerrado!");
  }
}

// ==========================
// Função de validação auxiliar
// ==========================
function validate(param, type){
  return true;
}