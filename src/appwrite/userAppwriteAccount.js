import { userAppwrite } from "../appwrite/userAppwrite.js";
export const userAppwriteAccount = () => {
  const { account, ID } = userAppwrite();
  const getCurrentUser = async () => {
    return account.value.get();
  };
  const logout = async () => {
    try {
      const data = await account.deleteSessions("current");
      return data;
    } catch (e) {
      return e;
    }
  };
  const login = async (email, password) => {
    try {
      const data = await account.createEmailSession(email, password);
      return data;
    } catch (e) {
      return e;
    }
  };
  const createAccount = async (email, password, name) => {
    try {
      const data = await account.create(ID.unique(), email, password, name);
      return data;
    } catch (e) {
      return e;
    }
  };
  return {
    createAccount,
    getCurrentUser,
    login,
    logout,
  };
};
