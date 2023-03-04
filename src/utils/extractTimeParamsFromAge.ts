// e.g. "1 hour" -> units: 1, duration: "hours"
export const extractTimeParamsFromAge = (age: string) => ({
  units: Number(age.split('+')[0]),
  duration: `${age.split('+')[1]}s`
});
