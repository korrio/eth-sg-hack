export const SetResponse = (response: any) => {
  if (response.status === 200 || response.status === 201) {
    return { isError: false, response: response.data };
  }
  return { isError: true, response: response.data };
};
