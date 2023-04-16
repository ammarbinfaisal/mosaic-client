import React, { useCallback, useEffect, useState } from "react";
import PostFeed from "./PostFeed";
import { fetcher, useGet } from "@/hooks/useApi";
import useSWR from "swr";

const Feed = () => {
    const { data: posts, } = useSWR("me/feed", fetcher(1000 * 60 * 5));

    return (
        <div className="w-full">
            {posts && posts.map((post: any) => (
                <PostFeed key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Feed;
