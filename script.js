$(function(){

  var locationCounter = 0;
  var combatCounter = 0;
  var playerHealth = 12;
  var winTest = null;

  // game options
  var data =  {
    "text":["You are at the entrance to the ... 100 metres into the corridor/tunnel you come across two doors. Do you choose the left door or the right door?",
    "You see a small goblin sleeping in front of you. As you try to slip past your foot knocks against loose metal chain on the floor. The goblin wakes instantly and charges wielding a small dagger!",
    "You are in a circular room with a basin of water in the middle. The water looks clear and you feel the urge to drink. There is a door at the far side of the room. Do you ...",
    "You cup your hands and take a drink. You feel a rush of energy and notice no ill effects.",
    "You have killed the goblin. There are three doors to choose from. There is a bright light coming from behind the left door. The middle door looks heavier and has iron studs dotted over it. The left door looks to be the most used of the three as the door knob is worn smooth with use. Do you ...",
    "You find yourself in a room with a huge troll. The troll is guarding the treasure. You must fight the troll to get to the treasure."],
    "button":["go left", "go right", "go through the left door", "go through the middle door", "go through the right door", "Take a drink.", "Walk through the door", "Attack the troll!", "Attack the Goblin!", "Ignore the basin and walk through the door.", "Leave through the door.", "Attack the Giant Spider"],
    "enemy":["Goblin", "Troll", "Giant Spider", "enemy4", "enemy5", "enemy6"],
    "enemyHealth":["4", "10", "8"]
  }

  var enemyHealth;

  // setting listeners on game buttons and functions that it applies
  function setGameListeners() {
    $("#start-button").click(startGame);
    $(".choice-button-1").click(choice1);
    $(".choice-button-2").click(choice2);
    $(".combat-roll-button").click(combat);
  }

  // function that happens when the start game button is clicked
  function startGame() {
    $("#restart").remove();
    $(".winMessage").remove();
    $("#decision-text").css("display", "inline-block");
    $(".choice-button-1").css("display", "inline-block");
    $(".choice-button-2").css("display", "inline-block");
    $(".choice-button-1").html(data.button[0]);
    $(".choice-button-2").html(data.button[1]);
    $("#decision-text").html(data.text[0]);
    $(this).css("display", "none");
    locationCounter ++;
  }

  // functions for the decision you make
  function choice1() {
    $(".choice-button-1").css("display", "none");
    $(".choice-button-2").css("display", "none");
    removeDecisionButtons();
    $(".col-md-10").append('<button class="decision-button-1" id="attackGoblin"></button>');
    $("#decision-text").html(data.text[1]);
    $('#attackGoblin').html(data.button[8]);
    winTest = "test";
    combatCounter = 0;
    $('#attackGoblin').click(combatReady);
  }

  function orcWin() {
    removeCombat();
    $("#decision-text").css("display", "inline-block");
    $(".col-md-10").append('<button class="decision-button-3" id="orcFightLeft"></button>')
    $(".col-md-10").append('<button class="decision-button-3" id="orcFightMiddle"></button>')
    $(".col-md-10").append('<button class="decision-button-3" id="orcFightRight"></button>')
    $("#decision-text").html(data.text[4]);
    $("#orcFightLeft").html(data.button[2])
    $("#orcFightMiddle").html(data.button[3])
    $("#orcFightRight").html(data.button[4])
    $("#orcFightLeft").click(orcGoLeft);
    $("#orcFightMiddle").click(orcGoMiddle);
    $("#orcFightRight").click(orcGoRight);
  }

  function choice2() {
    $(".choice-button-1").css("display", "none");
    $(".choice-button-2").css("display", "none");
    $(".col-md-10").append('<button class="decision-button-2" id="drink"></button>')
    $(".col-md-10").append('<button class="decision-button-2" id="noDrink"></button>');
    $("#decision-text").html(data.text[2]);
    $("#drink").html(data.button[5])
    $("#noDrink").html(data.button[9])
    $("#drink").click(drink);
    $("#noDrink").click(giantSpider);
  }

  function drink() {
    removeDecisionButtons();
    $("#decision-text").html(data.text[3]);
    playerHealth = playerHealth + 6;
    $(".col-md-10").append('<button class="decision-button-1" id="leave"></button>')
    $("#leave").html(data.button[6]);
    $("#leave").click(giantSpider);
  }

  function orcGoLeft() {
    removeDecisionButtons();

  }

  function orcGoMiddle() {
    removeDecisionButtons();
  }

  function orcGoRight() {
    removeDecisionButtons();
  }

  function giantSpider() {
    removeDecisionButtons();
    $(".col-md-10").append('<button class="decision-button-1" id="attackSpider"></button>');
    $('#attackSpider').html(data.button[11]);
    winTest = "giantSpider"
    combatCounter = 2;
    $('#attackSpider').click(combatReady);
  }

  function spiderWin() {
    removeCombat();
  }

  function boss(){
    removeDecisionButtons();
    combatCounter = 1;
    winTest = "boss";
    combatReady();
  }

  // function to prepare screen for combat
  function combatReady() {
    removeDecisionButtons();
    $(".combat-roll-button").css("display", "inline-block");
    $(".combat-text").css("display", "inline-block");
    $("#decision-text").css("display", "none");
    enemyHealth = parseInt(data.enemyHealth[combatCounter]);
  }

  // function to engage combat when button is clicked
  function combat() {
    var playerRoll = Math.floor(Math.random() * 6);
    var enemyRoll = Math.floor(Math.random() * 6);
    if (playerRoll > enemyRoll) {
      var damage = playerRoll - enemyRoll;
      enemyHealth = enemyHealth - damage;
      $(".combat-text").html("You did " + damage + " damage. The " + data.enemy[combatCounter] + "'s health is now: " + enemyHealth);
    } else if (enemyRoll > playerRoll) {
      var damage = enemyRoll - playerRoll;
      playerHealth = playerHealth - damage;
      $(".combat-text").html("The " + data.enemy[combatCounter] + " did " + damage + " damage. Your health is now: " + playerHealth);
    } else {
      $(".combat-text").html("You both missed!");
    }

    // check to see if player or enemy has died
    if (playerHealth <= 0) {
      $(".combat-text").html("You are dead!");
      gameLost();
    } else if (enemyHealth <= 0) {
      $(".combat-text").html("The " + data.enemy[combatCounter] + " is dead");
      victory();
    }
  }

  // function to remove old buttons when next decision is made
  function removeDecisionButtons() {
    $(".decision-button-1").remove();
    $(".decision-button-2").remove();
    $(".decision-button-3").remove();
  }

  // function to remove combat screen once combat is completed
  function removeCombat() {
    $(".combat-text").html("You are in combat")
    $(".combat-roll-button").css("display", "none");
    $(".combat-text").css("display", "none");
  }

  // function to go to next function if combat is won
  function victory() {
    if (winTest === "test") {
      orcWin();
    } else if (winTest === "giantSpider") {
      spiderWin();
    } else if (winTest === "boss") {
      gameWon();
    }
  }

  // restart screen if player won
  function gameWon() {
    removeCombat();
    $(".col-md-10").append('<h1 class="winMessage">YOU HAVE WON!</h1>');
    $(".col-md-10").append('<button class="decision-button-1" id="restart">Restart</button>');
    $("#restart").click(restart);
  }

  // restart screen if player lost
  function gameLost() {
    removeCombat();
    $(".col-md-10").append('<h1 class="winMessage">YOU ARE DEAD!</h1>');
    $(".col-md-10").append('<button class="decision-button-1" id="restart">Restart</button>');
    $("#restart").click(restart);
  }

  // function to restart game when button clicked
  function restart() {
    playerHealth = 12;
    winTest = null;
    locationCounter = 0;
    combatCounter = 0;
    startGame();
  }

  setGameListeners();

})
