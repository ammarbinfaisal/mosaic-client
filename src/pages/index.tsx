import LeftBox from "@/components/LeftBox";
import Feed from "@/components/Feed";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Auth from "@/components/Auth";
import Main from "@/components/Main";
import { Sort } from "@/types/sort";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/useAuth";

const mdwidth = 768;

export default function Home() {
    const auth = useAuth();
    const [sort, setSort] = useState<Sort>(Sort.hot);
    const [home, setHome] = useState<boolean>(auth.isLoggedIn);
    const [leftBox, setLeftBox] = useState<boolean>(false);

    const toggleLeftBox = () => {
        setLeftBox(!leftBox);
    };

    useEffect(() => {
        const fn = () => {
            if (window.innerWidth > mdwidth) {
                setLeftBox(true);
            } else {
                setLeftBox(false);
            }
        };
        fn();
        window.addEventListener("resize", fn);

        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Mosaic</title>
            </Head>
            <Main>
                <Navbar search />
                <div className="flex flex-row flex-grow w-full">
                    <div
                        className={`${
                            leftBox ? "w-1/2 md:w-auto" : "w-0 overflow-hidden"
                        } md:flex flex-col items-center justify-center h-full mx-0 md:mx-8 my-12 transition-all duration-500 ease-in-out`}
                    >
                        <LeftBox
                            setSort={setSort}
                            setHome={setHome}
                            home={home}
                        />
                    </div>
                    <div
                        className={`flex-grow flex flex-col items-center justify-center h-full z-10 bg-white transition-all duration-500 ease-in-out
                         ${leftBox ? "opacity-20" : "opacity-100"}`}
                    >
                        <Feed sort={sort} home={home} />
                    </div>
                </div>
                <div
                    className="w-12 h-12 fixed bottom-0 left-0 z-20 md:hidden"
                    onClick={toggleLeftBox}
                >
                    <FontAwesomeIcon
                        icon={faNavicon}
                        className="text-2xl fixed bottom-4 right-4"
                        color="black"
                    />
                </div>
            </Main>
        </>
    );
}
