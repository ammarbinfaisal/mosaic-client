import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { FetchError } from "@/hooks/useApi";

interface IAuthProps {
    children: React.ReactNode;
}

const Auth = (props: IAuthProps) => {
    const { isLoggedIn, isLoading, error } = useAuth();
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (
                (!isLoggedIn && !isLoading) ||
                (error && error instanceof FetchError)
            ) {
                router.push("/login");
            }
        }, 500);
    }, [isLoggedIn, isLoading, router, error]);

    if (!isMounted) {
        return null;
    }

    if (isLoggedIn) {
        return <>{props.children}</>;
    }

    if (error && error instanceof TypeError) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">
                    You seem to be offline :/
                </h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Redirecting to login page...</h1>
        </div>
    );
};

export default Auth;
