export const fetchData = async (startDate, endDate) => {
  const dateFilter = {
    ...(startDate ? { startDate } : {}),
    ...(endDate ? { endDate } : {}),
  };
  try {
    const response = await fetch(
      `https://data-classification.vercel.app/get-logs?${new URLSearchParams(
        dateFilter
      ).toString()}`
    );
    const data = await response.json();
    if (data.responseData && data.responseData.length && data.responseData[0])
      return data.responseData[0];
  } catch (error) {
    console.error("[fetchData] Error fetching data:", error);
  }
};
