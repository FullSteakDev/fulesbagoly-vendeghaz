import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/libs/auth';
import {
  checkReviewExists,
  createReview,
  getUserData,
  updateReview,
} from '@/libs/apis';

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Előtte jelentkezz be', { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Előtte jelentkezz be', { status: 500 });
  }

  const { vendeghazId, reviewText, ratingValue } = await req.json();

  if (!vendeghazId || !reviewText || !ratingValue) {
    return new NextResponse('Minden mező kitöltése szükséges', { status: 400 });
  }

  const userId = session.user.id;

  try {
    const alreadyExists = await checkReviewExists(userId, vendeghazId);

    let data;

    if (alreadyExists) {
      data = await updateReview({
        reviewId: alreadyExists._id,
        reviewText,
        userRating: ratingValue,
      });
    } else {
      data = await createReview({
        vendegHazId: vendeghazId,
        reviewText,
        userId,
        userRating: ratingValue,
      });
    }
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error: any) {
    console.log('Error Updating', error);
    return new NextResponse('Nem lehetséges értékelést adni', { status: 400 });
  }
}