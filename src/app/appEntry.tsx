import HeroesList from '../widgets/heroesList/model/HeroesList';
import HeroesAddForm from '../widgets/heroesAddForm/HeroesAddForm.tsx';
import HeroesFilters from '../widgets/heroesFilters/HeroesFilters';

import './app.scss';

const App = () => {
    
    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <div className="content__interactive">
                    <HeroesAddForm/>
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;