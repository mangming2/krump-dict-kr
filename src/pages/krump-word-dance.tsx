import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import LoadingPage from "./loading-page";

const KrumpWordDancePage = () => {
  const supabaseURl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseURl, supabaseKey);

  const [krumpWords, setKrumpWords] = useState([]);

  async function getKrumpWords() {
    const { data, error } = await supabase.from("krumpwordstable").select();
    if (error) {
      console.error(error);
      return;
    }
    setKrumpWords(data);
  }
  useEffect(() => {
    getKrumpWords();
  }, []);

  if (krumpWords.length === 0) {
    return <LoadingPage />;
  }

  return (
    <div>
      <h1>Krump Word Dance</h1>
      <ul>
        {krumpWords.map((krumpWord) => (
          <li key={krumpWord.id}>{krumpWord.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default KrumpWordDancePage;
