const formValidity = (name, email, address, phone, pin, country) => {
  let errors = {};

  if (name.trim().length === 0) {
    errors.name = "Name must not be empty.";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email not valid.";
  } else if (email.length === 0) {
    errors.email = "Email should not be empty.";
  }
  if (address.trim().length === 0) {
    errors.address = "Address must not be empty.";
  }
  if (phone.trim().length === 0) {
    errors.phone = "Phone number must not be empty.";
  } else if (phone.trim().length !== 10) {
    errors.phone = "Phone number must be 10 numbers.";
  }
  if (pin.trim().length === 0) {
    errors.pin = "Pin code must not be empty.";
  } else if (pin.trim().length !== 6) {
    errors.pin = "Pin code must be of 6 numbers.";
  }
  if (country.trim().length === 0) {
    errors.country = "Country should not be empty.";
  }

  const valid = Object.keys(errors).length === 0;

  const error = errors;

  return { valid, error };
};

export default formValidity;
