class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Digite seu nome");
    this.playButton = createButton("Jogar");
    this.titleImg = createImg("./assets/TITULO.png", "nome do jogo");
    this.greeting = createElement("h2");
  }

  setElementsPosition() {
    this.titleImg.position(325,130);
    this.input.position(width / 2 - 126, height / 2 - 70);
    this.playButton.position(width / 2 - 110, height / 2 - 20);
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
    this.titleImg.hide();
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.pressbu ();
  }

  pressbu () {
    this.playButton.mousePressed (()=>{
      this.playButton.hide ();
      this.input.hide ();
      var msg = "esperando outros jogadores";
      this.greeting.html (msg);
      contjog += 1;
      player.nome = this.input.value();
      player.jog1 = contjog;
      player.criarjog ();
      player.atualizar (contjog);
    })
  }
}
