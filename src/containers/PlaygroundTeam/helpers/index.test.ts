import { createTeamPlayer } from '@/hooks/useTeamStates';
import { foulClasses, getFoulClassName } from '.';

const createPlayer = createTeamPlayer('teamName A')
const TeamAPlayer1 = createPlayer('player1Name')
const TeamAPlayer2 = createPlayer('player2Name')

const TeamBplayer3 = createTeamPlayer('teamName B')('player3Name')

describe('getFoulClassName', () => {
    test('Should return empty when foul IS NOT ON', () => {
        expect(getFoulClassName(undefined)(TeamAPlayer1)).toBe('')
    })
    test('Should return "possible-foul-offender" when foul IS ON BUT offender was not selected', () => {
        expect(getFoulClassName({})(TeamAPlayer1)).toBe(foulClasses.possibleOffender)
    })
    test("Should return 'foul-offender' when foul IS ON and player id matches foul's offender", () => {
        expect(getFoulClassName({ commited: TeamAPlayer1 })(TeamAPlayer1)).toBe(foulClasses.offender)
    })
    test('Should return empty when offender is selected BUT player id is not the same', () => {
        expect(getFoulClassName({ commited: TeamAPlayer2 })(TeamAPlayer1)).toBe('')
    })
    test('Should return "possible-foul-receiver" when offender is selected BUT player id is not one of teams Player', () => {
        expect(getFoulClassName({ commited: TeamBplayer3 })(TeamAPlayer1)).toBe(foulClasses.possibleReceiver)
    })

})