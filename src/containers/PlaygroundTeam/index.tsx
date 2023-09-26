import { Team, getStatsLabel } from '@/hooks/useTeamStates'
import './index.css'
import React, { useCallback, useMemo, useState } from 'react'

export const getStatsActionLabel = (statsKey: string) => ({
  points: '+1',
  assistances: '',
  ballSteals: 'Ladrao',
  blocks: 'Blocks',
  rebounds: 'Reb',
}[statsKey])

const hasOrangeShadow = (flag: boolean) => flag ? 'orange-shadow' : ''
const flipCurrentState = (setState: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setState(crt => !crt)
}

export function PlaygroundTeam({ team }: { team: Team }) {
  const [revert, setRevert] = useState(false)
  const amountToChange = useCallback((negative: any, positive: any) => revert ? negative : positive, [revert])
  
  const [seePlayerStats, setSeePlayerStats] = useState(false)
  const confgLabelToShow = useMemo(() => seePlayerStats ? 'hide' : 'view', [seePlayerStats])

  const { id, name,
    increasePoints,
    increaseRebounds,
    increaseAssistances,
    increaseBallSteals,
    increaseBlocks,
    players,
    ...teamStats
  } = team

  const getActionHandler = (statsKey: string, playerId: string, amount: number) => {
    const increaseMethod = {
      points: increasePoints(playerId),
      rebounds: increaseRebounds(playerId),
      assistances: increaseAssistances(playerId),
      ballSteals: increaseBallSteals(playerId),
      blocks: increaseBlocks(playerId),
    }[statsKey]

    return () => increaseMethod?.(amount)
  }

  const teamStatsContainer = useMemo(() => {
    return Object.entries(teamStats).map(([statsKey, value]) => {
      return <div className='flex flex-col items-center gap-2' key={`${id}_${statsKey}`}>
        <span>{value}</span>
        <b>{getStatsLabel(statsKey)}</b>
      </div>
    })
  }, [teamStats, id])

  return <section className='grow-[.4]'>
    <div className="flex justify-between mb-4">
      <button className={`self-start btn-config text-orange-400 ${hasOrangeShadow(revert)}`} onClick={flipCurrentState(setRevert)}>revert</button>
      <h1 className='text-center text-2xl font-semibold text-orange-600 capitalize'>{name}</h1>
      <button className={`self-start btn-config text-orange-400 ${hasOrangeShadow(seePlayerStats)}`} onClick={flipCurrentState(setSeePlayerStats)}>{confgLabelToShow}</button>
    </div>

    <div>
      <div className="flex justify-between mb-3">
        {teamStatsContainer}
      </div>


      {players.map(({ name, id, teamId, ...playerStats }) => {
        return <div className="flex flex-col items-center justify-between mb-2" key={name}>
          <b className={seePlayerStats ? 'mb-2' : ''}>{name}</b>

          <div className='flex items-center justify-between w-full'>
            {Object.entries(playerStats).map(([statsKey, value]) => {
              const actionButtons = (
                <div className='flex flex-col' key={`action_${team.id}_${statsKey}`}>
                  <button
                    onClick={getActionHandler(statsKey, id, amountToChange(-1, 1))}
                    className="stats-action">
                    {amountToChange(-1, '+1')}
                  </button>
                  {statsKey === 'points' &&
                    <button
                      onClick={getActionHandler(statsKey, id, amountToChange(-2, 2))}
                      className="stats-action mt-1">
                      {amountToChange(-2, '+2')}
                    </button>}
                </div>
              )

              const playerStats = (
                <div className='flex flex-col items-center gap-2' key={`${team.id}_${statsKey}`}>
                  <span>{value}</span>
                </div>
              )

              return <>
                {seePlayerStats ? playerStats : actionButtons}
              </>
            })}
          </div>
        </div>
      }
      )}
    </div>
  </section>
}
