import { setupSession } from "@/utils/localStorage";
import { RefObject, useEffect, useRef } from "react";
import { Team } from "./useTeamStates";
import { FoulType } from "./useFoulStates";
import Countdown from "react-countdown";
import { OnGoingMatchStateType } from "./TeamsContext";

const session = setupSession()

export const usePreventRefresh = (teamA: Team, teamB: Team, fouls: FoulType[], countDownRef: RefObject<Pick<Countdown, 'state'>>) => {
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

        const onGoingMatchState: OnGoingMatchStateType = { 
          teamA: teamARef.current, 
          teamB: teamBRef.current, 
          fouls: foulsRef.current,
          remainingTime: countDownRef?.current?.state?.timeDelta?.total
        }
        session.set(session.keys.onGoingMatchState, onGoingMatchState)
      };
  
      window.addEventListener("beforeunload", beforeUnloadHandler);
      
      return () => {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      }
    }, []);
  }