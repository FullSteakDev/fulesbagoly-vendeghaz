import { getVendeghaz } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10',
})

type RequestData = {
    checkinDate: string;
    checkoutDate: string;
    adults: number;
    children: number;
    numberOfDays: number;
    vendegHazSlug: string;
}

export async function POST(req:Request, res: Response) {
    const {
        checkinDate,
        checkoutDate,
        adults,
        children,
        numberOfDays,
        vendegHazSlug,
    } : RequestData = await req.json();

    if ( !checkinDate || !checkoutDate || !adults || !numberOfDays || !vendegHazSlug) {
        return new NextResponse('Kérlek töltsd ki az összes mezőt', {status: 400});
    }

    const origin = req.headers.get('origin');

    const session = await getServerSession(authOptions);

    if(!session) {
        return new NextResponse('Be kell jelentkezned először', {status: 400});
    }

    const userId = session.user.id;
    const formattedCheckinDate = checkinDate.split("T") [0];
    const formattedCheckoutDate = checkoutDate.split("T") [0];


    try {
        const vendeghaz = await getVendeghaz(vendegHazSlug);
        const discountPrice = vendeghaz.price - (vendeghaz.price / 100) * vendeghaz.discount;
        const totalPrice = discountPrice * numberOfDays;

        //STRIPE
        const stripeSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: 'huf',
                        product_data: {
                            name: vendeghaz.name,
                            images: vendeghaz.images.map(image => image.url),
                        },
                        unit_amount: parseInt((totalPrice * 100).toString())
                    }
                }
            ],
            payment_method_types: ['card'],
            success_url: `${origin}/users/${userId}`,
            metadata: {
                adults,
                checkinDate: formattedCheckinDate,
                checkoutDate: formattedCheckoutDate,
                children,
                discount: vendeghaz.discount,
                //@ts-ignore
                vendegHaz: vendeghaz._id,
                numberOfDays,
                totalPrice,
                user: userId,
            }
        })

        return NextResponse.json(stripeSession, {
            status: 200,
            statusText: 'Payment session created',
        })
    } catch (error: any) {
        console.log('Sikertelen fizetés', error);
        return new NextResponse(error, { status: 500});

    }
}