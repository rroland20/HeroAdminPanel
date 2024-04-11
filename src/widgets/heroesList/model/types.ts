export type HeroesListType = {
    id?: string;
    name: string;
    description: string;
    element: string;
    onDelete?: () => void;
};