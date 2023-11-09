import { Client, Databases, Storage, ID, Query } from "appwrite";
import config from "../config/config";

class Service {
  client = "";
  databases;
  bucket;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.VITE_APPWRITE_URL)
      .setProject(config.VITE_APPWRITE_PROJECT_ID);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.VITE_APPWRITE_DATABASE_ID,
        config.VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featureImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("createPost ERROR", error);
    }
  }

  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      await this.databases.createDocument(
        config.VITE_APPWRITE_DATABASE_ID,
        config.VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
    } catch (error) {
      console.log("updatePost ERROR", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.VITE_APPWRITE_DATABASE_ID,
        config.VITE_APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("deletePost ERROR", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.VITE_APPWRITE_DATABASE_ID,
        config.VITE_APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("getPost ERROR", error);
    }
  }

  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.VITE_APPWRITE_DATABASE_ID,
        config.VITE_APPWRITE_COLLECTION_ID,
        queries
      );
    } catch (error) {
      console.log("getAllPost ERROR", error);
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("uploadFile ERROR", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.VITE_APPWRITE_BUCKET_ID, fileId);
    } catch (error) {
      console.log("deleteFile ERROR", error);
    }
  }

   getFilePreview(fileId) {
    try {
      const imageFile = this.bucket.getFilePreview(config.VITE_APPWRITE_BUCKET_ID, fileId);
      return imageFile
    } catch (error) {
      console.log("getFilePreview ERROR", error);
    }
  }
}

const serviceObj = new Service();

export default serviceObj;
