// @ts-nocheck

'use client';

import { getVendeghaz } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import toast from "react-hot-toast";

const BookingConfirmation = () => {

    const fetchVendeghaz = async () => getVendeghaz('fulesbagoly-vendeghaz');

    const { data: vendeghaz, error, isLoading } = useSWR("api/vendeghaz", fetchVendeghaz);

    if (error) throw new Error("Cannot fetch data");
    if (typeof vendeghaz == 'undefined' && !isLoading) {
        throw new Error('Cannot fetch data');
    }

    if (!vendeghaz) {
        return <LoadingSpinner />
    };

    let checkinDate: string | null;
    let checkoutDate: string | null;
    let numberOfDays: string | null;
    let adults: string | null;
    let children: string | null;
    if (typeof window !== 'undefined') {
        checkinDate = localStorage.getItem('checkinDate');
        checkoutDate = localStorage.getItem('checkoutDate');
        numberOfDays = localStorage.getItem('numberOfDays');
        adults = localStorage.getItem('adults');
        children = localStorage.getItem('children');
    }

    const price = vendeghaz?.price;
    const discount = vendeghaz.discount;
    const discountPrice = price - (price / 100) * discount;
    const finalAmount = Number(numberOfDays) * discountPrice;

    //Formatting dates
    const cidate = new Date(checkinDate);
    const ciyear = cidate.getFullYear();
    const cimonth = String(cidate.getMonth() + 1).padStart(2, '0'); // Hónap 0-tól indul, ezért +1, és 2 számjegyűre formázzuk
    const ciday = String(cidate.getDate()).padStart(2, '0'); // Napot 2 számjegyűre formázzuk
    const formattedcheckinDate = `${ciyear}.${cimonth}.${ciday}`;

    //Formatting dates
    const codate = new Date(checkoutDate);
    const coyear = codate.getFullYear();
    const comonth = String(codate.getMonth() + 1).padStart(2, '0'); // Hónap 0-tól indul, ezért +1, és 2 számjegyűre formázzuk
    const coday = String(codate.getDate()).padStart(2, '0'); // Napot 2 számjegyűre formázzuk
    const formattedcheckouDate = `${coyear}.${comonth}.${coday}`;

    return(
        <div className="relative flex items-center justify-center h-screen px-2 md:px-10">
            {/* Bal oldali kép mint háttér */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/panorama.jpg')" }}
            ></div>

            {/* Jobb oldali tartalom konténer */}
            <div className="relative w-full max-w-[90vw] md:max-w-[60vw] lg:max-w-[50vw] bg-white rounded-2xl overflow-hidden shadow-lg">
                {/* Tartalom */}
                <div className="p-4 md:p-12 flex flex-col text-gray-800">
                    {/* Cím (h1) - a doboz legtetején */}
                    <h1 className="text-base md:text-xl font-medium mb-6 md:mb-20 text-center">
                        Kérlek küldd el az alábbi információkat a következő email címre:<br />
                        <span className="text-orange-600">fulesbagoly.orfu@gmail.com</span>
                    </h1>

                    {/* Szövegdoboz konténer */}
                    <div className="relative flex-1 flex flex-col justify-center">
                        {/* Szövegdoboz */}
                        <div className="border border-gray-300 p-3 md:p-4 rounded-lg relative">
                            {/* Gombok - szövegdoboz felső részén, jobb oldalon */}
                            <div className=" mt-1 absolute -top-8 right-2 flex space-x-2">
                                {/* Másolás gomb */}
                                <button
                                    onClick={() => {
                                        const textToCopy = document.getElementById("text-to-copy")?.innerText;
                                        navigator.clipboard.writeText(textToCopy).then(() => {
                                            toast("Szöveg vágólapra másolva!", {
                                                icon: '🦉'
                                            });
                                        });
                                    }}
                                    className="px-2 py-1 md:px-3 md:py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-xs md:text-sm"
                                >
                                    Másolás
                                </button>

                                {/* Küldés gomb */}
                                <a
                                    onClick={(e) => {
                                        e.preventDefault(); // Megakadályozzuk, hogy azonnal megnyíljon az email kliens
                                        const textToCopy = document.getElementById("text-to-copy")?.innerText || "";
                                        const formattedText = textToCopy.replace(/\n/g, "\n"); // Biztosítjuk, hogy a sortörések megmaradjanak
                                        window.location.href = `mailto:fulesbagoly.orfu@gmail.com?subject=Foglalás részletei&body=${encodeURIComponent(formattedText)}`;
                                    }}
                                    className="px-3 py-1 md:px-5 md:py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-xs md:text-sm text-center cursor-pointer">
                                    Küldés
                                </a>
                            </div>

                            {/* Szövegdoboz tartalma */}
                            <div id="text-to-copy" className="space-y-2 text-sm md:text-xl">
                                <p><span className="font-medium">Bejelentkezés napja:</span> {formattedcheckinDate}</p>
                                <p><span className="font-medium">Kijelentkezés napja:</span> {formattedcheckouDate}</p>
                                <p><span className="font-medium">Éjszakák száma:</span> {numberOfDays}</p>
                                <p><span className="font-medium">Felnőttek száma:</span> {adults}</p>
                                <p><span className="font-medium">Gyerekek száma:</span> {children}</p>
                                <p className="text-lg md:text-xl font-medium">
                                    Végösszeg: {finalAmount} Ft
                                </p>
                                <br />
                                <p><span className="font-medium">Telefonszám:</span> </p>
                                <p><span className="font-medium">Email cím:</span> </p>
                                <p><span className="font-medium">Kívánság/kérdés:</span> </p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p>Az alábbi módon tudsz fizetni nálunk:</p>
                            <div className="flex justify-start text-orange-500">
                                <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                                    <li>SZÉP-kártya(OTP, K&H, MKB)</li>
                                    <li>utalás</li>
                                    <li>készpénz</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BookingConfirmation;