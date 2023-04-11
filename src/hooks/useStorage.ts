import { Drivers, Storage } from "@ionic/storage";
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { useEffect, useState } from "react";
import { Beer } from "../shared/types";
import { FAVORITE_BEERS_KEY } from "../shared/constants";

export const useStorage = () => {
   const [store, setStore] = useState<Storage>();
   const [favoriteBeers, setFavoriteBeers] = useState<Beer[]>([]);

   const initStorage = async () => {
      const newStore = new Storage({
         name: "beers_db",
         driverOrder: [CordovaSQLiteDriver._driver, Drivers.LocalStorage, Drivers.IndexedDB]
      });
      await newStore.defineDriver(CordovaSQLiteDriver);

      const store = await newStore.create();
      setStore(store);

      const storedBeers = JSON.parse(await store.get(FAVORITE_BEERS_KEY)) || [];
      setFavoriteBeers(storedBeers)
   };

   useEffect(() => {
      initStorage()
   }, [])

   const addToFavorites = async (beer: Beer) => {
      setFavoriteBeers([...favoriteBeers, beer])
      store?.set(FAVORITE_BEERS_KEY, JSON.stringify([...favoriteBeers, beer]));
   }

   const removeFromFavorites = async (id: number) => {
      (setFavoriteBeers(favoriteBeers.filter(beer => beer.id !== id)));
      store?.set(FAVORITE_BEERS_KEY, JSON.stringify(favoriteBeers.filter(beer => beer.id !== id)));
   }

   return { favoriteBeers, store, addToFavorites, removeFromFavorites }
}