import axios from 'axios';
import { FC } from 'react';
import useSWR from 'swr';

import { Review } from '../../models/review';
import Rating from '../rating/Rating';

const VendeghazReview: FC<{ vendeghazId: string }> = ({ vendeghazId }) => {
  const fetchVendeghazReviews = async () => {
    const { data } = await axios.get<Review[]>(`/api/vendeghaz-reviews/${vendeghazId}`);
    return data;
  };

  const {
    data: vendeghazReviews,
    error,
    isLoading,
  } = useSWR('/api/vendeghaz-reviews', fetchVendeghazReviews);

  if (error) throw new Error('Cannot fetch data');
  if (typeof vendeghazReviews === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');

  return (
    <>
      {vendeghazReviews &&
        vendeghazReviews.map(review => (
          <div
            className='bg-gray-100 dark:bg-gray-900 p-4 rounded-lg'
            key={review._id}
          >
            <div className='font-semibold mb-2 flex'>
              <p>{review.user.name}</p>
              <div className='ml-4 flex items-center text-tertiary-light text-lg'>
                <Rating rating={review.userRating} />
              </div>
            </div>

            <p>{review.text}</p>
          </div>
        ))}
    </>
  );
};

export default VendeghazReview;