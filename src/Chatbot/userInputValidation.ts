// Validation Functions

export const validateFullName = (fullName: string): string | null => {
  const nameParts = fullName.trim().split(" ");
  if (nameParts.length !== 2) {
    return "Full name must contain a first name and a last name, separated by a space.";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^\D*(\d\D*){10}$/;

  if (!phoneRegex.test(phone)) {
    return "Phone number must contain exactly 10 digits.";
  }

  return null;
};

export const validateZipCode = (zipCode: string): string | null => {
  const zipCodeRegex = /^\d{6}$/; // 6 digits
  if (!zipCodeRegex.test(zipCode)) {
    return "Zip code must consist of exactly 6 digits.";
  }
  return null;
};

export const validateFullAddress = (address: string): string | null => {
  if (address.trim().length === 0) {
    return "Full address cannot be empty.";
  }
  // You can add more specific validations if necessary.
  return null;
};
