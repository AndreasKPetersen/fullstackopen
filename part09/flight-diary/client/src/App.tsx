import { useEffect, useState } from "react";
import { Diary } from "./types";
import axios from "axios";
import { apiBaseUrl } from "./constants";
import diaryService from "./services/diaryService";
import Diaries from "./components/Diaries";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/diaries`);

    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAllDiaries();
      setDiaries(diaries);
    };

    void fetchDiaryList();
  }, []);

  return (
    <div>
      <DiaryForm />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
