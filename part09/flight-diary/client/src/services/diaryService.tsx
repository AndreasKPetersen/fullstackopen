import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diary } from "../types";

const getAllDiaries = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);

  return data;
};

export default {
  getAllDiaries,
};
