export function generateOTP(length: number = 6): string {
  const min = Math.pow(10, length - 1); // e.g. 100000
  const max = Math.pow(10, length) - 1; // e.g. 999999
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}
