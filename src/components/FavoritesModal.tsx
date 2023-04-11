import {
  IonButton,
  IonContent,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Favorite from "./Favorite";
import { useStorage } from "../hooks/useStorage";

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FavoritesModal = ({ modalOpen, setModalOpen }: Props) => {
  const { favoriteBeers, removeFromFavorites } = useStorage();

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleRemoveFromFavoritesClick = async (id: number) => {
    await removeFromFavorites(id);
  };

  return (
    <IonModal id="example-modal" isOpen={modalOpen} className="modal">
      <IonContent>
        <IonToolbar>
          <IonTitle className="modal__title">Favorites</IonTitle>
          <IonButton slot="end" onClick={closeModal}>
            Close
          </IonButton>
        </IonToolbar>
        <IonList>
          {favoriteBeers.length === 0 ? (
            <p className="ion-text-center modal__empty">
              Find beers you like and add them to this list!
            </p>
          ) : (
            favoriteBeers.map((favorite) => (
              <Favorite
                key={favorite.id}
                id={favorite.id}
                image={favorite.image_url}
                name={favorite.name}
                handleRemoveFromFavoritesClick={handleRemoveFromFavoritesClick}
              />
            ))
          )}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default FavoritesModal;
