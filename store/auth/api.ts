import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { apiConfig } from '../../settings/config';
import type {Data, User} from './index';


export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
	email: string;
	password: string;
	phone: string;
	first_name: string;
	last_name: string;
	is_student: boolean;
}


export interface LoginResponse {
	data: Data;
}

export const authApi = createApi({
	reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.baseUrl,
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
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<Data, RegisterRequest>({
			query: (credentials) => ({
				url: 'users/',
				method: 'POST',
				body: credentials,
			}),
    }),
		initiateReset: builder.mutation<Data, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    completeReset: builder.mutation<Data, LoginRequest>({
			query: (credentials) => ({
				url: 'login',
				method: 'POST',
				body: credentials,
			}),
    }),
  }),
})

export const { 
	useLoginMutation, 
	useRegisterMutation,
	useInitiateResetMutation,
	useCompleteResetMutation
} = authApi;
