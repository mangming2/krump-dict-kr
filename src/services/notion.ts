import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notionSecretKey = import.meta.env.VITE_NOTION_SECRET_KEY;
const notionTableId = import.meta.env.VITE_NOTION_TABLE_ID;

const notion = new Client({
  auth: notionSecretKey,
});

export const fetchDictTable = async () => {
  const data = await notion.databases.query({
    database_id: notionTableId,
  });
  return data.results as DatabaseObjectResponse[];
};
