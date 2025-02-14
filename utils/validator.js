const isValidReferralData = (referredBy, name, email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return referredBy && name && email && emailRegex.test(email);
};

module.exports = { isValidReferralData };