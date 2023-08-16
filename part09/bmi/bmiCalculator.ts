const calculateBmi = (height: number, weight: number): string => {
  if (!height || !weight) {
    return "Please enter height and weight to get bmi";
  }

  const bmi = weight / (height * 0.01) ** 2;

  if (bmi < 18.5) {
    return "Underweight (unhealthy weight)";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight (unhealthy weight)";
  } else if (bmi < 35) {
    return "Obese (unhealthy weight)";
  } else {
    return "Extremely obese (unhealthy weight)";
  }
};

export default calculateBmi;
