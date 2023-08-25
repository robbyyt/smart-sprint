export const range = (size: number, startAt = 0): number[] => {
  const resultArray = [...Array.from(Array(size).keys())]
  if(!startAt) {
    return resultArray
  }
    return resultArray.map(i => i + startAt)
}