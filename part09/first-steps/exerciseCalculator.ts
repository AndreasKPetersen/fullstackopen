interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: number[],
  targetHours: number
): ExerciseResult => {
  const target = targetHours;
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(
    (exerciseHour) => exerciseHour > 0
  ).length;
  const average =
    exerciseHours.reduce((sum, exerciseHour) => sum + exerciseHour, 0) /
    periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = "bad";
  if (average >= target * 1.25) {
    rating = 3;
    ratingDescription = "excellent";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export default calculateExercises;
