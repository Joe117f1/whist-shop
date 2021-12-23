export const sendDataToServer = async (productDetails, url) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(productDetails),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong..');
  }
};