import Image from "next/image";

const LeftBox = () => {
    return (
        <div className="flex flex-col items-start justify-start">
            <div className="flex flex-col items-start justify-center w-full h-full">
                <a
                    href="#"
                    className="w-full h-full flex items-center justify-start"
                >
                    <Image
                        src="/home.svg"
                        width={20}
                        height={20}
                        alt="home"
                        className="inline mr-2"
                    />
                    <span className="inline">home</span>
                </a>
                <a
                    href="#"
                    className="w-full h-full flex items-center justify-start"
                >
                    <Image
                        src="/trending@2x.png"
                        width={20}
                        height={20}
                        alt="popular"
                        className="inline mr-2"
                    />
                    <span className="inline">trending</span>
                </a>
            </div>
            <div className="w-full h-full my-12 border-t-2 border-b-2 border-stone-400 flex flex-col">
                <h3 className="text-xl font-bold">sort</h3>
                <span className="flex">
                    <input type="radio" id="new" name="sort" value="new" />
                    <label className="ml-4" htmlFor="new">
                        new
                    </label>
                </span>
                <span className="flex">
                    <input type="radio" id="top" name="sort" value="top" />
                    <label className="ml-4" htmlFor="top">
                        top
                    </label>
                </span>
                <span className="flex">
                    <input type="radio" id="hot" name="sort" value="hot" />
                    <label className="ml-4" htmlFor="hot">
                        hot
                    </label>
                </span>
                <span className="flex">
                    <input type="radio" id="old" name="sort" value="old" />
                    <label className="ml-4" htmlFor="old">
                        old
                    </label>
                </span>
            </div>
            {/* new post button */}
            <div className="w-full h-full flex flex-col items-center justify-center">
                <button className="bg-stone-900 text-white font-bold py-2 px-4 rounded">
                    new post
                </button>
                </div>
        </div>
    );
};

export default LeftBox;
