export interface JiraSiteAccessibleResource {
  id: string;
  name: string;
  url: string;
  scopes: string[];
  avatarUrl: string;
}

export interface JiraAccessToken {
  exp: number;
}
