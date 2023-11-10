'use client'
import { useCallback, useMemo, useState } from 'react'

import { PlaygroundTeam } from '@/containers/PlaygroundTeam'
import { ConfigButtons } from '@/containers/ConfigButtons'
import { useTeamsCtx } from '@/hooks/TeamsContext'

import { useFoulStates } from '@/hooks/useFoulStates'
import { useTeamStates } from '@/hooks/useTeamStates'
import { Modal } from '@/containers/Modal'
import { FoulFeedbackMessage } from '@/containers/FoulFeedbackMessage'
import { STORAGE_KEYS, setupSession, setupStorage } from '@/utils/localStorage'
import { useRouter } from 'next/navigation'
import { HistoryMatchType } from '@/types/teams'
import { usePreventRefresh } from '@/hooks/usePreventRefresh'

const classes = {
  home: 'cursor-pointer bg-transparent px-4 py-2 mx-8 mt-3 text-center font-semibold text-orange-400 border-dotted border-orange-400 border-2 p-1 rounded-md hover:$bg-gray-400 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70',
  regularBottomButton: `cursor-pointer rounded px-4 py-2 mx-8 mt-3 text-center font-semibold text-white focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70`,
}

const session = setupSession()
const storage = setupStorage()


export default function Playground() {
  const router = useRouter()
  const [revert, setRevert] = useState(false)
  const [seePlayerStats, setSeePlayerStats] = useState(false)

  const [isConfirmingMatchEnd, setIsConfirmingMatchEnd] = useState(false)

  const { selectedTeams, teams, onGoingMatchStates, resetOnGoingMatchState } = useTeamsCtx()

  const [rawTeamA, rawTeamB] = useMemo(() => {
    return onGoingMatchStates ? [onGoingMatchStates.teamA, onGoingMatchStates.teamB] : teams.filter(team => selectedTeams.includes(team.id))
  }, [onGoingMatchStates, teams, selectedTeams])


  const teamA = useTeamStates(rawTeamA.name, rawTeamA.players)
  const teamB = useTeamStates(rawTeamB.name, rawTeamB.players)

  const [isModalOpen, setOpen] = useState(false);
  const openModal = useCallback(() => {
    setOpen(true)
  }, [])

  const foulsParams = useMemo(() => ({ onAddFoul: openModal, defaultFouls: onGoingMatchStates?.fouls }), [openModal, onGoingMatchStates]);
  const { handleFoul, currentFoul, fouls, freeThrow, resetFreeThrow } = useFoulStates(foulsParams)
  
  usePreventRefresh(teamA, teamB, fouls)

  const closeModal = useCallback(() => {
    setOpen(false)

    if (!!freeThrow) {
      resetFreeThrow()
    }
  }, [freeThrow])

  const lastFoul = useMemo(() => fouls[fouls.length - 1], [fouls])
  const handleEndMatch = (confirmation = false) => () => {
    if (isConfirmingMatchEnd) {
      if (!confirmation) {
        return setIsConfirmingMatchEnd(false)
      }
      const matchFullState: HistoryMatchType = { teamA, teamB, fouls, endedAt: new Date().getTime() }

      const savedMatches = storage.get('matches', [])
      const matches = [...savedMatches, matchFullState]
      storage.set(STORAGE_KEYS.matchesList, matches)
      resetOnGoingMatchState()
      router.push('/history')
      return
    }

    setIsConfirmingMatchEnd(true)
  }

  return (
    <main className='h-full w-full pt-2'>
      <Modal isOpen={isModalOpen} onClose={closeModal} isTemporary={!freeThrow} >
        {
          isModalOpen && <FoulFeedbackMessage
            isFreeThrow={!!freeThrow}
            foul={!!freeThrow ? freeThrow : lastFoul}
          />
        }
      </Modal>


      <div className='flex flex-col landscape:flex-row md:flex-row flex-wrap justify-between text-black relative gap-2'>
        <ConfigButtons
          seePlayerStats={seePlayerStats} revert={revert} setRevert={setRevert} setSeePlayerStats={setSeePlayerStats}
          onFoulClick={handleFoul}
          isFoulOn={!!currentFoul}
        />

        <PlaygroundTeam
          team={teamA}
          seePlayerStats={seePlayerStats}
          revert={revert}
          onFoulClick={handleFoul}
          currentFoul={currentFoul}
          wrapperClass="landscape:pr-3 md:pr-3"
        />
        <PlaygroundTeam
          team={teamB}
          seePlayerStats={seePlayerStats}
          revert={revert}
          onFoulClick={handleFoul}
          currentFoul={currentFoul}
          wrapperClass="landscape:pl-3 md:pl-3"
        />

      </div>
      {
        (!!teamA.points || !!teamB.points) && <div className='flex justify-around flex-wrap mt-4 relative'>
          {isConfirmingMatchEnd && (
            <button
              type="button"
              disabled={selectedTeams.length !== 2}
              className={classes.home}
              onClick={() => {
                router.push('/')
              }}
            >
              Go Home
            </button>
          )}

          <button
            type="submit"
            disabled={selectedTeams.length !== 2}
            className={`${classes.regularBottomButton} ${isConfirmingMatchEnd ? 'bg-teal-600' : 'bg-purple-500'} hover:${isConfirmingMatchEnd ? 'bg-teal-500' : 'bg-purple-400'}`}
            onClick={handleEndMatch(true)}
          >
            {isConfirmingMatchEnd ? 'Salvar' : 'Finalizar Partida'}
          </button>
          {isConfirmingMatchEnd && (<button
            type="button"
            disabled={selectedTeams.length !== 2}
            className={`${classes.regularBottomButton} bg-gray-500 hover:bg-gray-400`}
            onClick={handleEndMatch(false)}
          >
            Cancelar
          </button>
          )}
        </div>
      }
    </main>
  )
}
