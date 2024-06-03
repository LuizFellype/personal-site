import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { getFoulClassName, usePlayground } from './helpers'

import { setValueByFlag } from '@/utils/setValueByFlag'
import { Player, Team, getStatsLabel } from '@/hooks/useTeamStates'
import { FoulType, MomentFoul } from '@/hooks/useFoulStates'
import './index.css'

type PlayGroundTeamProps = {
  team: Team; seePlayerStats?: boolean, revert?: boolean
  onFoulClick?: (player?: Player) => string | void
  currentFoul?: MomentFoul;
  freeThrowPlayerName?: string;
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

const generalJustifyContent = 'justify-around'
const PlaygroundTeamContainer = ({
  team, seePlayerStats = false, revert = false,
  onFoulClick = () => { },
  currentFoul,
  wrapperClass = '',
  fouls = [],
  freeThrowPlayerName
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

  const [isFullPlayerPointsVisible, setIsFullPlayerPointsVisible] = useState<Record<string, boolean>>({});

  const [isFreeThrowPlayer, setIsFreeThrowPlayer] = useState<string | undefined>();

  useEffect(() => {
    freeThrowPlayerName && setIsFreeThrowPlayer(freeThrowPlayerName)
  }, [freeThrowPlayerName])


  const handleFullPointsVisibility = useCallback((player: Player) => () => {
    setIsFullPlayerPointsVisible(crnt => (crnt[player.id] ? { ...crnt, [player.id]: false } : { ...crnt, [player.id]: true }))
  }, [setIsFullPlayerPointsVisible])


  return <section className={`flex-1`}>
    <h1
      className={`text-center text-2xl font-semibold text-orange-600 capitalize mb-2 `}>
      {name}
    </h1>

    <div className={wrapperClass}>
      <div className={`flex ${generalJustifyContent} mb-3`}>
        {teamStatsContainer}
      </div>

      {players.map((player, idx) => {
        const { name, id, teamId, points,
          assistances,
          ballSteals,
          blocks,
          rebounds } = player

        const playerStats = {
          points,
          assistances,
          ballSteals,
          blocks,
          rebounds
        }
        const dynamicStatsAlignment = isFullPlayerPointsVisible[id] ? 'items-baseline' : 'items-center'
        
        const isPlayerFreeThrowing = isFreeThrowPlayer === player.id

        return (
          <div
            className={`flex flex-col items-center ${generalJustifyContent} mb-2`}
            key={`${teamId}_${name}_playerName${idx}`}
          >
            <div className='text-center flex flex-col'>
              <b
                className={`${setFoulClassName(player)}`} onClick={handleFoul(player)}>
                {name}
              </b>
              {isPlayerFreeThrowing && <button className='underline' onClick={() => setIsFreeThrowPlayer(undefined)}>Finalizar Free Throw</button>}
              {seePlayerStats && <FoulsContainer normalizedFouls={normalizedFouls} playerId={id} />}
            </div>

            <div className={`flex ${dynamicStatsAlignment} ${generalJustifyContent} w-full`}>
              {Object.entries(playerStats).map(([statsKey, value], idx) => {
                const isPointsCol = statsKey === 'points'

                const regularButton = <button
                  disabled={(!isPointsCol && !!isFreeThrowPlayer) ||  isFoulOn || revert && value === 0}
                  onClick={getActionHandler(statsKey, id, amountToChange(-1, 1))}
                  className="stats-action">
                  {amountToChange(-1, '+1')}
                </button>

                const actionButtons = (
                  <div className='flex flex-col' key={`action_${teamId}_${id}_${statsKey}${idx}`}>
                    {(!isPointsCol || isPlayerFreeThrowing) && regularButton}

                    {isPointsCol && 
                      <>
                        <button
                          disabled={!!isFreeThrowPlayer || isFoulOn || revert && value < 2}
                          onClick={getActionHandler(statsKey, id, amountToChange(-2, 2))}
                          className="stats-action mt-1">
                          {amountToChange(-2, '+2')}
                        </button>
                        <button
                          disabled={!!isFreeThrowPlayer || isFoulOn || revert && value < 2}
                          onClick={getActionHandler(statsKey, id, amountToChange(-3, 3))}
                          className="stats-action mt-1">
                          {amountToChange(-3, '+3')}
                        </button>
                      </>
                    }
                  </div>
                )

                const statsClass = isPointsCol && { className: 'underline' }
                const playerStats = (
                  <div className='flex flex-col items-center gap-1' key={`${teamId}_${id}_${statsKey}_value${idx}`}>
                    <span onClick={() => isPointsCol && handleFullPointsVisibility(player)()} {...statsClass}>{value}</span>
                    {isPointsCol && isFullPlayerPointsVisible[id] && <div className='flex flex-col items-baseline '>
                      <span>3: {player.threePoints}</span>
                      <span>2: {player.twoPoints}</span>
                      <span>1: {player.onePoints}</span>
                    </div>
                    }
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
  </section >
}

export const PlaygroundTeam = React.memo(PlaygroundTeamContainer)