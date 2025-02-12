import { groq } from "next-sanity";

export const getFeaturedRoomQuery = groq`*[_type == "vendegHaz" && isFeatured == true] [0] {
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage
}`;

export const getVendeghaz = groq`*[_type == "vendegHaz" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    dimension,
    discount,
    images,
    isBooked,
    isFeatured,
    name,
    numberOfBeds,
    offeredAmenities,
    price,
    slug,
    specialNote,
    type
}`;

export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId] {
    _id,
    vendegHaz -> {
        _id,
        name,
        slug,
        price
    },
    checkinDate,
    checkoutDate,
    numberOfDays,
    adults,
    children,
    totalPrice,
    discount
}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image,
}`;

export const getVendeghazReviewsQuery = groq`*[_type == "review" && vendegHaz._ref == $vendeghazId] {
    _createdAt,
    _id,
    text,
    user -> {
        name
    },
    userRating
}`;

export const getReservedDatesQuery = groq`*[_type == 'booking'] {
    checkinDate,
    checkoutDate
}`