import { IScanCard } from '../../../utils/api.interfaces';
import { ScanCard } from '../../cards/scan-card/scan-card';

import styles from './scan-card-list.module.css';

interface IScanCardListProps {
  cards: IScanCard[];
  onDelete: (id: string) => void;
}

export const ScanCardList = ({ cards, onDelete }: IScanCardListProps) => (
  <ul className={styles.cardList}>
    {cards.map((card, index) => (
      <li key={card.id} className={styles.cardItem}>
        <ScanCard
          index={cards.length - index}
          card={card}
          onDelete={() => onDelete(card.id)}
        />
      </li>
    ))}
  </ul>
);
