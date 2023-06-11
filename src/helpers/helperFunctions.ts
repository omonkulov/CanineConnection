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

export { authExpiredHelper, isValidEmail };
