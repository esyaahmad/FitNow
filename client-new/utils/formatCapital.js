export const formatCapital = (input) => {
  const arrayInput = input.split(" ");
  const arrayOutput = arrayInput.map((el) => {
    return el.charAt(0).toUpperCase() + el?.slice(1).toLowerCase();
  });
  return arrayOutput.join(" ");
};
