import { createClient } from "@supabase/supabase-js";

interface SupaBaseProps {
  type?: string;
  id?: number;
}

export const useSupaBase = ({ type, id }: SupaBaseProps) => {
  const supabaseURl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseURl, supabaseKey);

  //전체 테이블 데이터를 가져오는 함수
  const getAllKrumpWords = async () => {
    const { data, error } = await supabase.from("krumpdicttable").select();
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    return data;
  };

  //전체 테이블에서 type이 props로 받은 type인 데이터를 가져오는 함수
  const getKrumpWords = async () => {
    const { data, error } = await supabase
      .from("krumpdicttable")
      .select()
      .eq("type", type);
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    return data;
  };

  //전체 테이블에서 type이랑 id가 같은 데이터를 가져오는 함수
  const getKrumpWordDetail = async () => {
    const { data, error } = await supabase
      .from("krumpdicttable")
      .select()
      .eq("type", type)
      .eq("id", id);
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    return data;
  };

  const getChildrenWordsById = async (childId: number) => {
    const { data, error } = await supabase
      .from("krumpdicttable")
      .select()
      .eq("type", type)
      .eq("id", childId);
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    return data;
  };

  return {
    getKrumpWords,
    getAllKrumpWords,
    getKrumpWordDetail,
    getChildrenWordsById,
  };
};
