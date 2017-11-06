$(function(){

  var data =  {
    "text":["You are at the entrance to the ... 100 metres into the corridor/tunnel you come across two doors. Do you choose the left door or the right door?", "option2", "option3"],
    "button1":["go left", "next button 1 text", "another button one text"],
    "button2":["go right", "next button 2 text", "another button two text"]
  }

  function setGameListeners() {
    $("#start-button").click(startGame);
    $(".choice-button-1").click(choice1);
    $(".choice-button-2").click(choice2);
  }

  function startGame() {
    $("p").css("visibility", "visible");
    $(".choice-button-1").css("visibility", "visible");
    $(".choice-button-2").css("visibility", "visible");
    $(this).css("visibility", "hidden");
  }

  function choice1() {
    var choice = data.button1[1];
    $(".choice-button-1").html(choice);
  }

  function choice2() {
    var choice = data.button2[1];
    $(".choice-button-2").html(choice);
  }
  setGameListeners();


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
