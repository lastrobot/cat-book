export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    const error = await response.json();
    throw error;
  }
  throw new Error("Network response was not ok.");
}
