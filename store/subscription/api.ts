import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';


export const subApi = createApi({
	reducerPath: 'subApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.access_token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    charge: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    validate: builder.mutation({
			query: (credentials) => ({
				url: 'login',
				method: 'POST',
				body: credentials,
			}),
    }),
		complete: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    })
  }),
})

export const { 
	useChargeMutation,
	useValidateMutation,
	useCompleteMutation,
} = subApi;
