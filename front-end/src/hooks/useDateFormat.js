const useDateFormat = () => {
  const formatPlayDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return date.toLocaleString("tr-TR", options);
  };
  return { formatPlayDate };
};

export default useDateFormat;
