import { setupSession } from "@/utils/localStorage";
import { useEffect, useRef } from "react";
import { Team } from "./useTeamStates";
import { FoulType } from "./useFoulStates";
import { RawTeam } from "./TeamsContext";

const session = setupSession()

export const usePreventRefresh = (teamA: Team, teamB: Team, fouls: FoulType[]) => {
    const teamARef = useRef(teamA)
    const teamBRef = useRef(teamB)
    const foulsRef = useRef(fouls)

    useEffect(() => {
        teamARef.current = teamA
        teamBRef.current = teamB
        foulsRef.current = fouls
    }, [teamA, teamB, fouls]);

    useEffect(() => {
      const beforeUnloadHandler = (event: any) => {
        event?.preventDefault();
        session.set(session.keys.onGoingMatchState, { 
          teamA: teamARef.current, 
          teamB: teamBRef.current, 
          fouls: foulsRef.current 
        })
      };
  
      window.addEventListener("beforeunload", beforeUnloadHandler);
      
      return () => {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      }
    }, []);
  }