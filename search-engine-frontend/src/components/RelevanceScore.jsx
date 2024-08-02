import { useEffect, useRef } from "react";

const RelevanceScore = ({ width, height, fillPercentage, text = "" }) => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const round = containerRef.current;

    const circle = circleRef.current;

    const roundRadius = circle.getAttribute("r");
    const roundPercent = round.getAttribute("data-percent");
    const roundCircum = 2 * roundRadius * Math.PI;
    const roundDraw = (roundPercent * roundCircum) / 100;

    round.style.strokeDasharray = roundDraw + " 999";
  }, [fillPercentage]);
  return (
    <div className="tw-relative tw-w-full tw-h-full">
      <svg
        className="round"
        viewBox="0 0 100 100"
        width={width}
        height={height}
        data-percent={fillPercentage}
        ref={containerRef}
      >
        <circle ref={circleRef} cx="50" cy="50" r="40" />
      </svg>

      <div className="tw-absolute tw-w-full tw-h-full tw-text-primary tw-top-0 tw-left-[-7px] tw-flex tw-flex-col tw-items-center tw-justify-center">
        <div className="tw-text-sm tw-font-semibold">{text}</div>
      </div>
    </div>
  );
};

export default RelevanceScore;
