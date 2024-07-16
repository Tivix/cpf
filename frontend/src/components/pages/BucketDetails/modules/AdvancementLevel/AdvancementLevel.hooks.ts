import { useState } from 'react';

export const useAdvancementLevel = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const hideModal = () => setModalOpen(false);

  return {
    hideModal,
    openModal,
    modalOpen,
  };
};
