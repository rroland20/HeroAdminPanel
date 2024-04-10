import { MouseEventHandler } from 'react';

export type HeroesListType = {
    id?: string;
    name: string;
    description: string;
    element: string;
    onDelete?: MouseEventHandler<HTMLButtonElement>;
};