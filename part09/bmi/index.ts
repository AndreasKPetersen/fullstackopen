import express from "express"
import calculateBmi from "./bmiCalculator"
const app = express()

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!")
})

app.get("/bmi", (req, res) => {
  const weight: number = Number(req.query.weight)
  const height: number = Number(req.query.height)
  const bmi: string = calculateBmi(height, weight)
  res.send({ weight: weight, height: height, bmi: bmi })
})

const PORT = 3011

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
