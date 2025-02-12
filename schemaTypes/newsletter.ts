import { defineField } from 'sanity';

const newsletter = {
    name: 'newsletter',
    title: 'Feliratkozott email címek',
    type: 'document',
    fields: [
        defineField ({
            name: 'email',
            title: 'Email',
            type: 'text',
        }),
    ],
};

export default newsletter;