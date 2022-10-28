const WEB_URL = "https://florencia-otot-task-b.herokuapp.com";
export const SERVERLESS_URL =
  "https://flo-cs3219-otot-b4.azurewebsites.net/api/serverless?code=TEz2pt7AQqcFY-EuUbHARB85-1ldahJIyuc_CoKZRg2IAzFuPRdy1A==";

const DIVELOG_PREFIX = "/api/divelog";
export const DIVELOG_URL = WEB_URL + DIVELOG_PREFIX;

export const CREATE_DIVELOG = "/create-divelog";
export const GET_DIVELOG_NAME = "/name";
export const GET_DIVELOG_YEAR = "/year";
export const UPDATE_DIVELOG = "/update-divelog";
export const DELETE_DIVELOG = "/delete-divelog";

export const CREATE_DIVELOG_URL = DIVELOG_URL + CREATE_DIVELOG;
export const GET_DIVELOG_NAME_URL = DIVELOG_URL + GET_DIVELOG_NAME;
export const GET_DIVELOG_YEAR_URL = DIVELOG_URL + GET_DIVELOG_YEAR;
export const UPDATE_DIVELOG_URL = DIVELOG_URL + UPDATE_DIVELOG;
export const DELETE_DIVELOG_URL = DIVELOG_URL + DELETE_DIVELOG;

const USER_PREFIX = "/api/user";
export const USER_URL = WEB_URL + USER_PREFIX;

export const SIGNUP = "/signup";
export const LOGIN = "/login";

export const SIGNUP_URL = USER_URL + SIGNUP;
export const LOGIN_URL = USER_URL + LOGIN;

export const LOCAL_STORAGE_TOKEN_KEY = "token";
export const LOCAL_STORAGE_USERNAME_KEY = "username";
