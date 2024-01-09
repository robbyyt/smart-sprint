import 'server-only';
import axios, { AxiosInstance, AxiosHeaderValue } from 'axios';

import {
  MOCK_ACCESSIBLE_RESOURCE_RESPONSE,
  JIRA_API_URL,
  OAUTH_API_URL,
  ATLASSIAN_CLIENT_ID,
  ATLASSIAN_CLIENT_SECRET,
} from './constants';
import { safeParseBearerToken } from '@/lib/utils/http';
import { safeParseToken } from '@/lib/utils/jwt';
import { JiraAccessToken } from './types';

const jiraApi: AxiosInstance = axios.create({
  baseURL: JIRA_API_URL,
});

jiraApi.interceptors.request.use(async (config) => {
  const accessToken = safeParseBearerToken(config.headers?.Authorization as string);

  const tokenParseResult = safeParseToken<JiraAccessToken>(accessToken);

  try {
    if (!tokenParseResult.success) {
      
    }
  } finally {
    return config;
  }
});

export async function getAccessibleResources(accessToken: string) {
  return MOCK_ACCESSIBLE_RESOURCE_RESPONSE;
}

export function refreshAtlassianToken(refresh_token: string) {
  return axios
    .post(`${OAUTH_API_URL}/token`, {
      grant_type: 'refresh_token',
      client_id: ATLASSIAN_CLIENT_ID,
      client_secret: ATLASSIAN_CLIENT_SECRET,
    })
    .then(
      (response) => response.data as { access_token: string; refresh_token: string; expires_in: number; scope: string }
    );
}

export function getTasks() {}
