export type MatchStats = {
    points: number;
    assistances: number;
    ballSteals: number;
    blocks: number;
    rebounds: number;
}
export type StatsKey = keyof MatchStats

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

export const initialStatsState: MatchStats = {
    points: 0,
    assistances: 0,
    ballSteals: 0,
    blocks: 0,
    rebounds: 0,
}

export const getStatsLabel = (statsKey: string) => ({
    points: 'Pontos',
    assistances: 'Assis',
    ballSteals: 'Ladrão',
    blocks: 'Blocks',
    rebounds: 'Rebots',
}[statsKey])

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