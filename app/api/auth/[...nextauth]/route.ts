import NextAuth from 'next-auth';
import AtlassianProvider from 'next-auth/providers/atlassian';
import { KyselyAdapter } from '@auth/kysely-adapter';
import { db } from '@/lib/db';

const handler = NextAuth({
  // TODO: Remove this comment once a fix is found for the typing
  // https://github.com/nextauthjs/next-auth/issues/8660
  // @ts-ignore
  adapter: KyselyAdapter(db),
  providers: [
    AtlassianProvider({
      clientId: process.env.ATLASSIAN_CLIENT_ID ?? '',
      clientSecret: process.env.ATLASSIAN_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: 'read:jira-work write:jira-work read:jira-work read:jira-user read:me',
        },
      },
    }),
  ],
});

export { handler as GET, handler as POST };
