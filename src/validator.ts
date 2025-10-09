export const validateUsername = (username: string) => {
  const length = username.length;

  return length >= 3 && length <= 20;
};
