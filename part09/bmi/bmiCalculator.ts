const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height * 0.01) ** 2

  if (bmi < 18.5) {
    return "Underweight (unhealthy weight)"
  } else if (bmi < 25) {
    return "Normal (healthy weight)"
  } else if (bmi < 30) {
    return "Overweight (unhealthy weight)"
  } else if (bmi < 30) {
    return "Obese (unhealthy weight)"
  } else {
    return "Extremely obese (unhealthy weight)"
  }
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])
console.log(calculateBmi(height, weight))

// console.log(calculateBmi(180, 74)) // should print Normal (healthy weight)
