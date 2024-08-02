import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { clusterNewDocuments } from "../services/ClusterService";

const ClusterNewDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [clustered, setClustered] = useState(false);
  const [clusteredDocuments, setClusteredDocuments] = useState([]);

  const addDocuments = () => {
    setDocuments([...documents, ""]);
  };

  const changeDocument = (event, index) => {
    const tempDocuments = [...documents];

    tempDocuments[index] = event.target.value;

    setDocuments(tempDocuments);
  };

  const deleteDocuments = (index) => {
    const tempDocuments = documents;
    tempDocuments.splice(index, 1);

    setDocuments([...tempDocuments]);
  };

  const clusterDocuments = async () => {
    const res = await clusterNewDocuments(documents);

    setClusteredDocuments(res);

    setClustered(true);
  };

  const showClusterDocument = () => {
    setClustered(false);

    setDocuments([]);
    setClusteredDocuments([]);
  };

  return (
    <>
      {clustered ? (
        <div className="tw-w-screen tw-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center">
          <div className="tw-w-full tw-px-4 tw-bg-gray-300 tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-py-2 md:tw-w-[60%]">
            <h1 className="tw-text-xl tw-font-semibold">Documents Clustered</h1>

            <div className="tw-relative tw-overflow-x-auto">
              <table className="tw-w-full tw-text-sm tw-text-left rtl:tw-text-right tw-text-gray-500">
                <thead className="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
                  <tr>
                    <th scope="col" className="tw-px-6 tw-py-3">
                      S.N
                    </th>
                    <th
                      scope="col"
                      className="tw-px-6 tw-py-3 tw-w-[400px] tw-max-w-[400px]"
                    >
                      Document
                    </th>
                    <th scope="col" className="tw-px-6 tw-py-3 tw-w-fit">
                      Cluster Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clusteredDocuments.map((document, index) => {
                    return (
                      <tr className="tw-bg-white tw-border-b" key={index}>
                        <td className="tw-px-6 tw-py-4">{index + 1}</td>
                        <td className="tw-px-6 tw-py-4">{document.document}</td>
                        <td className="tw-px-6 tw-py-4">
                          {document.clusterName}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button
              className="tw-bg-primary tw-text-white tw-py-2 tw-px-4 tw-rounded tw-w-1/2 focus:tw-outline-none"
              onClick={showClusterDocument}
            >
              Add New Documents
            </button>
          </div>
        </div>
      ) : (
        <div className="tw-w-screen tw-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center">
          <div className="tw-w-full tw-px-4 tw-bg-gray-300 tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-py-2 md:tw-w-1/4">
            <h1 className="tw-text-xl tw-font-semibold">
              Cluster New Documents
            </h1>

            <div className="tw-w-full tw-h-[500px] tw-overflow-auto tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2">
              {documents.map((document, index) => {
                return (
                  <div
                    className="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 tw-px-1"
                    key={index}
                  >
                    <input
                      className="tw-w-full tw-border tw-py-2 tw-px-2 tw-border-gray-600 tw-rounded-sm tw-h-11 focus:tw-outline-none focus:tw-border-primary focus:tw-border"
                      value={document}
                      onInput={(event) => changeDocument(event, index)}
                    />

                    <button
                      className="tw-bg-primary tw-text-white tw-text-sm tw-rounded-sm tw-py-1 tw-px-1"
                      onClick={() => deleteDocuments(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              className="tw-bg-primary tw-text-white tw-py-2 tw-px-4 tw-rounded tw-w-full focus:tw-outline-none"
              onClick={addDocuments}
            >
              Add Documents
            </button>

            <button
              className="tw-bg-primary tw-text-white tw-py-2 tw-px-4 tw-rounded tw-w-full focus:tw-outline-none"
              onClick={clusterDocuments}
            >
              Cluster Documents
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ClusterNewDocuments;
