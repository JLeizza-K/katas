export function fizzBuzz(n: number) {
  let fizz = 0;
  let buzz = 0;

  if (n > 3) {
    fizz = n / 3;
    fizz = Math.floor(fizz);
  }
  if (n > 5) {
    buzz = n / 5;
    buzz = Math.floor(buzz);
  }
  return { fizz, buzz };
}
