'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { PlaygroundTeam } from '@/containers/PlaygroundTeam'
import { ConfigButtons } from '@/containers/ConfigButtons'
import { useTeamsCtx } from '@/hooks/TeamsContext'

import { useFoulStates } from '@/hooks/useFoulStates'
import { useTeamStates } from '@/hooks/useTeamStates'
import { Modal } from '@/containers/Modal'
import { FoulFeedbackMessage } from '@/containers/FoulFeedbackMessage'

export default function Playground() {
  const [revert, setRevert] = useState(false)
  const [seePlayerStats, setSeePlayerStats] = useState(false)

  const { selectedTeams, teams } = useTeamsCtx()

  const [rawTeamA, rawTeamB] = useMemo(() => {
    return teams.filter(team => selectedTeams.includes(team.id))
  }, [teams, selectedTeams])

  const teamA = useTeamStates(rawTeamA.name, rawTeamA.players)
  const teamB = useTeamStates(rawTeamB.name, rawTeamB.players)

  const [isModalOpen, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true)
  }

  const { handleFoul, currentFoul, fouls, freeThrow, resetFreeThrow } = useFoulStates({ onAddFoul: openModal })
  const closeModal = useCallback(() => {
    setOpen(false)

    if (!!freeThrow) {
      resetFreeThrow()
    }
  }, [freeThrow])

  const lastFoul = useMemo(() => fouls[fouls.length - 1], [fouls])

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
    </main>
  )
}
