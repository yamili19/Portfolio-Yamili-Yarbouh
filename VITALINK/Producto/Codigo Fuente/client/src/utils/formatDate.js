export const formatDate = (dateStr) => {
  // Asumiendo que dateStr es en formato YYYY-MM-DD
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};
