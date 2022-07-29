import create from "zustand";

/*
fetchedData: { results: [] } was only set as default to prevent our map()
from mapping over an undefined array, while we are waiting 
for the fetchSomething() to be asynchronously completed
*/

const useStore = create((set) => ({
  fetchedData: { results: [] },
  fetchSomething: async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      set({ fetchedData: data });
    } catch (error) {
      console.error(`Upps das war ein Fehler: ${error}`);
    }
  },
}));

export default useStore;
