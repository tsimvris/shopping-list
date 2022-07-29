export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function loadFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error.message);
  }
}
