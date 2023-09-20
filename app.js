const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "circketTeam.db");

const db = null;
const result = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at: localhost:3000");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
result();

app.get("/players/", async (request, response) => {
  const playersData = `SELECT playerId,playerName,jerseryNumber,role
     FROM cricket_team`;
  const eachPlayerData = await db.all(playersData);
  response.send(eachPlayerData);
});

app.post("/players/", async (request, response) => {
  const { playerId } = request.params;
  const { playerName, JerseyNumber, role } = request.body;
  const addPlayer = `INSERT INTO cricket_team (playerName,JerseyNumber,role)
    VALUES ("Vishal",17,"Bowler") WHERE player_id = ${playerId};
    `;
  await db.run(addPlayer);
  response.send("Player Added to Team");
});

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const { playerName, JerseyNumber, role } = request.body;
  const getPlayer = `SELECT playerId,playerName,JerseyNumber,role 
    FROM cricket_team WHERE player_Id = ${playerId}`;
  const givenIdData = await db.get(getPlayer);
  response.send(givenIdData);
});

app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const { playerName, JerseyNumber, role } = request.body;
  const updatePlayerData = `UPDATE cricket_team 
    SET
     playerName= "Maneesh",
  jerseyNumber= 54,
  role= "All-rounder"
    WHERE player_Id = ${playerId}`;
  const updatePlayer = await db.run(updatePlayerData);
  response.send("Player Details Updated");
});

app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deletePlayer = `DELETE FROM cricket_team WHERE player_Id = ${playerId}`;
  await db.run(deletePlayer);
  response.send("Player Removed");
});
