'use client';

import Link from "next/link";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import ThemeContext from "../context/themeContext";
import { useSession } from "next-auth/react";
import Image from "next/image";


const Header = () => {

    const {darkTheme, setDarkTheme} = useContext(ThemeContext)

    const {data: session} = useSession();

    return(
        <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between">
            <div className="flex items-center w-full md:2/3">
                <Link href='/' className="font-serif text-3xl text-tertiary-dark">
                    🦉 Fülesbagoly 🦉
                </Link>
                <ul className="flex items-center ml-5">
                    <li className="flex items-center">
                        {session?.user ? (
                        <Link href={`/users/${session.user.id}`}>
                            {session.user.image ? (
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <Image 
                                    src={session.user.image}
                                    alt={session.user.name!}
                                    width={30}
                                    height={30}
                                    className="scale-animation img"
                                    />
                                </div>
                            ) : (
                                <FaUserCircle className="cursor-pointer"/>
                            )}
                        </Link>
                        ) : (
                        <Link href="/auth">
                            <FaUserCircle className="cursor-pointer"/>
                        </Link>
                        )}
                    </li>
                    <li className="ml-2 ">
                        {darkTheme ? (
                            <MdOutlineLightMode className="cursor-pointer"
                                onClick={() => {
                                    setDarkTheme(false);
                                    localStorage.removeItem('hotel-theme');
                                }}
                            />
                        ): (
                            <MdDarkMode className="cursor-pointer"
                                onClick={() => {
                                    setDarkTheme(true);
                                    localStorage.setItem('hotel-theme', 'true');
                                }}
                            />
                        )
                        }
                    </li>
                </ul>
            </div>
            <ul className="flex items-center justify-between w-full md:w-2/4 gap-3">
                <li className="hover:-translate-y-2 duration-500 transition-all">
                    <Link href="/">Kezdőlap</Link>
                </li>
                <li className="hover:-translate-y-2 duration-500 transition-all">
                    <Link href="/vendeghaz/fulesbagoly-vendeghaz">🦉Foglalás🦉</Link>
                </li>
{/*                 <li className="hover:-translate-y-2 duration-500 transition-all">
                    <Link href="/">Kapcsolat</Link>
                </li> */}
            </ul>
        </header>
    )
}

export default Header; 