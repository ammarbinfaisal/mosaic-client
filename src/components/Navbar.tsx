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
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        auth.mutate?.();
        router.push("/login");
    };

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <nav className="flex items-center justify-between p-6 w-full">
                <div className="flex flex-row items-center text-white">
                    <Image
                        src="/logo@2x.png"
                        width={50}
                        height={50}
                        alt="mosaic"
                    />
                    <span className="font-semibold text-xl tracking-tight text-stone-900 text-3xl">
                        Mosaic
                    </span>
                </div>
                <div className="self-end flex justify-center items-center">
                    <Link
                        href="/u/me"
                        className="flex justify-center items-center text-sm px-4 py-2 leading-none text-stone-900 hover:text-gray-800"
                    >
                        <Image
                            src={dp(auth.user?.display_pic)}
                            width={32}
                            height={32}
                            alt="profile"
                            className="inline mr-2"
                        />
                        <span className="inline">Profile</span>
                    </Link>
                    <button
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-stone-900 border-stone-400 hover:border-transparent hover:text-gray-900 hover:bg-stone-400"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </nav>
            {props.search && (
                <div className="w-full md:w-3/4 lg:w-1/2 max-w-full flex justify-center">
                    <Search />
                </div>
            )}
        </div>
    );
};

export default Navbar;
