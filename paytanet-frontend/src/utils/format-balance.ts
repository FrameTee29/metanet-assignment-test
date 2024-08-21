export const formatBalance = (
  value: number,
  maximumFractionDigits: number = 2,
  minimumFractionDigits: number = 2
) => {
  return value.toLocaleString('th-TH', {
    maximumFractionDigits,
    minimumFractionDigits
  })
}

export const numberToMonetary = (amount: number) => {
  return amount?.toLocaleString('th', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
