import Image from "next/image";
import Search from "./Search";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
    const auth = useAuth();

    return (
        <nav className="flex items-center justify-between flex-wrap  p-6 w-full">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Image src="/logo@2x.png" width={50} height={50} alt="mosaic" />
                <span className="font-semibold text-xl tracking-tight text-stone-900 text-3xl">
                    Mosaic
                </span>
            </div>
            <div className="w-full md:w-3/4 lg:w-1/2 block flex-grow lg:flex lg:items-center lg:w-auto">
                <Search />
            </div>
            <div className="w-full block lg:flex lg:items-center lg:w-auto">
                <div>
                    <a
                        href="#"
                        className="inline-block text-sm px-4 py-2 leading-none text-stone-900 hover:text-gray-800 mt-4 lg:mt-0"
                    >
                        <Image
                            src="/usr_profile_pic.svg"
                            width={20}
                            height={20}
                            alt="profile"
                            className="inline mr-4"
                        />
                        <span className="inline">Profile</span>
                    </a>
                </div>
                <div>
                    <button
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-stone-900 border-stone-400 hover:border-transparent hover:text-gray-800 hover:bg-stone-500 mt-4 lg:mt-0"
                        onClick={() => auth.logout()}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
