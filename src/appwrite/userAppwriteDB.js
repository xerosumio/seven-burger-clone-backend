import { userAppwrite } from "../appwrite/userAppwrite.js";
import { Permission, Role } from "appwrite";
export const userAppwriteDB = () => {
  const { database, CONFIG, ID, storage } = userAppwrite();
  //以下是对数据进行处理
  const doCreateDocument = async (itemData, userId) => {
    try {
      const data = await database.createDocument(
        CONFIG.DATABASE_ID,
        CONFIG.COLLECTION_ID,
        ID.unique(),
        { ...itemData },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );
      await doListDocument();
      return data;
    } catch (e) {
      return e;
    }
  };
  const doListDocument = async () => {
    try {
      const data = await database.listDocuments(
        CONFIG.DATABASE_ID,
        CONFIG.COLLECTION_ID
      );
      return data;
    } catch (e) {
      return e;
    }
  };
  const doUpdateDocument = async (DOCUMENT_ID, documentData) => {
    try {
      const data = await database.updateDocument(
        CONFIG.DATABASE_ID,
        CONFIG.COLLECTION_ID,
        DOCUMENT_ID,
        documentData
      );
      return data;
    } catch (e) {
      return e;
    }
  };
  const doDeleteDocument = async (DOCUMENT_ID) => {
    try {
      const data = await database.deleteDocument(
        CONFIG.DATABASE_ID,
        CONFIG.COLLECTION_ID,
        DOCUMENT_ID
      );
      return data;
    } catch (e) {
      return e;
    }
  };
  //以下是对文件进行处理
  const doListFiles = async () => {
    try {
      const data = await storage.listFiles(import.meta.env.VITE_BUCKET_ID);
      return data;
    } catch (e) {
      return e;
    }
  };
  const doGetFilePreview = async (fileID) => {
    try {
      const data = await storage.getFilePreview(
        import.meta.env.VITE_BUCKET_ID,
        fileID
      );
      return data;
    } catch (e) {
      return e;
    }
  };
  const doCreateFile = async (file) => {
    try {
      const data = await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,
        ID.unique(),
        file
      );
      return data;
    } catch (e) {
      return e;
    }
  };
  const doDeleteFile = async (file) => {
    try {
      const data = await storage.deleteFile(
        import.meta.env.VITE_BUCKET_ID,
        file
      );
      return data;
    } catch (e) {
      return e;
    }
  };
  const doUpdateFile = async (file, fileData) => {
    try {
      const data = await storage.updateFile(
        import.meta.env.VITE_BUCKET_ID,
        file,
        fileData
      );
      return data;
    } catch (e) {
      return e;
    }
  };
  return {
    doCreateDocument,
    doListDocument,
    doUpdateDocument,
    doDeleteDocument,
    doListFiles,
    doGetFilePreview,
    doCreateFile,
    doDeleteFile,
    doUpdateFile,
  };
};
