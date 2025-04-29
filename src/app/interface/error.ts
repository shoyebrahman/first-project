export type TErrorSource = {
  path: string | number;
  message: string;
}[];

// declar a type for return

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};
