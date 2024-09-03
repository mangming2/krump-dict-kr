import axios from "axios";

const baseUrl = `https://api.notion.com/v1/databases/${
  import.meta.env.VITE_NOTION_TABLE_ID
}/query`;

export const fetchDictTable = async () => {
  try {
    const { data } = await axios.post(
      baseUrl,
      {
        sort: {
          direction: "descending",
          timestamp: "last_edited_time",
        },
      },
      {
        // 수정된 부분: headers를 두 번째 인자로 이동
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_NOTION_SECRET_KEY}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("fetchDictTable error", error);
  }
};
