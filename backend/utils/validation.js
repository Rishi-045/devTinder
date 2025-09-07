var validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required.");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  } else if (!firstName.length >= 20) {
    throw new Error("First name cannot be more than 20 character.");
  } else if (!lastName.length >= 20) {
    throw new Error("Last name cannot be more than 20 character.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Weak password. Use at least 8 characters with uppercase, lowercase, number, and special character."
    );
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFeilds = [
    "firstName",
    "lastName",
    "about",
    "skills",
    "photoUrl",
    "gender",
    "age",
  ];
  const isEditAllowed = Object.keys(req.body).every((feild) =>
    allowedEditFeilds.includes(feild)
  );

  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
