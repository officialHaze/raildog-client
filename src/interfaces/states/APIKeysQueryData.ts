export interface APIKeyObj {
  _id: string;
  api_key: string;
  is_enabled: boolean;
}

export default interface APIKeysQueryData {
  message: string;
  api_keys: APIKeyObj[];
}
