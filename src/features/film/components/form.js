import { useDispatch } from "react-redux"
import { setGenres, setIsDoSearch, setShowing } from "../store/filmSlice";

export function Form() {
    const dispatch = useDispatch();

    function submit(e) {
        e.preventDefault();
        dispatch(setIsDoSearch(true))
    }
    
    function genresChange(e) {
        dispatch(setGenres(e.target.value));
        dispatch(setIsDoSearch(false))
    }
    function showChange(e) {
        dispatch(setShowing(e.target.value));
        dispatch(setIsDoSearch(false))
    }
    return (
        <form onSubmit={submit}>
            <label>genres: </label>
            <input onChange={genresChange}></input>
            <br></br>
            <label>showing: </label>
            <input onChange={showChange}></input>
            <br></br>
            <button type="submit">search</button>
        </form>
    )
}