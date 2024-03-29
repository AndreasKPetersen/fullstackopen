import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diary, DiaryFormValues } from "../types";

const getAllDiaries = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);

  return data;
};

const createDiary = async (object: DiaryFormValues) => {
  const { data } = await axios.post<Diary>(`${apiBaseUrl}/diaries`, object);

  return data;
};

export default {
  getAllDiaries,
  createDiary,
};
