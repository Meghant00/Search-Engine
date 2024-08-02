import { useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { sendInBackendFileForClustering } from "../services/ClusterService";

const Clustering = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isClustered, setIsClustered] = useState(false);

  const fileSelected = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
  };

  const sendFileForClustering = async () => {
    const res = await sendInBackendFileForClustering(selectedFile);
    console.log(res);
    if (res) {
      setIsClustered(true);
    }
  };

  return (
    <div className="tw-w-screen tw-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center">
      <div className="tw-w-full tw-px-4 tw-bg-gray-300 tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-py-2 md:tw-w-1/4">
        <h1 className="tw-text-xl tw-font-semibold">Generate Cluster</h1>
        <div className="tw-text-sm tw-font-medium">
          Import CSV file and then click generate cluster button to generate
          clusters
        </div>
        <label htmlFor="importCsv" className="tw-w-full tw-cursor-pointer">
          <input
            id="importCsv"
            className="tw-hidden tw-w-full"
            type="file"
            accept=".csv"
            onChange={fileSelected}
          />
          {selectedFile ? (
            <div className="tw-w-full tw-py-4 tw-px-2 tw-h-11 tw-bg-white tw-border tw-border-black tw-rounded tw-text-black tw-text-sm tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-2 ">
              <div className="tw-text-sm">{selectedFile.name}</div>
              <FaPaperclip className="tw-text-xl tw-text-gray-500" />
            </div>
          ) : (
            <div className="tw-w-full tw-py-4 tw-px-2 tw-h-11 tw-bg-white tw-border tw-border-black tw-rounded tw-text-gray-400 tw-text-sm tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-2 ">
              <div className="tw-text-sm">Select a CSV File to Upload</div>
              <FaPaperclip className="tw-text-xl tw-text-gray-500" />
            </div>
          )}
        </label>

        {isClustered ? (
          <div className="tw-text-green-600 tw-font-semibold tw-text-sm">
            Documents Clustered Successfully
          </div>
        ) : (
          <></>
        )}

        <button
          className="tw-bg-primary tw-text-white tw-py-2 tw-px-4 tw-rounded tw-w-full focus:tw-outline-none"
          onClick={sendFileForClustering}
        >
          Generate Cluster
        </button>
      </div>
    </div>
  );
};

export default Clustering;
