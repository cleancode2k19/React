export const API_DOMAIN = "https://newsapi.org/v2/top-headlines?country="
export const API_KEY = "e36f110546554180a9d60ce4a37147dd"
export const endpointPath = (country, category, page, pageSize) => `${API_DOMAIN}${country}&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
