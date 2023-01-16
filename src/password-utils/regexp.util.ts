const PASSWORD_RULE =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const PASSWORD_RULE_MESSAGE =
  `Passwords will contain at least 1 upper case letter, at least 1 lower case letter and at least 1 number or special character & atlest 8 char long`;

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};

