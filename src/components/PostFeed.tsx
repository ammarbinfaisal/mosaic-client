import { fetcher, usePost } from "@/hooks/useApi";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ago from "@/utils/ago";
import sanitize from "@/utils/sanitize";

const PostFeed = ({ post: feedPost }: { post: any }) => {
    const [post, setPost] = useState<any>(feedPost);
    const [rendered, setRendered] = useState(false);
    const { data: user } = useSWR(
        () => (post?.user ? `u/${post.user}` : null),
        fetcher()
    );
    const { data: community } = useSWR(
        () => `c/info/${post.community}`,
        fetcher()
    );
    const { data: voteData } = useSWR(
        () => (post?.id ? `p/${post.id}/vote` : null),
        fetcher()
    );
    const { data: postt, mutate } = useSWR(() => `p/${post.id}`, fetcher(1000));
    // 0 = no vote, 1 = upvote, -1 = downvote
    const [vote, setVote] = useState<any>(voteData ? voteData.vote : 0);
    const contentRef = useRef<HTMLDivElement>(null);
    const p = usePost();

    const upvote = async () => {
        await p(`p/${post.id}/upvote`, {});
        if (vote === 1) {
            setVote(0);
            mutate();
        } else {
            setVote(1);
            mutate();
        }
    };

    const downvote = async () => {
        await p(`p/${post.id}/downvote`, {});
        if (vote === -1) {
            setVote(0);
            mutate();
        } else {
            setVote(-1);
            mutate();
        }
    };

    useEffect(() => {
        if (postt) setPost(postt);
    }, [postt]);

    useEffect(() => {
        if (!rendered) setRendered(true);
    }, [rendered]);

    useEffect(() => {
        if (voteData) setVote(voteData.vote);
    }, [voteData]);

    if (!rendered) return null;
    if (!post) return null;

    return (
        <div
            key={post.id}
            className="my-4 p-4 bg-gray-100 rounded w-full flex flex-row"
        >
            <div className="flex flex-col justify-between mr-8 h-8">
                <span className="cursor-pointer group" onClick={upvote}>
                    <FontAwesomeIcon
                        icon={faCaretUp}
                        className={`group-hover:text-rose-400 ${
                            vote === 1 ? "text-rose-600" : ""
                        }`}
                    />
                </span>
                <span>{post.upvotes - post.downvotes}</span>
                <span className="cursor-pointer group" onClick={downvote}>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        className={`group-hover:text-rose-400 ${
                            vote === -1 ? "text-rose-600" : ""
                        }`}
                    />
                </span>
            </div>
            <div>
                <span>
                    {user?.username} in
                </span>
                    <Link href={`c/${community?.name}`}>
                        c/{community?.name}
                    </Link>
                <span className="text-gray-500"> · </span>
                <span className="text-gray-500">
                    {ago(new Date(post.time_created))} ago
                </span>
                <Link href={`p/${post.id}`}>
                    <h1 className="text-xl font-bold">{post.title}</h1>
                </Link>
                <p
                    className="text-gray-500 break-words"
                    dangerouslySetInnerHTML={{
                        __html: sanitize(post.content),
                    }}
                />
            </div>
        </div>
    );
};

export default PostFeed;
