import { useParams } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import {
  heartCircleOutline,
  arrowBackOutline,
  heartCircle,
} from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { fetchBeerDetail } from "../store/beer-actions";
import { useStorage } from "../hooks/useStorage";

type Props = {};

const BeerDetail = (props: Props) => {
  const beerDetail = useAppSelector((state) => state.beers.beer);
  const error = useAppSelector((state) => state.beers.singleBeerErrorMessage);

  const { favoriteBeers, addToFavorites, removeFromFavorites } = useStorage();

  const isBeerInFavorites = (id: number) =>
    favoriteBeers.some((item) => item.id === id);

  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const handleAddToFavoritesClick = async () => {
    await addToFavorites(beerDetail);
  };

  const handleRemoveFromFavoritesClick = async () => {
    await removeFromFavorites(beerDetail.id);
  };

  useEffect(() => {
    dispatch(fetchBeerDetail(id));
  }, [id]);

  return (
    <>
      <IonToast
        color="primary"
        isOpen={!!error}
        message={error}
        duration={3000}
        className="toast"
      ></IonToast>
      {!error && (
        <IonCard color="light" className="card-detail">
          {beerDetail.id === +id ? (
            <>
              <div className="card-detail__picture">
                <IonItem routerLink="/" color="none" lines="none">
                  <IonIcon icon={arrowBackOutline} size="large"></IonIcon>
                </IonItem>
                <img src={beerDetail.image_url} alt="beer" />
              </div>
              <IonCardHeader className="card-detail__header">
                <IonCardTitle className="card-detail__title">
                  {beerDetail.name}
                </IonCardTitle>
                {!isBeerInFavorites(beerDetail.id) ? (
                  <IonIcon
                    icon={heartCircleOutline}
                    color="primary"
                    size="large"
                    onClick={handleAddToFavoritesClick}
                  ></IonIcon>
                ) : (
                  <IonIcon
                    icon={heartCircle}
                    color="primary"
                    size="large"
                    onClick={handleRemoveFromFavoritesClick}
                  ></IonIcon>
                )}
              </IonCardHeader>
              <IonCardContent className="card-detail__content">
                {beerDetail.description}
                <div className="card-detail__chips">
                  {beerDetail.tagline
                    .replace(".", "")
                    .split(" ")
                    .map((tag, i) => (
                      <IonChip key={i} color="primary">
                        {tag}
                      </IonChip>
                    ))}
                </div>
              </IonCardContent>
            </>
          ) : (
            <IonSpinner name="bubbles" color="secondary"></IonSpinner>
          )}
        </IonCard>
      )}
    </>
  );
};

export default BeerDetail;
