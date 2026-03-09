import {
  EMAILERRORS,
  emailRegex,
  PASSWORDERRORS,
} from "../global/constants.ts";

export function validateEmail(email: string): string | null {
  if (!email) return EMAILERRORS.EMPTY;
  if (!emailRegex.test(email)) return EMAILERRORS.INVALID;
  return null;
}

export function validatePassword(password: string): string[] | null {
  const errors = [];
  if (!password) errors.push(PASSWORDERRORS.EMPTY);
  if (password.length < 8) errors.push(PASSWORDERRORS.TOOSHORT);
  if (!/[A-Z]/.test(password)) errors.push(PASSWORDERRORS.NOUPPERCASE);
  if (!/[a-z]/.test(password)) errors.push(PASSWORDERRORS.NOLOWERCASE);
  if (!/\d/.test(password)) errors.push(PASSWORDERRORS.NONUMBER);
  if (!/[@$!%*?&]/.test(password))
    errors.push(PASSWORDERRORS.NOSPECIALCHARACTER);
  if (errors.length) return errors;
  return null;
}
