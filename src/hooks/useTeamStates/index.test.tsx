import { renderHook, act, waitFor } from '@testing-library/react';
import { useTeamStates } from '.';
import { createTeamPlayer } from './helpers';

const createPlayer = createTeamPlayer('Team X test')
const player1 = createPlayer('P1')
const player2 = createPlayer('P2')

describe('useTeamStates', () => {
    test('increasePoints should update team and players points', () => {
        const players = [player1, player2]
        const { result: team } = renderHook(() => useTeamStates('Team X', players));
        
        expect(team.current.points).toBe(0)
        expect(team.current.players[0].points).toBe(0)

        act(() => {
            team.current.increasePoints?.(player1.id)(2);
        })

        expect(team.current.players[0].points).toBe(2)
        expect(team.current.players[0].twoPoints).toBe(1)
        expect(team.current.players[0].threePoints).toBe(0)
        expect(team.current.players[0].onePoints).toBe(0)
        expect(team.current.points).toBe(2)

        act(() => {
            team.current.increasePoints?.(player2.id)(2);
        })
        expect(team.current.players[0].points).toBe(2)
        expect(team.current.players[0].twoPoints).toBe(1)
        expect(team.current.players[0].threePoints).toBe(0)
        expect(team.current.players[0].onePoints).toBe(0)
        
        expect(team.current.players[1].points).toBe(2)
        expect(team.current.players[1].twoPoints).toBe(1)
        expect(team.current.players[1].threePoints).toBe(0)
        expect(team.current.players[1].onePoints).toBe(0)

        expect(team.current.points).toBe(4)
    })

    test('increaseRebounds should update team and player rebounds', () => {
        const players = [player1];
        const { result: team } = renderHook(() => useTeamStates('Team X', players));

        expect(team.current.rebounds).toBe(0)
        expect(team.current.players[0].rebounds).toBe(0)

        act(() => {
            team.current.increaseRebounds(player1.id)(2);
        })

        expect(team.current.players[0].rebounds).toBe(2)
        expect(team.current.rebounds).toBe(2)
    })

    test('increaseAssistances should update team and player assistances', () => {
        const players = [player1];
        const { result: team } = renderHook(() => useTeamStates('Team X', players));

        expect(team.current.assistances).toBe(0)
        expect(team.current.players[0].assistances).toBe(0)

        act(() => {
            team.current.increaseAssistances(player1.id)(2);
        })

        expect(team.current.players[0].assistances).toBe(2)
        expect(team.current.assistances).toBe(2)
    })

    test('increaseBallSteals should update team and player ball steal', () => {
        const players = [player1];
        const { result: team } = renderHook(() => useTeamStates('Team X', players));

        expect(team.current.ballSteals).toBe(0)
        expect(team.current.players[0].ballSteals).toBe(0)

        act(() => {
            team.current.increaseBallSteals(player1.id)(2);
        })

        expect(team.current.players[0].ballSteals).toBe(2)
        expect(team.current.ballSteals).toBe(2)
    })

    test('increaseBlocks should update team and player blocks', () => {
        const players = [player1];
        const { result: team } = renderHook(() => useTeamStates('Team X', players));

        expect(team.current.blocks).toBe(0)
        expect(team.current.players[0].blocks).toBe(0)

        act(() => {
            team.current.increaseBlocks(player1.id)(1);
        })

        expect(team.current.players[0].blocks).toBe(1)
        expect(team.current.blocks).toBe(1)
    })

    describe('revert', () => {
        test('increasePoints should update team and players points', () => {
            const players = [player1, player2]
            const { result: team } = renderHook(() => useTeamStates('Team X', players));
            
            expect(team.current.points).toBe(0)
            expect(team.current.players[0].points).toBe(0)
    
            act(() => {
                team.current.increasePoints?.(player1.id)(2);
            })
    
            expect(team.current.players[0].points).toBe(2)
            expect(team.current.players[0].twoPoints).toBe(1)
            expect(team.current.players[0].threePoints).toBe(0)
            expect(team.current.players[0].onePoints).toBe(0)
            
            expect(team.current.points).toBe(2)
    
            act(() => {
                team.current.increasePoints?.(player1.id)(-2);
            })
            expect(team.current.players[0].points).toBe(0)
            expect(team.current.players[0].twoPoints).toBe(0)
            expect(team.current.players[0].threePoints).toBe(0)
            expect(team.current.players[0].onePoints).toBe(0)

            expect(team.current.points).toBe(0)
        })
    })
})

