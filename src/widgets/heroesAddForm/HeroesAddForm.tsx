import { useState } from "react";
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";

import { useCreateHeroMutation } from "../../shared/api/apiSlice";
import { tFilterForHero, iFiltersState } from "../heroesFilters/model/types";
import { eFiltersStatus, eActiveFilterStatus } from "../heroesFilters/model/types";

const HeroesAddForm = () => {
    const [nameHero, setNameHero] = useState<string>();
    const [descrHero, setDescrHero] = useState<string>();
    const [elemHero, setElemHero] = useState<string>();

    const [createHero] = useCreateHeroMutation();
    
    const {filters, filtersLoadingStatus} = useSelector((state: { filters: iFiltersState }) => state.filters);

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: nameHero,
            description: descrHero,
            element: elemHero
        }

        createHero(newHero).unwrap();

        setNameHero('');
        setDescrHero('');
        setElemHero('');
        
    }

    const selectElement = (filters: Array<tFilterForHero>, status: string) => {
        if (status === eFiltersStatus.Loading) {
            return <option>Загрузка элементов</option>
        }
        else if (status === eFiltersStatus.Error) {
            return <option>Ошибка загрузки элементов</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, label}: tFilterForHero) => {
                // eslint-disable-next-line
                if (name === eActiveFilterStatus.All) return;

                return <option key={name} value={name}>{label}</option>;
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    placeholder="Как меня зовут?"
                    value={nameHero}
                    onChange={(e) => setNameHero(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={descrHero}
                    onChange={(e) => setDescrHero(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={elemHero}
                    onChange={(e) => setElemHero(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {selectElement(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;