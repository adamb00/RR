import bcrypt from 'bcrypt';

export const correctPassword = async (candidatePwd: string, userPwd: string): Promise<boolean> => {
   return bcrypt.compare(candidatePwd, userPwd);
};
