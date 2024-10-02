import axios from "axios";
export const search = async ({ query }) => {
  try {
    const startTime = Date.now();

    const res = await axios.get(`http://localhost:8080/search`, {
      params: {
        query: query,
      },
    });

    const endTime = Date.now();

    const queryTime = (endTime - startTime) / 1000;

    const data = res.data;

    const results = data.results;

    results.forEach((result) => {
      result.tags = result.concepts;
      result.date = new Date(result.publication_date).toISOString();
      result.score = result.score.toFixed(2);
      result.authors = result.authorsAndLinks;
    });

    console.log(results);

    return { results: results, queryTime: queryTime };
  } catch (error) {
    console.log(error);

    return { results: [], queryTime: 0 };
  }
};
