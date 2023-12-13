import create from "zustand";

interface DefaultState {
    dataDefault: { id: number; title: string; description: string; }[]
    useNoFilters: () => void;
    useFilterLastToFirst: () => void;
    useFilterFirstsNumbers: (firstsNumberOfItems: number) => void;
    useFilterLastsNumbers: (lastsNumberOfItems: number) => void;
    useFilterFirstsAndLastsNumbers: () => void;
};

const dataDefault: DefaultState["dataDefault"] = [
    { id: 1, title: "title", description: "description" },
    { id: 2, title: "title", description: "description" },
    { id: 3, title: "title", description: "description" },
    { id: 4, title: "title", description: "description" },
    { id: 5, title: "title", description: "description" },
    { id: 6, title: "title", description: "description" },
    { id: 7, title: "title", description: "description" },
    { id: 8, title: "title", description: "description" },
    { id: 9, title: "title", description: "description" },
    { id: 10, title: "title", description: "description" },
    { id: 11, title: "title", description: "description" },
    { id: 12, title: "title", description: "description" },
    { id: 13, title: "title", description: "description" },
    { id: 14, title: "title", description: "description" },
    { id: 15, title: "title", description: "description" },
    { id: 16, title: "title", description: "description" },
    { id: 17, title: "title", description: "description" },
    { id: 18, title: "title", description: "description" },
    { id: 19, title: "title", description: "description" },
    { id: 20, title: "title", description: "description" },
];

export const useDefault = create<DefaultState>((set) => ({

    dataDefault: dataDefault,

    useNoFilters: () => {
        set({
            dataDefault: [...dataDefault],
        });
    },

    useFilterLastToFirst: () => {
        set({
            dataDefault: [...dataDefault].reverse(),
        });
    },

    useFilterFirstsNumbers: (firstsNumberOfItems: number) => {
        set(() => ({
            dataDefault: [...dataDefault].slice(0, firstsNumberOfItems),
        }));
    },

    useFilterLastsNumbers: (lastsNumberOfItems: number) => {
        set(() => ({
            dataDefault: [...dataDefault].reverse().slice(0, lastsNumberOfItems),
        }));
    },

    useFilterFirstsAndLastsNumbers: () => {
        set({
            dataDefault: [...dataDefault.slice(0, 5), ...dataDefault.slice(-5)],
        });
    },

}));