import { useEffect, useState } from "react";
import moment from "moment";
import Tag from "./Tag";
import RelevanceScore from "./RelevanceScore";

const SearchResult = ({
  authors,
  date,
  link,
  relevanceScore,
  tags = [],
  title,
}) => {
  const [formattedDate, setFormattedDate] = useState(date);

  const formatDate = (date) => {
    const formattedDate = moment(date).format("yyyy/MM/DD");

    setFormattedDate(formattedDate);
  };

  useEffect(() => {
    formatDate(date);
  }, [date]);

  return (
    <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4">
      <div className="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-py-6 tw-flex-grow-1">
        <a
          className="tw-text-blue-700 tw-font-bold tw-text-xl"
          href={link}
          target="_blank"
        >
          {title}
        </a>
        <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between tw-text-green-600 tw-text-sm tw-max-w-[900px]">
          <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2">
            {authors.map((author, index) => {
              return (
                <a
                  href={author.link}
                  className="tw-capitalize tw-underline tw-font-medium"
                  key={index}
                  target="_blank"
                >
                  {author.author}
                </a>
              );
            })}
          </div>
          <div className="tw-font-medium">{formattedDate}</div>
        </div>
        <div className="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-pt-2">
          {tags.map((tag, index) => {
            return <Tag key={index} tagName={tag} />;
          })}
        </div>
      </div>
      <div className="tw-text-primary tw-w-28 tw-flex-shrink-0 tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-2">
        <h2 className="tw-font-bold tw-text-sm">Relevance Score</h2>
        <RelevanceScore
          width={100}
          height={100}
          fillPercentage={relevanceScore * 100}
          text={relevanceScore}
        />
      </div>
    </div>
  );
};

export default SearchResult;
