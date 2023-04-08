import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthDispatchContext } from "@/context/auth";
import consts from "@/consts";
import Head from "next/head";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const authDispatchCtx = useContext(AuthDispatchContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("submitting");
            console.log("username", username);
            const response = await fetch(`${consts.API_URL}/u/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                setError("wrong username or password");
                setUsername("");
                setPassword("");
                return;
            }
            const token = await response.text();
            localStorage.setItem("token", token.substring(1, token.length - 2));
            localStorage.setItem("username", username);
            authDispatchCtx({ type: "LOGIN", payload: { username } });
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Head>
                <title>Mosaic</title>
            </Head>
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <h1 className="text-4xl font-bold">Login</h1>
                <form
                    className="flex flex-col items-center justify-center w-full max-w-md mt-8 space-y-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="w-full px-4 py-2 bg-stone-100 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-600"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="w-full px-4 py-2 bg-stone-100 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-600"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="w-full px-4 py-2 text-stone-900 bg-stone-100 rounded-md hover: transition-all focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-opacity-50"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
        </>
    );
};

export default Login;
