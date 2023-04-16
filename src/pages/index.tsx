import LeftBox from "@/components/LeftBox";
import Feed from "@/components/Feed";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Auth from "@/components/Auth";
import Main from "@/components/Main";

export default function Home() {
    return (
        <>
            <Head>
                <title>Mosaic</title>
            </Head>
            <Auth>
                <Main>
                    <Navbar />
                    <div className="flex flex-row flex-grow w-full">
                        <div className="flex flex-col items-center justify-center h-full mx-8 my-12">
                            <LeftBox />
                        </div>
                        <div className="flex-grow flex flex-col items-center justify-center h-full">
                            <Feed />
                        </div>
                    </div>
                </Main>
            </Auth>
        </>
    );
}
