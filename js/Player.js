class Player {
  constructor() {
    this.nome = null;
    this.jog1 = null;
    this.x = 0;
    this.y = 0;

    this.gasol = 100;
    this.vida = 100;
    this.coin = 0;

    this.ranking = 0;
  }

  criarjog (){
    var past = "jogs/jog" + this.jog1
    if (this.jog1 == 1){
      this.x = width / 2 + 150;
    }else {
      this.x = width/2 -180;
    }
    
    database.ref (past).set({
      nome : this.nome,
      x : this.x,
      y : this.y,
      gasol : this.gasol,
      vida : this.vida,
      coin : this.coin,
    })

  }


  pegarran (){
    var pginfo = database.ref ("ranking")
    pginfo.on ("value", function (data){
      this.ranking = data.val ();
    });
  }

  atualizarran (nvest){
    database.ref ("/").update ({
      ranking : nvest
    })
  }


  static infojog (){
    var pginfo = database.ref ("jogs")
    pginfo.on ("value", function (data){
      jogs = data.val ();
      console.log (pginfo)
    });
  }

  pegar (){
    var pginfo = database.ref ("contjog")
    pginfo.on ("value", function (data){
      contjog = data.val ();
    });
  }

  atualizar (nvest){
    database.ref ("/").update ({
      contjog : nvest
    })
  }

  atuapo (){
    var past = "jogs/jog" + this.jog1
    database.ref (past).update({
      x : this.x,
      y : this.y,
      gasol : this.gasol,
      vida : this.vida,
      coin : this.coin,
    })
  }
}
