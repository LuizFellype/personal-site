import { renderHook, act } from '@testing-library/react';
import { createTeamPlayer } from './useTeamStates';
import { useFoulStates } from './useFoulStates';

const createPlayer = createTeamPlayer('Team X test')
const player1 = createPlayer('P1')
const player2 = createPlayer('P2')

describe('useFoulStates', () => {
    test('addFoul should track fouls history. WHEN commited 2+ should update freeThrow state with players info', () => {
        const { result: match } = renderHook(() => useFoulStates());

        expect(match.current.fouls.length).toBe(0)
        expect(match.current.freeThrow).toBeUndefined()
        
        act(() => {
            match.current.addFoul(player1, player2);
        })
        expect(match.current.fouls[0]).toEqual({
            commited: player1.id,
            received: player2.id,
            amount: 1
        })
        expect(match.current.freeThrow).toBeUndefined()

        // check it keep fouls history
        act(() => {
            match.current.addFoul(player2, player1);
        })
        expect(match.current.fouls[0]).toEqual({
            commited: player1.id,
            received: player2.id,
            amount: 1
        })
        expect(match.current.fouls[1]).toEqual({
            commited: player2.id,
            received: player1.id,
            amount: 1
        })
        expect(match.current.freeThrow).toBeUndefined()
        
        // second foult to alert freeThrow
        act(() => {
            match.current.addFoul(player1, player2);
        })
        expect(match.current.fouls.length).toBe(2)
        expect(match.current.fouls[0]).toEqual({
            commited: player1.id,
            received: player2.id,
            amount: 2
        })
        expect(match.current.freeThrow).toEqual({
            commited: player1.id,
            received: player2.id,
            amount: 2
        })
    })
})