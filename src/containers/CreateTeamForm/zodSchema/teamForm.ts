
import z from "zod";

export const teamForm = z.object({
    teamName: z.string(),
    player1: z.string(),
    player2: z.string(),
    player3: z.string(),
});

export type TeamFormData = z.infer<typeof teamForm>;
