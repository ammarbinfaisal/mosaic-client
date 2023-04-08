import React, { useEffect, useState } from "react";
import { get } from "@/api";
import Post from "@/types/post";

// reddit like post to be displayed in the feed
// use tailwind css
const PostFeed = ({ postId }: { postId: number }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [community, setCommunity] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        get(`p/${postId}`).then(({ status, data }) => {
            if (status === 200) {
                setPost(data);
                setLoading(false);
            }
        });
    }, [postId]);

    useEffect(() => {
        if (post) {
            get(`c/${post.community}`).then(({ status, data }) => {
                if (status === 200) {
                    console.log(data);
                    // setCommunity(data.name);
                }
            });
        }
    }, [post]);

    return (
        <div className="flex flex-col w-full max-w-2xl p-4 mx-auto my-4 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <a
                    href="#"
                    className="px-2 py-1 text-xs font-bold text-pink-100 bg-stone-600 rounded hover:bg-blue-500"
                >
                    {community}
                </a>
            </div>
            <div className="mt-2">
                <a
                    href="#"
                    className="text-2xl font-medium text-stone-700 hover:underline"
                >
                    {post?.title}
                </a>
            </div>
        </div>
    );
};

export default PostFeed;
