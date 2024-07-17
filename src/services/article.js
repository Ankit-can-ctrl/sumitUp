import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// the above import should have /react last it do not does it by itself and show error query is not a function

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

const summaryApiHeaders = {
  "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
  "x-rapidapi-key": rapidApiKey,
};

const baseUrl = "https://article-extractor-and-summarizer.p.rapidapi.com/";

const createRequest = (url) => ({ url, headers: summaryApiHeaders });

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        createRequest(
          `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        ),
    }),
  }),
});

// useLazy will fire up only when user clicks

export const { useLazyGetSummaryQuery } = articleApi;

// encodeUricompo converts symbols in urls in acceptable form it is javascript method
// query: (params) =>
//   `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
