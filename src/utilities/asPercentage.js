/**
 *
 * @param {number} value
 */
export default function asPercentage(value) {
  return Number(value / 100).toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2
  });
}
