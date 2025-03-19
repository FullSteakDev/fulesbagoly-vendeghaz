'use client';

import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchReservedDates } from '@/libs/apis';

type Props = {
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  setAdults: Dispatch<SetStateAction<number>>;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  calcMinCheckoutDate: () => Date | null;
  price: number;
  discount: number;
  adults: number;
  noOfChildren: number;
  specialNote: string;
  isBooked: boolean;
  handleBookNowClick: () => void;
};

const BookVendeghazCta: FC<Props> = props => {
  const {
    price,
    discount,
    specialNote,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    calcMinCheckoutDate,
    setAdults,
    setNoOfChildren,
    adults,
    noOfChildren,
    isBooked,
    handleBookNowClick,
  } = props;

  //created from here
  const [reservedDates, setReservedDates] = useState<{ checkinDate: string; checkoutDate: string }[]>([]);
  useEffect(() => {
    const loadReservedDates = async () => {
      const dates = await fetchReservedDates();
      setReservedDates(dates);
    };
    loadReservedDates();
  }, []);

  const isDateReserved = (date: Date) => {
    return reservedDates.some((reservation) => {
      const checkin = new Date(reservation.checkinDate);
      const checkout = new Date(reservation.checkoutDate);
      // Adjust checkin date to be one day earlier (sanity sync problem?)
      checkin.setDate(checkin.getDate() - 1);
      return date >= checkin && date < checkout;
    });
  };

  const renderDayContents = (day: number, date: Date) => {
    if (isDateReserved(date)) {
      return <div style={{ textDecoration: 'line-through', color: 'red' }}>{day}</div>;
    }
    return <div>{day}</div>;
  };
  //until here

  const discountPrice = price - (price / 100) * discount;

  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <div className='px-7 py-6'>
      <h3>
        <span
          className={`${discount ? 'text-gray-400' : ''} font-bold text-xl`}
        >
            {price} Ft
        </span>
        {discount ? (
          <span className='font-bold text-xl'>
            {' '}
            | kedvezmény {discount}%. Most{' '}
            <span className='text-tertiary-dark'>{discountPrice} Ft</span>
          </span>
        ) : (
          ''
        )}
      </h3>

      <div className='w-full border-b-2 border-b-secondary my-2' />

      <h4 className='my-8'>{specialNote}</h4>

      <div className='flex'>
        <div className='w-1/2 pr-2'>
          <label
            htmlFor='check-in-date'
            className='block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Bejelentkezés
          </label>
          <DatePicker
            selected={checkinDate}
            onChange={date => setCheckinDate(date)}
            dateFormat='yyyy/MM/dd'
            minDate={new Date()}
            filterDate={(date) => !isDateReserved(date)} //modified
            renderDayContents={renderDayContents} //modified
            id='check-in-date'
            className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'
            withPortal
          />
        </div>
        <div className='w-1/2 pl-2'>
          <label
            htmlFor='check-out-date'
            className='block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Távozás
          </label>
          <DatePicker
            selected={checkoutDate}
            onChange={date => setCheckoutDate(date)}
            dateFormat='yyyy/MM/dd'
            disabled={!checkinDate}
            minDate={calcMinCheckoutDate()}
            filterDate={(date) => !isDateReserved(date)} //modified
            renderDayContents={renderDayContents} //modified
            id='check-out-date'
            className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'
            withPortal
          />
        </div>
      </div>

      <div className='flex mt-4'>
        <div className='w-1/2 pr-2'>
          <label
            htmlFor='adults'
            className='block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Felnőttek
          </label>
          <input
            type='number'
            id='adults'
            value={adults}
            onChange={e => setAdults(+e.target.value)}
            min={1}
            max={5}
            className='w-full border border-gray-300 rounded-lg p-2.5 text-gray-900' //modified the text color as in dark mode the text was unvisible
          />
        </div>
        <div className='w-1/2 pl-2'>
          <label
            htmlFor='children'
            className='block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Gyerekek (14 év alatt)
          </label>
          <input
            type='number'
            id='children'
            value={noOfChildren}
            onChange={e => setNoOfChildren(+e.target.value)}
            min={0}
            max={4}
            className='w-full border border-gray-300 rounded-lg p-2.5 text-gray-900' //modified the text color as in dark mode the text was unvisible
          />
        </div>
      </div>

      {calcNoOfDays() > 0 ? (
        <p className='mt-3'>Összesen: {calcNoOfDays() * discountPrice} Ft</p>
      ) : (
        <></>
      )}
      <button
        //disabled={isBooked} commented out
        onClick={handleBookNowClick}
        className='w-full mt-6 border h-fit text-center border-tertiary-dark text-tertiary-dark px-3 py-2 lg:py-5 lg:px-7 rounded-2xl font-bold lg:text-xl'> {/* deleted the following: disabled:bg-gray-500 disabled:cursor-not-allowed */}
          🦉 Lefoglalom 🦉
        {/* {isBooked ? 'Foglalt' : 'Lefoglalom'} commented out */}
      </button>
    </div>
  );
};

export default BookVendeghazCta;