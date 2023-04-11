import { Dispatch } from 'redux';
import { getBeers, getBeersFailure, getSingleBeer, getSingleBeerFailure } from './beer-slice';
import { Beer } from '../shared/types';
import { HOST } from '../shared/constants';

export const fetchBeerData = (pageNum: number) => {
   return async (dispatch: Dispatch) => {
      const fetchData = async () => {
         const res = await fetch(`${HOST}/v2/beers?page=${pageNum}&per_page=5`)
         if (!res.ok) {
            throw new Error('Could not fetch data!');
         }
         const data = await res.json();

         return data;
      }

      try {
         const rawData = await fetchData();
         const beerData = rawData
            .map(({ abv, description, food_pairing, id, image_url, name, tagline }: Beer) => {
               return { abv, description, food_pairing, id, image_url, name, tagline }
            })
         dispatch(getBeers(beerData || []))
      } catch (err: any) {
         dispatch(getBeersFailure(err.message))
      }
   }
}

export const fetchBeerDetail = (id: string) => {
   return async (dispatch: Dispatch) => {
      const fetchDetailData = async () => {
         const res = await fetch(`${HOST}/v2/beers/${id}`)
         if (!res.ok) {
            throw new Error('Could not fetch data!');
         }
         const data = await res.json();

         return data;
      }

      try {
         const beerDetailData = await fetchDetailData();
         dispatch(getSingleBeer(beerDetailData || {}))
      } catch (err: any) {
         dispatch(getSingleBeerFailure(err.message))
      }
   }
}