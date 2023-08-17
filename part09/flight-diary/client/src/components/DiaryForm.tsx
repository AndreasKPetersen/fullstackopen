import { SyntheticEvent, useState } from "react";
import diaryService from "../services/diaryService";
import { Visibility, Weather } from "../types";

const DiaryForm = () => {
  const [date, setDate] = useState("2000-01-01");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState("");

  const addDiary = async (event: SyntheticEvent) => {
    event.preventDefault();

    await diaryService.createDiary({
      date,
      visibility,
      weather,
      comment,
    });

    setDate("");
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            id="start"
            name="trip-start"
            min="0000-01-01"
            max="2999-12-31"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility Great{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Great)}
            checked={visibility === Visibility.Great}
          />
          Good{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Good)}
            checked={visibility === Visibility.Good}
          />
          Ok{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Ok)}
            checked={visibility === Visibility.Ok}
          />
          Poor{" "}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Poor)}
            checked={visibility === Visibility.Poor}
          />
        </div>
        <div>
          weather Sunny{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Sunny)}
            checked={weather === Weather.Sunny}
          />
          Rainy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Rainy)}
            checked={weather === Weather.Rainy}
          />
          Cloudy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Cloudy)}
            checked={weather === Weather.Cloudy}
          />
          Stormy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Stormy)}
            checked={weather === Weather.Stormy}
          />
          Windy{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Windy)}
            checked={weather === Weather.Windy}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
