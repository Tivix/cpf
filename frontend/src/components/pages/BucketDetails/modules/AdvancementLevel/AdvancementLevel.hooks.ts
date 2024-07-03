import { useState } from 'react';
import { AdvancementLevelHooks } from './AdvancemetLevel.interface';

export const useAdvancementLevel = (): AdvancementLevelHooks => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleAccordionOpen = () => setAccordionOpen((prevState) => !prevState);

  const openModal = () => setModalOpen(true);

  const hideModal = () => setModalOpen(false);

  return {
    hideModal,
    openModal,
    toggleAccordionOpen,
    modalOpen,
    accordionOpen,
  };
};
