import { IonAvatar, IonIcon, IonImg, IonItem, IonLabel } from "@ionic/react";
import { heartCircle } from "ionicons/icons";

interface Props {
  id: number;
  image: string;
  name: string;
  handleRemoveFromFavoritesClick: (id: number) => Promise<void>;
}

const Favorite = ({
  id,
  image,
  name,
  handleRemoveFromFavoritesClick,
}: Props) => {
  return (
    <IonItem>
      <IonAvatar slot="start" className="modal__avatar">
        <IonImg src={image} />
      </IonAvatar>
      <IonLabel className="modal__label">
        <h2>{name}</h2>
        <IonIcon
          icon={heartCircle}
          color="primary"
          size="large"
          onClick={() => handleRemoveFromFavoritesClick(id)}
        ></IonIcon>
      </IonLabel>
    </IonItem>
  );
};

export default Favorite;
