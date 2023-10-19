import { FoulType } from "@/hooks/useFoulStates";
import { Team } from "@/hooks/useTeamStates"

export type HistoryMatchType = {
    teamA: Team; teamB: Team; fouls: FoulType[], endedAt: number 
}