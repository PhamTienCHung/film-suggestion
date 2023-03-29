import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFilms } from "../../services/filmAPI";
import { Form } from "./components/form";
import { ListFilm } from "./components/listFilm";
import { fetchDataAsync, setFilms } from "./store/filmSlice";

export function Film() {
    const dispatch = useDispatch();
    dispatch(fetchDataAsync());
    return (
        <div>
            <Form></Form>
            <ListFilm></ListFilm>
        </div>
    )
}