const express = require("express");
const app = express();
const uuid = require("uuid");

const port = process.env.PORT || 5000;

app.use("/", express.static(__dirname + "/app"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

let httpserver = app.listen(port, function () {
    console.log("Server running at: http://localhost:" + port + "/");
});

let io = require('socket.io')(httpserver);

let clients = [];

io.on('connection', function(client){
    let clientData = {
        id: uuid.v4(),
        position: {
            x: 0,
            z: 0
        },
        color: {
            red: Math.random(),
            green: Math.random(),
            blue: Math.random(),
        },
        dancing: false
    };

    clients.push(clientData);

    client.on("move", function(data){
        clientData.position.x = data.x;
        clientData.position.z = data.z;

        io.emit("move", { id: clientData.id, position: data });
    });

    client.on("dance", function(data){
        clientData.dancing = true;

        io.emit("dance", { id: clientData.id });
    });

    client.on("stop dance", function(data){
        clientData.dancing = false;

        io.emit("stop dance", { id: clientData.id });
    });

    client.on("disconnect", function() {
        //client leaves
        io.emit("player left", { id: clientData.id });

        let index = clients.indexOf(clientData);
        clients.splice(index,1);
    });

    client.broadcast.emit("new player", clientData);

    client.emit("startup info",{
        playerData: clientData,
        playerList: clients
    });

});
