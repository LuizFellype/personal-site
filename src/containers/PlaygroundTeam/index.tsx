import { Team, getStatsLabel } from '@/hooks/useTeamStates'
import './index.css'
import React, { useCallback, useMemo } from 'react'
import { usePlayground } from './helpers'
import { setValueByFlag } from '@/utils/setValueByFlag'

type PlayGroundTeamProps = { team: Team; seePlayerStats?: boolean, revert?: boolean }

export function PlaygroundTeam({ team, seePlayerStats = false, revert = false }: PlayGroundTeamProps) {
  const { getActionHandler, id, name, teamStats, players } = usePlayground(team)

  const amountToChange = useCallback(setValueByFlag(revert), [revert])

  const teamStatsContainer = useMemo(() => {
    return Object.entries(teamStats).map(([statsKey, value]) => {
      return <div className='flex flex-col items-center gap-2' key={`${id}_${statsKey}`}>
        <span>{value}</span>
        <b>{getStatsLabel(statsKey)}</b>
      </div>
    })
  }, [teamStats, id])

  return <section className='grow-[.4]'>
    <h1
      className='text-center text-2xl font-semibold text-orange-600 capitalize mb-2'>
      {name}
    </h1>

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
