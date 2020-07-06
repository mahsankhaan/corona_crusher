
$(document).ready(function () {
  var i = 1;
  var x = 1;
  var y = 1;
  var z = 1;
  var person;
  var p1name;
  var p2name;
  var p3name;
  var p4name;
  // when user click on it piece
  $(".my-board> .box").on("click", makeMove);
  //$(".board button").attr("disabled", true); // Disable board at the beginning
  var socket = io();
  var msg = document.getElementById('msg');
  var btn = document.getElementById('send');
  var startgame = document.getElementById('startgame');
  var output = document.getElementById('output');
  var dice_btn = document.getElementById('dice-button');
  var span = document.getElementsByClassName("close")[0];

  var modal = document.getElementById("myModal");

  // music sounds
  var healthicon = document.getElementById('healthsound');

  var unhealthicon = document.getElementById('unhealthsound');

  var pandamicsound = document.getElementById('pandamicsound');

  var deadsound = document.getElementById('deadsound');
  var dicesound = document.getElementById('dicesound');

  var completesound = document.getElementById('completesound');

  var winnersound = document.getElementById('winnersound');
var btt=document.getElementById('bbb');
span.onclick = function() {
  modal.style.display = "none";
  window.location.href="http://coronacrushertest.mybluemix.net";
}



  dice_btn.disabled = true;
  document.getElementById('dice-button').style.backgroundColor = 'Grey';

  //var new_button=document.getElementById("newgame");

  var test = document.getElementById('dicetest');
  var health;
  var score;
  var current_player_id = 0;
  var position;
  var action;
  var roomsize = 1;
  var timeLeft = 60;

  var player_id=0
  
  var timerId ;

  var score_p1 = 2; var score_p2 = 2; var score_p3 = 2; var score_p4 = 2;

  var user_id = 0;
  disableclick();


  room = roomName
  person = myFunction1();

  socket.emit("userjoin",
    {
      //room_id:room
      room_id: room,
      room_size: roomsize,
      person_name: person,
      player_id:player_id


    });


  // check which player join 
  socket.on("user_joined", function (data) {
  
   
    console.log("ROOM SIZE:",data.room_size);
    if(data.room_size==3)
    timeLeft=45;

    if (data.player_join == 0) {
    //console.log(data.player_n);

      $("#p1").show();
      $('#p00').appendTo('#1');
      document.getElementById("p00").style.display = "block";
      document.getElementById('player0name').innerHTML = data.person_name[data.room_id][0];
      p1name= data.person_name[data.room_id][0];
     
     
    
   
      // $("#p2").show();
    }
    else if (data.player_join == 1) {
      if (data.room_size == 1) {

        console.log("player_join" + data.person_name[data.room_id][1]);
        $("#p1").show();
        $('#p00').appendTo('#1');
        $('#p10').appendTo('#1');


        $("#p2").show();
        document.getElementById('player0name').innerHTML =  data.person_name[data.room_id][0];
      document.getElementById('player1name').innerHTML = data.person_name[data.room_id][1];

        document.getElementById("p10").style.display = "block";
        document.getElementById("p00").style.display = "block";
        p1name=data.person_name[data.room_id][0];
        p2name=data.person_name[data.room_id][1];
        score_p3=0;
        score_p4=0;
        clearTimeout(timerId);
        clearInterval(timerId);

        console.log("game start");
       // document.getElementById("inviteOther").style.display="none";
        document.getElementById("invitelink").style.display="none";

        socket.emit("all_players_join", {
          room_id: room, 
          socket_id: socket.id
        });
      }
      else {
        console.log("not start");
        document.getElementById('player0name').innerHTML = data.person_name[data.room_id][0];
        document.getElementById('player1name').innerHTML = data.person_name[data.room_id][1];
        p1name=data.person_name[data.room_id][0];
        p2name=data.person_name[data.room_id][1];
        $('#p00').appendTo('#1');
        $('#p10').appendTo('#1');

        $("#p1").show();
        $("#p2").show();

      }
    }
    else if (data.player_join == 2) {
      if (data.room_size==2)
      {
      $("#p1").show();
      $("#p2").show();
      $("#p3").show();
      $('#p00').appendTo('#1');
      $('#p10').appendTo('#1');
      $('#p20').appendTo('#1');
      document.getElementById("p10").style.display = "block";
      document.getElementById("p00").style.display = "block";
      document.getElementById("p20").style.display = "block";

      document.getElementById('player0name').innerHTML = data.person_name[data.room_id][0];
      document.getElementById('player1name').innerHTML = data.person_name[data.room_id][1];
      document.getElementById('player2name').innerHTML = data.person_name[data.room_id][2];
      p1name=data.person_name[data.room_id][0];
      p2name=data.person_name[data.room_id][1];
      p3name=data.person_name[data.room_id][2];
      clearTimeout(timerId);
      clearInterval(timerId);


      console.log("game start");
      //document.getElementById("inviteOther").style.display="none";
      document.getElementById("invitelink").style.display="none";

      socket.emit("all_players_join", {
        room_id: room,
        socket_id: socket.id
      });
    }  
else
{
  $("#p1").show();
  $("#p2").show();
  $("#p3").show();
  $('#p00').appendTo('#1');
  $('#p10').appendTo('#1');
  $('#p20').appendTo('#1');
  document.getElementById("p10").style.display = "block";
  document.getElementById("p00").style.display = "block";
  document.getElementById("p20").style.display = "block";

  document.getElementById('player0name').innerHTML = data.person_name[data.room_id][0];
  document.getElementById('player1name').innerHTML = data.person_name[data.room_id][1];
  document.getElementById('player2name').innerHTML = data.person_name[data.room_id][2];
  p1name=data.person_name[data.room_id][0];
  p2name=data.person_name[data.room_id][1];
  p3name=data.person_name[data.room_id][2];



}
      
    }
    else if (data.player_join == 3) {
      if (data.room_size == 3) {
        $("#p1").show();
        $("#p2").show();
        $("#p3").show();
        $("#p4").show();
        $('#p00').appendTo('#1');
        $('#p10').appendTo('#1');
        $('#p20').appendTo('#1');
        $('#p30').appendTo('#1');

        document.getElementById('player0name').innerHTML = data.person_name[data.room_id][0];
        document.getElementById('player1name').innerHTML = data.person_name[data.room_id][1];
        document.getElementById('player2name').innerHTML = data.person_name[data.room_id][2];
        document.getElementById('player3name').innerHTML = data.person_name[data.room_id][3];
        document.getElementById("p10").style.display = "block";
        document.getElementById("p00").style.display = "block";
        document.getElementById("p20").style.display = "block";
        document.getElementById("p30").style.display = "block";
        p1name=data.person_name[data.room_id][0];
        p2name=data.person_name[data.room_id][1];
        p3name=data.person_name[data.room_id][2];
        p4name=data.person_name[data.room_id][3];
        clearTimeout(timerId);
        clearInterval(timerId);


        console.log("Start game with 3");
        socket.emit("all_players_join", {
          room_id: room,
          socket_id: socket.id
        });
      }

      else {
        $("#p1").show();
        $("#p2").show();
        $("#p3").show();
        $("#p4").show();
        $('#p00').appendTo('#1');
        $('#p10').appendTo('#1');
        $('#p20').appendTo('#1');
        $('#p30').appendTo('#1');

        document.getElementById('player0name').innerHTML = data.person_name[data.room_id][0];
        document.getElementById('player1name').innerHTML = data.person_name[data.room_id][1];
        document.getElementById('player2name').innerHTML = data.person_name[data.room_id][2];
        document.getElementById('player3name').innerHTML = data.person_name[data.room_id][3];
        console.log(" not Start");
      }

    }
  });


  //  Start the game
  socket.on("game_begin", function (data) {

    dice_btn.style.display = "block"

    console.log(data.player_id);
   
    socket_id = data.socket_id,
     // current_player_id = data.player_id,
      check_turn(data.player_id);


  });
  // Bind on event for opponent leaving the game
  socket.on("game_end", function (data) {
    
    show_score(player_id);

    //alert("Game End. player disconnected")

   // window.location.href = "https://coronacrushertest.mybluemix.net/";
  });

  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  dice_btn.addEventListener('click', function () {
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach(die => {
      toggleClasses(die);
      die.dataset.roll = getRandomNumber(5, 6);
      dice_value = die.dataset.roll;
    });
    socket.emit('dice_move', {
      player_id: current_player_id,
      dice_value: dice_value,
      room_id: room,
      socket_id: socket.id

    }
    );
    dicesound.autoplay = true;
    dicesound.load();
   


  });
  socket.on("dice_moved", function (data) {
    dice_btn.style.display = "block"

    if (data.player_id == 0) {
      add_player0_dice_to_board(data.dice_value, data.player_id, room, data.socket_id); // add player 0
    }
    else if (data.player_id == 1) {
      add_player1_dice_to_board(data.dice_value, data.player_id, room, data.socket_id); // add player 1 s
    }
    else if (data.player_id == 2) {
      add_player2_dice_to_board(data.dice_value, data.player_id, room, data.socket_id); // add player 2
    }
    else if (data.player_id == 3) {
      add_player3_dice_to_board(data.dice_value, data.player_id, room, data.socket_id); // add player 3
    }
    else {
      console.log("no id");
    }
  });
  // check who's turn is this
  function check_turn(myTurn) {
    

    if (myTurn == 0) {

      dice_btn.disabled = false;
      document.getElementById('dice-button').style.backgroundColor = '#2d87e0';

      console.log("0 turn");
      $("#message").text("Player 1 Your turn");
    }
    else if (myTurn == 1) {

      dice_btn.disabled = false;
      console.log("1 turn");
      document.getElementById('dice-button').style.backgroundColor = '#2d87e0';

      $("#dice-button").attr("disabled", false);
      $("#message").text("Player 2 Your turn");


    }
    else if (myTurn == 2) {
      dice_btn.disabled = false;
      console.log("2 turn");
      document.getElementById('dice-button').style.backgroundColor = '#2d87e0';

      $("#dice-button").attr("disabled", false);
      $("#message").text("Player 3 Your turn")

    }
    else if (myTurn == 3) {

      dice_btn.disabled = false;
      document.getElementById('dice-button').style.backgroundColor = '#2d87e0';

      $("#dice-button").attr("disabled", false);
      $("#message").text("Player 4 Your Turn");

    }
  }
  // user will make a move
  function makeMove(e) {
    dice_btn.disabled = true;
    document.getElementById('dice-button').style.backgroundColor = '#2d87e0';

    var piece_number = $(this).attr('id'); //get piece id
    console.log("make move in room" + room);
    var current_position = $('#' + piece_number).children('#current_position').text();//put here the current position
    socket.emit("make_move", {
      player_id: current_player_id,
      position: current_position,
      dice_value: dice_value,
      piece_number: piece_number,
      room_id: room
    });
    disableclick();

  }

   



  socket.on("move_completed", function (data) {

    
    move_player_on_board(data.dice_value, data.player_id, data.position, data.piece_number);
  
  });


  socket.on("move_made", function (data) {
    //here we are checking if the current id is different then it's next player

    // if (check_availability(data.player_id) !="yes" && check_availability(data.player_id) !="no") {
    //   show_score(data.player_id);
    //  console.log("ga");

    //  winnersound.autoplay = true;
    //  winnersound.load();

    
    // }


    // make next player turn
  if (check_availability(data.player_id) == "yes" || current_player_id != data.updated_player || data.updated_player == data.updated_player) {
 
      check_turn(data.updated_player);
      current_player_id = data.updated_player;
      //update my last player with updated player
    }


  });
  /* ALL FUNCTIONS */
  //add players to board
  function add_player0_dice_to_board(dice_value, player_id, room, socket_id) {
    dice_btn.disabled = true;
    document.getElementById('dice-button').style.backgroundColor = 'Grey';

    console.log("run in " + room);

    // console.log("Add player in room" + room)
    var available = $('#p' + player_id + i).children('#available').text(); //check if player is available or not

    if (dice_value == 6 && available == "no" && i != 3) {    //if dice value 6 and all the pieces are not at board then add
      $('#p' + player_id + i).appendTo('#1');  // add new player to pos 1
      $('#p' + player_id + i).css("display", "block");
      $('#p' + player_id + i).children('#available').text("yes");
      $("#message").text("Player 1 new piece added" + " " + dice_value);
      i++;
      score_p1 += 2;
      document.getElementById('player0score').innerHTML = score_p1;


      socket.emit("make_move", {
        player_id: current_player_id,
        dice_value: dice_value,
        room_id: room
      });
    }
    else if (check_availability(player_id) == "yes") {
      if (socket_id == socket.id) {
        $("#message").text("Choose token to play by Clicking on it");
        // console.log("yes player0")
        $("#p00").on("click", makeMove);
        $("#p01").on("click", makeMove);
        $("#p02").on("click", makeMove);
        // $("#p03").on("click", makeMove);
      }
      else {
        console.log("no")
      }

    }

    else {
      dice_btn.disabled = true;
      document.getElementById('dice-button').style.backgroundColor = 'Grey';

      // $("#message").text("Player 0 no pieces on board next player turn\nDice Value" + " " + dice_value);
      //move to next player
      socket.emit("make_move", {
        player_id: current_player_id,
        dice_value: dice_value,
        room_id: room
      });
    }
    
  }
  function add_player1_dice_to_board(dice_value, player_id, room, socket_id) {


    dice_btn.disabled = true;
    document.getElementById('dice-button').style.backgroundColor = 'Grey';

    var available = $('#p' + player_id + x).children('#available').text();
    if (dice_value == 6 && available == "no" && x != 3) {
      //  alert("New piece on board " + " " + dice_value);
      $('#p' + player_id + x).appendTo('#1');
      $('#p' + player_id + x).css("display", "block");
      $('#p' + player_id + x).children('#available').text("yes");
      $("#message").text("Player 2 new piece added" + " " + dice_value);
      x++;
      score_p2 += 2;
      document.getElementById('player1score').innerHTML = score_p2;
      socket.emit("make_move", {
        player_id: current_player_id,
        dice_value: dice_value,
        room_id: room

      });
    }
    else if (check_availability(player_id) == "yes") {
      if (socket_id == socket.id) {
        $("#message").text("Choose token to play by Clicking on it");
        $("#p10").on("click", makeMove);
        $("#p11").on("click", makeMove);
        $("#p12").on("click", makeMove);
        //  $("#p13").on("click", makeMove);
      }
    }
    else {
      dice_btn.disabled = true;
      document.getElementById('dice-button').style.backgroundColor = 'Grey';
      // $("#message").text("No pieces on board next player turn\nDice Value" + " " + dice_value);
      //move to next player
      socket.emit("make_move", {
        player_id: current_player_id,
        dice_value: dice_value,
        room_id: room
      });
    }

  }
  function add_player2_dice_to_board(dice_value, player_id, room, socket_id) {
    dice_btn.disabled = true;
    document.getElementById('dice-button').style.backgroundColor = 'Grey';

    var available = $('#p' + player_id + y).children('#available').text();
    if (dice_value == 6 && available == "no" && y != 3) {
      $('#p' + player_id + y).appendTo('#1');  // =
      $('#p' + player_id + y).css("display", "block");
      $('#p' + player_id + y).children('#available').text("yes");
      $("#message").text("Player 3 new piece added" + " " + dice_value);
      y++;
      score_p3 += 2;
      document.getElementById('player2score').innerHTML = score_p3;
      socket.emit("make_move", {
        player_id: current_player_id,
        dice_value: dice_value,
        room_id: room

      });
    }
    else if (check_availability(player_id) == "yes") { // check if there is any piece on board
      if (socket_id == socket.id) {
        $("#message").text("Choose token to play by Clicking on it");
        $("#p20").on("click", makeMove);
        $("#p21").on("click", makeMove);
        $("#p22").on("click", makeMove);
        // $("#p23").on("click", makeMove);
      }
      else {
        console.log("no")
      }
    }
    else {
      //$("#message").text("No pieces on board next player turn\nDice Value" + " " + dice_value);
      dice_btn.disabled = true;

      //move to next player
      socket.emit("make_move", {
        player_id: current_player_id,
        dice_value: dice_value,
        room_id: room

      });
    }
  }
  function add_player3_dice_to_board(dice_value, player_id, room, socket_id) {
    dice_btn.disabled = true;
    document.getElementById('dice-button').style.backgroundColor = 'Grey';

    var available = $('#p' + player_id + z).children('#available').text();
    if (dice_value == 6 && available == "no" && z != 3) {
      $('#p' + player_id + z).appendTo('#1');
      $('#p' + player_id + z).css("display", "block");
      $('#p' + player_id + z).children('#available').text("yes");
      z++;
      score_p3 += 2;
      document.getElementById('player3score').innerHTML = score_p3;
      socket.emit("make_move", {
        player_id: current_player_id,
        dice_value: dice_value,
        room_id: room

      });
    }
    else if (check_availability(player_id) == "yes") { // check if there is any piece on board
      if (socket_id == socket.id) {
        $("#message").text("Choose token to play by Clicking on it");
        $("#p30").on("click", makeMove);
        $("#p31").on("click", makeMove);
        $("#p32").on("click", makeMove);
        // $("#p33").on("click", makeMove);
      }
      else {

        console.log("no")
      }
    }
    else {
      dice_btn.disabled = true;
      document.getElementById('dice-button').style.backgroundColor = 'Grey';

      //  $("#message").text("No pieces on board next player turn\nDice Value" + " " + dice_value);
      //move to next player
      socket.emit("make_move", {
        player_id: current_player_id,
        dice_value: dice_value,
        room_id: room
      });
    }
  }

  function disableclick() {

    //Player 1
    $("#p00").off("click");
    $("#p01").off("click");
    $("#p02").off("click");
    // $("#p03").off("click");
    //Player 2
    $("#p10").off("click");
    $("#p11").off("click");
    $("#p12").off("click");
    //$("#p13").off("click");
    //Player 3
    $("#p20").off("click");
    $("#p21").off("click");
    $("#p22").off("click");
    //$("#p23").off("click");
    //Player 4
    $("#p30").off("click");
    $("#p31").off("click");
    $("#p32").off("click");
    //  $("#p33").off("click");
  }

  //move player function
  function move_player_on_board(dice_value, player_id, player_position, piece_number) //add player_dice_number
  {

    dice_btn.disabled = true;
    document.getElementById('dice-button').style.backgroundColor = 'Grey';

    var update_position = 0;
    health = $('#' + piece_number).children('#health').text().trim();//get_health
    //health = "unhealthy";
    score = $('#' + piece_number).children('#score').text();//get_score 

    if (player_position == 0) {
      player_position += 1;
    }
    update_position = parseInt(player_position) + parseInt(dice_value);
    action = checkAction(update_position, player_id);

    console.log("Action" + " " + action + " " + "health" + " " + health);


    //if place is hazard and piece is unhealthy make it dead 
    if (action == "hazard" && health == "unhealthy") {
      hazard_and_unhealth(piece_number, update_position, dice_value, player_id);

      deadsound.autoplay = true;
      deadsound.load();
    }

    //if place is save  and piece is unhealthy make it healthy again
    else if (action == "safety" && health == "unhealthy") {
      safe_and_unhealth(piece_number, update_position, dice_value, player_id)
      healthicon.autoplay = true;
      healthicon.load();
    }

    //if place is hazard  and piece is healthy make it uhealthy 
    else if (action == "hazard" && health == "healthy") {
      hazard_and_health(piece_number, update_position, dice_value, player_id);
      unhealthicon.autoplay = true;
      unhealthicon.load();

    }

    //player at 100 game end
    else if (update_position == 100) {
      console.log("I am called 100 position" + "" + update_position);
      completed(piece_number, update_position, dice_value)
      completesound.autoplay = true;
      completesound.load();
    }

    else if (action == "orange" || action == "red" || action == "purple") {
      check_pandemic = $('#' + update_position).children('#pan').text();
      console.log("pandemic is " + check_pandemic);
      //if pandameic is on dead piece
      if (check_pandemic == "on") {
        //console.log("piece dead");
        hazard_and_unhealth(piece_number, update_position, dice_value, player_id)
        deadsound.autoplay = true;
        deadsound.load();
      }
      //else no pandameic just make move
      else {
        just_move(piece_number, update_position, dice_value, player_id)
        // console.log("no pandemic in orange city,just move");
      }
    }

    // if no action just make a simple move
    else {
      if (update_position > 100) {
        just_move(piece_number, player_position, dice_value, player_id)
      }
      else {
        just_move(piece_number, update_position, dice_value, player_id)
      }
    }
    
    if (check_availability(player_id) !="yes" && check_availability(player_id) !="no") {
      show_score(player_id);
     console.log("all dead");

     winnersound.autoplay = true;
     winnersound.load();

    
    }
  }




  //apply logical rules
  function checkAction(position, player_id) {
    //console.log("action on" + " "+ position);
    var city_orange = [14, 21, 29]
    var city_red = [42, 51, 61];
    var city_purple = [68, 79, 89, 95];
    var hazard = [2, 6, 10,11,12,13,14,15, 16,18,19,20,21, 26, 33, 36, 45, 47, 55, 57, 66, 70, 72, 76, 82, 84, 87, 91, 99];
    var safety = [4, 12, 18, 24, 38, 40, 50, 53, 59, 64, 74, 93, 97];


    //  position = "hazard";
    if (hazard.includes(position)) {
      score_hazard(player_id);
      return "hazard";
      //console.log("hazard");
    }

    else if (safety.includes(position)) {
      return "safety";
    }

    else if (city_orange.includes(position)) {
      return "orange";

    }

    else if (city_red.includes(position)) {
      return "red";

    }

    else if (city_purple.includes(position)) {
      return "purple";

    }
    else {
      return "nothing";
      // console.log("nothing");
    }

  }

  //pandemic on in city
  function pandemic_on(city) {

    //city = 91;

    // orange city
    if (city > 1 && city < 29 && $('#14').children('#pan').text() =="off" && $('#21').children('#pan').text() =="off" && $('#29').children('#pan').text() =="off"   ) {
      $('#14').children('#pan').text("on");
      $('#21').children('#pan').text("on");
      $('#29').children('#pan').text("on");

      $('#14').css("background-image", "url(\"/public/img/orange-city-back.png\")");
      $('#21').css("background-image", "url(\"public/img/orange-city-back.png\")");
      $('#29').css("background-image", "url(\"public/img/orange-city-back.png\")");
      console.log("piece dead in orange city" + city)

      pandamicsound.autoplay = true;
      pandamicsound.load();

      //document.getElementsByName("hazard").style.color="orange";
    }
    //red city
    else if (city > 30 && city < 61) {
      console.log("piece dead in red city" + "" + city)
      $('#42').children('#pan').text("on");
      $('#51').children('#pan').text("on");
      $('#61').children('#pan').text("on");

      $('#42').css("background-image", "url(\"public/img/red-city-back.png\")");
      $('#51').css("background-image", "url(\"public/img/red-city-back.png\")");
      $('#61').css("background-image", "url(\"public/img/red-city-back.png\")");

      pandamicsound.autoplay = true;
      pandamicsound.load();

    }

    else if (city > 62 && city < 95) {
      console.log("piece dead in purple city" + "" + city)
      $('#68').children('#pan').text("on");
      $('#79').children('#pan').text("on");
      $('#89').children('#pan').text("on");
      $('#95').children('#pan').text("on");

      $('#68').css("background-image", "url(\"public/img/purple-city-back.png\")");
      $('#79').css("background-image", "url(\"public/img/purple-city-back.png\")");
      $('#89').css("background-image", "url(\"public/img/purple-city-back.png\")");
      $('#95').css("background-image", "url(\"public/img/purple-city-back.png\")");

      pandamicsound.autoplay = true;
      pandamicsound.load();

    }
    else {
      // console.log("piece dead in other city")
      console.log("all pandemic on");
    }
  }




  //if player on hazard and unhealth then remove the piece 
  function hazard_and_unhealth(piece_number, update_position, dice_value, player_id) {

    console.log("I am call");
    $('#' + piece_number).children('#score').text("0");
    //  $('#' + piece_number).remove();
    $("#message").text("Player completed turn and dead" + " ,Dice value" + dice_value);
    score_hazard(player_id);
    $('#' + piece_number).appendTo('#' + update_position);  // add new player to updated posx
    $('#' + piece_number).children('#available').text("dead");
    $('#' + piece_number).children('#health').text("unhealthy");
    $('#' + piece_number).children('#current_position').text(update_position);
    $('#' + piece_number).children('#score').text("1");
    $('#' + piece_number).fadeOut(2000);

    pandemic_on(update_position);

    setTimeout(myFunction, 2000);
    function myFunction() {
      $('#' + piece_number).appendTo('.dead-token-area');
    }
    $('#graveyard').css("display", "block");
    $('#' + piece_number).fadeIn(2000);



  }

  function hazard_and_health(piece_number, update_position, dice_value, player_id) {
    //graphics for healthy to unhealthy
    console.log("makeunhealthy");
    $('#' + piece_number).appendTo('#' + update_position);  // add new player to updated pos
    $('#' + piece_number).children('#available').text("yes");
    $('#' + piece_number).children('#health').text("unhealthy");
    $('#' + piece_number).children('#current_position').text(update_position);
    $('#' + piece_number).children('#score').text("1");
    if (player_id == 0) {
      $('#' + piece_number).css("background-image", "url(\"/public/img/blue-piece-back.png\")");
    }
    else if (player_id == 1) {
      $('#' + piece_number).css("background-image", "url(\"/public/img/pink-piece-back.png\")");
    }
    else if (player_id == 2) {
      $('#' + piece_number).css("background-image", "url(\"/public/img/green-piece-back.png\")");
    }
    else if (player_id == 3) {
      $('#' + piece_number).css("background-image", "url(\"/public/img/yellow-piece-back.png\")");
    }
    else {
      console.log("Not listed player ID")
    }
    $("#message").text("Player completed turn and unhealthy" + " ,Dice value" + dice_value);
    disableclick();
  }
  function safe_and_unhealth(piece_number, update_position, dice_value, player_id) {
    //graphics for unhealthy to healthy
    console.log("makehealthy");
    score_healthy(player_id);
    $('#' + piece_number).appendTo('#' + update_position);  // add new player to updated pos
    $('#' + piece_number).children('#available').text("yes");
    $('#' + piece_number).children('#health').text("healthy");
    $('#' + piece_number).children('#current_position').text(update_position);
    $('#' + piece_number).children('#score').text("2");
    if (player_id == 0) {

      $('#' + piece_number).css("background-image", "url(\"/public/img/blue-piece-front.png\")");
    }
    else if (player_id == 1) {
      $('#' + piece_number).css("background-image", "url(\"/public/img/pink-piece-front.png\")");
    }
    else if (player_id == 2) {
      $('#' + piece_number).css("background-image", "url(\"/public/img/green-piece-front.png\")");
    }
    else if (player_id == 3) {
      $('#' + piece_number).css("background-image", "url(\"/public/img/yellow-piece-front.png\")");
    }
    else {
      console.log("Not listed player ID")
    }
    $("#message").text("Player completed turn and healthy" + " ,Dice value" + dice_value);
    disableclick();
  }

  //piece on last position
  function completed(piece_number, update_position, dice_value) {
    console.log("piece at end");
    $('#' + piece_number).appendTo('#' + update_position);  // add new player to updated pos
    $('#' + piece_number).children('#available').text("dead");
    $('#' + piece_number).children('#current_position').text(update_position);
    $("#message").text("Player completed turn " + " ,Dice value" + dice_value);
    disableclick();
  }

  // just move the dice
  function just_move(piece_number, update_position, dice_value, player_id) {
    console.log("just move");
    $('#' + piece_number).appendTo('#' + update_position);  // add new player to updated pos
    $('#' + piece_number).children('#available').text("yes");
    $('#' + piece_number).children('#current_position').text(update_position);
    $("#message").text("Player completed turn" + " ,Dice value" + dice_value);
    disableclick();
  }

  function check_availability(value) {
    var val;
    var get = value;
    for (var i = 0; i <= 2; i++) {

      check = $('#p' + get + i).children('#available').text();
      //      console.log("Check Value", check);
      if (check == "yes") {
        return "yes";
      }

    }

    return check;
  }






  function score_hazard(player_id) {

    if (player_id == 0) {
      if (score_p1 != 0) {
        score_p1 -= 1;
        document.getElementById('player0score').innerHTML = score_p1;

      }

    }
    else if (player_id == 1) {
      if (score_p2 != 0) {
        score_p2 -= 1;
        document.getElementById('player1score').innerHTML = score_p2;


      }

    }
    else if (player_id == 2) {
      if (score_p3 != 0)

        score_p3 -= 1;
      document.getElementById('player2score').innerHTML = score_p3;
    }
    else if (player_id == 3) {
      if (score_p4 != 0) {
        score_p4 -= 1;
        document.getElementById('player3score').innerHTML = score_p4;

      }

    }


  }

  function score_healthy(player_id) {

    if (player_id == 0) {

      score_p1 += 1;
      document.getElementById('player0score').innerHTML = score_p1;
    }
    else if (player_id == 1) {

      score_p2 += 1;
      document.getElementById('player1score').innerHTML = score_p2;
    }
    else if (player_id == 2) {

      score_p3 += 1;
      document.getElementById('player2score').innerHTML = score_p3;
    }
    else if (player_id == 3) {

      score_p4 += 1;
      document.getElementById('player3score').innerHTML = score_p4;
    }


  }

 
  function myFunction1() {

    person = prompt("Please Enter your name");
    console.log("Person",person);
    while (person == "" || person == null)
     {
      person = prompt("Please Enter your name");
    }
    
      return person;
   
  }


  function show_score(player_id){
      var highest_score = highest();
      console.log("Highest Score",highest_score);
      winnersound.autoplay = true;
      winnersound.load();
      if (highest_score == 1) {

        document.getElementById("myModal").style.display = "block";
        document.getElementById('winmodal').innerHTML = "Congratulations "+ p1name +" is Winner ";
        

      }
      if (highest_score == 2) {

        document.getElementById("myModal").style.display = "block";
        document.getElementById('winmodal').innerHTML = "Congratulations "+ p2name +" is Winner ";

      }
      if (highest_score == 3) {

        document.getElementById("myModal").style.display = "block";
        document.getElementById('winmodal').innerHTML = "Congratulations "+ p3name +" is Winner ";

        

      }
      if (highest_score == 4) {

        document.getElementById("myModal").style.display = "block";
        document.getElementById('winmodal').innerHTML = "Congratulations "+ p4name +" is Winner ";
      }
      if (highest_score == 5) 
      {  console.log("DRW")
      document.getElementById("myModal").style.display = "block";
      document.getElementById('winmodal').innerHTML = "Match Drawn ";
        
       
          }
       
     
    }
    window.onclick = function(event) {
      if (event.target == modal) 
      {
        window.location.href = "https://coronacrusher.mybluemix.net/";

      }
    }
    function highest() {
      console.log(score_p1);
      console.log(score_p2);
      console.log(score_p3);
      console.log(score_p4);

      if (score_p1 > score_p2 && score_p1 > score_p3 && score_p1 > score_p4) {
  
        return 1;
      }
  
      else if (score_p2 > score_p1 && score_p2 > score_p3 && score_p2 > score_p4) {
  
        return 2;
      }
      else if (score_p3 > score_p1 && score_p3 > score_p2 && score_p3 > score_p4) {
  
        return 3;
      }
      else if (score_p4 > score_p1 && score_p4 > score_p3 && score_p4 > score_p2) {
  
        return 4;
      }
      else
      {

        return 5;
      }
    }

});
