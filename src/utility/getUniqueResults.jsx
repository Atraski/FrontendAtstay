// Used in Search bar dropdown

// Function to get unique results by a specific key
const getUniqueResults = (results, key) => {
  const seen = new Set();
  return results.filter((item) => {
    const val = item[key].toLowerCase().trim();
    if (seen.has(val)) {
      return false;
    } else {
      seen.add(val); 
      return true;
    }
  });
};

export default getUniqueResults;
