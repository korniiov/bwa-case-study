const calculateTotalPages = (total: number = 0, perPage: number = 30) => {
  const totalItems = total > 1000 ? 1000 : total;

  return totalItems ? Math.ceil(totalItems / perPage) : 0;
};

export default calculateTotalPages;

