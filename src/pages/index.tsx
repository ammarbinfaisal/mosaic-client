import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import LeftBox from "@/components/LeftBox";
import Feed from "@/components/Feed";
import Head from "next/head";
import Navbar from "@/components/Navbar";

export default function Home() {
    const router = useRouter();
    const authed = useAuth();

    useEffect(() => {
        if (!authed.isLoggedIn) {
            router.push("/login");
        }
    }, [router, authed]);

    return (
        <>
            <Head>
                <title>Mosaic</title>
            </Head>
            <main className="flex h-screen flex-col items-center font-inherit overflow-hidden">
                <Navbar />
                <div className="flex flex-row flex-grow w-full">
                    <div className="flex flex-col items-center justify-center h-full mx-8 my-12">
                        <LeftBox />
                    </div>
                    <div className="flex-grow flex flex-col items-center justify-center h-full overflow-y-scroll">
                        <Feed />
                    </div>
                </div>
            </main>
        </>
    );
}
