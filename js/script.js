$(function(){

  // game options
  var data =  {
    'text':['You are at the entrance to the castle. You enter through the great castle gate. The gate leads directly into a tunnel. After about twenty metres you come across two doors. Do you choose the left door or the right door?',

    'You see a small goblin sleeping in front of you. As you try to slip past your foot knocks against a loose metal chain on the floor. The goblin wakes instantly and charges wielding a small dagger!',

    'You are in a circular room with a basin of water in the middle. The water looks clear and you feel the urge to drink. There is a door at the far side of the room. Do you ...',

    'You cup your hands and take a drink. You feel a rush of energy and notice no ill effects.',

    'You have killed the goblin. There are three doors to choose from. There is a bright light coming from behind the left door. The middle door looks heavier and has iron studs dotted over it. The left door looks to be the most used of the three as the door knob is worn smooth with use. Do you ...',

    'You enter a large, dark and foul smelling room. As you take a step forwards you feel something brush against your face. It is a spiders web, but the strands are thicker than any you have ever seen. Suddenly out of the darkness a spider the size of a large dog rushes at you ...',

    'The ruined body of the spider slumps to the side. On your way towards the far end of the room you brush against the skeleton of a man clad in full armour. Most of it looks inferior to your own however his helmet is of far better quality than anything else he was wearing. Do you ...',

    'You place the helmet on your head and go to leave. You leave the room through the far door. After a few metres the corridor splits. Which way would you like to go?',

    'You leave the room through the far door. After a few metres the corridor splits. Which way would you like to go?',

    'The door opens easily and you enter a small room with a glowing orb on a pedestal in the center of the room. You know that there is some magic at work here but the effects are unclear. There is a passage way that bends to the left opposite you. Do you ...',

    'You find yourself in a massive room with an enormous dragon. The dragon is guarding the treasure. You must defeat the dragon to get to the treasure. The ring on your finger begins to glow and feels hot to the touch. The dragon lets out a roar and flies backwards. You dont know what happened but hopefully it was good.',

    'You place the key in your pocket and go go to leave through the large doorway on the far side of the room ...',

    'You push the door but it doesnt move an inch. You push harder and it moves slowly forward. After about ten seconds of pushing the gap is large enough to slip through. You enter a passageway that bends to the right. As you are walking you notice a small alcove with a chest inside. You open the chest and inside is a thick golden wristband inscribed with runes. It looks solid and probably worth a fortune. Do you ...',

    'You have defeated the dragon and the treasure is yours. Mountains of gold and jewels are yours. Amongst the treasure you see a small locked box. You try the key you found on the troll and find it fits the lock and inside there are countless flawless diamonds.',

    'As you slip the wristband over your hand you feel it tighten and you feel a flash of intense pain in your wrist. The pain subsides but you feel weaker. The wristband loosens and you pull it off.',

    'You are in a small room with a number of shelves and cupboards along the wall. After looking through the room you find nothing of value.',

    'You find some steps and follow them down into a foul smelling cellar. The walls are wet and slimy. There is a path next to a pool of green water. As you edge across the path you suddenly feel water splash over you and are face to face with what you can only describe as a fish monster holding a wicked looking trident ...',

    'You disarm the fish monster and drive its spear through its throat. You look around and for more enemies and notice what looks like an offering of some kind of some hard bread on a table further down the path. You are very hungry and it looks normal. Do you ...',

    'You eat the bread and immediately regret it. It makes you throw up and you feel much weaker.',

    'You have defeated the dragon and the treasure is yours. Mountains of gold and jewels are yours. Amongst the treasure you see a small box. It is locked but you discard it and begin to fill your pockets with treasure.',

    'You find yourself in some kind of storage room. There are hundreds of objects littering the floor. You rummage through and realise that it is all either broken or of no value. As you go to leave a shiny object on top of an old table catches your eye. It is a ring in the shape of a skull. Do you ...',

    'You notice no immediate effect so you decide to move on.',

    'You enter a room with an enormous door on the far side. The room is filled with countless weapons on racks. One in particular catches your eye. A two-handed longsword with a blade that looks as sharp as a razor. Do you ...',

    'You follow a corridor for at least a minute before you find yourself in what looks like a place of worship There are two exits on the far side of the room. There is an altar to your left hand side. When you investigate you see an engraving on the altar in a language you think you can translate. ',

    'You read the writing and the room begins to darken. You hear a whispering in your ear and feel the presence of some evil spirit. In your haste to get out you fall and knock your head on a bench. You run towards the doors ...',

    'You take the sword and give it a practice swing. The blade cuts through the air with a whistle, the balance is perfect.',

    'You travel down a long corridor with paths forking in on either side. You follow the main path and everntually reached an enormous room which is largely empty. In the center of the room however there is a large troll. He stands up as soon as you enter and bellows in anger. He lumbers towards you ...',

    'You have defeated troll. You search his body and find a large iron key in his pocket.',

    'You place the key into your bag and move on.',

    'You travel down a short passage and find yourself in a room with a huge gate on the far side. Guarding the gate is a large orc. The orc takes one look at you and pulls out a huge mace. He walks forward swinging it menacingly',

    'The orc is dead. All that is left to do is head through the large gate.',

    'As you touch the orb white light fills your vision. Your sight slowly returns to normal and you find yourself in some kind of storage room. There are hundreds of objects littering the floor. You rummage through and realise that it is all either broken or of no value. As you go to leave a shiny object on top of an old table catches your eye. It is a ring in the shape of a skull. Do you ...',

    'You find yourself in a massive room with an enormous dragon. The dragon is guarding the treasure. You must defeat the dragon to get to the treasure.'],

    'enemy':['Goblin', 'Dragon', 'Giant Spider', 'Fish Monster', 'Troll', 'Orc', 'Dragon'],

    'enemyHealth':['5', '14', '7', '7', '8', '7', '7']
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
  var playerHasRing = false;

  // function to set player health
  function setPlayerHealth() {
    var maxPlayerHealth = 10 + Math.ceil(Math.random() * 10);
    $(this).css('display', 'none');
    $('.decision-button-container').append('<button class="roll-health-button">Roll to set player health!</button>')
    $('.roll-health-button').click(startGame)
    playerHealth = maxPlayerHealth;
    $('#restart').remove();
    $('.winMessage').remove();
  }

  // setting listeners on game buttons and functions that it applies
  function setGameListeners() {
    $('#start-button').click(setPlayerHealth);
    $('.choice-button-1').click(choice1);
    $('.choice-button-2').click(choice2);
    $('.combat-roll-button').click(combat);
  }

  // function that happens when the start game button is clicked
  function startGame() {
    $('#restart').remove();
    $('.winMessage').remove();
    $('#decision-text').css('display', 'inline-block');
    $('.choice-button-1').css('display', 'inline-block');
    $('.choice-button-2').css('display', 'inline-block');
    $('.choice-button-1').html('Go left');
    $('.choice-button-2').html('Go right');
    $('#decision-text').html(data.text[0]);
    $(this).css('display', 'none');
    locationCounter ++;
    $('.playerHealthStat').html('Health: ' + playerHealth);
  }

  // functions for the decision you make
  function choice1() {
    $('.choice-button-1').css('display', 'none');
    $('.choice-button-2').css('display', 'none');
    removeDecisionButtons();
    $('.decision-button-container').append('<button class="decision-button-1" id="attackGoblin"></button>');
    $('#decision-text').html(data.text[1]);
    $('#attackGoblin').html('Attack the Goblin!');
    winTest = "test";
    combatCounter = 0;
    $('#attackGoblin').click(combatReady);
  }

  // function for if you beat the goblin
  function goblinWin() {
    removeCombat();
    $('.decision-button-container').append('<button class="decision-button-3" id="goblinFightLeft"></button>')
    $('.decision-button-container').append('<button class="decision-button-3" id="goblinFightMiddle"></button>')
    $('.decision-button-container').append('<button class="decision-button-3" id="goblinFightRight"></button>')
    $('#decision-text').html(data.text[4]);
    $('#goblinFightLeft').html('Go through the left door')
    $('#goblinFightMiddle').html('Go through the middle door')
    $('#goblinFightRight').html('Go through the right door')
    $('#goblinFightLeft').click(goblinGoLeft);
    $('#goblinFightMiddle').click(goblinGoMiddle);
    $('#goblinFightRight').click(goblinGoRight);
  }

  // function if initial decision is go right
  function choice2() {
    $('.choice-button-1').css('display', 'none');
    $('.choice-button-2').css('display', 'none');
    $('.decision-button-container').append('<button class="decision-button-2" id="drink"></button>')
    $('.decision-button-container').append('<button class="decision-button-2" id="noDrink"></button>');
    $('#decision-text').html(data.text[2]);
    $('#drink').html('Take a drink.');
    $('#noDrink').html('Ignore the basin and walk through the door.');
    $('#drink').click(drink);
    $('#noDrink').click(giantSpider);
  }

  // function if player chooses to drink
  function drink() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[3]);
    playerHealth = playerHealth + 6;
    $('.playerHealthStat').html('Health: ' + playerHealth);
    $('.decision-button-container').append('<button class="decision-button-1" id="leave"></button>')
    $('#leave').html('Walk through the door');
    $('#leave').click(giantSpider);
  }

  // function if player goes left after goblin fight
  function goblinGoLeft() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[9]);
    $('.decision-button-container').append('<button class="decision-button-2" id="eventOne1"></button>');
    $('.decision-button-container').append('<button class="decision-button-2" id="eventOne2"></button>');
    $('#eventOne1').html('Touch the orb.');
    $('#eventOne2').html('Ignore the orb and exit through the passageway.');
    $('#eventOne1').click(joinedItemRoomTeleport);
    $('#eventOne2').click(leftCombatEventRoom);
  }

  // function if player takes the middle door after goblin fight
  function goblinGoMiddle() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[12]);
    $('.decision-button-container').append('<button class="decision-button-2" id="itemOne1"></button>');
    $('.decision-button-container').append('<button class="decision-button-2" id="itemOne2"></button>');
    $('#itemOne1').html('Take the wristband and slip it over your wrist for safekeeping');
    $('#itemOne2').html('Leave the wristband and move on down the passage.');
    $('#itemOne1').click(takeWristband);
    $('#itemOne2').click(leftCombatEventRoom);
  }

  // function if player chooses the right door after goblin fight
  function goblinGoRight() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[15]);
    $('.decision-button-container').append('<button class="decision-button-1" id="nothingRoom1"></button>');
    $('#nothingRoom1').html('Leave the room through the far door.');
    $('#nothingRoom1').click(joinedItemRoom);
  }

  // function for giant spider fight
  function giantSpider() {
    removeDecisionButtons();
    $('.decision-button-container').append('<button class="decision-button-1" id="attackSpider"></button>');
    $('#decision-text').html(data.text[5]);
    $('#attackSpider').html('Attack the Giant Spider!');
    winTest = 'giantSpider';
    combatCounter = 2;
    $('#attackSpider').click(combatReady(combatCounter));
  }

  // function if the spider was beaten
  function spiderWin() {
    removeCombat();
    $('.decision-button-container').append('<button class="decision-button-2" id="spiderWinItem"></button>');
    $('.decision-button-container').append('<button class="decision-button-2" id="spiderWinNoItem"></button>');
    $('#decision-text').html(data.text[6]);
    $('#spiderWinItem').html('Take the helmet');
    $('#spiderWinNoItem').html('Ignore the helmet and leave.');
    $('#spiderWinItem').click(takeHelmet);
    $('#spiderWinNoItem').click(ignoreTheHelmet);
  }

  // function to take helmet item
  function takeHelmet() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[7]);
    playerHasHelmet = true;
    $('.decision-button-container').append('<button class="decision-button-2" id="spiderWinGoLeft"></button>');
    $('.decision-button-container').append('<button class="decision-button-2" id="spiderWinGoRight"></button>');
    $('#spiderWinGoLeft').html('Go left.');
    $('#spiderWinGoRight').html('Go right.');
    $('#spiderWinGoLeft').click(joinedItemRoom);
    $('#spiderWinGoRight').click(eventRoomFarRight);
  }

  // function to not take the helmet
  function ignoreTheHelmet() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[8]);
    $('.decision-button-container').append('<button class="decision-button-2" id="spiderWinGoLeft"></button>');
    $('.decision-button-container').append('<button class="decision-button-2" id="spiderWinGoRight"></button>');
    $('#spiderWinGoLeft').html('Go left.');
    $('#spiderWinGoRight').html('Go right.');
    $('#spiderWinGoLeft').click(joinedItemRoom);
    $('#spiderWinGoRight').click(eventRoomFarRight);
  }

  // function if you take the wristband
  function takeWristband() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[14]);
    playerHealth = playerHealth - 2;
    if (playerHealth <= 0) {
      gameLost();
    } else {
      $('.playerHealthStat').html('Health: ' + playerHealth);
      $('.decision-button-container').append('<button class="decision-button-1" id="wristBandDone"></button>');
      $('#wristBandDone').html('Continue along the passage');
      $('#wristBandDone').click(leftCombatEventRoom);
    }
  }

  // function to initialise combat in left combat event room
  function leftCombatEventRoom() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[16]);
    $('.decision-button-container').append('<button class="decision-button-1" id="attackEnemy4"></button>');
    winTest = 'fishMonster';
    combatCounter = 3;
    $('#attackEnemy4').html('Attack the fish monster!');
    $('#attackEnemy4').click(combatReady);
  }

  // function if you defeat the fish monster.
  function fishMonsterWon() {
    removeCombat();
    $('#decision-text').html(data.text[17]);
    $('.decision-button-container').append('<button class="decision-button-2" id="enemy4WinEventYes"></button>');
    $('.decision-button-container').append('<button class="decision-button-2" id="enemy4WinEventNo"></button>');
    $('#enemy4WinEventYes').html('Eat the bread');
    $('#enemy4WinEventNo').html('Leave it and move on');
    $('#enemy4WinEventYes').click(combatEventYes);
    $('#enemy4WinEventNo').click(leftCombatItemRoom);
  }

  // function for saying yes to event after combat
  function combatEventYes() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[18]);
    playerHealth = playerHealth - 2;
    if (playerHealth <= 0) {
      gameLost();
    } else {
      $('.playerHealthStat').html('Health: ' + playerHealth);
      $('.decision-button-container').append('<button class="decision-button-1" id="enterCombatItemAfterEvent"></button>');
      $('#enterCombatItemAfterEvent').html('Leave the room');
      $('#enterCombatItemAfterEvent').click(leftCombatItemRoom);
    }
  }

  // function for when the player teleports in joinedItemRoom
  function joinedItemRoomTeleport() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[31]);
    $('.decision-button-container').append('<button class="decision-button-2" id="joinedItemSayYes"></button>');
    $('.decision-button-container').append('<button class="decision-button-2" id="joinedItemSayNo"></button>');
    $('#joinedItemSayYes').html('Place the ring on your finger.');
    $('#joinedItemSayNo').html('Move on.');
    $('#joinedItemSayYes').click(takeRing);
    $('#joinedItemSayNo').click(leftCombatItemRoom);
  }

  // function for when player walks into joinedItemRoom
  function joinedItemRoom() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[20]);
    $('.decision-button-container').append('<button class="decision-button-2" id="joinedItemSayYes"></button>');
    $('.decision-button-container').append('<button class="decision-button-2" id="joinedItemSayNo"></button>');
    $('#joinedItemSayYes').html('Place the ring on your finger.');
    $('#joinedItemSayNo').html('Move on.');
    $('#joinedItemSayYes').click(takeRing);
    $('#joinedItemSayNo').click(leftCombatItemRoom);
  }

  // function if player says yes to item option
  function takeRing() {
    removeDecisionButtons();
    playerHasRing = true;
    $('#decision-text').html(data.text[21]);
    $('.decision-button-container').append('<button class="decision-button-1" id="joinedItemYes"></button>');
    $('#joinedItemYes').html('Move on');
    $('#joinedItemYes').click(leftCombatItemRoom);
  }

  // function for a room with an event in
  function eventRoomFarRight() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[23]);
    $('.decision-button-container').append('<button class="decision-button-3" id="rightEventSayYes"></button>');
    $('.decision-button-container').append('<button class="decision-button-3" id="rightEventSayNoLeft"></button>');
    $('.decision-button-container').append('<button class="decision-button-3" id="rightEventSayNoRight"></button>');
    $('#rightEventSayYes').html('Translate and read the passage out loud.');
    $('#rightEventSayNoLeft').html('Leave through the left door.');
    $('#rightEventSayNoRight').html('Leave through the right door.');
    $('#rightEventSayYes').click(rightEventYes);
    $('#rightEventSayNoLeft').click(rightEventLeftExit);
    $('#rightEventSayNoRight').click(rightEventRightExit);
  }

  // function if player says yes to event option
  function rightEventYes() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[24]);
    playerHealth = playerHealth - 3;
    if (playerHealth <= 0) {
      gameLost();
    } else {
      $('.playerHealthStat').html('Health: ' + playerHealth);
      $('.decision-button-container').append('<button class="decision-button-2" id="rightEventLeft"></button>');
      $('.decision-button-container').append('<button class="decision-button-2" id="rightEventRight"></button>');
      $('#rightEventLeft').html('Escape through the left door.');
      $('#rightEventRight').html('Escape through the right door.');
      $('#rightEventLeft').click(rightEventLeftExit);
      $('#rightEventRight').click(rightEventRightExit);
    }
  }

  // function if the player goes right after previous room
  function rightEventLeftExit() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[29]);
    $('.decision-button-container').append('<button class="decision-button-1" id="attackEnemy6"></button>');
    winTest = "orc";
    combatCounter = 5;
    $('#attackEnemy6').html('Attack the Orc');
    $('#attackEnemy6').click(combatReady);
  }

  // function if the player goes right after previous room
  function rightEventRightExit() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[22]);
    $('.decision-button-container').append('<button class="decision-button-2" id="lastItemSayYes"></button>');
    $('.decision-button-container').append('<button class="decision-button-2" id="lastItemSayNo"></button>');
    $('#lastItemSayYes').html('Take the sword');
    $('#lastItemSayNo').html('Ignore the sword and leave through the large door.');
    $('#lastItemSayYes').click(lastItemTakeSword);
    $('#lastItemSayNo').click(boss);
  }

  // function for if the player takes the sword
  function lastItemTakeSword() {
    removeDecisionButtons();
    playerHasSword = true;
    $('#decision-text').html(data.text[25]);
    $('.decision-button-container').append('<button class="decision-button-1" id="takeSword"></button>');
    $('#takeSword').html('Leave though the large door.')
    $('#takeSword').click(boss);
  }

  // function for if the orc battle is won
  function orcWon() {
    removeCombat();
    $('#decision-text').html(data.text[30]);
    $('.decision-button-container').append('<button class="decision-button-1" id="Enemy6WinLeave"></button>');
    $('#Enemy6WinLeave').html('Leave through the door');
    $('#Enemy6WinLeave').click(boss);
  }

  // function if the player takes the item in the joineditemroom
  function joinedItemYes() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[20]);
    $('.decision-button-container').append('<button class="decision-button-1" id="joinedItemYesDone"></button>');
    $('joinedItemYesDone').html('Leave the room');
    $('joinedItemYesDone').click(leftCombatItemRoom);
  }

  // function for the final combat room before the boss
  function leftCombatItemRoom() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[26]);
    $('.decision-button-container').append('<button class="decision-button-1" id="attacktroll"></button>');
    winTest = 'troll';
    combatCounter = '4';
    $("#attacktroll").html('Attack the troll!');
    $("#attacktroll").click(combatReady);
  }

  // function if the player defeats the troll
  function trollWon() {
    removeCombat();
    $('#decision-text').html(data.text[27]);
    $('.decision-button-container').append('<button class="decision-button-2" id="combatItemRoomYes"></button>');
    $('.decision-button-container').append('<button class="decision-button-2" id="combatItemRoomNo"></button>');
    $('#combatItemRoomYes').html('Take the key');
    $('#combatItemRoomNo').html('Ignore the key and enter the next room.');
    $('#combatItemRoomYes').click(combatItemRoomTakeItem);
    $('#combatItemRoomNo').click(boss);
  }

  // function if the player takes the item after defeating the troll
  function combatItemRoomTakeItem() {
    removeDecisionButtons();
    playerHasKey = true;
    $('#decision-text').html(data.text[11]);
    $('.decision-button-container').append('<button class="decision-button-1" id="combatItemRoomKey"></button>');
    $('#combatItemRoomKey').html('Go through the door.');
    $('#combatItemRoomKey').click(boss);
  }

  // function to set-up the final boss fight
  function boss(){
    if (playerHasRing === true) {
      specialBoss();
    } else {
      removeDecisionButtons();
      $('#decision-text').html(data.text[32]);
      combatCounter = 1;
      winTest = "boss";
      $('.decision-button-container').append('<button class="decision-button-1" id="bossFight"></button>');
      $('#bossFight').html('Attack the dragon!');
      $('#bossFight').click(combatReady);
    }
  }

  // function for boss if the player has the ring
  function specialBoss() {
    removeDecisionButtons();
    $('#decision-text').html(data.text[10]);
    combatCounter = 6;
    winTest = "specialBoss";
    $('.decision-button-container').append('<button class="decision-button-1" id="bossFight"></button>');
    $('#bossFight').html('Attack the dragon!');
    $('#bossFight').click(combatReady);
  }

  // function for if you defeat the boss
  function bossWon(){
    if (playerHasKey === true) {
      removeCombat();
      $('#decision-text').html(data.text[13]);
      $('.decision-button-container').append('<button class="decision-button-1" id="secretWin"></button>')
      $('#secretWin').html("Well done!");
      $('#secretWin').click(gameWon);
    } else {
      removeCombat();
      $('#decision-text').html(data.text[19]);
      $('.decision-button-container').append('<button class="decision-button-1" id="win"></button>')
      $('#win').html('Well done!');
      $('#win').click(gameWon);
    }
  }

  // function to prepare screen for combat
  function combatReady() {
    removeDecisionButtons();
    $('.decision-button-container').append('<button class="combat-roll-button"></button>');
    $('.combat-text').css('display', 'inline-block');
    $('#decision-text').css('display', 'none');
    $('.combat-roll-button').html('Attack the ' + data.enemy[combatCounter]);
    enemyHealth = parseInt(data.enemyHealth[combatCounter]);
    $('.combat-roll-button').click(combat);
  }

  // function to engage combat when button is clicked
  function combat() {
    var playerRoll = Math.floor(Math.random() * 6);
    var enemyRoll = Math.floor(Math.random() * 6);
    if (playerRoll > enemyRoll) {
      var damage = playerRoll - enemyRoll;
      if (playerHasSword === true) {
        damage = damage + 1;
      }
      enemyHealth = enemyHealth - damage;
      $('.combat-text').html('You did ' + damage + ' damage. The ' + data.enemy[combatCounter] + 's health is now: ' + enemyHealth);
    } else if (enemyRoll > playerRoll) {
      var damage = enemyRoll - playerRoll;
      if (playerHasHelmet === true) {
        damage = damage - 1;
      }
      playerHealth = playerHealth - damage;
      $('.playerHealthStat').html('Health: ' + playerHealth);
      $('.combat-text').html('The ' + data.enemy[combatCounter] + ' did ' + damage + ' damage. Your health is now: ' + playerHealth);
    } else {
      $('.combat-text').html('You both failed to land a blow.');
    }

    // check to see if player or enemy has died
    if (playerHealth <= 0) {
      $('.combat-text').html('You are dead!');
      gameLost();
    } else if (enemyHealth <= 0) {
      $('.combat-text').html('The ' + data.enemy[combatCounter] + ' is dead');
      victory();
    }
  }

  // function to remove old buttons when next decision is made
  function removeDecisionButtons() {
    $('.decision-button-1').remove();
    $('.decision-button-2').remove();
    $('.decision-button-3').remove();
  }

  // function to remove combat screen once combat is completed
  function removeCombat() {
    $('.combat-text').html('You are in combat')
    $('.combat-roll-button').css('display', 'none');
    $('.combat-text').css('display', 'none');
    $('#decision-text').css('display', 'inline-block');
  }

  // function to go to next function if combat is won
  function victory() {
    if (winTest === 'test') {
      goblinWin();
    } else if (winTest === 'giantSpider') {
      spiderWin();
    } else if (winTest === 'boss') {
      bossWon();
    } else if (winTest === 'fishMonster') {
      fishMonsterWon();
    } else if (winTest === 'troll') {
      trollWon();
    } else if (winTest === 'orc') {
      orcWon();
    } else if (winTest === 'specialBoss') {
      bossWon();
    }
  }

  // restart screen if player won
  function gameWon() {
    removeCombat();
    removeDecisionButtons()
    $('.playerHealthStat').css('display', 'none');
    $('#decision-text').css('display', 'none');
    $('.decision-button-container').append('<h1 class="winMessage">YOU HAVE WON!</h1>');
    $('.decision-button-container').append('<button class="decision-button-1" id="restart">Restart</button>');
    $('#restart').click(restart);
  }

  // restart screen if player lost
  function gameLost() {
    removeCombat();
    removeDecisionButtons();
    $('.playerHealthStat').css('display', 'none');
    $('#decision-text').css('display', 'none');
    $('.decision-button-container').append('<h1 class="winMessage">YOU ARE DEAD!</h1>');
    $('.decision-button-container').append('<button class="decision-button-1" id="restart">Restart</button>');
    $('#restart').click(restart);
  }

  // function to restart game when button clicked
  function restart() {
    $('.playerHealthStat').css('display', 'inline-block');
    playerHealth = 12;
    winTest = null;
    locationCounter = 0;
    combatCounter = 0;
    playerHasKey = false;
    playerHasSword = false;
    playerHasHelmet = false;
    playerHasRing = false;
    setPlayerHealth();
  }

  setGameListeners();

})
