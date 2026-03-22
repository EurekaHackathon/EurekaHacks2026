"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { signUpWithEmail } from "@/lib/actions/auth";

const initialState = {
    error: "",
    payload: new FormData(),
};

const signUpWithGithub = async () => {
    const res = await fetch("/login/github", {
        method: "POST",
    });
    if (!res.ok) {
        throw new Error("Failed to sign up with Github");
    }
    const { url } = await res.json();
    window.location.href = url;
};

export default function RegistrationForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [state, formAction, pending] = useActionState(signUpWithEmail, initialState);

    return (
        <div
            className="bg-[#151c2b] p-8 md:p-12 lg:p-16 rounded-2xl text-gray-100 min-w-[40vw] max-w-[90vw] lg:w-[750px]">
            <h1 className="text-2xl md:text-4xl font-bold">Create an account</h1>
            <h2 className="md:text-xl font-medium pt-2">Register to apply to EurekaHACKS</h2>
            <form className="pt-12" action={formAction}>
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="flex flex-col md:text-lg w-full">
                        First Name
                        <input
                            className="mt-2 rounded-xl py-4 px-6 bg-[#030712] border-secondary-700 border hover:border-secondary-500 focus:outline-none text-gray-100 placeholder-gray-500"
                            type="text"
                            required
                            defaultValue={state.payload.get("first-name") as string || undefined}
                            name="first-name" placeholder="First Name"/>
                    </label>
                    <label className="flex flex-col md:text-lg w-full">
                        Last Name
                        <input
                            className="mt-2 rounded-xl py-4 px-6 bg-[#030712] border-secondary-700 border hover:border-secondary-500 focus:outline-none text-gray-100 placeholder-gray-500"
                            type="text"
                            required
                            defaultValue={state.payload.get("last-name") as string || undefined}
                            name="last-name" placeholder="Last Name"/>
                    </label>
                </div>
                <label className="pt-4 lg:pt-6 flex flex-col md:text-lg">
                    Email
                    <input
                        className="mt-2 rounded-xl py-4 px-6 bg-[#030712] border-secondary-700 border hover:border-secondary-500 focus:outline-none text-gray-100 placeholder-gray-500"
                        type="email"
                        required
                        defaultValue={state.payload.get("email") as string || undefined}
                        name="email" placeholder="hello@eurekahacks.ca"/>
                </label>
                <div className="pt-4 lg:pt-6 flex flex-col md:flex-row gap-4">
                    <label className="flex flex-col md:text-lg w-full">
                        Password
                        <div className="flex mt-2 items-center">
                            <input
                                required
                                className="rounded-xl py-4 px-6 bg-[#030712] border-secondary-700 border hover:border-secondary-500 focus:outline-none text-gray-100 placeholder-gray-500 w-full"
                                type={passwordVisible ? "text" : "password"}
                                defaultValue={state.payload.get("password") as string || undefined}
                                name="password" placeholder="••••••••••••"/>
                            <div className="cursor-pointer">
                                <Icon onClick={() => setPasswordVisible(!passwordVisible)}
                                      className="text-2xl -ml-12 text-gray-400"
                                      icon={passwordVisible ? "mdi:show-outline" : "mdi:hide-outline"}/>
                            </div>
                        </div>
                    </label>
                    <label className="flex flex-col md:text-lg w-full">
                        Confirm Password
                        <div className="flex mt-2 items-center">
                            <input
                                required
                                className="rounded-xl py-4 px-6 bg-[#030712] border-secondary-700 border hover:border-secondary-500 focus:outline-none text-gray-100 placeholder-gray-500 w-full"
                                type={confirmPasswordVisible ? "text" : "password"}
                                defaultValue={state.payload.get("confirm-password") as string || undefined}
                                name="confirm-password" placeholder="••••••••••••"/>
                            <div className="cursor-pointer">
                                <Icon onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                      className="text-2xl -ml-12 text-gray-400"
                                      icon={confirmPasswordVisible ? "mdi:show-outline" : "mdi:hide-outline"}/>
                            </div>
                        </div>
                    </label>
                </div>
                <p className="mt-6 min-h-6 text-red-400 font-semibold break-words">
                    {!pending && state?.error}
                </p>
                <button
                    className="mt-2 flex justify-center bg-[var(--neon-yellow)] text-gray-900 font-semibold md:text-xl w-full py-4 rounded-xl hover:bg-[var(--neon-yellow-dark)] duration-200"
                    type="submit" disabled={pending}>
                    {!pending && "Sign up"}
                    {pending && "​"}
                    {pending && <Icon className="text-2xl md:text-3xl lg:text-4xl absolute" icon="codex:loader"/>}
                </button>
            </form>
            <button
                onClick={signUpWithGithub}
                className="flex items-center justify-center gap-2 border font-semibold border-secondary-700 text-gray-100 md:text-xl mt-4 w-full py-4 rounded-xl hover:border-secondary-500 hover:bg-secondary-950 duration-200">
                <div className="min-w-6 md:min-w-8">
                    <Icon icon="logos:github-icon" className="text-xl md:text-2xl"/>
                </div>
                Sign up with Github
            </button>
            <h2 className="pt-8 text-center text-sm md:text-lg">Already have an account? <Link
                className="font-semibold underline duration-100 hover:text-gray-500"
                href="/login">Log in</Link></h2>
        </div>
    );
}
