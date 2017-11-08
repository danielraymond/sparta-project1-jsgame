$(function(){

  var locationCounter = null;
  var playerHealth = 12;

  // game options
  var data =  {
    "text":["You are at the entrance to the ... 100 metres into the corridor/tunnel you come across two doors. Do you choose the left door or the right door?",

    "You see a small goblin sleeping in front of you. As you try to slip past your foot knocks against a loose metal chain on the floor. The goblin wakes instantly and charges wielding a small dagger!",

    "You are in a circular room with a basin of water in the middle. The water looks clear and you feel the urge to drink. There is a door at the far side of the room. Do you ...",

    "You cup your hands and take a drink. You feel a rush of energy and notice no ill effects.",

    "You have killed the goblin. There are three doors to choose from. There is a bright light coming from behind the left door. The middle door looks heavier and has iron studs dotted over it. The left door looks to be the most used of the three as the door knob is worn smooth with use. Do you ...",

    "You enter a large, dark and foul smelling room. As you take a step forwards you feel something brush against your face. It is a spider's web, but the strands are thicker than any you have ever seen. Suddenly out of the darkness a spider the size of a large dog rushes at you.",

    "The ruined body of the spider slumps to the side. On your way towards the far end of the room you brush against the skeleton of a man clad in full armour. Most of it looks inferior to your own however his helmet is of far better quality than anything else he was wearing. Do you ...",

    "You place the helmet on your head and go to leave. You leave the room through the far door. After a few metres the corridor splits. Which way would you like to go?",

    "You leave the room through the far door. After a few metres the corridor splits. Which way would you like to go?",

    "You are in a room with an event. Do you (2 options)...",

    "Text if yes event1",

    "Text if no event1",

    "You are in a room with an item. Do you (2 options)...",

    "Text if no item1",

    "Text if yes item1",

    "You are in a room with nothing in it ...(1 option)",

    "You are in a room with combat and an event. combat starts",

    "You have killed the enemy now for the event. (2 options)",

    "Text for the event yes.",

    "Text for the event no",

    "You are in a room with an item (2 options)",

    "Text if yes",

    "Text if no",

    "You are in a room with an event. (2 options)",

    "Text if option 1",

    "Text if option 2",

    "You find yourself in a room with a huge troll. The troll is guarding the treasure. You must fight the troll to get to the treasure."],

    "button":["Go left.",

    "Go right.",

    "go through the left door",

    "go through the middle door",

    "go through the right door",

    "Take a drink.",

    "Walk through the door",

    "Attack the troll!",

    "Attack the Goblin!",

    "Ignore the basin and walk through the door.",

    "Leave through the door.",

    "Attack the Giant Spider",

    "Take the helmet",

    "Ignore the helmet and leave.",

    "say yes to event1",

    "say no to event1",

    "say yes to item1",

    "say no to item1",

    "go into the next room"],

    "enemy":["Goblin", "Troll", "Giant Spider", "enemy4", "enemy5", "enemy6"],

    "enemyHealth":["1", "1", "1", "1", "1", "1"]
  }

  var enemyHealth;
  var playerItems = [""];
  var itemCheck = null;
  var playerHasItem = null;
  var combatCounter = null;
  var winTest = null;

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
    $("#drink").html(data.button[5]);
    $("#noDrink").html(data.button[9]);
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
    $('#decision-text').html(data.text[9]);
    $('.col-md-10').append('<button class="decision-button-2" id="eventOne1"></button>');
    $('.col-md-10').append('<button class="decision-button-2" id="eventOne2"></button>');
    $('#eventOne1').html(data.button[14]);
    $('#eventOne2').html(data.button[15]);
    $('#eventOne1').click(yesToEvent1);
    $('#eventOne2').click(leftCombatEventRoom);
  }

  function orcGoMiddle() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[12]);
    $('.col-md-10').append('<button class="decision-button-2" id="itemOne1"></button>');
    $('.col-md-10').append('<button class="decision-button-2" id="itemOne2"></button>');
    $('#itemOne1').html(data.button[16]);
    $('#itemOne2').html(data.button[17]);
    $('#itemOne1').click(yesToItem1);
    $('#itemOne2').click(leftCombatEventRoom);
  }

  function orcGoRight() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[15]);
    $('.col-md-10').append('<button class="decision-button-1" id="nothingRoom1"></button>');
    $('#nothingRoom1').html(data.button[18]);
    $('#nothingRoom1').click(joinedItemRoom);
  }

  function giantSpider() {
    removeDecisionButtons();
    $(".col-md-10").append('<button class="decision-button-1" id="attackSpider"></button>');
    $("#decision-text").html(data.text[5]);
    $('#attackSpider').html(data.button[11]);
    winTest = "giantSpider";
    combatCounter = 2;
    $('#attackSpider').click(combatReady(combatCounter));
  }

  function spiderWin() {
    removeCombat();
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinItem"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinNoItem"></button>');
    $('#decision-text').html(data.text[6]);
    $('#spiderWinItem').html(data.button[12]);
    $('#spiderWinNoItem').html(data.button[13]);
    $('#spiderWinItem').click(takeHelmet);
    $('#spiderWinNoItem').click(ignoreTheHelmet);
  }

  function takeHelmet() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[7]);
    playerItems.push("helmet");
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinGoLeft"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinGoRight"></button>');
    $('#spiderWinGoLeft').html(data.button[0]);
    $('#spiderWinGoRight').html(data.button[1]);
    $('#spiderWinGoLeft').click(joinedItemRoom);
    $('#spiderWinGoRight').click(eventRoomFarRight);
  }

  function ignoreTheHelmet() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[8]);
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinGoLeft"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinGoRight"></button>');
    $('#spiderWinGoLeft').html(data.button[0]);
    $('#spiderWinGoRight').html(data.button[1]);
    $('#spiderWinGoLeft').click(joinedItemRoom);
    $('#spiderWinGoRight').click(eventRoomFarRight);
  }

  function yesToItem1() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[14]);
  }

  function yesToEvent1() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[10]);
  }

  function leftCombatEventRoom() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[16]);
  }

  function joinedItemRoom() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[20]);
  }

  function eventRoomFarRight() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[23]);
  }

  // function boss(){
  //   removeDecisionButtons();
  //   combatCounter = 1;
  //   winTest = "boss";
  //   combatReady();
  // }

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
    $('#decision-text').css("display", "inline-block");
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
    $('#decision-text').css("display", "none");
    $(".col-md-10").append('<h1 class="winMessage">YOU HAVE WON!</h1>');
    $(".col-md-10").append('<button class="decision-button-1" id="restart">Restart</button>');
    $("#restart").click(restart);
  }

  // restart screen if player lost
  function gameLost() {
    removeCombat();
    $('#decision-text').css("display", "none");
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

  function checkForItems(itemCheck) {
    for (i = 0; i < playerItems.length ; i++) {
      if (playerItems[i] === itemCheck) {
        playerHasItem = true;
      }
    }
  }

  setGameListeners();

})
