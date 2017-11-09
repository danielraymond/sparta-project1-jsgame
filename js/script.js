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

    "The door opens easily and you enter a small room with a glowing orb on a pedestal in the center of the room. You know that there is some magic at work here but the effects are unclear. There is a passage way that bends to the left opposite you. Do you ...",

    "Text if yes event1",

    "Text if no event1",

    "You push the door but it doesn't move an inch. You push harder and it moves slowly forward. After about ten seconds of pushing the gap is large enough to slip through. You enter a passageway that bends to the right. As you are walking you notice a small alcove with a chest inside. You open the chest and inside is a thick golden wristband inscribed with room. It looks solid and probably worth a fortune. Do you ...",

    "Text if no item1",

    "As you slip the wristband over your hand you feel it tighten and you feel a flash of intense pain in your wrist. The pain subsides but you feel weaker. The wristband loosens and you pull it off.",

    "You are in a small room with a number of shelves and cupboards along the wall. After looking through the room you find nothing of value.",

    "You are in a room with combat and an event. combat starts",

    "You have killed the enemy now for the event. (2 options)",

    "Text for the event yes.",

    "Text for the event no",

    "You find yourself in some kind of storage room. There are hundreds of objects littering the floor. You rummage through and realise that it is all either broken or of no value. As you go to leave a shiny object on top of an old table catches your eye. It is a ring in the shape of a skull. Do you ...",

    "You notice no immediate effect so you decide to move on.",

    "Text if no",

    "You are in a room with an event. (2 options)",

    "Text if option 1",

    "Text if option 2",

    "You travel down a long corridor with paths forking in on either side. You follow the main path and everntually reached an enormous room which is largely empty. In the center of the room however there is a large troll. He stands up as soon as you enter and bellows in anger. He lumbers towards you ...",

    "You have defeated troll there is an item do you take it",

    "Text after you take item after fighting troll",

    "You are in a room with enemy6. Do combat.",

    "You have defeated enemy6 the exit is at the back of the room",

    "You are in the far right final item room",

    "You are in the final event room would you like to do the event",

    "As you touch the orb white light fills your vision. Your sight slowly returns to normal and you find yourself in some kind of storage room. There are hundreds of objects littering the floor. You rummage through and realise that it is all either broken or of no value. As you go to leave a shiny object on top of an old table catches your eye. It is a ring in the shape of a skull. Do you ...",

    "You find yourself in a room with a huge troll. The troll is guarding the treasure. You must fight the troll to get to the treasure."],

    "enemy":["Goblin", "Boss", "Giant Spider", "enemy4", "troll", "enemy6"],

    "enemyHealth":["3", "3", "3", "3", "3", "3"]
  }

  // global variables
  var enemyHealth;
  var itemCheck = null;
  var playerHasItem = null;
  var combatCounter = null;
  var winTest = null;
  var locationCounter = null;
  var playerHealth = null;
  var playerHasHelmet = false;
  var playerHasSword = false;
  var playerHasKey = false;

  // function to set player health
  function setPlayerHealth() {
    var maxPlayerHealth = 10 + Math.ceil(Math.random() * 10);
    $(this).css("display", "none");
    $(".col-md-10").append('<button class="roll-health-button">Roll to set player health!</button>')
    $('.roll-health-button').click(startGame)
    playerHealth = maxPlayerHealth;
  }

  // setting listeners on game buttons and functions that it applies
  function setGameListeners() {
    $("#start-button").click(setPlayerHealth);
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

  // function for if you beat the goblin
  function goblinWin() {
    removeCombat();
    $(".col-md-10").append('<button class="decision-button-3" id="goblinFightLeft"></button>')
    $(".col-md-10").append('<button class="decision-button-3" id="goblinFightMiddle"></button>')
    $(".col-md-10").append('<button class="decision-button-3" id="goblinFightRight"></button>')
    $("#decision-text").html(data.text[4]);
    $("#goblinFightLeft").html("go through the left door")
    $("#goblinFightMiddle").html("go through the middle door")
    $("#goblinFightRight").html("go through the right door")
    $("#goblinFightLeft").click(goblinGoLeft);
    $("#goblinFightMiddle").click(goblinGoMiddle);
    $("#goblinFightRight").click(goblinGoRight);
  }

  // function if initial decision is go right
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

  // function if player chooses to drink
  function drink() {
    removeDecisionButtons();
    $("#decision-text").html(data.text[3]);
    playerHealth = playerHealth + 6;
    $(".col-md-10").append('<button class="decision-button-1" id="leave"></button>')
    $("#leave").html("Walk through the door");
    $("#leave").click(giantSpider);
  }

  // function if player goes left after goblin fight
  function goblinGoLeft() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[9]);
    $('.col-md-10').append('<button class="decision-button-2" id="eventOne1"></button>');
    $('.col-md-10').append('<button class="decision-button-2" id="eventOne2"></button>');
    $('#eventOne1').html("Touch the orb.");
    $('#eventOne2').html("Ignore the orb and exit through the passageway.");
    $('#eventOne1').click(joinedItemRoomTeleport);
    $('#eventOne2').click(leftCombatEventRoom);
  }

  // function if player takes the middle door after goblin fight
  function goblinGoMiddle() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[12]);
    $('.col-md-10').append('<button class="decision-button-2" id="itemOne1"></button>');
    $('.col-md-10').append('<button class="decision-button-2" id="itemOne2"></button>');
    $('#itemOne1').html("Take the wristband and slip it over your wrist for safekeeping");
    $('#itemOne2').html("Leave the wristband and move on down the passage.");
    $('#itemOne1').click(takeWristband);
    $('#itemOne2').click(leftCombatEventRoom);
  }

  // function if player chooses the right door after goblin fight
  function goblinGoRight() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[15]);
    $('.col-md-10').append('<button class="decision-button-1" id="nothingRoom1"></button>');
    $('#nothingRoom1').html("Leave the room through the far door.");
    $('#nothingRoom1').click(joinedItemRoom);
  }

  // function for giant spide fight
  function giantSpider() {
    removeDecisionButtons();
    $(".col-md-10").append('<button class="decision-button-1" id="attackSpider"></button>');
    $("#decision-text").html(data.text[5]);
    $('#attackSpider').html("Attack the Giant Spider!");
    winTest = "giantSpider";
    combatCounter = 2;
    $('#attackSpider').click(combatReady(combatCounter));
  }

  // function if the spider was beaten
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

  // function to take helmet item
  function takeHelmet() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[7]);
    playerHasHelmet = true;
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinGoLeft"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="spiderWinGoRight"></button>');
    $('#spiderWinGoLeft').html("Go left.");
    $('#spiderWinGoRight').html("Go right.");
    $('#spiderWinGoLeft').click(joinedItemRoom);
    $('#spiderWinGoRight').click(eventRoomFarRight);
  }

  // function to not take the helmet
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

  // function if you take the wristband
  function takeWristband() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[14]);
    console.log(playerHealth);
    playerHealth = playerHealth - 2;
    if (playerHealth <= 0) {
      gameLost();
    } else {
      $(".col-md-10").append('<button class="decision-button-1" id="wristBandDone"></button>');
      $('#wristBandDone').html("Continue along the passage");
      $('#wristBandDone').click(leftCombatEventRoom);
      console.log(playerHealth);
    }
  }

  // function to initialise combat in left combat event room
  function leftCombatEventRoom() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[16]);
    $(".col-md-10").append('<button class="decision-button-1" id="attackEnemy4"></button>');
    winTest = "enemy4";
    combatCounter = 3;
    $('#attackEnemy4').html("Attack enemy4");
    $('#attackEnemy4').click(combatReady);
  }

  // function if you defeat enemy 4.
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

  function joinedItemRoomTeleport() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[33]);
    $(".col-md-10").append('<button class="decision-button-2" id="joinedItemSayYes"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="joinedItemSayNo"></button>');
    $('#joinedItemSayYes').html("Place the ring on your finger.");
    $('#joinedItemSayNo').html("Move on.");
    $('#joinedItemSayYes').click(joinedItemYes);
    $('#joinedItemSayNo').click(leftCombatItemRoom);
  }

  function joinedItemRoom() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[20]);
    $(".col-md-10").append('<button class="decision-button-2" id="joinedItemSayYes"></button>');
    $(".col-md-10").append('<button class="decision-button-2" id="joinedItemSayNo"></button>');
    $('#joinedItemSayYes').html("Place the ring on your finger.");
    $('#joinedItemSayNo').html("Move on.");
    $('#joinedItemSayYes').click(joinedItemYes);
    $('#joinedItemSayNo').click(leftCombatItemRoom);
  }

  function joinedItemYes() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[21]);
    $(".col-md-10").append('<button class="decision-button-1" id="joinedItemYes"></button>');
    $('#joinedItemYes').html("Move on");

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
    winTest = "troll";
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
    $(".col-md-10").append('<button class="decision-button-1" id="attacktroll"></button>');
    winTest = "troll";
    combatCounter = "4";
    $("#attacktroll").html("Attack the troll!");
    $("#attacktroll").click(combatReady);
  }

  function trollWon() {
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
    $(".col-md-10").append('<button class="combat-roll-button"></button>');
    $(".combat-text").css("display", "inline-block");
    $("#decision-text").css("display", "none");
    $('.combat-roll-button').html("Attack the " + data.enemy[combatCounter]);
    enemyHealth = parseInt(data.enemyHealth[combatCounter]);
    $('.combat-roll-button').click(combat);
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
      console.log("damage before check " + damage);
      if (playerHasHelmet === true) {
        damage = damage - 1;
      }
      console.log("damage after check " + damage);
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
      goblinWin();
    } else if (winTest === "giantSpider") {
      spiderWin();
    } else if (winTest === "boss") {
      gameWon();
    } else if (winTest === "enemy4") {
      enemy4Won();
    } else if (winTest === "troll") {
      trollWon();
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
    playerItems = [""];
    startGame();
  }

  setGameListeners();

})
