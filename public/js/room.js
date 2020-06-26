$(document).ready(function () {
    var socket = io();
    var get_new = document.getElementById('newroom');
    get_new.onclick = function () {
        $('#newroom').text("Please wait..");
        console.log("diable button");
    };

    //check if room can be created
    socket.emit("check_newroom", function (data) {
        console.log("check room");
    });

  
    //response from server avaiable or not
    socket.on("sent_room", function (data) {
        if (data.room_status == "yes") {
            get_new.disabled = false;
           $('#newroom').text("New Room");

        }
        else {
           get_new.disabled = true;
           $('#newroom').text("Please wait..");
        }
        console.log(data.room_status);
    });


});