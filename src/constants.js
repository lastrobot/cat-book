export const API_SETTINGS = {
  baseUrl: "https://api.thecatapi.com",
  UserId: "MY_USER_999",
  uploadEndpoint: "/v1/images/upload",
  voteEndpoint: "/v1/votes",
  catlistEndpoint: "/v1/images",
  favouriteEndpoint: "/v1/favourites",
  apiKey: "df4c0ea0-5ba3-44bd-a365-5f533b32aee1",
};

const BREAKPOINTS = {
  mobileMax: 37.5,
  tabletMax: 59.375,
  laptopMax: 81.25,
};
export const QUERIES = {
  mobileScreens: `(max-width: ${BREAKPOINTS.mobileMax}rem)`,
  tabletScreens: `(max-width: ${BREAKPOINTS.tabletMax}rem)`,
  laptopScreens: `(min-width: ${BREAKPOINTS.laptopMax}rem)`,
};
