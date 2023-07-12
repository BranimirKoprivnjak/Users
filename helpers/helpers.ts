export const phoneNumberIsValid = (phoneNumber: string) => {
  const phoneNumberRegex = /^\+385\d{8,9}$/;
  return phoneNumberRegex.test(phoneNumber);
};
