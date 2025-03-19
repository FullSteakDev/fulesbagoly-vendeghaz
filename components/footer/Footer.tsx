import Link from "next/link"
import { BsFillHouseDoorFill, BsFiletypePdf, BsFillSendFill, BsTelephoneOutbound, BsFacebook, BsPinMapFill } from "react-icons/bs"

const Footer = () => {
    return (
        <footer className="mt-5">
            <div className="container mx-auto px-4">
                <Link href='/' className="font-black text-xl text-tertiary-dark">
                    🦉 Fülesbagoly 🦉
                </Link>

                {/* <h4 className="font-semibold text-[20px] py-6">Kapcsolat</h4> */}

                <div className="flex flex-wrap gap-16 items-center justify-between">
                    <div className="flex-1 mt-5">
                        <div className="flex items-center">
                            <BsPinMapFill />
                            <p className="ml-2">
                                <Link href='https://www.google.com/maps/place/Orf%C5%B1,+F%C3%BClesbagoly+Vend%C3%A9gh%C3%A1z,+Kil%C3%A1t%C3%B3+u.+26,+7677/@46.1408697,18.147569,13z/data=!4m6!3m5!1s0x4742af3db85a1f19:0xf11148a31be2aaee!8m2!3d46.1408697!4d18.147569!16s%2Fg%2F11sv10894n?hl=hu-hu'>
                                    7677, Orfű, Kilátó utca
                                </Link>
                            </p>
                        </div>
                        <div className="flex items-center py-4">
                            <BsFacebook />
                            <p className="ml-2"><Link href='https://www.facebook.com/people/Fülesbagoly-Vendégház/pfbid037ANEEitwBeNDgvNBxcYvwvmdFmRBnahhEgjhr1JEtoC2XtAfS9Fe2ZnKTnoLmLJVl/'>
                            Facebook</Link></p>
                        </div>
                        <div className="flex items-center">
                        <BsFillSendFill />
                            <p className="ml-2">fulesbagoly.orfu@gmail.com</p>
                        </div>
                        <div className="flex items-center item pt-4">
                            <BsTelephoneOutbound />
                            <p className="ml-2">+3630 400 1215</p>
                        </div>
                    </div>

                     <div className="flex-1 md:text-middle mt-5">
                        <div className="flex items-center item">
                            <BsFillHouseDoorFill />
                            <p className="ml-2">NTAK Regisztrációs szám: MA23057136</p>
                        </div>
                        <div className="flex item-center item pt-4">
                            <BsFiletypePdf />
                            <p className="ml-2"><Link href='https://drive.google.com/file/d/1OE1qtawDTIxYzP6bHn7b_nHflZodRrds/view?usp=share_link'>
                            Adatvédelmi Szabályzat</Link></p>
                        </div>
                        <div className="flex item-center item pt-4">
                        <BsFiletypePdf />
                        <p className="ml-2"><Link href='https://drive.google.com/file/d/1ftF94sANwZ-HZiSgFwmyZ0gDxu6LuAnE/view?usp=share_link'>
                        Házirend</Link></p>
                        </div>
                    </div>

                    {/* <div className="felx-1 md:text-right mt-5">
                        <p className="pb-4">Események</p>
                        <p className="pb-4">Környezet</p>
                        <p>Kikapcsolódás</p>
                    </div> */}
                </div>
            </div>


            <div className="bg-tertiary-light h-10 md:-[70px] mt-16 w-full bottom-0 left-0"></div>
        </footer>
    )
}

export default Footer;