export const validateEmail = (email) => {
  // Check if email exists and is not just whitespace
  if (!email || typeof email !== "string" || email.trim() === "") {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password) => {
  // Check if password exists and is not just whitespace
  if (!password || typeof password !== "string" || password.trim() === "") {
    return { isValid: false, message: "Password is required." };
  }

  const trimmedPassword = password.trim();

  // Minimum length check
  if (trimmedPassword.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long.",
    };
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(trimmedPassword)) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(trimmedPassword)) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }

  // Check for at least one number
  if (!/[0-9]/.test(trimmedPassword)) {
    return {
      isValid: false,
      message: "Password must contain at least one number.",
    };
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(trimmedPassword)) {
    return {
      isValid: false,
      message:
        "Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;':\",./<>?).",
    };
  }

  // Check that password only contains allowed characters (letters, numbers, special chars)
  if (
    !/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(trimmedPassword)
  ) {
    return {
      isValid: false,
      message:
        "Password can only contain letters, numbers, and special characters.",
    };
  }

  return { isValid: true, message: "Password is valid." };
};

export const validateFullName = (fullName) => {
  if (!fullName || typeof fullName !== "string" || fullName.trim() === "") {
    return { isValid: false, message: "Full name is required." };
  }

  const trimmedName = fullName.trim();

  if (trimmedName.length < 2) {
    return {
      isValid: false,
      message: "Full name must be at least 2 characters long.",
    };
  }

  // Check that name only contains letters and spaces
  if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
    return {
      isValid: false,
      message: "Full name can only contain letters and spaces.",
    };
  }

  return { isValid: true, message: "Full name is valid." };
};



export const getInitials = (title) => {
  if (!title) {
    return "";
  }

  const words = title.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};
