import { fetcher, usePost } from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import dynamic from "next/dynamic";
import sanitize from "@/utils/sanitize";

const CommentBox = dynamic(() => import("@/components/CommentBox"), {
    ssr: false,
});

const Comment = ({ comment }: any) => {
    const { isLoggedIn } = useAuth();
    const { data: user } = useSWR(
        () => (comment?.user ? `u/${comment.user}` : null),
        fetcher(1000 * 60 * 5)
    );
    // 0 = no vote, 1 = upvote, -1 = downvote
    const { data: vote, mutate } = useSWR(
        () => (comment?.id ? `cm/${comment.id}/vote` : null),
        fetcher()
    );
    const { data: replies } = useSWR(
        () => (comment?.id ? `cm/${comment.id}/replies` : null),
        fetcher()
    );
    const [commentBox, setCommentBox] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [mounted, setMounted] = useState(false);
    const p = usePost();

    const upvote = async () => {
        await p(`cm/${comment.id}/upvote`, {});
        mutate();
    };

    const downvote = async () => {
        await p(`cm/${comment.id}/downvote`, {});
        mutate();
    };

    const toggleComment = () => {
        setExpanded(!expanded);
    };

    const toggleCommentBox = () => {
        setCommentBox(!commentBox);
    };

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex flex-col w-full bg-grap-200">
            <div className="flex flex-row w-full items-center" onClick={toggleComment}>
                <Image
                    className="inline"
                    src={user?.display_pic || "/usr_profile_pic.svg"}
                    width={40}
                    height={40}
                    alt="dp"
                />
                <h2 className="text-lg font-bold">{user?.username}</h2>
            </div>
            <div className={`flex flex-col w-auto ml-5 mt-1 pl-2 border-l-2 border-gray-500 ${
                expanded ? "" : "hidden"
            }`}>
                <div className="flex flex-row">
                    <div className="w-11/12">
                        <div className="flex flex-row w-full">
                            <div className="w-1/2 text-right">
                                <h2 className="text-sm font-bold">
                                    {comment.created_at}
                                </h2>
                            </div>
                        </div>
                        <div className="w-full">
                            <p
                                className="text-lg"
                                dangerouslySetInnerHTML={{
                                    __html: mounted
                                        ? sanitize(comment.content)
                                        : "",
                                }}
                            />
                        </div>
                    </div>
                </div>
                {isLoggedIn && (
                    <div className="flex flex-row items-center justify-start w-full py-4">
                        <div className="flex flex-row items-center justify-around h-16 w-24 mr-4">
                            <span
                                className="cursor-pointer group"
                                onClick={upvote}
                            >
                                <FontAwesomeIcon
                                    size="lg"
                                    border
                                    icon={faArrowUp}
                                    className={`group-hover:text-rose-400 scale-x-125 ${
                                        vote === 1 ? "text-rose-600" : ""
                                    }`}
                                />
                            </span>
                            <span className="text-xl font-bold text-gray-500">
                                {comment.upvotes - comment.downvotes}
                            </span>
                            <span
                                className="cursor-pointer group"
                                onClick={downvote}
                            >
                                <FontAwesomeIcon
                                    size="lg"
                                    border
                                    icon={faArrowDown}
                                    className={`group-hover:text-rose-400 scale-x-125 ${
                                        vote === -1 ? "text-rose-600" : ""
                                    }`}
                                />
                            </span>
                        </div>
                        <span
                            className="text-md text-gray-500 cursor-pointer mx-4"
                            onClick={toggleCommentBox}
                        >
                            comment
                        </span>
                        <span
                            className="text-md text-gray-500 cursor-pointer mx-4"
                            onClick={toggleReplies}
                        >
                            replies - {replies?.length}
                        </span>
                    </div>
                )}
                <div className="flex flex-col w-full">
                    {commentBox && isLoggedIn && (
                        <CommentBox
                            post_id={comment.id}
                            comment_id={comment.id}
                        />
                    )}
                </div>
                <div className="flex flex-col w-full">
                    {showReplies &&
                        replies?.map((reply: any) => (
                            <Comment key={reply.id} comment={reply} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Comment;
