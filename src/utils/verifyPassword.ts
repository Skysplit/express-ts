import bcrypt from "bcrypt";

export const verifyPassword = (password: string, encrypted: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encrypted, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};
