import Comment from "@/components/Comment";
import consts from "@/consts";
import Head from "next/head";
import Main from "@/components/Main";

const CommentPage = ({ comment }: any) => {
    return (
        <>
            <Head>
                <title>{comment.content.slice(0, 20)}</title>
            </Head>
            <Main>
                <Comment comment={comment} isPage depth={0} />
            </Main>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const res = await fetch(`${consts.API_URL}/cm/${context.params.id}/info`);
    const comment = await res.json();
    return {
        props: {
            comment,
        },
    };
};

export default CommentPage;
