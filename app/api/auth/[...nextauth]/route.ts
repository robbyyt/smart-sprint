import NextAuth from 'next-auth';
import AtlassianProvider from 'next-auth/providers/atlassian';
import { KyselyAdapter } from '@auth/kysely-adapter';
import { db } from '@/lib/db';

const handler = NextAuth({
  // TODO: Remove this comment once a fix was found
  // @ts-ignore
  adapter: KyselyAdapter(db),
  providers: [
    AtlassianProvider({
      clientId: process.env.ATLASSIAN_CLIENT_ID ?? '',
      clientSecret: process.env.CLIENT_SECRET ?? '',
    }),
  ],
});

export { handler as GET, handler as POST };
