import { getMVPPlayers } from "."
import { AVERAGE_RESULT, MATCHES_MOCK } from "./mock/matches"

describe('get MVP averages', () => {
    test('should return players ordered by MVP averages', () => {
        expect(getMVPPlayers(MATCHES_MOCK)).toStrictEqual(AVERAGE_RESULT)
    })
})
