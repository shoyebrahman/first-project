import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  //Extracted value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  //the extracted value will be in th efirst capturing group
  const extractedMessage = match && match[1];
  const errorSources: TErrorSource = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Erro",
    errorSources,
  };
};

export default handleDuplicateError;
