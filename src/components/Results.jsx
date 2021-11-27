import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useStateContext } from "../contexts/StateContextProvider";
import { Loading } from "./Loading";
import SearchResultUI from "./UI/SearchResultUI";
import ImageResultUI from "./UI/ImageResultUI";
import NewsResultUI from "./UI/NewsResultUI";

export const Results = () => {
  const { results, loading, getResults, searchTerm } = useStateContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm !== "") {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (loading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return <SearchResultUI results={results} />;

    case "/images":
      return <ImageResultUI results={results} />;

    case "/news":
      return <NewsResultUI results={results} />;

    default:
      return;
  }
};
