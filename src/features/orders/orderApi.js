

import { mainApi  } from "../../app/mainApi"



const orderApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        getOrders: builder.query({
            query: (token) => ({
                url: '/orders',
                method: 'GET',
                headers: {
                    Authorization: token
                }
            }),
            providesTags: ['order']
        }),

        createOrder: builder.mutation({
            query: (data) => ({
                url: '/orders',
                method: 'POST',
                headers: {
                    Authorization: data.token
                },
                body: data.body
            }),
            invalidatesTags: ['order']
        }),
        


    })
})

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;