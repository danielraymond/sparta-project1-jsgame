$(function(){

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

    "You are in a room with enemy5. Do combat.",

    "You have defeated enemy5 there is an item do you take it",

    "Text after you take item after fighting enemy5",

    "You are in a room with enemy6. Do combat.",

    "You have defeated enemy6 the exit is at the back of the room",

    "You are in the far right final item room",

    "You are in the final event room would you like to do the event",

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

    "go into the next room",

    "Attack enemy4",

    "Attack enemy5",

    "Attack enemy6",

    "Say yes to event after combat",

    "Say no to event after combat",

    "After event after combat going into combat item room left"],

    "enemy":["Goblin", "Boss", "Giant Spider", "enemy4", "enemy5", "enemy6"],

    "enemyHealth":["6", "18", "12", "6", "6", "12"],

    "enemyStamina":["6", "18", "12", "6", "6", "12"]
  }

  // global variables
  var enemyHealth;
  var enemyStamina;
  var playerItems = [""];
  var itemCheck = null;
  var playerHasItem = null;
  var combatCounter = null;
  var winTest = null;
  var locationCounter = null;
  var playerHealth = 12;
  var playerStamina = 12;

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
    $(".choice-button-1").html("Go left");
    $(".choice-button-2").html("Go Right");
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
    $('#attackGoblin').html("Attack the Goblin!");
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
    $("#orcFightLeft").html("go through the left door")
    $("#orcFightMiddle").html("go through the middle door")
    $("#orcFightRight").html("go through the right door")
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
    $("#drink").html("Take a drink.");
    $("#noDrink").html("Ignore the basin and walk through the door.");
    $("#drink").click(drink);
    $("#noDrink").click(giantSpider);
  }

  function drink() {
    removeDecisionButtons();
    $("#decision-text").html(data.text[3]);
    playerHealth = playerHealth + 6;
    $(".col-md-10").append('<button class="decision-button-1" id="leave"></button>')
    $("#leave").html("Walk through the door");
    $("#leave").click(giantSpider);
  }

  function orcGoLeft() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[9]);
    $('.col-md-10').append('<button class="decision-button-2" id="eventOne1"></button>');
    $('.col-md-10').append('<button class="decision-button-2" id="eventOne2"></button>');
    $('#eventOne1').html("Take the helmet");
    $('#eventOne2').html("Ignore the helmet and leave.");
    $('#eventOne1').click(yesToEvent1);
    $('#eventOne2').click(leftCombatEventRoom);
  }

  function orcGoMiddle() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[12]);
    $('.col-md-10').append('<button class="decision-button-2" id="itemOne1"></button>');
    $('.col-md-10').append('<button class="decision-button-2" id="itemOne2"></button>');
    $('#itemOne1').html("Take the item");
    $('#itemOne2').html("Ignore the item");
    $('#itemOne1').click(yesToItem1);
    $('#itemOne2').click(leftCombatEventRoom);
  }

  function orcGoRight() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[15]);
    $('.col-md-10').append('<button class="decision-button-1" id="nothingRoom1"></button>');
    $('#nothingRoom1').html("Leave the room");
    $('#nothingRoom1').click(joinedItemRoom);
  }

  function giantSpider() {
    removeDecisionButtons();
    $(".col-md-10").append('<button class="decision-button-1" id="attackSpider"></button>');
    $("#decision-text").html(data.text[5]);
    $('#attackSpider').html("Attack the Giant Spider!");
    winTest = "giantSpider";
    combatCounter = 2;
    $('#attackSpider').click(combatReady(combatCounter));
  }

  function spiderWin() {
    removeCombat();
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinItem"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinNoItem"></button>');
    $('#decision-text').html(data.text[6]);
    $('#spiderWinItem').html("Take the helmet");
    $('#spiderWinNoItem').html("Ignore the helmet and leave.");
    $('#spiderWinItem').click(takeHelmet);
    $('#spiderWinNoItem').click(ignoreTheHelmet);
  }

  function takeHelmet() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[7]);
    playerItems.push("helmet");
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinGoLeft"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinGoRight"></button>');
    $('#spiderWinGoLeft').html("Go left.");
    $('#spiderWinGoRight').html("Go right.");
    $('#spiderWinGoLeft').click(joinedItemRoom);
    $('#spiderWinGoRight').click(eventRoomFarRight);
  }

  function ignoreTheHelmet() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[8]);
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinGoLeft"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinGoRight"></button>');
    $('#spiderWinGoLeft').html("Go left.");
    $('#spiderWinGoRight').html("Go right.");
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
    $(".col-md-10").append('<button class="decision-button-1" id="attackEnemy4"></button>');
    winTest = "enemy4";
    combatCounter = 3;
    $('#attackEnemy4').html("Attack enemy4");
    $('#attackEnemy4').click(combatReady);
  }

  function enemy4Won() {
    removeCombat();
    $('#decision-text').html(data.text[17]);
    $(".col-md-10").append('<button class="decision-button-2" id="enemy4WinEventYes"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="enemy4WinEventNo"></button>');
    $('#enemy4WinEventYes').html("Do the event");
    $('#enemy4WinEventNo').html("Don't do the event");
    $('#enemy4WinEventYes').click(combatEventYes);
    $('#enemy4WinEventNo').click(leftCombatItemRoom);
  }

  function combatEventYes() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[18]);
    $(".col-md-10").append('<button class="decision-button-1" id="enterCombatItemAfterEvent"></button>');
    $('#enterCombatItemAfterEvent').html("Leave the room");
    $('#enterCombatItemAfterEvent').click(leftCombatItemRoom);
  }

  function joinedItemRoom() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[20]);
    $(".col-md-10").append('<button class="decision-button-2" id="joinedItemSayYes"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="joinedItemSayNo"></button>');
    $('#joinedItemSayYes').html("Take the item");
    $('#joinedItemSayNo').html("Ignore the item");
    $('#joinedItemSayYes').click(joinedItemYes);
    $('#joinedItemSayNo').click(leftCombatItemRoom);
  }

  function eventRoomFarRight() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[23]);
    $(".col-md-10").append('<button class="decision-button-3" id="rightEventSayYes"></button>');
    $(".col-md-10").append('<button class="decision-button-3" id="rightEventSayNoLeft"></button>');
    $(".col-md-10").append('<button class="decision-button-3" id="rightEventSayNoRight"></button>');
    $('#rightEventSayYes').html("Do the event!");
    $('#rightEventSayNoLeft').html("Leave through the left passage.");
    $('#rightEventSayNoRight').html("Leave through the right passage.");
    $('#rightEventSayYes').click(rightEventYes);
    $('#rightEventSayNoLeft').click(rightEventNoLeft);
    $('#rightEventSayNoRight').click(rightEventNoRight);
  }

  function rightEventYes() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[24]);
  }

  function rightEventNoLeft() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[29]);
    $(".col-md-10").append('<button class="decision-button-1" id="attackEnemy6"></button>');
    winTest = "enemy5";
    winTest = "enemy6";
    combatCounter = 5;
    $("#attackEnemy6").html("Attack enemy6");
    $("#attackEnemy6").click(combatReady);
  }

  function rightEventNoRight() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[31]);
    $(".col-md-10").append('<button class="decision-button-2" id="lastItemSayYes"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="lastItemSayNo"></button>');
    $('#lastItemSayYes').html("Take the item");
    $('#lastItemSayNo').html("Ignore the item");
    $('#lastItemYes').click(lastItemYes);
    $('#lastItemSayNo').click(finalEventRoom);
  }

  function lastItemYes() {
    removeDecisionButtons();
  }

  function enemy6Won() {
    removeCombat();
    $('#decision-text').html(data.text[30]);
    $(".col-md-10").append('<button class="decision-button-1" id="Enemy6WinLeave"></button>');
    $('#Enemy6WinLeave').html("Leave through the door");
    $('#Enemy6WinLeave').click(finalEventRoom);
  }

  function joinedItemYes() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[20]);
    $(".col-md-10").append('<button class="decision-button-1" id="joinedItemYesDone"></button>');
    $('joinedItemYesDone').html("Leave the room");
    $('joinedItemYesDone').click(leftCombatItemRoom);
  }

  function leftCombatItemRoom() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[26]);
    $(".col-md-10").append('<button class="decision-button-1" id="attackEnemy5"></button>');
    winTest = "enemy5";
    combatCounter = "4";
    $("#attackEnemy5").html("Attack enemy5");
    $("#attackEnemy5").click(combatReady);
  }

  function enemy5Won() {
    removeCombat();
    $('#decision-text').html(data.text[27]);
    $(".col-md-10").append('<button class="decision-button-2" id="combatItemRoomYes"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="combatItemRoomNo"></button>');
    $('#combatItemRoomYes').html("Take the item");
    $('#combatItemRoomNo').html("Ignore the item");
    $('#combatItemRoomYes').click(combatItemRoomTakeItem);
    $('#combatItemRoomNo').click(boss);
  }

  function combatItemRoomTakeItem() {
    removeDecisionButtons();
  }

  function finalEventRoom() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[32]);
    $(".col-md-10").append('<button class="decision-button-2" id="finalEventYes"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="finalEventNo"></button>');
    $('#finalEventYes').html("Do the final event");
    $('#finalEventNo').html("Don't do the final event");
    $('#finalEventYes').click(finalEventYes);
    $('#finalEventNo').click(boss);
  }

  function finalEventYes() {
    removeDecisionButtons();
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
    $(".col-md-10").append('<button class="combat-roll-button" id="heavy"></button>');
    $(".col-md-10").append('<button class="combat-roll-button" id="light"></button>');
    $(".col-md-10").append('<button class="combat-roll-button" id="defend"></button>');
    $('#heavy').html("Heavy Attack!");
    $('#light').html("Light Attack!");
    $('#defend').html("Defend!");
    $('#heavy').click(combat);
    $('#light').click(combat);
    $('#defend').click(combat);
    // $(".combat-roll-button").css("display", "inline-block");
    $(".combat-text").css("display", "inline-block");
    $("#decision-text").css("display", "none");
    enemyHealth = parseInt(data.enemyHealth[combatCounter]);
    enemyStamina = parseInt(data.enemyStamina[combatCounter]);
  }

  // function to engage combat when button is clicked
  function combat() {
    // var playerRoll = Math.floor(Math.random() * 6);
    // var enemyRoll = Math.floor(Math.random() * 6);
    // if (playerRoll > enemyRoll) {
    //   var damage = playerRoll - enemyRoll;
    //   enemyHealth = enemyHealth - damage;
    //   $(".combat-text").html("You did " + damage + " damage. The " + data.enemy[combatCounter] + "'s health is now: " + enemyHealth);
    // } else if (enemyRoll > playerRoll) {
    //   var damage = enemyRoll - playerRoll;
    //   playerHealth = playerHealth - damage;
    //   $(".combat-text").html("The " + data.enemy[combatCounter] + " did " + damage + " damage. Your health is now: " + playerHealth);
    // } else {
    //   $(".combat-text").html("You both missed!");
    // }
    if ($(this).attr('id') == 'heavy') {
      console.log("You clicked Heavy");
      debugger;
    } else if ($(this).attr('id') === 'light') {
      console.log("You clicked Heavy");
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
    } else if (winTest === "enemy4") {
      enemy4Won();
    } else if (winTest === "enemy5") {
      enemy5Won();
    } else if (winTest === "enemy6") {
      enemy6Won();
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
