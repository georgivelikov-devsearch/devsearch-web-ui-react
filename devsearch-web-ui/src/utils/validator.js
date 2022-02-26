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
      message: `${propertyName} must be at least ${minLen} characters`,
    };
    if (minLen === 1) {
      returnValue = {
        result: false,
        message: `${propertyName} must be at least ${minLen} character`,
      };
    }
  } else if (stringValue.length > maxLen) {
    returnValue = {
      result: false,
      message: `${propertyName} must not be longer than ${maxLen} characters`,
    };
  }

  return returnValue;
};
