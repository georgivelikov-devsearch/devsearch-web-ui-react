export const getBase64FromFile = async (file) => {
  let result_base64 = await new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

  return result_base64;
};

export const getErrorResponse = (error, serviceName) => {
  let errorRes;

  let serviceUnvailableMsg = `${serviceName} Service Unavailable`;
  let serviceUnvailableBadNetworkMsg = `Application is temporarily unavailable. Please excuse us!`;
  if (error.response) {
    if (error.response.data.message) {
      errorRes = error.response.data;
    } else {
      errorRes = {
        message: serviceUnvailableMsg,
        additionalInformation: serviceUnvailableMsg,
      };
    }
  } else {
    errorRes = {
      message: serviceUnvailableBadNetworkMsg,
      additionalInformation: serviceUnvailableBadNetworkMsg,
    };
  }

  return errorRes;
};
