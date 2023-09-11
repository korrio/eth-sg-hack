// const getErrorMessageByCode = (code: string) => {
//   switch (code) {
//     case '401': {
//       return 'Unauthorized Access';
//     }
//     case '400': {
//       return 'Data Invalid';
//     }
//     default: {
//       return '';
//     }
//   }
// };

const setError = (err: any) => {
  // console.log('err', err);
  return {
    error: err,
  };
};

export default setError;
