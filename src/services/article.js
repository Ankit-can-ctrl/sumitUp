import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", rapidApiKey);
      headers.set(
        "x-rapidapi-host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        // encodeUricompo converts symbols in urls in acceptable form it is javascript method
        `/summarize?url=${encodeURIComponent(
          params.articleUrl
        )}&length=3&lang=en&engine=2`,
    }),
  }),
});

// useLazy will fire up only when user clicks

export const { useLazyGetSummaryQuery } = articleApi;
