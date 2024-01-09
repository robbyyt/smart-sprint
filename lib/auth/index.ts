import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession as nextAuthGetServerSession } from 'next-auth';
import AtlassianProvider from 'next-auth/providers/atlassian';
import { KyselyAdapter } from '@auth/kysely-adapter';

import { db } from '../db';
import { ATLASSIAN_CLIENT_ID, ATLASSIAN_CLIENT_SECRET } from '../data/jira/constants';

export const authConfig = {
  // TODO: Remove this comment once a fix is found for the typing
  // https://github.com/nextauthjs/next-auth/issues/8660
  // @ts-ignore
  adapter: KyselyAdapter(db),
  providers: [
    AtlassianProvider({
      clientId: ATLASSIAN_CLIENT_ID,
      clientSecret: ATLASSIAN_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:jira-work write:jira-work read:jira-work read:jira-user read:me offline_access',
        },
      },
    }),
  ],
  callbacks: {
    session({ user, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
} satisfies NextAuthOptions;

/**
 * When calling from the server-side i.e. in Route Handlers,
 * React Server Components, API routes or in getServerSideProps,
 * we recommend using this function instead of getSession
 * to retrieve the session object.
 * This method is especially useful when you are using NextAuth.js
 * with a database.
 * This method can drastically reduce response time when used over getSession
 *  on server-side,
 * due to avoiding an extra fetch to an API Route
 * */
export function getServerSession(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return nextAuthGetServerSession(...args, authConfig);
}
