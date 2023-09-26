

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { teamForm, TeamFormData } from "./zodSchema/teamForm";
import React from "react";


type Field = { label: string; placeholder?: string; id: keyof TeamFormData }
const fields: Field[] = [
    { label: 'Nome do Time', id: 'teamName', placeholder: 'Santa' },
    { label: 'Player 1', id: 'player1', placeholder: 'Chris' },
    { label: 'Player 2', id: 'player2', placeholder: 'Drew' },
    { label: 'Player 3', id: 'player3', placeholder: 'Gelin' }
]

export default function CreateTeamForm(props: { onSubmit: (data: TeamFormData) => void }) {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty, isValid },
        reset
    } = useForm<TeamFormData>({
        resolver: zodResolver(teamForm),
    });

    async function onSubmit(data: TeamFormData) {
        console.log(isSubmitting);
        console.log({ data });
        // Replace this with a server action or fetch an API endpoint to authenticate

        props.onSubmit(data)
        reset()
    }

    return (
        <div className="selection:bg-rose-500 selection:text-white">
            <div className="flex items-center justify-center">
                <div className="flex-1 p-8">
                    <div className="mx-auto w-80 overflow-hidden rounded-3xl bg-white shadow-xl">
                        {/* Form Header */}
                        <div className="rounded-bl-4xl relative h-32 bg-rose-500">
                            <svg
                                className="absolute bottom-0"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1440 320"
                            >
                                <path
                                    fill="#ffffff"
                                    fillOpacity="1"
                                    d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                                ></path>
                            </svg>
                        </div>

                        {/* Form Body */}
                        <div className="rounded-tr-4xl bg-white px-10 pb-8 pt-4">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Welcome back!
                            </h1>
                            <form
                                className="mt-6"
                                action=""
                                method="POST"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {
                                    fields.map(field => <div className='relative mb-10' key={field.id}>
                                        <input
                                            {...register(field.id, { required: true })}
                                            id={field.id}
                                            name={field.id}
                                            type="text"
                                            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                                            placeholder={field.placeholder}
                                            autoComplete="off"
                                        />
                                        {errors?.[field.id] && (
                                            <p className="text-red-600 text-sm">
                                                {errors?.[field.id]?.message}
                                            </p>
                                        )}
                                        <label
                                            htmlFor={field.id}
                                            className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                                        >
                                            {field.label}
                                        </label>
                                    </div>)
                                }

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!isDirty || !isValid || isSubmitting}
                                    className="block w-full cursor-pointer rounded bg-rose-500 px-4 py-2 text-center font-semibold text-white hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="inline w-6 h-6 mr-2 text-white animate-spin fill-rose-600 opacity-100"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                {/* SVG for Spinner Animation */}
                                            </svg>
                                        </div>
                                    ) : (
                                        "Adicionar"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
// export const CreateTeamForm = () => {
//     const [values, onChange] = useForm({name:"",age:12});

//     return <form>
//         <input type="text" value={form.teamName} name="teamName" id="teamName" />
//         <input type="text" value={form.player1} name="player1" id="player1" />
//         <input type="text" value={form.player2} name="player2" id="player2" />
//         <input type="text" value={form.player3} name="player3" id="player3" />
//     </form>
// }