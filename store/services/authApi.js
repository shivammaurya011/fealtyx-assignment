import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async (credentials) => {
        try {
          const response = await fetch('/data/users.json');
          const users = await response.json();
          const user = users.find(
            (u) => u.username === credentials.username && u.password === credentials.password
          );
          if (!user) throw new Error('Invalid credentials');
          return { data: { user, token: `mock-token-${user.id}` } };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;