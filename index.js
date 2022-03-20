const Client = require("itscalledsoccer").default;
const client = new Client();

const leagues = ["mls"];
const seasonName = "2021";

const extractIds = (ids) => {
  return ids.map((id) => id.players[0]);
};

(async () => {
  try {
    const asaXgoals = await client.getPlayersXgoals({
      leagues,
      seasonName,
      generalPosition: "W",
    });

    const firstResult = asaXgoals[0];

    const asaPlayer = await client.getPlayers({
      leagues,
      playerId: firstResult.player_id,
    });
    const asaTeam = await client.getTeams({
      leagues,
      teamId: firstResult.team_id,
    });
    console.log(
      `During the season ${seasonName}, ${asaPlayer[0].player_name} generated ${firstResult.xgoals} xgoals for the ${asaTeam[0].team_name}`
    );
  } catch (e) {
    console.error("client errors", e);
  }
})();
