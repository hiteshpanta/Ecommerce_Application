

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



// export const base = 'http://192.168.1.73:5000';

export const base = 'https://ecommerce-application-1v9f.onrender.com/';

export const mainApi = createApi ({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://ecommerce-application-1v9f.onrender.com/api'}),
    endpoints: (builder) => ({})
});