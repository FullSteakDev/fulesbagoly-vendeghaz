// @ts-nocheck

'use client';

import { getVendeghaz } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import VendeghazPhotoGallery from "@/components/vendeghazPhotoGallery/VendeghazPhotoGallery";
import BookVendeghazCta from "@/components/bookVendeghazCta/BookVendeghazCta";
import { useState } from "react";
import toast from "react-hot-toast";
//import { getStripe } from "@/libs/stripe";
//import axios from "axios";
import VendeghazReview from '@/components/vendeghazReview/VendeghazReview';
import BookingConfirmation from "../confirmation/page";

const VendeghazDetails = (props: { params: { slug: string } }) => {
    const {
        params: { slug },
        
    } = props;

    const [checkinDate, setCheckinDate] = useState<Date | null>(null);
    const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
    const [adults, setAdults] = useState(1);
    const [noOfChildren, setNoOfChildren] = useState(0);

    const fetchVendeghaz = async () => getVendeghaz(slug);

    const { data: vendeghaz, error, isLoading } = useSWR("api/vendeghaz", fetchVendeghaz);

    if (error) throw new Error("Cannot fetch data");
    if (typeof vendeghaz == 'undefined' && !isLoading) {
        throw new Error('Cannot fetch data');
    }

    if (!vendeghaz) {
        return <LoadingSpinner />
    };

    const calcMinCheckoutDate = () => {
        if (checkinDate) {
            const nextDay = new Date(checkinDate);
            nextDay.setDate(nextDay.getDate() + 1);
            return nextDay;
        }
        return null;
    };

    const calcNumDays = () => {
        if (!checkinDate || !checkoutDate) return;
        const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
        const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
        localStorage.setItem('numberOfDays', noOfDays.toString());
        return noOfDays;
    };


    const handleBookNowClick = () => {
        if((adults + noOfChildren) > 5){
            return toast.error('Vendégházunk befogadóképessége 5 fő');
        };
        if (!checkinDate || !checkoutDate)
            return toast.error('Kérlek add meg bejelentkezésed / távozásod napját');
        if (checkinDate > checkoutDate)
            return toast.error('Kérlek egy valós időszakot válassz');

        const numberOfDays = calcNumDays();
        const vendegHazSlug = vendeghaz.slug.current;
        //Store the values in localStorage, call them later in the confirmation page
        localStorage.setItem('checkinDate', checkinDate.toString());
        localStorage.setItem('checkoutDate', checkoutDate.toString());
        localStorage.setItem('adults', adults.toString());
        localStorage.setItem('children', noOfChildren.toString());
        // If all checks pass, manually trigger navigation
        window.location.href = '/vendeghaz/confirmation';
        //COMMENTED OUT FROM HERE BECAUSE ONLINE PAYMENT IS NOT AN OPTION YET BUT LEAVE IT THERE FOR THE FUTURE
/*      const stripe = await getStripe();


        try {
            const { data: stripeSession } = await axios.post('/api/stripe', {
                checkinDate,
                checkoutDate,
                adults,
                children: noOfChildren,
                numberOfDays,
                vendegHazSlug,
            });

            if (stripe) {
                const result = await stripe.redirectToCheckout({
                    sessionId: stripeSession.id,
                });

                if (result.error) {
                    toast.error('Sikertelen fizetés');
                }
            }
        } catch (error) {
            console.log('Error: ', error);
            toast.error('Kérlek jelentkezz be előbb, bal felül a felhasználó ikonra kattintva');
        } */
       //COMMENT END HERE

    };

    return <div>
        <VendeghazPhotoGallery photos={vendeghaz.images} />

        <div className="container mx-auto mt-20">
            <div className="md:grid md:grid-cols-12 gap-10 px-3">
                <div className="md:col-span-8 md:w-full">
                    <h2 className="font-bold text-left text-lg md:text-2xl">
                        {vendeghaz.name} ({vendeghaz.dimension})
                    </h2>
                    {/*                     <div className="flex my-11">
                        {vendeghaz.offeredAmenities.map(amenity => (
                            <div key={amenity._key} className="md:w-44 w-fit text-center px-2 md:px-0 h-40 md:h-30 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center">
                                <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                                <p className="text-xs md:text-base pt-3">
                                    {amenity.amenity}
                                </p>
                            </div>
                        ))}
                    </div> */}
                    <div className="mb-11">
                        <h2 className="font-bold mt-4 text-3xl mb-2">Leírás</h2>
                        <p>
                            {vendeghaz.description}
                        </p>
                    </div>
                    <div className="mb-11">
                        <h2 className="font-bold text-3xl mb-2">Felszereltség</h2>
                        <div className="grid grid-cols-2">
                            {vendeghaz.offeredAmenities.map(amenity => (
                                <div key={amenity._key} className="flex items-center md:my-0 my-1">
                                    <i className={`fa-solid ${amenity.icon}`}></i>
                                    <p className="text-xs md:text-base ml-2">
                                        {amenity.amenity}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="shadow dark:shadow-white rounded-lg p-6">
                        <div className="items-center mb-4">
                            <p className="md:text-lg font-semibold">Vendégeinktől</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <VendeghazReview vendeghazId={vendeghaz._id} />
                        </div>
                    </div>
                </div>

                <div className='md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto'>
                    <BookVendeghazCta
                        discount={vendeghaz.discount}
                        price={vendeghaz.price}
                        specialNote={vendeghaz.specialNote}
                        checkinDate={checkinDate}
                        setCheckinDate={setCheckinDate}
                        checkoutDate={checkoutDate}
                        setCheckoutDate={setCheckoutDate}
                        calcMinCheckoutDate={calcMinCheckoutDate}
                        adults={adults}
                        noOfChildren={noOfChildren}
                        setAdults={setAdults}
                        setNoOfChildren={setNoOfChildren}
                        isBooked={vendeghaz.isBooked}
                        handleBookNowClick={handleBookNowClick}
                    />
                </div>
            </div>
        </div>
    </div>
};

export default VendeghazDetails;