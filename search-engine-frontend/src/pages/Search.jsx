import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useLocation, NavLink } from "react-router-dom";
import React from "react";
import SearchResult from "../components/SearchResult";
import { search } from "../services/SearchService";
import logo from "../assets/img/logo.png";
import RelevanceScore from "../components/RelevanceScore";

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const Search = () => {
  const query = useQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [queryTime, setQueryTime] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchedQuery = query.get("query");

    setSearchQuery(searchedQuery);

    const fetchData = async () => {
      setLoading(true);
      const data = await search({ query: searchedQuery });

      setSearchResults(data.results);
      setQueryTime(data.queryTime);

      setLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <div className="tw-w-full tw-min-h-screen tw-flex tw-flex-col tw-items-start tw-justify-start">
      <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-py-2 tw-px-4 tw-bg-gray-600 tw-sticky tw-top-0 tw-z-[999]">
        <NavLink to="/">
          <img src={logo} alt="Logo" width="110px" height="60px" />
        </NavLink>
        <div className="tw-w-[40%]">
          <SearchBar initialSearch={searchQuery} />
        </div>
      </div>
      <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-border tw-border-y-gray-500 tw-py-4 tw-px-16">
        {!loading ? (
          <div className="tw-text-sm tw-text-gray-700">
            {searchResults.length} results (
            <span className="tw-text-gray-500 tw-font-bold">{queryTime}</span>
            <span className="tw-text-gray-500">seconds</span>)
          </div>
        ) : (
          <div className="tw-h-6">
            <div className="tw-animate-spin tw-duration-150 tw-ease-linear">
              <RelevanceScore width={24} height={24} fillPercentage={75} />
            </div>
          </div>
        )}
      </div>
      <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center">
        <div className="tw-min-w-[80%] tw-w-[80%] tw-flex tw-flex-col tw-items-start tw-justify-start tw-py-4 tw-px-4  tw-divide-y-2 tw-divide-gray-500">
          {searchResults.map((result, index) => {
            return (
              <SearchResult
                authors={result.authors}
                date={result.date}
                link={result.link}
                relevanceScore={result.score}
                tags={result.tags}
                title={result.title}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
