import {
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USERNAME_KEY,
} from "../configs";

export const getToken = () => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  return token;
};

export const getUsername = () => {
  const username = window.localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
  return username;
};

export const saveTokens = (token: string, username: string) => {
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  window.localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, username);
};
