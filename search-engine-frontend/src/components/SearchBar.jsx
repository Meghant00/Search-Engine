import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const SearchBar = ({ initialSearch = "" }) => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState(initialSearch);

  const changeSearchText = (event) => {
    const searchedText = event.target.value;

    setSearchText(searchedText);
  };

  const redirectToSearchPage = () => {
    navigate(`/search?query=${searchText}`);
  };

  useEffect(() => {
    setSearchText(initialSearch);
  }, [initialSearch]);

  return (
    <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start">
      <input
        className="tw-w-full tw-border tw-py-2 tw-px-2 tw-border-y-gray-600 tw-border-l-gray-600 tw-border-r-primary tw-rounded-l-sm tw-h-11 focus:tw-outline-none focus:tw-border-primary focus:tw-border"
        onInput={changeSearchText}
        value={searchText}
      />
      <div className="tw-h-11 tw-w-14 tw-flex-shrink-0">
        <button
          className="tw-bg-primary tw-text-white tw-py-2 tw-px-2 tw-border tw-border-primary tw-h-full tw-w-full  tw-flex tw-flex-row tw-items-center tw-justify-center focus:tw-outline-none focus:tw-border-primary focus:tw-border"
          onClick={redirectToSearchPage}
        >
          <FaSearch className="tw-text-white" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
