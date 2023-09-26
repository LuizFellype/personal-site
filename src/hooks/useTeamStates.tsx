import { useMemo, useState } from "react"

type MatchStats = {
    points: number;
    assistances: number;
    ballSteals: number;
    blocks: number;
    rebounds: number;
}
export type StatsKey = keyof MatchStats
export const getStatsLabel = (statsKey: string) => ({
    points: 'Pts',
    assistances: 'Assis',
    ballSteals: 'Ladrao',
    blocks: 'Blocks',
    rebounds: 'Reb',
}[statsKey])

export type Player = {
    id: string;
    name: string,
    teamId: string
} & MatchStats

export type Team = MatchStats & {
    id: string;
    name: string,
    players: Player[];
    increasePoints: (playerId: string) => (amountToIncrease: number) => void;
    increaseRebounds: (playerId: string) => (amountToIncrease: number) => void;
    increaseAssistances: (playerId: string) => (amountToIncrease: number) => void;
    increaseBallSteals: (playerId: string) => (amountToIncrease: number) => void;
    increaseBlocks: (playerId: string) => (amountToIncrease: number) => void;
}


const initialStatsState: MatchStats = {
    points: 0,
    assistances: 0,
    ballSteals: 0,
    blocks: 0,
    rebounds: 0,
}

export const createTeamPlayer = (teamId: string) => (playerName: string): Player => {
    return {
        id: playerName,
        name: playerName,
        points: 0,
        assistances: 0,
        ballSteals: 0,
        blocks: 0,
        rebounds: 0,
        teamId: teamId
    }
}
export const useTeamStates = (teamName: string, teamMembers: string[] = []): Team => {
    const [players, setPlayers] = useState<Player[]>(teamMembers.map(createTeamPlayer(teamName)))

    const methods = useMemo(() => {
        const increasePlayerProp = (playerPropKey: StatsKey) => (playerId: string) => (amountToIncrease: number) => {
            const updatePlayerPoints = (currentPlayers: Player[]) => currentPlayers.map(player =>
                player.id === playerId ? { ...player, [playerPropKey]: player[playerPropKey] + amountToIncrease } : player
            )

            setPlayers(updatePlayerPoints)
        }

        return {
            increasePoints: increasePlayerProp('points'),
            increaseRebounds: increasePlayerProp('rebounds'),
            increaseAssistances: increasePlayerProp('assistances'),
            increaseBallSteals: increasePlayerProp('ballSteals'),
            increaseBlocks: increasePlayerProp('blocks'),
        }
    }, [setPlayers])


    const matchStats = useMemo(() => {
        return players.reduce((acc, crt) => {
            return {
                points: acc.points + crt.points,
                assistances: acc.assistances + crt.assistances,
                ballSteals: acc.ballSteals + crt.ballSteals,
                blocks: acc.blocks + crt.blocks,
                rebounds: acc.rebounds + crt.rebounds,
            }
        }, initialStatsState)
    }, [players])

    return {
        id: teamName,
        name: teamName,
        players, ...matchStats, ...methods,
    }
}