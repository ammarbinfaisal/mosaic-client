import React, { useCallback, useEffect, useState } from "react";
import PostFeed from "./PostFeed";
import { fetcher, useGet } from "@/hooks/useApi";
import useSWR from "swr";
import { Sort } from "@/types/sort";

const Feed = ({ sort }: any) => {
    const { data: posts } = useSWR("me/feed", fetcher(1000 * 60 * 5));

    return (
        <div className="w-full">
            {posts &&
                posts
                    .sort((a: any, b: any) => {
                        let bcreat = new Date(b.time_created);
                        let acreat = new Date(a.time_created);
                        if (sort == Sort.hot) {
                            return (a.upvotes + a.downvotes) /
                                (Date.now() - +acreat) >
                                (b.upvotes + b.downvotes) /
                                    (Date.now() - +bcreat)
                                ? -1
                                : 1;
                        }
                        if (sort == Sort.new) {
                            return +acreat > +bcreat ? -1 : 1;
                        }
                        if (sort == Sort.top) {
                            return a.upvotes > b.upvotes ? -1 : 1;
                        }
                        if (sort == Sort.old) {
                            return +acreat < +bcreat ? -1 : 1;
                        }
                    })
                    .map((post: any) => <PostFeed key={post.id} post={post} />)}
        </div>
    );
};

export default Feed;
