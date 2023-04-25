import LeftBox from "@/components/LeftBox";
import Feed from "@/components/Feed";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Auth from "@/components/Auth";
import Main from "@/components/Main";
import { Sort } from "@/types/sort";
import { useState } from "react";

export default function Home() {
    const [sort, setSort] = useState<Sort>(Sort.hot);

    return (
        <>
            <Head>
                <title>Mosaic</title>
            </Head>
            <Auth>
                <Main>
                    <Navbar search />
                    <div className="flex flex-row flex-grow w-full">
                        <div className="flex flex-col items-center justify-center h-full mx-8 my-12">
                            <LeftBox sort={sort} setSort={setSort} />
                        </div>
                        <div className="flex-grow flex flex-col items-center justify-center h-full">
                            <Feed sort={sort} />
                        </div>
                    </div>
                </Main>
            </Auth>
        </>
    );
}
