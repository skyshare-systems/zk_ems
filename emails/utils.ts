export const chunkArray = <T,>(array: T[], size: number) => {
  if (size <= 0 || array.length === 0) {
    throw new Error("Size must be greater than 0");
  }

  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size),
  );
};