import { mainApi } from '@/app/mainApi';





export const authApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({


        userLogin: builder.mutation({
            query: (body) => ({
                url: '/users/login',
                method: 'POST',
                body: body
            })
        }),




    })
})

export const {useUserLoginMutation} = authApi;