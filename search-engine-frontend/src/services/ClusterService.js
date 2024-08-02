import axios from "axios";

export const sendInBackendFileForClustering = async (file) => {
  try {
    const formData = new FormData();

    formData.append("file", file);

    const res = await axios.post(`http://localhost:8080/cluster`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = res.data;

    if (data.success) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const clusterNewDocuments = async (documents) => {
  try {
    const requestDocuments = documents.map((document) => {
      return {
        document: document,
      };
    });

    const res = await axios.post(
      `http://localhost:8080/cluster/new`,
      requestDocuments
    );

    const data = res.data;

    if (data.success) {
      const results = data.results.map((result) => {
        const cluster = {
          document: result.Document,
          clusterName: result["Cluster Name"],
        };

        return cluster;
      });
      return results;
    }

    return false;
  } catch (error) {
    console.log(error);

    return false;
  }
};
