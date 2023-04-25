import Image from "next/image";
import Search from "./Search";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import dp from "@/utils/dp";

interface INavbarProps {
    search?: boolean;
}

const Navbar = (props: INavbarProps) => {
    const auth = useAuth();

    const logout = () => {
        localStorage.removeItem("token");
        auth.mutate?.();
    };

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <nav className="grid grid-cols-6 grid-rows-1 md:px-12 w-full">
                <Link className="flex flex-row items-center text-white col-start-1 col-end-2" href="/">
                    <Image
                        src="/logo@2x.png"
                        width={50}
                        height={50}
                        alt="mosaic"
                    />
                    <span className="font-semibold text-xl tracking-tight text-stone-900 text-3xl hidden md:inline-block">
                        Mosaic
                    </span>
                </Link>
                {props.search && (
                    <div className="w-full max-w-full flex justify-center col-span-4 md:col-span-3">
                        <Search />
                    </div>
                )}
                <div className="self-end flex justify-center items-center col-start-6 col-end-7 md:col-start-5 md:col-end-7">
                    <Link
                        href="/u/me"
                        className="flex justify-center items-center text-md px-4 py-2 leading-none text-stone-900 hover:text-gray-800"
                    >
                        <Image
                            src={dp(auth.user?.display_pic)}
                            width={40}
                            height={40}
                            alt="profile"
                            className="inline mr-2 rounded-full w-10 h-10"
                        />
                        <span className="hidden md:inline">Profile</span>
                    </Link>
                    <button
                        className="hidden md:inline-block text-md px-4 py-2 leading-none border rounded text-stone-900 border-stone-400 hover:border-transparent hover:text-gray-900 hover:bg-stone-400"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
