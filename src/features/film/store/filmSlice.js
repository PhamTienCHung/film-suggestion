import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDiffMinute } from '../../../app/core/util';
import { fetchFilms } from '../../../services/filmAPI';

const initialState = {
  listFilms: [],
  listFilmSuggest: [],
  genres: '',
  showing: '',
  isDoSearch: false
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchDataAsync = createAsyncThunk(
  'film/fetchFilm',
  async (state) => {
    const response = await fetchFilms();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setGenres: (state, payload) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.genres = payload;
    },
    setShowing: (state, payload) => {
      state.showing = payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFilms: (state, payload) => {
      state.listFilms.push(payload);
    },
    setIsDoSearch: (state, payload) => {
      state.isDoSearch = payload;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // .addCase(incrementAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        console.log('action: ', action);
        state.listFilms = action.payload;
      });
  },
});

export const { setGenres, setShowing, setFilms, setIsDoSearch } = filmSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectListFilms = (state) => state.film.listFilms;
export const selectInput = (state) => { return { genres: state.genres, showing: state.showing } };
export const selectIsDoSearch = (state) => state.film.isDoSearch;
// main logic
export const selectListFilmSuggest = (state) => {
  let listFilmSuggest = [];
  const genres = state.film.genres;
  const showing = state.film.showing;
  listFilmSuggest = state.film.listFilms.filter((ele) => {
    let isSuggestGenres = false;
    let isSuggestTime = false;
    if (ele.genres.includes(genres.payload)) {
      isSuggestGenres = true;
    }
    ele.showings.forEach(element => {
      console.log('diff minutes: ', getDiffMinute(showing, element));
      if (getDiffMinute(showing, element) >= 0 && getDiffMinute(showing, element) <= 30) {
        isSuggestTime = true;
        ele = { ...ele, exactTime: element };
      }
    });
    return (isSuggestGenres && isSuggestTime)
  })
  listFilmSuggest = listFilmSuggest.map((ele) => {
    ele.showings.forEach(element => {
      if (getDiffMinute(showing, element) >= 0 && getDiffMinute(showing, element) <= 30) {
        ele = { ...ele, exactTime: element };
      }
    });
    return ele
  })
  return listFilmSuggest
}

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default filmSlice.reducer;