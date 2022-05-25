class Game {
  constructor() {

    this.resetbu = createButton ("reiniciar");
    this.movemen = false;
    
  }
  stypo (){
    this.resetbu.class ("customButton");

    this.resetbu.position (width/2 + 470, height/2 - 250);

    this.resetbu.mousePressed (()=>{
      database.ref ("/").set({
        contjog : 0,
        estadojg : 0,
        jogs : {},
        ranking : 0, 
      })
      window.location.reload ();
    })
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.pegar();
    spribran = createSprite (width/2 + 150,500,20,20);
    spripre = createSprite (width/2 - 180,500, 20, 20);

    spripre.scale = 1.7;
    spribran.scale = 1.7;
    
    spribran.addImage (carbran);
    spripre.addImage (carpre);

    cars = [spribran, spripre];

    groupcoin = new Group ();

    groupobst = new Group ();

    groupgaso = new Group ();

    this.criarspri (groupcoin, 5, coin, 0.1);
    this.criarspri (groupobst, 3, dog, 0.15);
    this.criarspri (groupobst, 3, pneu, 0.04);
    this.criarspri (groupobst, 3, cone, 0.04);
    this.criarspri (groupgaso, 8, gasolina, 0.02);
  }

   coletarcoin (ind){
     cars [ind - 1].overlap (groupcoin, function (colector, colected){
       colected.remove ();

       player.coin += 1;
       player.atuapo ();
     })
   }

   coletargaso (ind){
     cars [ind - 1].overlap (groupgaso, function (colector, colected){
       colected.remove ();

       player.gasol = 100;
       player.atuapo ();
     })
     if (player.gasol > 0 && this.movemen == true){
       player.gasol -= 0.3;
     }
     if (player.gasol <= 0 ){
       estadojg = 2;
       this.perdeu ();
     }
   }

   coletarobst (ind){
     cars [ind - 1].overlap (groupobst, function (colector, colected){
       colected.remove ();


      if (player.vida >= 0){ 
      player.vida -= 50;
      }

       player.atuapo ();
     })
     if (player.vida < 0){
       estadojg = 2;
       this.perdeu ();

     }
   }

   showlife (){
   image (heart, width/2 - 500, height - player.y, 30, 30);  
   rect (width / 2 - 450, height - player.y, player.vida, 20);
  }

  showgasol (){
    image (gasolina, width / 2 - 500, height - player.y -100, 30, 30);
    rect  (width /2 - 450, height - player.y - 100, player.gasol, 20);
  }

  criarspri (group, numero, img, scale){
    for (var i = 0; i < numero; i++){
      var x;
      var y;
      x = random (443, 893);
      y = random (-height*9, height);

      var sprite = createSprite (x, y);
      sprite.addImage (img);
      sprite.scale = scale;
      group.add (sprite);
    }

  }
  pegar() {
    var pginfo = database.ref ("estadojg")
      pginfo.on ("value", function (data){
        estadojg = data.val ();
      });
  }
  atualizar (nvest){
    database.ref ("/").update ({
      estadojg : nvest
    })
  }

  play (){
    form.hide ();
    Player.infojog ();
    player.pegarran ();
    this.stypo ();
    image (pista, 0, -height * 9, width, height * 10);
    var indcar = 0;
    console.log (jogs)
    for (var i in jogs){
      indcar += 1;
      var x = jogs[i].x;
      var y = height - jogs [i].y;
      cars [indcar - 1].position.x = x;
      cars [indcar - 1].position.y = y;

      if (indcar == player.jog1){
        camera.position.y = cars [indcar-1].position.y;
        ellipse (x,y,100, 100);
        this.coletarcoin (indcar);
        this.coletargaso (indcar);
        this.coletarobst (indcar);
      }
    }
    this.controls ();
    
    const chegada = height * 10-50;
    if (player.y > chegada){
      estadojg = 2;
      player.ranking += 1;
      player.atualizarran (player.ranking);
      player.atuapo ();
      this.placar ();
      this.perdeu ();
    }

    drawSprites ();
    this.showlife ();
    this.showgasol ();

  }


  placar (){
    swal ({
      title : "voce chegou",
      text : `${player.ranking}lugar`,
      imageUrl :"https://shopify-customerio.s3.amazonaws.com/tools/image_attachment/image/custom_resized_b1960be3-ea47-442d-a7fc-ee3ee29b70d4.jpg",
      imageSize : "200 x 200",
      confirmButtonText : "jogar de novo",

    })
  }

  perdeu (){
    swal ({
      title : "voce perdeu",
      imageUrl : "https://media.istockphoto.com/vectors/sad-crying-dog-cartoon-vector-illustration-dog-with-tears-crying-dog-vector-id1134882201?k=20&m=1134882201&s=612x612&w=0&h=7FNbzIXMomZgjPhhkLpUwIfW2NgtqRaH1iVezE-LCR0=",
      imageSize : "200 x 200",
      confirmButtonText : "jogar de novo",

    })
  }

  controls (){
    if (keyDown ("UP_ARROW")){
      player.y += 20;
      player.atuapo ();
      this.movemen = true;

    }
    if (keyDown ("DOWN_ARROW")){
      player.y -= 20;
      player.atuapo();
    }
      if (keyDown ("LEFT_ARROW") && player.x >= 443){
        player.x -= 15;
        player.atuapo();
    }
    if (keyDown("RIGHT_ARROW") && player.x <= 893){
      player.x += 15;
      player.atuapo ();
    }
    
  }


}

