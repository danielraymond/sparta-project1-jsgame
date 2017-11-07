$(function(){

  // var location = 0;
  //
  // var data =  {
  //   "text":["You are at the entrance to the ... 100 metres into the corridor/tunnel you come across two doors. Do you choose the left door or the right door?", "option2", "option3"],
  //   "button1":["go left", "2a1", "2a2"],
  //   "button2":["go right", "2b1", "2b2"]
  // }
  //
  // function setGameListeners() {
  //   $("#start-button").click(startGame);
  //   $(".choice-button-1").click(choice1);
  //   $(".choice-button-2").click(choice2);
  //   $(".combat-roll-button").click(combat);
  // }
  //
  // function startGame() {
  //   $("p").css("visibility", "visible");
  //   $(".choice-button-1").css("visibility", "visible");
  //   $(".choice-button-2").css("visibility", "visible");
  //   $(".choice-button-1").html(data.button1[0]);
  //   $(".choice-button-2").html(data.button2[0]);
  //   $("p").html(data.text[0]);
  //   $(this).css("visibility", "hidden");
  //   location ++;
  // }
  //
  // function choice1() {
  //   if (location === 1) {
  //     $(".choice-button-1").html(data.button1[1]);
  //     $(".choice-button-2").html(data.button2[1]);
  //     $("p").html(data.text[1]);
  //   }
  //   location ++;
  // }
  //
  // function choice2() {
  //   if (location === 1) {
  //     $(".choice-button-1").html(data.button1[2]);
  //     $(".choice-button-2").html(data.button2[2]);
  //     $("p").html(data.text[2]);
  //   }
  //   location ++;
  // }

  var playerHealth = 12;
  var enemyHealth = 6;

  function combat() {
    $(this).css("visibility", "visible");
    $(".combat-text").css("visibility", "visible");
    var playerRoll = Math.floor(Math.random() * 6);
    var enemyRoll = Math.floor(Math.random() * 6);
    console.log(playerRoll);
    if (playerRoll > enemyRoll) {
      var damage = playerRoll - enemyRoll;
      enemyHealth = enemyHealth - damage;
      console.log("You did " + damage + " damage. The enemy's health is now: " + enemyHealth);
    } else if (enemyRoll > playerRoll) {
      var damage = enemyRoll - playerRoll;
      playerHealth = playerHealth - damage;
      console.log("The enemy did " + damage + " damage. Your health is now: " + playerHealth);
    } else {
      console.log("You both missed!");
    }

    if (playerHealth <= 0) {
      console.log("you are dead");
    } else if (enemyHealth <= 0) {
      console.log("the enemy is dead");
    }
  }

$(".combat-roll-button").click(combat);



  // setGameListeners();


  //
  // for(i = 0; i < 3; i++) {
  //   $("button").click(function (){
  //     $("p").css("visibility", "visible");
  //     $(".choiceButton1").css("visibility", "visible");
  //     $(".choiceButton2").css("visibility", "visible");
  //     $("start-button").css("visibility", "hidden");
  //     var location = data.text[i];
  //     debugger;
  //     $("p").html() = location;
  //   });
  //
  // }












})
