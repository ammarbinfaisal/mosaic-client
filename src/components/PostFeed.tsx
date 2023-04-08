import React, { useEffect, useState } from "react";
import {get} from "@/api";
import Post from "@/types/post";

// reddit like post to be displayed in the feed
// use tailwind css
const PostFeed = ({postId} : {postId: number}) => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        get(`p/${postId}`).then(({status, data}) => {
            if (status === 200) {
                setPost(data);
                setLoading(false);
            }
        });
    }, [postId]);

    return (
        <div className="flex flex-col w-full max-w-2xl p-4 mx-auto my-4 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between">
                {/* <span className="text-sm font-light text-gray-600">
                    {post?.createdAt}
                </span> */}
                <a
                    href="#"
                    className="px-2 py-1 text-xs font-bold text-blue-100 bg-blue-600 rounded hover:bg-blue-500"
                >
                    {post?.community}
                </a>
            </div>
            <div className="mt-2">
                <a
                    href="#"
                    className="text-2xl font-medium text-gray-700 hover:underline"
                >
                    {post?.title}
                </a>
                {/* <p className="mt-2 text-sm text-gray-600">{post?.body}</p> */}
            </div>
            <div className="flex items-center justify-between mt-4">
                <a
                    href="#"
                    className="flex items-center text-xs font-bold text-gray-400 hover:underline"
                >
                    <svg
                        className="w-3 h-3 mr-1"
                        viewBox="0 0 22 22"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2ZM11 18.5C6.85786 18.5 3.5 15.1421 3.5 11C3.5 6.85786 6.85786 3.5 11 3.5C15.1421 3.5 18.5 6.85786 18.5 11C18.5 15.1421 15.1421 18.5 11 18.5ZM11 7C11.5523 7 12 7.44772 12 8V12C12 12.5523 11.5523 13 11 13C10.4477 13 10 12.5523 10 12V8C10 7.44772 10.4477 7 11 7ZM11 14C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15C10 14.4477 10.4477 14 11 14Z"
                        />
                    </svg>
                    <span>3 Comments</span>
                </a>
                <div className="flex items-center">
                    <a
                        href="#"
                        className="flex items-center text-xs font-bold text-gray-400 hover:underline"
                    >
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10 2C5.02944 2 1 6.02944 1 11C1 15.9706 5.02944 20 10 20C14.9706 20 19 15.9706 19 11C19 6.02944 14.9706 2 10 2ZM10 18.5C5.85786 18.5 2.5 15.1421 2.5 11C2.5 6.85786 5.85786 3.5 10 3.5C14.1421 3.5 17.5 6.85786 17.5 11C17.5 15.1421 14.1421 18.5 10 18.5ZM11 7C11.5523 7 12 7.44772 12 8V12C12 12.5523 11.5523 13 11 13C10.4477 13 10 12.5523 10 12V8C10 7.44772 10.4477 7 11 7ZM11 14C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15C10 14.4477 10.4477 14 11 14Z"
                            />
                        </svg>
                        <span>Save</span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center ml-4 text-xs font-bold text-gray-400 hover:underline"
                    >
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10 2C5.02944 2 1 6.02944 1 11C1 15.9706 5.02944 20 10 20C14.9706 20 19 15.9706 19 11C19 6.02944 14.9706 2 10 2ZM10 18.5C5.85786 18.5 2.5 15.1421 2.5 11C2.5 6.85786 5.85786 3.5 10 3.5C14.1421 3.5 17.5 6.85786 17.5 11C17.5 15.1421 14.1421 18.5 10 18.5ZM11 7C11.5523 7 12 7.44772 12 8V12C12 12.5523 11.5523 13 11 13C10.4477 13 10 12.5523 10 12V8C10 7.44772 10.4477 7 11 7ZM11 14C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15C10 14.4477 10.4477 14 11 14Z"
                            />
                        </svg>
                        <span>Hide</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PostFeed;
