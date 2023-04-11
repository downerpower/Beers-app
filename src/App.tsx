import { Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRouterOutlet,
  IonToast,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import "@ionic/react/css/core.css";

import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./theme/variables.css";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect, useState } from "react";
import { fetchBeerData } from "./store/beer-actions";
import Header from "./components/Header";
import BeerCard from "./components/BeerCard";
import BeerDetail from "./components/BeerDetail";
import FavoritesModal from "./components/FavoritesModal";
import { MAXIMUM_PAGES } from "./shared/constants";

setupIonicReact();

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pageNum, setPageNume] = useState(1);

  const beers = useAppSelector((state) => state.beers.beers);
  const error = useAppSelector((state) => state.beers.errorMessage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBeerData(pageNum));
    setPageNume((prevNum) => prevNum + 1);
  }, []);

  const loadBeers = (event: any) => {
    if (pageNum > MAXIMUM_PAGES) {
      event.target.disabled = true;
      return;
    }
    setTimeout(() => {
      setPageNume((prevNum) => prevNum + 1);
      dispatch(fetchBeerData(pageNum));
      event.target.complete();
    }, 500);
  };

  return (
    <IonApp>
      <IonToast
        color="primary"
        isOpen={!!error}
        message={error}
        duration={3000}
        className="toast"
      ></IonToast>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <>
              <FavoritesModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              />
              <Header setModalOpen={setModalOpen} />
              <IonContent>
                {beers && (
                  <div className="beers">
                    {beers.map((beer) => (
                      <BeerCard
                        key={beer.id}
                        id={beer.id}
                        image={beer.image_url}
                        abv={beer.abv}
                      />
                    ))}
                  </div>
                )}

                <IonInfiniteScroll
                  threshold="5%"
                  onIonInfinite={(e) => {
                    loadBeers(e);
                  }}
                >
                  <IonInfiniteScrollContent
                    className="loading"
                    loadingText="loading..."
                  ></IonInfiniteScrollContent>
                </IonInfiniteScroll>
              </IonContent>
            </>
          </Route>
          <Route path="/favorites"></Route>
          <Route path={`/:id`}>
            <BeerDetail />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
