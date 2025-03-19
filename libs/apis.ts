import { CreateBookingDto, Vendeghaz } from "@/models/vendeghaz";
import sanityClient from "./sanity";

import * as queries from "./sanityQueries";
import axios from "axios";
import { Booking } from "@/models/booking";
import { CreateReviewDto, Review, UpdateReviewDto } from "@/models/review";
import { Newsletter } from "@/models/newsletter";
import { Patch } from "next-sanity";

export async function getFeaturedRoom() {
    const result = await sanityClient.fetch<Vendeghaz>(
        queries.getFeaturedRoomQuery, 
        {}, 
        {cache: 'no-cache'}
    );

    return result;
};

export async function getVendeghaz(slug: string) {
    const result = await sanityClient.fetch<Vendeghaz>(queries.getVendeghaz, 
        {slug},
        {cache: 'no-cache'}
    );

    return result;
}

export const createBooking = async ({
    adults,
    checkinDate,
    checkoutDate,
    children,
    discount,
    vendegHaz,
    numberOfDays,
    totalPrice,
    user,
}: CreateBookingDto) => {
    const mutation = {
        mutations: [
            {
                create: {
                    _type: 'booking',
                    user: {_type: 'reference', _ref: user},
                    vendegHaz: {_type: 'reference', _ref: vendegHaz},
                    checkinDate,
                    checkoutDate,
                    children,
                    adults,
                    numberOfDays,
                    discount,
                    totalPrice,
                }
            }
        ]
    }

    const {data} = await axios.post(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
        mutation,
        { headers:  {Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}`}}
    )

    return data;
};

export const updateVendegHaz = async (vendegHazId: string) => {
    const mutation = {
      mutations: [
        {
          patch: {
            id: vendegHazId,
            set: {
              isBooked: true,
            },
          },
        },
      ],
    };
  
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
    );
  
    return data;
  };

  export async function getUserBookings(userId: string) {
    const result = await sanityClient.fetch<Booking[]>(
      queries.getUserBookingsQuery,
      {
        userId,
      },
      { cache: 'no-cache' }
    );
  
    return result;
  };

  export async function getUserData(userId: string) {
    const result = await sanityClient.fetch(
      queries.getUserDataQuery,
      { userId },
      { cache: 'no-cache' }
    );
  
    return result;
  };

  export async function checkReviewExists(
    userId: string,
    vendegHazId: string
  ): Promise<null | { _id: string }> {
    const query = `*[_type == 'review' && user._ref == $userId && vendegHaz._ref == $vendegHazId][0] {
      _id
    }`;
  
    const params = {
      userId,
      vendegHazId,
    };
  
    const result = await sanityClient.fetch(query, params);
  
    return result ? result : null;
  }

  export const updateReview = async ({
    reviewId,
    reviewText,
    userRating,
  }: UpdateReviewDto) => {
    const mutation = {
      mutations: [
        {
          patch: {
            id: reviewId,
            set: {
              text: reviewText,
              userRating,
            },
          },
        },
      ],
    };
  
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
    );
  
    return data;
  };

  export const createReview = async ({
    vendegHazId,
    reviewText,
    userId,
    userRating,
  }: CreateReviewDto) => {
    const mutation = {
      mutations: [
        {
          create: {
            _type: 'review',
            user: {
              _type: 'reference',
              _ref: userId,
            },
            vendegHaz: {
              _type: 'reference',
              _ref: vendegHazId,
            },
            userRating,
            text: reviewText,
          },
        },
      ],
    };
  
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
    );
  
    return data;
  };

  export async function getVendeghazReviews(vendeghazId: string) {
    const result = await sanityClient.fetch<Review[]>(
      queries.getVendeghazReviewsQuery,
      {
        vendeghazId,
      },
      { cache: 'no-cache' }
    );
  
    return result;
  }

  export async function fetchReservedDates(): Promise<{ checkinDate: string; checkoutDate: string }[]> {
    try {
      const reservedDates = await sanityClient.fetch(queries.getReservedDatesQuery);
      return reservedDates;
    } catch (error) {
      console.error('Error fetching reserved dates:', error);
      return [];
    }
  }

  export const subscribeToNewsletter = async ({
    email,
  }: Newsletter) => {
    const mutation = {
      mutations: [
        {
          create: {
            _type: 'newsletter',
            email: email,
          },
        },
      ],
    };

    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
    );
  
    return data;

  };

  export async function getEmails() {
    const result = await sanityClient.fetch(
      queries.getEmails);
  
    return result;
  };