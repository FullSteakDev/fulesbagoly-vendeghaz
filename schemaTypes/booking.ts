import { defineField } from "sanity";

const booking = {
    name: 'booking',
    title: 'Foglalás',
    type: 'document',
    fields: [
        defineField ({
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{type: 'user'}],
            validation: Rule => Rule.required(),
        }),
        defineField ({
            name: 'vendegHaz',
            title: 'Vendégház',
            type: 'reference',
            to: [{ type: 'vendegHaz'}],
            validation: Rule => Rule.required(),
        }),
        defineField ({
            name: 'checkinDate',
            title: 'Check-in date',
            type: 'date',
            validation: Rule => Rule.required(),
        }),
        defineField ({
            name: 'checkoutDate',
            title: 'Check-out date',
            type: 'date',
            validation: Rule => Rule.required(),
        }),
        defineField ({
            name: 'numberOfDays',
            title: 'Number of days',
            type: 'number',
            initialValue: 1,
            validation: Rule => Rule.required().min(1),
        }),
        defineField ({
            name: 'discount',
            title: 'Discount',
            type: 'number',
            initialValue: 0,
            validation: Rule => Rule.required().min(0),
        }),
        defineField ({
            name: 'adults',
            title: 'Adults',
            type: 'number',
            initialValue: 1,
            validation: Rule => Rule.required().min(1),
        }),
        defineField ({
            name: 'children',
            title: 'Children',
            type: 'number',
            initialValue: 0,
            validation: Rule => Rule.required().min(0),
        }),
        defineField ({
            name: 'totalPrice',
            title: 'Total price',
            type: 'number',
            validation: Rule => Rule.required().min(0),
        }),
    ],
};

export default booking;