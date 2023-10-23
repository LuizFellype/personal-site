import React, { memo, useCallback, useMemo, useState } from 'react'

import { getFoulClassName, usePlayground } from './helpers'

import { setValueByFlag } from '@/utils/setValueByFlag'
import { Player, Team, getStatsLabel } from '@/hooks/useTeamStates'
import { FoulType, MomentFoul } from '@/hooks/useFoulStates'
import './index.css'

type PlayGroundTeamProps = {
  team: Team; seePlayerStats?: boolean, revert?: boolean
  onFoulClick?: (player?: Player) => string | void
  currentFoul?: MomentFoul;
  wrapperClass?: string;
  fouls?: FoulType[]
}

type NormalizedFoulsType = Record<string, { received: string, amount: number }[]>
const normalizeFoulsToObject = (fouls: FoulType[]): NormalizedFoulsType => {
  return fouls.reduce((acc, { commited, received, amount }) => {
    if (!!acc[commited]) {
      return { ...acc, [commited]: [...acc[commited], { received, amount }] }
    }

    return { ...acc, [commited]: [{ received, amount }] }
  }, {} as NormalizedFoulsType)
}

// eslint-disable-next-line react/display-name
const FoulsContainer = memo(({ normalizedFouls, playerId }: { normalizedFouls: NormalizedFoulsType, playerId: string }) => {
  const [showDetails, setShowDetails] = useState(false)

  const total = useMemo(() => normalizedFouls[playerId]?.reduce((acc, { amount }) => { return acc + amount }, 0), [normalizedFouls, playerId])

  return !!normalizedFouls[playerId] && (
    <div className='text-xs'>
      <span onClick={() => setShowDetails(!showDetails)} className={`border border-purple-300 ${showDetails ? 'text-orange-400' : 'text-purple-400'} pr-1 pl-1 rounded-lg`}>Faltas: {total}</span> 
      {showDetails && normalizedFouls[playerId].map(foul => {
        return <span key={`${foul.received}_${foul.amount}`}> {foul.amount} {foul.received}.</span>
      })}
    </div>
  )
})

const PlaygroundTeamContainer = ({
  team, seePlayerStats = false, revert = false,
  onFoulClick = () => { },
  currentFoul,
  wrapperClass = '',
  fouls = []
}: PlayGroundTeamProps) => {
  const { getActionHandler, id: teamId, name, teamStats, players } = usePlayground(team)

  const amountToChange = useCallback(setValueByFlag(revert), [revert])

  const normalizedFouls = useMemo(() => normalizeFoulsToObject(fouls), [fouls])

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

  const handleFoul = useCallback((player: Player) => () => {
    if (currentFoul) {
      onFoulClick(player)
    }
  }, [onFoulClick, currentFoul])

  const isFoulOn = useMemo(() => !!currentFoul, [currentFoul])

  return <section className={`flex-1`}>
    <h1
      className='text-center text-2xl font-semibold text-orange-600 capitalize mb-2'>
      {name}
    </h1>

    <div className={wrapperClass}>
      <div className="flex justify-between mb-3">
        {teamStatsContainer}
      </div>

      {players.map((player, idx) => {
        const { name, id, teamId, ...playerStats } = player

        return (
          <div
            className="flex flex-col items-center justify-between mb-2"
            key={`${teamId}_${name}_playerName${idx}`}
          >
            <div className='text-center'>
              <b
                className={`${setFoulClassName(player)} ${playerNameMarginBottom}`} onClick={handleFoul(player)}>
                {name}
              </b>
              <FoulsContainer normalizedFouls={normalizedFouls} playerId={id} />
            </div>

            <div className='flex items-center justify-between w-full'>
              {Object.entries(playerStats).map(([statsKey, value], idx) => {
                const actionButtons = (
                  <div className='flex flex-col' key={`action_${teamId}_${id}_${statsKey}${idx}`}>
                    <button
                      disabled={isFoulOn || revert && value === 0}
                      onClick={getActionHandler(statsKey, id, amountToChange(-1, 1))}
                      className="stats-action">
                      {amountToChange(-1, '+1')}
                    </button>
                    {statsKey === 'points' &&
                      <button
                        disabled={isFoulOn || revert && value < 2}
                        onClick={getActionHandler(statsKey, id, amountToChange(-2, 2))}
                        className="stats-action mt-1">
                        {amountToChange(-2, '+2')}
                      </button>}
                  </div>
                )

                const playerStats = (
                  <div className='flex flex-col items-center gap-2' key={`${teamId}_${id}_${statsKey}_value${idx}`}>
                    <span>{value}</span>
                  </div>
                )

                return setByPlayerStatsView(playerStats, actionButtons)
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