import { AuthDispatchContext } from "@/context/auth";
import { useContext } from "react";
import { useRouter } from "next/router";

const useLogout = () => {
    const authDispatchCtx = useContext(AuthDispatchContext);
    const router = useRouter();

    return () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        authDispatchCtx({ type: "LOGOUT", payload: { username: "" } });
        router.push("/login");
    }
};

const useAuth = () => {
    const logout = useLogout();
    const authDispatchCtx = useContext(AuthDispatchContext);

    if (typeof window === "undefined") {
        return { isLoggedIn: false, logout };
    } else {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        if (token && username) {
            return { isLoggedIn: true, logout };
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            return { isLoggedIn: false, logout };
        }
    }
};

export default useAuth;
