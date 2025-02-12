import Image from "next/image";
import Link from "next/link";

export const heading1 = (
    <>
        <h1 className="font-heading mb-6">Fedezd fel vendégházunkat</h1>
        <p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg">
            Kapcsolódj ki Orfűn, a Fülesbagoly Vendégházban, tóra néző kilátással
        </p>
        <button className="btn-primary"><Link href='/vendeghaz/fulesbagoly-vendeghaz'>🦉 Vágj bele 🦉</Link></button>
    </>
);

export const section2 = 
        <div className="md:grid hidden gap-8 grip-cols-1">
                <div className="rounded-2xl overflow-hidden h-48">
                    <Image 
                    src='/images/panorama.jpg'
                    alt="panorama"
                    width={300}
                    height={300}
                    className="img scale-animation"
                    />
                </div>

                <div className="grid grid-cols-2 gap-8 h-48">
                    <div className="rounded-2xl overflow-hidden">
                        <Image 
                        src='/images/eloszoba.jpg'
                        alt="eloszoba"
                        width={300}
                        height={300}
                        className="img scale-animation"
                        />
                    </div>
                    <div className="rounded-2xl overflow-hidden">
                        <Image 
                        src='/images/furdo.jpg'
                        alt="furdo"
                        width={300}
                        height={300}
                        className="img scale-animation"
                        />
                    </div>
                </div>
            </div>