const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const isValidStrLength = (str, min, max) => {
  const value = str.replace(/\s+/g, "");
  return value.length > min && value.length < max ? true : false;
};

export { isValidEmail, isValidStrLength };
