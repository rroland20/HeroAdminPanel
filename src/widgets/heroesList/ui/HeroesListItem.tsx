import { tHeroesList } from "../model/types";
import { eActiveFilterStatus } from "../../heroesFilters/model/types";

const HeroesListItem = ({name, description, element, onDelete} : tHeroesList) => {

    let elementClassName: string;

    switch (element) {
        case eActiveFilterStatus.Fire:
            elementClassName = 'bg-danger bg-gradient';
            break;
        case eActiveFilterStatus.Water:
            elementClassName = 'bg-primary bg-gradient';
            break;
        case eActiveFilterStatus.Wind:
            elementClassName = 'bg-success bg-gradient';
            break;
        case eActiveFilterStatus.Earth:
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return (
        <li 
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-a-hat_52683-34829.jpg?w=740&t=st=1706457924~exp=1706458524~hmac=71c6fb538a8a0ce6a0e7a4e52e9f5a069bdfac60dc36dec1548ce5bccf4f22c3" 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover'}}/>
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button onClick={onDelete} type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
}

export default HeroesListItem;