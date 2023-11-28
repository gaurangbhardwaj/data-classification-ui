export function processData(data, status) {
  const userMap = {};

  let filteredData = data;
  if (status) filteredData = data.filter((item) => item?.status === status);
  filteredData.forEach((item) => {
    const userId = item.userId;
    const createdAt = new Date(item.createdAt).toLocaleDateString("en-GB"); // Format date as "dd-mm-yyyy"

    if (!userMap[userId]) {
      userMap[userId] = { id: userId, data: [] };
    }

    const userData = userMap[userId].data;
    const existingDate = userData.find((entry) => entry.x === createdAt);

    if (existingDate) {
      existingDate.y += 1;
    } else {
      userData.push({ x: createdAt, y: 1 });
    }
  });

  // Convert the userMap values to an array
  const result = Object.values(userMap);

  // Sort the result by userId
  result.sort((a, b) => a.id.localeCompare(b.id));

  return result;
}
