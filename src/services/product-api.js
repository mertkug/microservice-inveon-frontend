import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: 'productApi',
    tagTypes: ['Product', 'Cart'],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'https://localhost:5050/api/',
            prepareHeaders: (headers, { getState }) => {
                const token = getState().user.user.access_token;
                headers.set('Accept', 'application/json');
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`)
                }
                return headers;
            }
        }),
    endpoints: (builder) => ({
        getProductByID: builder.query({
            query: (id) => `products/${id}`,
        }),
        getAllProducts: builder.query({
            query: () => `products`,
        }),
        getProductsByLabel: builder.query({
            query: (label) => `products/filtered?label=${label}`
        }),
        getCart: builder.query({
            query: (userId) => `cart/GetCart/${userId}`
        }),
        createCart: builder.mutation({
            query: (payload) => ({
                url: '/cart/',
                method: 'POST',
                body: payload
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            invalidatesTags: ['Cart']
        }),
        updateCart: builder.mutation({
            query: (payload) => ({
                url: '/cart/UpdateCart',
                method: 'POST',
                body: payload
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            invalidatesTags: ['Cart']
        }),
        getFavorites: builder.query({
            query: (userId) => `/favorites/${userId}`
        }),
    }),
});

export const {
    useGetProductByIDQuery,
    useGetAllProductsQuery,
    useGetProductsByLabelQuery ,
    useGetCartQuery,
    useCreateCartMutation,
    useUpdateCartMutation,
    useGetFavoritesQuery
} = productApi;