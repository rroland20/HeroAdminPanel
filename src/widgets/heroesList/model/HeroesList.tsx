import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../../shared/api/apiSlice';
import HeroesListItem from "../ui/HeroesListItem";
import Spinner from '../../spinner/ui/Spinner';
import { FiltersState, ActiveFilterStatus } from '../../heroesFilters/model/types';
import { HeroesListType } from './types';

import './heroesList.scss';

const HeroesList = () => {

    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery({});

    const activeFilter = useSelector((state: { filters: FiltersState }) => state.filters.activeFilter);
    
    const [deleteHero] = useDeleteHeroMutation();

    const filteredHeroes = useMemo (() => {
        const filteredHeroes = heroes.slice()
        if (activeFilter === ActiveFilterStatus.All) {
            return filteredHeroes;
        }
        else {
            return filteredHeroes.filter((item: HeroesListType) => item.element === activeFilter ? item : null)
        }
        // eslint-disable-next-line
    }, [heroes, activeFilter])

    const onDelete = useCallback((id : string) => {
        deleteHero(id);        
        // eslint-disable-next-line
    }, []);


    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr : HeroesListType[]) => {
        if (!arr.length) {
            return <CSSTransition 
                        timeout={0}
                        classNames="hero">
                        <h5 className="text-center mt-5">Героев пока нет</h5>
                    </CSSTransition>
        }

        return arr.map(({id, ...props}: HeroesListType) => {
            return <CSSTransition 
                        key={id}
                        timeout={500}
                        classNames="hero">
                        <HeroesListItem {...props} onDelete={() => id && onDelete(id)}/>
                    </CSSTransition>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;