const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ?
                                    action.payload :
                                    action.payload.filter(item => item.element === state.activeFilter), 
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filtersLoadingStatus: 'idle',
                filters: action.payload,
                filteredHeroes: state.activeFilter === 'all' ?
                                    state.heroes :
                                    state.heroes.filter(item => item.element === state.activeFilter),
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'HEROES_ADD':
            const newHeroList = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes: state.activeFilter === 'all' ? newHeroList :
                                    newHeroList.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_DELETE':
            const newHeroes = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroes,
                filteredHeroes: state.activeFilter === 'all' ? newHeroes :
                    newHeroes.filter(item => item.element === state.activeFilter)
            }
        case 'FILTER_CHANGED':
            return {
                ...state,
                filteredHeroes: action.payload === 'all' ? 
                                    state.heroes :
                                    state.heroes.filter(item => item.element === action.payload),
                activeFilter: action.payload
            }
        default: return state
    }
}

export default reducer;