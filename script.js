$(function(){

  var locationCounter = 0;
  var combatCounter = 0;
  var playerHealth = 12;
  var winTest = null;

  var data =  {
    "text":["You are at the entrance to the ... 100 metres into the corridor/tunnel you come across two doors. Do you choose the left door or the right door?",
    "You are in a circular room with a basin of water in the middle. The water looks clear and you feel the urge to drink. There is a door at the far side of the room. Do you ",
    "You cup your hands and take a drink. You feel a rush of energy and notice no ill effects.",
    "You have killed the orc. There is nothing else in the room apart from a large wooden door.",
    "You find yourself in a room with a huge troll. The troll is guarding the treasure. You must fight the troll to get to the treasure."],
    "button1":["go left", "Take a drink.", "Walk through the door", "Attack the troll!"],
    "button2":["go right", "Attack the Orc!", "Ignore the basin and walk through the door.", "Leave through the door."],
    "enemy":["Goblin", "Troll"],
    "enemyHealth":["6", "10"]
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
    $(".choice-button-1").html(data.button1[0]);
    $(".choice-button-2").html(data.button2[0]);
    $("#decision-text").html(data.text[0]);
    $(this).css("display", "none");
    locationCounter ++;
  }

  // function for the decision you make
  function choice1() {
    $(".choice-button-1").css("display", "none");
    $(".choice-button-2").css("display", "none");
    removeDecisionButtons();
    winTest = "test";
    combatCounter = 0;
    combatReady();
  }

  function orcWin() {
    removeCombat();
    $("#decision-text").css("display", "inline-block");
    $(".col-md-10").append('<button class="decision-button-1" id="orcFightWin"></button>')
    $("#decision-text").html(data.text[3]);
    $("#orcFightWin").html(data.button2[3]);
    $("#orcFightWin").click(boss);
  }

  function choice2() {
    $(".choice-button-1").css("display", "none");
    $(".choice-button-2").css("display", "none");
    $(".col-md-10").append('<button class="decision-button-2" id="drink"></button>')
    $(".col-md-10").append('<button class="decision-button-2" id="noDrink"></button>');
    $("#decision-text").html(data.text[1]);
    $("#drink").html(data.button1[1])
    $("#noDrink").html(data.button2[2])
    $("#drink").click(drink);
    $("#noDrink").click(boss);
  }

  function drink() {
    removeDecisionButtons();
    $("#decision-text").html(data.text[2]);
    playerHealth = playerHealth + 6;
    $(".col-md-10").append('<button class="decision-button-1" id="leave"></button>')
    $("#leave").html(data.button2[3]);
    $("#leave").click(boss);
  }

  function boss(){
    removeDecisionButtons();
    combatCounter = 1;
    winTest = "boss";
    combatReady();
  }

  function combatReady() {
    $(".combat-roll-button").css("display", "inline-block");
    $(".combat-text").css("display", "inline-block");
    $("#decision-text").css("display", "none");
    enemyHealth = parseInt(data.enemyHealth[combatCounter]);
  }

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

    if (playerHealth <= 0) {
      $(".combat-text").html("You are dead!");
      gameLost();
    } else if (enemyHealth <= 0) {
      $(".combat-text").html("The " + data.enemy[combatCounter] + " is dead");
      victory();
    }
  }

  function removeDecisionButtons() {
    $(".decision-button-1").remove();
    $(".decision-button-2").remove();
  }

  function removeCombat() {
    $(".combat-text").html("You are in combat")
    $(".combat-roll-button").css("display", "none");
    $(".combat-text").css("display", "none");
  }

  function victory() {
    if (winTest === "test") {
      orcWin();
    } else if (winTest === "boss") {
      gameWon();
    }
  }

  function gameWon() {
    removeCombat();
    $(".col-md-10").append('<h1 class="winMessage">YOU HAVE WON!</h1>');
    $(".col-md-10").append('<button class="decision-button-1" id="restart">Restart</button>');
    $("#restart").click(restart);
  }

  function gameLost() {
    removeCombat();
    $(".col-md-10").append('<h1 class="winMessage">YOU ARE DEAD!</h1>');
    $(".col-md-10").append('<button class="decision-button-1" id="restart">Restart</button>');
    $("#restart").click(restart);
  }

  function restart() {
    playerHealth = 12;
    winTest = null;
    locationCounter = 0;
    combatCounter = 0;
    startGame();
  }

  setGameListeners();







function path2() {
  // Use jquery to create two new buttons and give them ids
  // Add a new id to them and target that
  // Add new event listeners to these new buttons
  // Have the event listeners call new fucntions e.g. path3 or path4
  // Rinse and repeat
}







})
