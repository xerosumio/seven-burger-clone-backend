import { Client, Account, ID, Databases, Storage } from "appwrite";
import { ref } from "vue";
const accountRef = ref();
const databaseRef = ref();
const storageRef = ref();
export const userAppwrite = () => {
  const client = new Client()
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT);
  accountRef.value = new Account(client);
  databaseRef.value = new Databases(client);
  storageRef.value = new Storage(client);
  return {
    account: accountRef.value,
    database: databaseRef.value,
    storage: storageRef.value,
    ID,
    CONFIG: {
      DATABASE_ID: import.meta.env.VITE_DATABASE_ID,
      COLLECTION_ID: import.meta.env.VITE_COLLECTION_ID,
    },
  };
};
