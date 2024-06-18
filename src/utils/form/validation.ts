export const notEmpty = (value: string | undefined) => {
  if (value === undefined || value.length === 0) {
    return "Field is required";
  }
  return undefined;
};
