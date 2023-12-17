import create from 'zustand';

interface FilterJSON {
  arrayResult: any[];
  useNoFilters: () => void;
  useFilterLastToFirst: () => void;
  useFilterFirstsNumbers: (firstsNumberOfItems: number) => void;
  useFilterLastsNumbers: (lastsNumberOfItems: number) => void;
  useFilterFirstsAndLastsNumbers: () => void;
  useFilterNoContent: () => void;
}

export const useFiltserJSON = create<FilterJSON>((set) => {

  return {

    arrayResult: JSON.parse(localStorage.getItem("ArrayResult") || "[]"),

    useNoFilters: () => {
      set({
        arrayResult: JSON.parse(localStorage.getItem("ArrayResult") || "[]"),
      });
    },

    useFilterLastToFirst: () => {
      set((state) => ({
        arrayResult: state.arrayResult.slice().reverse(),
      }));
    },

    useFilterFirstsNumbers: (firstsNumberOfItems: number) => {
      set((state) => ({
        arrayResult: state.arrayResult.slice(0, firstsNumberOfItems),
      }));
    },

    useFilterLastsNumbers: (lastsNumberOfItems: number) => {
      set((state) => ({
        arrayResult: state.arrayResult.slice(-lastsNumberOfItems),
      }));
    },

    useFilterFirstsAndLastsNumbers: () => {
      set((state) => ({
        arrayResult: [
          ...state.arrayResult.slice(0, 5),
          ...state.arrayResult.slice(-5),
        ],
      }));
    },

    useFilterNoContent: () => {
      set((state) => ({
        arrayResult: state.arrayResult.filter(item => item.src !== '' || item.link !== ''),
      }));
    },
  
  };

});