import { IonCard, IonCardHeader, IonCardTitle, IonIcon } from "@ionic/react";
import { water } from "ionicons/icons";

interface Props {
  id: number;
  image: string;
  abv: number;
}

const BeerCard = ({ id, image, abv }: Props) => {
  return (
    <div className="card">
      <IonCard color="light" routerLink={`/${id}`} className="card__item">
        <div className="card__picture-wrapper">
          <img src={image} alt="beer" className="card__picture" />
        </div>
        <IonCardHeader className="card__header">
          <IonCardTitle className="ion-text-center card__title">
            <IonIcon
              className="ion-margin-right"
              size="large"
              icon={water}
            ></IonIcon>
            {abv}%
          </IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </div>
  );
};

export default BeerCard;
