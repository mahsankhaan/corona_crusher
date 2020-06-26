var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var app = express();
//var player_n = [];
var player_n = [[], [], [], []];


// configure the app to use bodyParser() to extract body from request.
// parse urlencoded types to JSON

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: "application/*+json" }));


// parse an HTML body into a string
app.use(bodyParser.text({ type: "text/html" }));
var server = require("http").createServer(app);
var io = require("socket.io")(server);

var client = [[], [], [], []];

app.use(express.static(__dirname + "/"));
app.set("view engine", "ejs");

const rooms = [{ name: 'room1', size: 1 }, { name: 'room2', size: 3 }];


app.get("/", function (req, res) {
  res.render("room", { rooms: rooms });
});


app.get("/:room", (req, res) => {
  //console.log("I am Here");
  let check = rooms[req.params.room];
  //console.log(check)
  if (check === undefined) {
    return res.redirect("/");
  }
  /*console.log(
    "req.params.room",
    req.params.room,
    "req.params.size",
    req.params.size
  );*/
  res.render("index",
    { roomName: req.params.room }
  );
});

app.post("/makepost", (req, res) => {
  //console.log("from makepost", req.body);
  rlength = rooms.push({ name: '', size: Number(req.body.totalplayers) });

  //console.log(rooms, rlength);
  res.redirect(
    "/" + (rlength - 1)
  );
});


app.post("/joingame", (req, res) => {
  //console.log("joining room ", req.body.roomname);
  let value=rooms[req.body.roomname];
  // rooms.map((x, key) => {
  //   if (x.name === req.body.roomname) {
  //     value = key;
  //   }
  // })
  //console.log(value);

  if (value !== undefined) {
    res.redirect("/" + req.body.roomname);
  } else {
    console.log("not found...");
    res.render("room");
  }
});

var players = {}; // opponent: scoket.id of the opponent, symbol = "X" | "O", socket: player's socket
var socket_id;

const clients = {};
var total_players;
var clientsInRoom;
let id2 = 0;
var check_start = 0;
var game_status = true;
var player_temp;
var count = 0;
io.on("connection", function (socket) {
  //rooms["room1"] = { users: {} }


  socket.on("userjoin", function (data) {

  //  console.log(data.player_id)
   // game_status = false;
    //  console.log("Name",data.person_name);
   // player_n[count] = data.person_name;
   // ++count;
    io.sockets.emit("sent_room", {
      // start the game with player 1
      room_status: "yes"
    });

    room = data.room_id;
    // ref rooms array because it contains the size of the room as an object prop
    room_check = rooms[data.room_id]['size'];
    // console.log("Size",room_check);
    //console.log("count",count);

   
   // ++count;
       clientsInRoom =io.sockets.adapter.rooms[room];
       total_players = clientsInRoom === undefined ? 0 : Object.keys(clientsInRoom.sockets).length;

       if(total_players>room_check)
       {

        console.log("RoomFull");

        return;

       }

      socket.join(room);
    //  console.log('player nibba  is ', player_n);
      if(player_n[player_n.length-1].length >0){
      //  console.log('addding extra array ');
        player_n.push([]);
       // console.log('inside player nibba',player_n);
      }
      player_n[room][total_players] = data.person_name;
//console.log('player nibba  now is  ', player_n);
      if(client[client.length -1][0]){
    //    console.log('ship is about to over board..... yeet !!! ');
        client.push([]);
       // console.log('inside ship',client);
  
      }
      client[room][total_players] = {
        roomname: room,
        socket_id: socket.id,
        player_id: total_players,
        connection: [socket],
        roomsize: room_check,
        username: data.person_name
      };
// array dynamic

      io.sockets.to(room).emit("user_joined", {
        player_join: total_players,
        room_size: room_check,
        person_name: player_n,
        room_id:room
      });
     
    
  });



  //when user disconnect
  socket.on("disconnect", () => {
    game_status = true;

    //get_room id
    delete_room = checkTurn(client, socket.id);
   // delete player_n[delete_room];
    socket.to(delete_room).emit("game_end");
    console.log(delete_room);
  });

  socket.on("all_players_join", function (data) {

    //console.log("all players joined" + data.room_id);
    //  console.log("player 1 start ");
    my_room = data.room_id;
    player_temp = client[my_room][0].player_id;
    sockket_temp = client[my_room][0].socket_id;
    game_start_from_first_player(my_room).emit("game_begin", {
      // start the game with player 1
      player_id: player_temp,
      socket_id: sockket_temp,
      room_id: my_room
    });
  //  id2 = 0;
  //  game_status = true;
/*    io.sockets.emit("sent_room", {
      // start the game with player 1
      room_status: "yes"
    });*/
  });

  // check if room is availables && this socket is comming from room
  socket.on("check_newroom", function (data) {
    if (game_status == false) {
      //console.log("yes available");
      status = "no"
    }
    else {
      //console.log("not available");
      status = "yes"

    }

    //sent the user room data
    io.sockets.emit("sent_room", {
      room_status: status
    });
  });

  // get user dice response
  socket.on("dice_move", function (data) {
    //send dice move 
    my_room = data.room_id;
   //  console.log("dice move in " + data.room_id);

    //console.log("Player" + data.player_id + " " + "room" + my_room)
    io.sockets.in(my_room).emit("dice_moved", data);
    new_player = next_turn(data.player_id, my_room);
  });
  // get user move responses
  socket.on("make_move", function (data) {
    my_room = data.room_id;
    //  console.log(data.player_id + "move made inside" + my_room);
    //io.sockets.in(my_room).emit("move_made", data);
    io.sockets.in(my_room).emit("move_completed", data);


    opponentOf(my_room, new_player).emit("move_made", {
      updated_player: new_player, //next player is always 1 ,2 ,3,0 next_player(data.player_id,client,room)
      position: data.position,
      player_id: data.player_id,
      dice_value: data.dice_value,
      socket: socket.id,
      piece_number: data.piece_number
    });
  });
});
function next_turn(player, room) {
  room_size = client[room][player].roomsize;
 // console.log("roosize" + room_size);

  if (player >= room_size) {
    // player = "";
    player = 0;
   // console.log("make turn 0");
  } else {
    player++;
    //console.log("next player turn");
  }
  //  console.log("test"+player);
  //  player += 1;
  return player;
}

//this function will return the next socket
function opponentOf(room, new_player) {
  // console.log(client[room][new_player]);
  return client[room][new_player].connection[0];

}

function game_start_from_first_player(room) {
  //game will start with player 0
  return client[room][0].connection[0];
}

function checkTurn(client, socketid) {
//  console.log(socketid);
  //console.log(client.length);
  for (var i = 0; i < client.length; i++) {
    for (var j = 0; j < client[i].length; j++) {
      if (client[i][j].socket_id == socketid) { return client[i][j].roomname }
      //console.log("client[" + i + "][" + j + "] = ", client[j]);
    }
    // Not found
  }
}
server.listen(process.env.PORT || 3000, function () {
  console.log("App running");
});
