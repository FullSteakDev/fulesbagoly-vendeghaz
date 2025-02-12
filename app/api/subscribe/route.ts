// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log(email);
    
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const mutation = {
      mutations: [{ create: { _type: 'newsletter', email } }],
    };

    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}`,
        },
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
