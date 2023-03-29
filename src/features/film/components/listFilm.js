import { useSelector } from "react-redux";
import { convertToHourDisplay } from "../../../app/core/util";
import { selectIsDoSearch, selectListFilmSuggest } from "../store/filmSlice";

export function ListFilm() {
    // const dispatch = useDispatch();
    const listFilmSuggest = useSelector(selectListFilmSuggest);
    const isDoSearch = useSelector(selectIsDoSearch);
    console.log('listFilmSuggest: ', listFilmSuggest);
    const list = (isDoSearch && listFilmSuggest && listFilmSuggest.length>0) ? listFilmSuggest.map((film) => {
        return (
            <li>
                <p>{film.name}, showings at {convertToHourDisplay(film.exactTime)}</p>
            </li>
        )
    }) : <p>no movie recommendations</p>
    return (
        <ul>
            {list}
        </ul>
    )
}