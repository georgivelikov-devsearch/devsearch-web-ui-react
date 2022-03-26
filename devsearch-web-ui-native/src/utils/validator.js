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

  let valueLength = 0;
  if (stringValue) {
    valueLength = stringValue.length;
  }

  if (valueLength < minLen) {
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
  } else if (valueLength > maxLen) {
    returnValue = {
      result: false,
      message: `${propertyName} must not be longer than ${maxLen} characters`,
    };
  }

  return returnValue;
};
