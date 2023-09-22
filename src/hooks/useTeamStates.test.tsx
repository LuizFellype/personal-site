import { renderHook, act } from '@testing-library/react';
import { createPlayer, useTeamStates } from './useTeamStates';

const player1 = createPlayer('P1')
const player2 = createPlayer('P2')

describe('useTeamStates', () => {

    test('increasePoints should update team and players points', () => {
        const { result: team } = renderHook(() => useTeamStates([player1.name, player2.name]));

        expect(team.current.points).toBe(0)
        expect(team.current.players[0].points).toBe(0)

        act(() => {
            team.current.increasePoints(player1.id)(2);
        })

        expect(team.current.players[0].points).toBe(2)
        expect(team.current.points).toBe(2)

        act(() => {
            team.current.increasePoints(player2.id)(2);
        })
        expect(team.current.players[0].points).toBe(2)
        expect(team.current.players[1].points).toBe(2)
        expect(team.current.points).toBe(4)
    })

    test('increaseRebound should update team and player rebounds', () => {
        const { result: team } = renderHook(() => useTeamStates([player1.id]));

        expect(team.current.rebounds).toBe(0)
        expect(team.current.players[0].rebounds).toBe(0)

        act(() => {
            team.current.increaseRebounds(player1.id)(2);
        })

        expect(team.current.players[0].rebounds).toBe(2)
        expect(team.current.rebounds).toBe(2)
    })

    test('increaseAssistances should update team and player assistances', () => {
        const { result: team } = renderHook(() => useTeamStates([player1.id]));

        expect(team.current.assistances).toBe(0)
        expect(team.current.players[0].assistances).toBe(0)

        act(() => {
            team.current.increaseAssistances(player1.id)(2);
        })

        expect(team.current.players[0].assistances).toBe(2)
        expect(team.current.assistances).toBe(2)
    })

    test('increaseBallSteals should update team and player ball steal', () => {
        const { result: team } = renderHook(() => useTeamStates([player1.id]));

        expect(team.current.ballSteals).toBe(0)
        expect(team.current.players[0].ballSteals).toBe(0)

        act(() => {
            team.current.increaseBallSteals(player1.id)(2);
        })

        expect(team.current.players[0].ballSteals).toBe(2)
        expect(team.current.ballSteals).toBe(2)
    })

    test('increaseBlocks should update team and player block', () => {
        const { result: team } = renderHook(() => useTeamStates([player1.id]));

        expect(team.current.blocks).toBe(0)
        expect(team.current.players[0].blocks).toBe(0)

        act(() => {
            team.current.increaseBlocks(player1.id)(2);
        })

        expect(team.current.players[0].blocks).toBe(2)
        expect(team.current.blocks).toBe(2)
    })
})