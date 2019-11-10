export async function handleResponse(response) {
  console.log(response.statusText)
  if (response.statusText === "OK") return response.data;
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  if (error.response.status === 401) {
    window.location = "/";
    localStorage.clear();
  }
  console.error("API call failed. " + error);
  throw error;
}
