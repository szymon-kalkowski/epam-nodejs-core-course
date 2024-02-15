export const responseObject = (data: any, errorMessage: string | null) => {
  if (data) {
    return {
      data,
      error: null,
    };
  } else {
    return {
      data: null,
      error: {
        message: errorMessage,
      },
    };
  }
};
