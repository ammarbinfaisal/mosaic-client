import { useEffect, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

interface IAuthProps {
    children: React.ReactNode;
}

const Auth = (props: IAuthProps) => {
    const { isLoggedIn } = useAuth();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    if (isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">
                    loading...
                </h1>
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">
                    You must be logged in to view this page.
                </h1>
                <div className="flex flex-row space-x-4 font-semibold text-2xl my-4">
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </div>
            </div>
        );
    }

    return <>{props.children}</>;
};

export default Auth;
