import { HistoryMatchType } from "@/types/teams"

export const MATCHES_MOCK: HistoryMatchType[] = [{
    "teamA": {
        "id": "Centro", "name": "Centro",
        "players":
            [
                { "id": "Luiz", "name": "Luiz", "points": 3, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Centro" }, { "id": "LypeZ", "name": "LypeZ", "points": 2, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Centro" }, { "id": "Kaio", "name": "Kaio", "points": 2, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Centro" }
            ], "points": 7, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0
    },
    "teamB": {
        "id": "Santa", "name": "Santa",
        "players":
            [
                { "id": "Chris", "name": "Chris", "points": 2, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Santa" }, { "id": "Drew", "name": "Drew", "points": 2, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Santa" }, { "id": "Gelin", "name": "Gelin", "points": 2, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Santa" }
            ], "points": 6, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0
    },
    "fouls": [],
    "endedAt": 1702028947629
},
{
    "teamA": {
        "id": "Santa", "name": "Santa",
        "players":
            [
                { "id": "Chris", "name": "Chris", "points": 11, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Santa" }, { "id": "Drew", "name": "Drew", "points": 6, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Santa" }, { "id": "Gelin", "name": "Gelin", "points": 0, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Santa" }
            ], "points": 17, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0
    },
    "teamB": {
        "id": "El Crime", "name": "El Crime",
        "players": [
            { "id": "Bruno", "name": "Bruno", "points": 2, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "El Crime" }, { "id": "Luiz Agua", "name": "Luiz Agua", "points": 2, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "El Crime" }, { "id": "Jack", "name": "Jack", "points": 1, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "El Crime" }
        ], "points": 5, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0
    }, "fouls": [],
    "endedAt": 1702028966197
},
{
    "teamA": {
        "id": "Centro", "name": "Centro",
        "players": [{ "id": "Luiz", "name": "Luiz", "points": 0, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Centro" }, { "id": "LypeZ", "name": "LypeZ", "points": 0, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Centro" }, { "id": "Kaio", "name": "Kaio", "points": 4, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Centro" }], "points": 4, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0
    },
    "teamB": {
        "id": "Santa", "name": "Santa",
        "players": [{ "id": "Chris", "name": "Chris", "points": 7, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Santa" }, { "id": "Drew", "name": "Drew", "points": 3, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Santa" }, { "id": "Gelin", "name": "Gelin", "points": 1, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0, "teamId": "Santa" }], "points": 11, "assistances": 0, "ballSteals": 0, "blocks": 0, "rebounds": 0
    }, "fouls": [], "endedAt": 1702030291216
}
]


const setPoints = (p: number) => Number(parseFloat(p).toFixed(2))

export const AVERAGE_RESULT = [
    { id: 'Luiz', name: 'Luiz', points: setPoints(3 / 2), teamId: 'Centro' },
    { id: 'LypeZ', name: 'LypeZ', points: setPoints(2 / 2), teamId: 'Centro' },
    { id: 'Kaio', name: 'Kaio', points: setPoints((2 + 4) / 2), teamId: 'Centro' },
    { id: "Chris", name: "Chris", points: setPoints((2 + 7 + 11) / 3), teamId: 'Santa' },
    { id: "Drew", name: "Drew", points: setPoints((2 + 3 + 6) / 3), teamId: 'Santa' },
    { id: "Gelin", name: "Gelin", points: setPoints((2 + 1) / 3), teamId: 'Santa' },
    { id: 'Bruno', name: 'Bruno', points: setPoints(2 / 1), teamId: 'El Crime' },
    { id: 'Luiz Agua', name: 'Luiz Agua', points: setPoints(2 / 1), teamId: 'El Crime' },
    { id: 'Jack', name: 'Jack', points: setPoints(1 / 1), teamId: 'El Crime' },
].sort(function (a, b) {
    return b.points - a.points;
});
