import 'server-only';
import { JiraSiteAccessibleResource } from './types';

export const JIRA_API_URL = 'https://api.atlassian.com/ex/jira';

export const OAUTH_API_URL = 'https://auth.atlassian.com/oauth/token';

export const ATLASSIAN_CLIENT_ID = process.env.ATLASSIAN_CLIENT_ID ?? '';

export const ATLASSIAN_CLIENT_SECRET = process.env.ATLASSIAN_CLIENT_SECRET ?? '';

export const MOCK_ACCESSIBLE_RESOURCE_RESPONSE: JiraSiteAccessibleResource[] = [
  {
    id: 'c874150b-3a95-43cd-b53c-c8074134268f',
    url: 'https://smart-sprint-test.atlassian.net',
    name: 'smart-sprint-test',
    scopes: ['read:jira-work', 'write:jira-work', 'read:jira-user'],
    avatarUrl: 'https://site-admin-avatar-cdn.prod.public.atl-paas.net/avatars/240/flag.png',
  },
];
