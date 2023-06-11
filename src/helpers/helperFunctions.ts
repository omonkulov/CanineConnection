/**
 * Use this when an API request returns 401 (Permission denied) and you are sure you have access to that end point.
 * This is way to detect if the cookie has expiered. This is just a workaround to make it work in the quickes time.
 */
const authExpiredHelper = () => {
  localStorage.removeItem("auth");
  window.location.reload();
};

/**
 * Email format validator
 * @param email Email in string
 * @returns True if the email is valid; False otherwise.
 */
const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 * Builds url param string using the given filter options 
 * @param data SearchRequestModal: for searching dogs with filters
 * @returns url string
 */
const buildURLParam = (data: SearchRequestModal): string => {
  let params = new URLSearchParams();

  if (data.breeds) {
    data.breeds.forEach((val) => {
      params.append("breeds", val);
    });
  }
  if (data.zipCodes) {
    data.zipCodes.forEach((val) => {
      params.append("zipCodes", val);
    });
  }
  if (data.ageMin) {
    params.append("ageMin", data.ageMin + "");
  }
  if (data.ageMax) {
    params.append("ageMax", data.ageMax + "");
  }
  if (data.size) {
    params.append("size", data.size + "");
  }
  if (data.from) {
    params.append("from", data.from + "");
  }
  if (data.sort) {
    params.append("sort", "breed:" + data.sort);
  }

  return ("?" + params.toString());
};


/**
 * The api returns for pagination "next":"/dogs/search?size=25&from=25". This functions parses the 'size' and 'from' into an object.
 * Then we can use that to manipulate the nubmers results per page
 * @param string next or prev ex: "/dogs/search?size=25&from=25"
 * @returns from: number and size: number in object
 */
function getFromAndSizeFromURL(params: string): { from: number; size: number } | undefined {
  if (params) {
    const urlParams = new URLSearchParams(params.split("?")[1]);
    let sizeStr = urlParams.get("size");
    let fromStr = urlParams.get("from");
    if (sizeStr && sizeStr.length > 0 && fromStr && fromStr.length > 0) {
      let size = Number(urlParams.get("size"));
      const from = Number(urlParams.get("from"));
      return { from, size };
    }
  }
  return undefined;
}

export { authExpiredHelper, isValidEmail, buildURLParam, getFromAndSizeFromURL};
 