import { useCallback, useContext, useRef, useState } from 'react';

import clsx from 'clsx';

import { IHomeTeam } from '../../../utils/api.interfaces';

import { TeamCard } from '../../cards/team-card/team-card';
import { LayerContext } from '../../../contexts/layer/layerContext';

import styles from './team-list.module.css';
import { useNavigate } from 'react-router-dom';

interface IProps {
  list: IHomeTeam[];
}

export const TeamList = ({ list }: IProps) => {
  const { setSelectedId } = useContext(LayerContext);

  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement>(null);

  // индекс активной карточки — им подсвечивается точка
  const [activeIndex, setActiveIndex] = useState(0);

  // Активной считаем карточку, чей центр ближе всего к центру ленты.
  // offsetLeft слайдов учитывает боковые отступы, поэтому формула
  // работает и для первой, и для последней карточки.
  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const center = el.scrollLeft + el.clientWidth / 2;
    let index = 0;
    let minDiff = Number.POSITIVE_INFINITY;

    Array.from(el.children).forEach((child, i) => {
      const slide = child as HTMLElement;
      const diff = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);

      if (diff < minDiff) {
        minDiff = diff;
        index = i;
      }
    });

    setActiveIndex(index);
  }, []);

  // Плавная прокрутка к карточке по клику на точку:
  // выравниваем центр слайда с центром видимой области
  const goTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    const slide = el.children[index] as HTMLElement;
    el.scrollTo({
      left: slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2,
      behavior: 'smooth',
    });
  };

  const handleClick = (teamId: string) => {
    setSelectedId(teamId);
    navigate(`/home/${teamId}`);
  };

  return (
    <section className={styles.list}>
      {/* Лента: свайпы + нативный снап-доводчик */}
      <div
        className={styles.scroller}
        ref={scrollerRef}
        onScroll={handleScroll}
      >
        {list.map((item, i) => (
          // Слайд — точка прилипания снапа. Карточку внутри не трогаем:
          // её ширина 370px задаёт ширину слайда сама
          <div
            className={clsx(
              styles.slide,
              i === activeIndex && styles.activeSlide,
            )}
            onClick={(e) => {
              // Клик по кнопке внутри карточки (редактировать/удалить)
              // обрабатывают сами кнопки — до прокрутки не доходим
              if ((e.target as HTMLElement).closest('button')) return;

              // Клик по торчащему краю боковой карточки —
              // плавно доезжаем до неё с центрированием
              goTo(i);
            }}
            key={item.id}
          >
            <TeamCard team={item} onClick={() => handleClick(item.id)} />
          </div>
        ))}
      </div>

      {/* Точки: серые, активная — больше и ярче */}
      <div className={styles.dots}>
        {list.map((item, i) => (
          <button
            key={item.id}
            type='button'
            className={clsx(styles.dot, i === activeIndex && styles.activeDot)}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
};
