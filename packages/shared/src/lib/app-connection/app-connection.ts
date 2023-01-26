import { BaseModel } from "../common/base-model";

export type AppConnectionId = string;

interface BaseAppConnection<S> extends BaseModel<AppConnectionId> {
  name: string;
  appName: string;
  projectId: string;
  value: S;
}

export enum AppConnectionType {
  OAUTH2 = "OAUTH2",
  CLOUD_OAUTH2 = "CLOUD_OAUTH2",
  SECRET_TEXT = "SECRET_TEXT",
  CUSTOM = "CUSTOM"
}

export interface SecretTextConnectionValue {
  type: AppConnectionType.SECRET_TEXT,
  secret_text: string;
}


export interface BaseOAuth2ConnectionValue {
  expires_in: number;
  token_type: string;
  access_token: string;
  claimed_at: number;
  refresh_token: string;
  scope: string;
  data: Record<string, any>
}

export interface CloudOAuth2ConnectionValue extends BaseOAuth2ConnectionValue {
  type: AppConnectionType.CLOUD_OAUTH2;
  expires_in: number;
  token_type: string;
  access_token: string;
  claimed_at: number;
  refresh_token: string;
  scope: string;
  data: Record<string, any>
}

export interface OAuth2AppDetails {
  client_id: string;
  client_secret: string;
  token_url: string;
  redirect_url: string;
}

export interface OAuth2ConnectionValueWithApp extends BaseOAuth2ConnectionValue, OAuth2AppDetails {
  type: AppConnectionType.OAUTH2;
  client_id: string;
  client_secret: string;
  token_url: string;
  redirect_url: string;
}

export interface CustomConnectionValue {
  type: AppConnectionType.CUSTOM,
  [P: string]: string | number | CloudOAuth2ConnectionValue | SecretTextConnectionValue | OAuth2ConnectionValueWithApp;
}

export type OAuth2AppConnection = (BaseAppConnection<OAuth2ConnectionValueWithApp>);
export type ApiKeyAppConnection = BaseAppConnection<SecretTextConnectionValue>
export type CloudAuth2Connection = BaseAppConnection<CloudOAuth2ConnectionValue>
export type CustomAuthentication = BaseAppConnection<CustomConnectionValue>

export type AppConnection = CustomAuthentication | ApiKeyAppConnection | OAuth2AppConnection | CloudAuth2Connection;