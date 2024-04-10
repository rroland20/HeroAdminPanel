import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters, activeFilterChanged } from "../model/filtersSlice";
import Spinner from "../../spinner/ui/Spinner";
import classNames from "classnames";
import { ISomeState, Filters } from "../model/types";

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {filters, filtersLoadingStatus, activeFilter} = useSelector((state: { filters: ISomeState }) => state.filters);
    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />;
    }
    else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderFilteredHero = (arr : Filters[]) => {
        if (arr.length === 0)
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>

        return arr.map(({name, label, className}: Filters) => {
            const btnClass = classNames("btn", className, {
                'active': name === activeFilter
            })

            return <button className={btnClass}
                            key={name}
                            id={name}
                            onClick={() => dispatch(activeFilterChanged(name))}>{label}</button>
        })
    }

    const content = renderFilteredHero(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;