const API_PROD = "/.netlify/functions";
const API_DEV = "http://localhost:50064"

export const api = process.env.REACT_APP_DEVENV === "development" ? API_DEV : API_PROD;