export const chunkArray = <T,>(array: T[], size: number) => {
  if (size <= 0 || array.length === 0) {
    throw new Error("Recent Posts, Articles, Services, Products, Upcoming Programs, and From The People should not be empty.");
  }

  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size),
  );
};