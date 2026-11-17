import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { LayerContext } from '../../../contexts/layer/layerContext';
import { IEmployeeShift } from '../../../utils/api.interfaces';
import { EmployeeShiftCard } from '../../cards/employee-shift-card/employee-shift-card';

import styles from './employee-shift-list.module.css';

interface IProps {
  employeeShifts: IEmployeeShift[];
  focusId?: string | null; // id новой записи — к ней доезжаем после добавления
}

export const EmployeeShiftList = ({ employeeShifts, focusId }: IProps) => {
  const {
    setSelectedId,
    setIsOverlayOpen,
    setIsEmployeeShiftEditOpen,
    setIsEmployeeShiftDeleteOpen,
  } = useContext(LayerContext);

  const scrollerRef = useRef<HTMLDivElement>(null);

  // индекс активной карточки — им подсвечивается точка
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!focusId) return;
    const index = employeeShifts.findIndex((es) => es.id === focusId);

    if (index >= 0) {
      goTo(index);
    }
  }, [focusId, employeeShifts]);

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

  const handleEditClick = (id: string) => {
    setSelectedId(id);
    setIsOverlayOpen(true);
    setIsEmployeeShiftEditOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsOverlayOpen(true);
    setIsEmployeeShiftDeleteOpen(true);
  };

  return (
    <section className={styles.list}>
      {/* Лента: свайпы + нативный снап-доводчик */}
      <div
        className={styles.scroller}
        ref={scrollerRef}
        onScroll={handleScroll}
      >
        {employeeShifts.map((employeeShift, i) => (
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
            key={employeeShift.id}
          >
            <EmployeeShiftCard
              employeeShift={employeeShift}
              onClick={() => handleEditClick(employeeShift.id)}
              onDelete={() => handleDeleteClick(employeeShift.id)}
            />
          </div>
        ))}
      </div>

      {/* Точки: серые, активная — больше и ярче */}
      <div className={styles.dots}>
        {employeeShifts.map((employeeShift, i) => (
          <button
            key={employeeShift.id}
            type='button'
            className={clsx(styles.dot, i === activeIndex && styles.activeDot)}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
};
