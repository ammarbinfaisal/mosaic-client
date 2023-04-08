import React, { useEffect, useState } from "react";
import PostFeed from "./PostFeed";
import { get } from "@/api";

const fetchPostIds = async () => {
    let postIds: number[] = [];
    const { status, data: communities } = await get("me/subscribedCommunities");
    if (status === 200) {
        for (const community of communities) {
            const {
                status,
                data: { posts },
            } = await get(`c/${community}`);
            if (status === 200) {
                postIds = [...postIds, ...posts];
            }
        }
    }
    return postIds;
};

const Feed = () => {
    const [postIds, setPostIds] = useState<number[]>([]);

    const updatePostIds = () => {
        fetchPostIds().then((postIds) => {
            setPostIds(postIds);
        });
    };

    useEffect(() => {
        console.log("postIds", postIds);
    }, [postIds]);

    useEffect(() => {
        updatePostIds();
        const i = setInterval(updatePostIds, 10000);

        return () => {
            clearInterval(i);
        }
    }, []);

    return (
        <div className="feed">
            {postIds.map((postId) => (
                <PostFeed key={postId} postId={postId} />
            ))}
        </div>
    );
};

export default Feed;
