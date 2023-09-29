import { renderHook, act } from '@testing-library/react';
import { createTeamPlayer } from './useTeamStates';
import { useFoulStates } from './useFoulStates';

const createPlayerX = createTeamPlayer('Team X test')
const player1 = createPlayerX('P1')
const player2 = createPlayerX('P2')

const createPlayerY = createTeamPlayer('Team Y test')
const player3 = createPlayerY('P3')

const setFoulFreeThrow = (match: { current: any; }) => {
    const addP1FreeThrowFoul = (foulAmount: number) => {
        act(() => {
            match.current.handleFoul();
        })
        act(() => {
            match.current.handleFoul(player1);
        })
        expect(match.current.currentFoul).toEqual({
            commited: player1,
        })

        act(() => {
            match.current.handleFoul(player3);
        })

        expect(match.current.fouls[0]).toEqual({
            commited: player1.id,
            received: player3.id,
            amount: foulAmount
        })
        expect(match.current.currentFoul).toBeUndefined()

        expect(match.current.freeThrow).toEqual({
            commited: player1.id,
            received: player3.id,
            amount: foulAmount
        })
    }
    return addP1FreeThrowFoul
}

describe('useFoulStates', () => {
    test('Should update only currentFoul.commited state when try to add foul to teammates', () => {
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
            match.current.handleFoul(player1);
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.currentFoul).toEqual({
            commited: player1,
        })

        // try to select received foul player
        act(() => {
            match.current.handleFoul(player2);
        })

        expect(match.current.fouls.length).toBe(0)
        expect(match.current.currentFoul).toEqual({
            commited: player2,
        })
    })

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
            match.current.handleFoul(player1);
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.currentFoul).toEqual({
            commited: player1,
        })

        // cancel foul flow
        act(() => {
            match.current.handleFoul();
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.freeThrow).toBeUndefined()
        expect(match.current.currentFoul).toBeUndefined()
    })

    test('handleFoul should track fouls history. WHEN commited 2+ should update freeThrow state with players info', () => {
        const onAddFoul = jest.fn()
        const { result: match } = renderHook(() => useFoulStates({ onAddFoul }));
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
            handleFoulResult = match.current.handleFoul(player1);
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.currentFoul).toEqual({
            commited: player1,
        })
        expect(handleFoulResult).toBeUndefined()
        expect(onAddFoul).toHaveBeenCalledTimes(0)
        
        // select received foul player
        act(() => {
            handleFoulResult = match.current.handleFoul(player3);
        })
        expect(handleFoulResult).toEqual(player1.id) // returns committed player ID
        expect(onAddFoul).toHaveBeenCalledTimes(1) // runs callback function

        expect(match.current.fouls.length).toBe(1)
        expect(match.current.fouls[0]).toEqual({
            commited: player1.id,
            received: player3.id,
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
            match.current.handleFoul(player3);
        })
        expect(match.current.currentFoul).toEqual({
            commited: player3,
        })

        expect(match.current.fouls.length).toBe(1)

        act(() => {
            match.current.handleFoul(player1);
        })
        expect(match.current.fouls.length).toBe(2)
        expect(match.current.fouls[0]).toEqual({ // first fouls is still the same
            commited: player1.id,
            received: player3.id,
            amount: 1
        })
        expect(match.current.fouls[1]).toEqual({
            commited: player3.id,
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
            handleFoulResult = match.current.handleFoul(player1);
        })
        expect(match.current.fouls.length).toBe(0)
        expect(match.current.currentFoul).toEqual({
            commited: player1,
        })
        expect(handleFoulResult).toBeUndefined()

        // select received foul player
        act(() => {
            handleFoulResult = match.current.handleFoul(player3);
        })
        expect(handleFoulResult).toEqual(player1.id) // "handleFoul" returns committed player ID
        expect(match.current.fouls.length).toBe(1)
        expect(match.current.fouls[0]).toEqual({
            commited: player1.id,
            received: player3.id,
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