import bcrypt from "bcrypt";

const hash = bcrypt.hashSync("123456", 10);
// Store hash in your password DB.
console.log(hash);
