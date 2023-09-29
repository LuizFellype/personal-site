import React, { useCallback, useMemo } from 'react'

import { getFoulClassName, usePlayground } from './helpers'

import { setValueByFlag } from '@/utils/setValueByFlag'
import { Player, Team, getStatsLabel } from '@/hooks/useTeamStates'
import { MomentFoul } from '@/hooks/useFoulStates'
import './index.css'

type PlayGroundTeamProps = {
  team: Team; seePlayerStats?: boolean, revert?: boolean
  onFoulClick: (player?: Player) => string | void
  currentFoul: MomentFoul;
}

const PlaygroundTeamContainer = ({
  team, seePlayerStats = false, revert = false,
  onFoulClick,
  currentFoul
}: PlayGroundTeamProps) => {
  const { getActionHandler, id: teamId, name, teamStats, players } = usePlayground(team)

  const amountToChange = useCallback(setValueByFlag(revert), [revert])

  const teamStatsContainer = useMemo(() => {
    return Object.entries(teamStats).map(([statsKey, value]) => {
      return <div className='flex flex-col items-center gap-2' key={`${teamId}_${statsKey}`}>
        <span>{value}</span>
        <b>{getStatsLabel(statsKey)}</b>
      </div>
    })
  }, [teamStats, teamId])

  const setByPlayerStatsView = setValueByFlag(seePlayerStats)

  const playerNameMarginBottom = setByPlayerStatsView('mb-2', '')

  const setFoulClassName = useCallback(getFoulClassName(currentFoul), [currentFoul])

  const handleFoul = useCallback((player: Player) => () => onFoulClick(player), [onFoulClick])

  return <section className='grow-[.4]'>
    <h1
      className='text-center text-2xl font-semibold text-orange-600 capitalize mb-2'>
      {name}
    </h1>

    <div>
      <div className="flex justify-between mb-3">
        {teamStatsContainer}
      </div>

      {players.map(player => {
        const { name, id, teamId, ...playerStats } = player
        return (
          <div
            className="flex flex-col items-center justify-between mb-2"
            key={`${name}_name`}
          >
            <b
              className={`${setFoulClassName(player)} ${playerNameMarginBottom}`} onClick={handleFoul(player)}>
              {name}
            </b>

            <div className='flex items-center justify-between w-full'>
              {Object.entries(playerStats).map(([statsKey, value]) => {
                const actionButtons = (
                  <div className='flex flex-col' key={`action_${id}_${statsKey}`}>
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
                  <div className='flex flex-col items-center gap-2' key={`${id}_${statsKey}_value`}>
                    <span>{value}</span>
                  </div>
                )

                return <>
                  {setByPlayerStatsView(playerStats, actionButtons)}
                </>
              })}
            </div>
          </div>
        )
      }
      )}
    </div>
  </section>
}

export const PlaygroundTeam = React.memo(PlaygroundTeamContainer)