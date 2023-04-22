import { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { usePost } from "@/hooks/useApi";
import Auth from "@/components/Auth";
import Main from "@/components/Main";
import Button from "@/components/Button";
import { useRouter } from "next/router";

export default function NewCommunity() {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const router = useRouter();
    const post = usePost();

    const createCommunity = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await post("c/create", {
                name,
                description,
            });
            router.push(`/c/${name}`);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Head>
                <title>Mosaic</title>
            </Head>
            <Auth>
                <Main>
                    <Navbar />
                    <form className="flex flex-col max-w-3xl w-full mx-auto" onSubmit={createCommunity}>
                        <h1 className="text-3xl font-bold my-4">
                            create a community
                        </h1>
                        <input
                            placeholder="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="py-2 px-4 my-4"
                        />
                        <textarea
                            placeholder="community description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="py-2 px-4 my-4"
                        />
                        <Button type="submit">
                            create
                        </Button>
                    </form>
                </Main>
            </Auth>
        </>
    );
}
