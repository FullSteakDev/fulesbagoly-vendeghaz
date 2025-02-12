import { getVendeghazReviews } from '@/libs/apis';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const vendeghazId = params.id;

  try {
    const vendeghazReviews = await getVendeghazReviews(vendeghazId);

    return NextResponse.json(vendeghazReviews, {
      status: 200,
      statusText: 'Succesful',
    });
  } catch (error) {
    console.log('Getting Review Failed', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}