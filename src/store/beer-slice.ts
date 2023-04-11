import { createSlice, current } from "@reduxjs/toolkit";
import { Beer } from "../shared/types";

interface InitialState {
   isLoading: boolean
   beers: Beer[]
   beer: Beer
   favorites: Beer[],
   errorMessage: string,
   singleBeerErrorMessage: string
}

const initialState: InitialState = {
   isLoading: false,
   beers: [],
   beer: {
      id: 0,
      image_url: '',
      abv: 0,
      name: '',
      food_pairing: [],
      description: '',
      tagline: ''
   },
   favorites: [],
   errorMessage: '',
   singleBeerErrorMessage: ''
}

export const beerSlice = createSlice({
   name: 'beers',
   initialState,
   reducers: {
      getBeers: (state, action) => {
         state.beers = [...state.beers, ...action.payload]
      },
      getBeersFailure: (state, action) => {
         state.errorMessage = action.payload
      },
      getSingleBeer: (state, action) => {
         state.beer = action.payload[0]
      },
      getSingleBeerFailure: (state, action) => {
         state.singleBeerErrorMessage = action.payload
      }
   }
})

export const { getBeers, getBeersFailure, getSingleBeerFailure, getSingleBeer } = beerSlice.actions;

export default beerSlice.reducer;