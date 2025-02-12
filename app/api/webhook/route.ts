// @ts-nocheck

import { createBooking, updateVendegHaz } from '@/libs/apis';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const checkout_session_completed = 'checkout.session.completed';

const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10',
})

export async function POST(req: Request, res: Response) {
    const reqBody = await req.text();
    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
    let event: Stripe.Event;
  
    try {
      if (!sig || !webhookSecret) return;
      event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
    } catch (error: any) {
      return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
    }


    // load our event
    switch (event.type) {
        case checkout_session_completed:
            const session = event.data.object;
            //console.log("session: ", session);

            const {
              metadata: {
                adults,
                checkinDate,
                checkoutDate,
                children,
                discount,
                vendegHaz,
                numberOfDays,
                totalPrice,
                user,
              },
            } = session;

            await createBooking({
              adults: Number(adults),
              checkinDate,
              checkoutDate,
              children: Number(children),
              vendegHaz,
              numberOfDays: Number(numberOfDays),
              discount: Number(discount),
              totalPrice: Number(totalPrice),
              user,
            });

        // update vendeghaz
        await updateVendegHaz(vendegHaz);

        return NextResponse.json('Sikeres foglalás', {
            status: 200,
            statusText: 'Booking Successful',
        });
    }

    return NextResponse.json('Event Received', {
        status: 200,
        statusText: 'Event Received',
      });
}