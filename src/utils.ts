import bcrypt from "bcrypt";

export function verifyPassword(myPlaintextPassword: string, hash: string) {
  return bcrypt.compareSync(myPlaintextPassword, hash);
}
