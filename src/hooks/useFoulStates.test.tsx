import { renderHook, act } from '@testing-library/react';
import { createTeamPlayer } from './useTeamStates';
import { useFoulStates } from './useFoulStates';

const createPlayer = createTeamPlayer('Team X test')
const player1 = createPlayer('P1')
const player2 = createPlayer('P2')

const setFoulFreeThrow = (match: { current: any; }) => {
    const addP1FreeThrowFoul = (foulAmount: number) => {
        act(() => {
            match.current.handleFoul();
        })
        act(() => {
            match.current.handleFoul(player1.id);
        })
        expect(match.current.currentFoul).toEqual({
            commited: player1.id,
        })

        act(() => {
            match.current.handleFoul(player2.id);
        })

        expect(match.current.fouls[0]).toEqual({
            commited: player1.id,
            received: player2.id,
            amount: foulAmount
        })
        expect(match.current.currentFoul).toBeUndefined()

        expect(match.current.freeThrow).toEqual({
            commited: player1.id,
            received: player2.id,
            amount: foulAmount
        })
    }
    return addP1FreeThrowFoul
}

describe('useFoulStates', () => {
    test('handleFoul should reset currentFoul state if executed without player parameter before both players were selected', () => {
        const { result: match } = renderHook(() => useFoulStates());

        expect(match.current.fouls.length).toBe(0)
        expect(match.current.freeThrow).toBeUndefined()
        expect(match.current.currentFoul).toBeUndefined()

        // starts foul flow
        act(() => {
            match.current.handleFoul();
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.currentFoul).toEqual({})

        // select commited foul player
        act(() => {
            match.current.handleFoul(player1.id);
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.currentFoul).toEqual({
            commited: player1.id,
        })

        // select received foul player
        act(() => {
            match.current.handleFoul();
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.freeThrow).toBeUndefined()
        expect(match.current.currentFoul).toBeUndefined()
    })

    test('handleFoul should track fouls history. WHEN commited 2+ should update freeThrow state with players info', () => {
        const { result: match } = renderHook(() => useFoulStates());
        let handleFoulResult;

        expect(match.current.fouls.length).toBe(0)
        expect(match.current.freeThrow).toBeUndefined()
        expect(match.current.currentFoul).toBeUndefined()

        // starts foul flow
        act(() => {
            handleFoulResult = match.current.handleFoul();
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.currentFoul).toEqual({})
        expect(handleFoulResult).toBeUndefined()

        // select commited foul player
        act(() => {
            handleFoulResult = match.current.handleFoul(player1.id);
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.currentFoul).toEqual({
            commited: player1.id,
        })
        expect(handleFoulResult).toBeUndefined()

        // select received foul player
        act(() => {
            handleFoulResult = match.current.handleFoul(player2.id);
        })
        expect(handleFoulResult).toEqual(player1.id) // make sure "handleFoul" returns committed player ID
        expect(match.current.fouls.length).toBe(1)
        expect(match.current.fouls[0]).toEqual({
            commited: player1.id,
            received: player2.id,
            amount: 1
        })
        expect(match.current.freeThrow).toBeUndefined()

        expect(match.current.currentFoul).toBeUndefined()


        // check it is keeping fouls history
        act(() => {
            match.current.handleFoul();
        })
        expect(match.current.currentFoul).toEqual({})

        act(() => {
            match.current.handleFoul(player2.id);
        })
        expect(match.current.currentFoul).toEqual({
            commited: player2.id,
        })

        expect(match.current.fouls.length).toBe(1)

        act(() => {
            match.current.handleFoul(player1.id);
        })
        expect(match.current.fouls.length).toBe(2)
        expect(match.current.fouls[0]).toEqual({ // first fouls is still the same
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

        expect(match.current.currentFoul).toBeUndefined()

        // 2+ fouls should update alert freeThrow
        const addP1FreeThrowFoul = setFoulFreeThrow(match)
        addP1FreeThrowFoul(2)
        addP1FreeThrowFoul(3)
    })

    test('resetFreeThrow should clean freeThrow state', () => {
        const { result: match } = renderHook(() => useFoulStates());
        let handleFoulResult;

        expect(match.current.fouls.length).toBe(0)
        expect(match.current.freeThrow).toBeUndefined()
        expect(match.current.currentFoul).toBeUndefined()

        // starts foul flow
        act(() => {
            handleFoulResult = match.current.handleFoul();
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.currentFoul).toEqual({})
        expect(handleFoulResult).toBeUndefined()

        // select commited foul player
        act(() => {
            handleFoulResult = match.current.handleFoul(player1.id);
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.currentFoul).toEqual({
            commited: player1.id,
        })
        expect(handleFoulResult).toBeUndefined()

        // select received foul player
        act(() => {
            handleFoulResult = match.current.handleFoul(player2.id);
        })
        expect(handleFoulResult).toEqual(player1.id) // "handleFoul" returns committed player ID
        expect(match.current.fouls.length).toBe(1)
        expect(match.current.fouls[0]).toEqual({
            commited: player1.id,
            received: player2.id,
            amount: 1
        })
        expect(match.current.freeThrow).toBeUndefined()
        
        expect(match.current.currentFoul).toBeUndefined()
        
        const addP1FreeThrowFoul = setFoulFreeThrow(match)
        addP1FreeThrowFoul(2)
        
        act(() => {
            match.current.resetFreeThrow()
        })
        expect(match.current.freeThrow).toBeUndefined()
    })
})