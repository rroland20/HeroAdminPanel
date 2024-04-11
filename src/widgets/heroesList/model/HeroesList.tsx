import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../../shared/api/apiSlice';
import HeroesListItem from "../ui/HeroesListItem";
import Spinner from '../../spinner/ui/Spinner';
import { iFiltersState, eActiveFilterStatus } from '../../heroesFilters/model/types';
import { tHeroesList } from './types';

import './heroesList.scss';

const HeroesList = () => {

    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery({});

    const activeFilter = useSelector((state: { filters: iFiltersState }) => state.filters.activeFilter);
    
    const [deleteHero] = useDeleteHeroMutation();

    const filteredHeroes = useMemo (() => {
        return activeFilter === eActiveFilterStatus.All ? heroes.slice() 
                    : heroes.filter((item: tHeroesList) => item.element === activeFilter);
        // eslint-disable-next-line
    }, [heroes, activeFilter]);

    const onDelete = useCallback((id : string) => {
        deleteHero(id);        
        // eslint-disable-next-line
    }, []);


    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr : tHeroesList[]) => {
        if (!arr.length) {
            return <CSSTransition 
                        timeout={0}
                        classNames="hero">
                        <h5 className="text-center mt-5">Героев пока нет</h5>
                    </CSSTransition>
        }

        return arr.map(({id, ...props}: tHeroesList) => {
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