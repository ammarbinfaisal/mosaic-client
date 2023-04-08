import "@/styles/globals.css";
import { useReducer } from "react";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";

import { AuthContext, AuthDispatchContext, authReducer } from "@/context/auth";

const font = Rubik({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    const [auth, authDispatch] = useReducer(authReducer, { username: "" });

    return (
        <AuthContext.Provider value={auth}>
            <AuthDispatchContext.Provider value={authDispatch}>
                <div className={`${font.className} w-full h-screen`}>
                    <Component {...pageProps} />;
                </div>
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}
