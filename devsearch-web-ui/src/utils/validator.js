export const validateStringLength = (
  stringValue,
  minLen,
  maxLen,
  propertyName
) => {
  let success = true;

  let returnValue = {
    result: success,
    message: "",
  };

  if (stringValue.length < minLen) {
    returnValue = {
      result: false,
      message: `${propertyName} must be longer than ${minLen} characters`,
    };
  } else if (stringValue.length > maxLen) {
    returnValue = {
      result: false,
      message: `${propertyName} must be shorter than ${maxLen} characters`,
    };
  }

  return returnValue;
};
