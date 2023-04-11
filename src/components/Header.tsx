import { IonHeader, IonIcon, IonItem, IonToolbar } from "@ionic/react";
import { heart } from "ionicons/icons";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setModalOpen }: Props) => {
  const handleFavoritesClick = () => {
    setModalOpen((prevValue) => !prevValue);
  };

  return (
    <IonHeader className="ion-no-border header">
      <IonToolbar color="primary header__toolbar">
        <img src="./logo.svg" alt="logo" className="logo ion-margin" />
        <IonIcon
          slot="end"
          icon={heart}
          size="large"
          color="light"
          className="ion-margin"
          onClick={handleFavoritesClick}
        ></IonIcon>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
