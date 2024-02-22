import _ from "lodash";

/**
 * Wrap fetch API by adding headers
 * multipart is required due to:
 * https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
 */

const getUrl = (endpoint: RequestInfo) => {
  const url = window.location.host.startsWith("localhost")
    ? "http://localhost:3001"
    : "https://api-sa.sem-ir.com";

  return url + endpoint;
};

// eslint-ignore-next-line
const request = async <T = any>(
  endpoint: RequestInfo,
  options?: RequestInit | undefined,
  multipart = false
) => {
  const fetchOptions = _.merge(
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    },
    options
  );

  if (multipart) {
    fetchOptions.headers["Content-Type"] = "";
  }

  const url = getUrl(endpoint);
  return fetch(url, fetchOptions).then(async (response) => {
    const body = (await response.json()) as Promise<T>;

    if (response.ok) {
      return body;
    } else {
      // eslint-disable-next-line
      throw { status: response.status, ...body };
    }
  });
};

export default request;
