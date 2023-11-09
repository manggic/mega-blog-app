import { Account, Client, ID } from "appwrite";
import config from "../config/config";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.VITE_APPWRITE_URL)
      .setProject(config.VITE_APPWRITE_PROJECT_ID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("createAccount ERROR", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("login ERROR", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("getCurrentUser ERROR", error);
      throw error;
    }
  }

  async logout() {
    try {
      // we can also use deleteSessions to delete all the sessions
      await this.account.deleteSession("current");
    } catch (error) {
      console.log("logout ERROR", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
