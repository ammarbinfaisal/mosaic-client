import { useContext, useEffect, useState } from "react";
import { usePost } from "@/hooks/useApi";
import { MsgDispatchContext } from "@/context/message";
import useAuth from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import { useSWRConfig } from "swr";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

interface CommentBoxProps {
    post_id: number;
    comment_id?: number;
}

const CommentBox = ({ post_id, comment_id }: CommentBoxProps) => {
    const post = usePost();
    const { isLoggedIn } = useAuth();
    const [comment, setComment] = useState("");
    const [mounted, setMounted] = useState(false);
    const msgDispatch = useContext(MsgDispatchContext);
    const { mutate } = useSWRConfig();

    useEffect(() => {
        setMounted(true);
    }, []);

    const submitComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("cm/create", {
            content: comment,
            post: post_id,
            parent: comment_id,
        })
            .then(async (res) => {
                console.log(res);
                if (comment_id) await mutate(`cm/${comment_id}/replies`);
                await mutate(`p/${post_id}/comments`);
                setComment("");
            })
            .catch((err) => {
                console.log(err);
                msgDispatch("comment failed");
            });
    };

    if (!isLoggedIn) return null;
    if (!mounted) return null;

    return (
        <form className="w-full my-8" onSubmit={submitComment}>
            <Editor content={comment} setContent={setComment} />
            <div className="flex justify-end items-end">
                <button
                    type="submit"
                    className="ml-full mr-0 my-0 px-4 py-2 bg-rose-800 text-white rounded"
                >
                    comment
                </button>
            </div>
        </form>
    );
};

export default CommentBox;
