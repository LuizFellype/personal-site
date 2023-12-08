import { Player } from "@/hooks/useTeamStates";
import { HistoryMatchType } from "@/types/teams";

type SumStatsType = {
    id: string, name: string, points: number, teamId: string
}

const updatePlayersSum = (matchPlayers: Player[], sumStatsByPlayers: SumStatsType[]) => {
    const updatePlayerSum = (player: Player, sumStats: SumStatsType[]) => {
        const playerSumStatsIdx = sumStats.findIndex(p => p.id === player.id)

        const isNewPlayer = playerSumStatsIdx === -1
        if (isNewPlayer) {
            return [...sumStats, player]
        }

        const before = sumStats.slice(0, playerSumStatsIdx)
        const updatedPlayerStats = { ...player, points: sumStats[playerSumStatsIdx].points + player.points }
        const after = sumStats.slice(playerSumStatsIdx + 1)

        return [...before, updatedPlayerStats, ...after]
    }

    const updatedSumStatsList = matchPlayers.reduce((acc: SumStatsType[], player: Player) => {
        return updatePlayerSum(player, acc)
    }, sumStatsByPlayers)

    return updatedSumStatsList
}

export const getMVPPlayers = (matches: HistoryMatchType[]): SumStatsType[] => {
    const { sumStatsByPlayers, matchTimesByTeam } = matches.reduce((acc: { sumStatsByPlayers: SumStatsType[], matchTimesByTeam: Record<string, number> }, match) => {
        const matchPlayers = [...match.teamA.players, ...match.teamB.players]

        const sumStatsByPlayers = updatePlayersSum(matchPlayers, acc.sumStatsByPlayers)

        return {
            sumStatsByPlayers: sumStatsByPlayers,
            matchTimesByTeam: {
                ...acc.matchTimesByTeam,
                [match.teamA.id]: (acc.matchTimesByTeam[match.teamA.id] || 0) + 1,
                [match.teamB.id]: (acc.matchTimesByTeam[match.teamB.id] || 0) + 1
            }
        }
    }, { sumStatsByPlayers: [], matchTimesByTeam: {} })


    return sumStatsByPlayers.map(({ id, name, points, teamId }) => {
        return { id, name, teamId,
            points: Number(parseFloat(`${points / matchTimesByTeam[teamId]}`).toFixed(2))}
    }).sort(function(a, b) {
        return b.points - a.points;
    });
}