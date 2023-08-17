import { useEffect, useState } from "react";
import { Diary } from "./types";
import axios from "axios";
import { apiBaseUrl } from "./constants";
import diaryService from "./services/diaryService";

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
      <h2>Diary entries</h2>
      {diaries.map((diary) => {
        return (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <div>visibility: {diary.visibility}</div>
            <div>weather: {diary.weather}</div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
