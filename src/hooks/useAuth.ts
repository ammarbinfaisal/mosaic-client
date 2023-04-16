import { fetcher } from "./useApi";
import useSWR from "swr";

const useAuth = () => {
    const { data, isLoading, error, mutate } = useSWR(
        "/me/info",
        fetcher(1000)
    );

    if (isLoading) return { isLoggedIn: false, isLoading, mutate };
    if (error) return { isLoggedIn: false, error, mutate };

    return { isLoggedIn: true, user: data, mutate };
};

export default useAuth;
