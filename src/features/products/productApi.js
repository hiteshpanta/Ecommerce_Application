import { mainApi  } from "../../app/mainApi"



const productApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        getProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'GET',
            }),
            providesTags: ['product']
        }),

        getProducts: builder.query({
            query: () => ({
                url: '/products',
                method: 'GET',
            }),
            providesTags: ['product']
        }),

        createProduct: builder.mutation({
            query: (data) => ({

                url: '/products',
                method: 'POST',
                headers: {
                    Authorization: data.token

                },
                body: data.body,
            }),
            invalidatesTags: ['product']
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/products/${data.id}`,
                method: 'PATCH',
                headers: {
                    Authorization: data.token
                },
                body: data.body,
            }),
            invalidatesTags: ['product']
        }),

        removeProduct: builder.mutation({
            query: (data) => ({
                url: `/products/${data.id}`,
                method: 'DELETE',
                headers: {
                    Authorization: data.token
                },

            }),
            invalidatesTags: ['product']
        })
    })
})

export const { useGetProductsQuery, useCreateProductMutation, useRemoveProductMutation, useGetProductQuery, useUpdateProductMutation  } = productApi;