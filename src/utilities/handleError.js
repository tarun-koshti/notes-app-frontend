export default function handleError(error) {
  try {
    return error.response.data.message;
  } catch (e) {
    return error.message;
  }
}
