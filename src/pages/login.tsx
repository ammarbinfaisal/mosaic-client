import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthDispatchContext } from "@/context/auth";
import consts from "@/consts";
import Head from "next/head";
import Image from "next/image";

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
                <title>Mosaic Login</title>
            </Head>
            <div className="h-screen w-screen grid grid-row-3 grid-cols-1 bg-light">
                <div className="flex flex-col items-center justify-center w-full row-span-2">
                    <Image
                        src="/logo@2x.png"
                        width={100}
                        height={100}
                        alt="logo"
                    />
                    <h1 className="text-4xl font-bold">Mosaic</h1>
                    <form
                        className="flex flex-col text-white items-center justify-center w-full max-w-md mt-8 space-y-4"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="w-full px-4 py-2 placeholder:text-white bg-brown rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="w-full px-4 py-2 placeholder:text-white bg-brown rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className="w-full px-4 py-2 bg-dark-brown bg-amber-900 rounded-md hover:bg-amber-900 transition-all"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                    {error && <p className="mt-4 text-red-800">{error}</p>}
                </div>
                <div className="w-full row-span-1 flex justify-center relative">
                    <img src="/Bottom Waves.svg" alt="bottom waves" className="absolute bottom-0" />
                </div>
            </div>
        </>
    );
};

export default Login;
