import {useState} from "react";
import {AdvancementLevel} from "@app/types/common";
import {AdvancementLevelHooks} from "./AdvancemetLevel.interface";

export const useAdvancementLevel = (data: AdvancementLevel): AdvancementLevelHooks => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const shouldBeExpandedByDefault = Object.keys(data.categories).length === 1;

  const toggleAccordionOpen = () => setAccordionOpen((prevState) => !prevState);

  const openModal = () => setModalOpen(true);

  const hideModal = () => setModalOpen(false);

  return {
    hideModal,
    openModal,
    toggleAccordionOpen,
    modalOpen,
    accordionOpen,
    shouldBeExpandedByDefault,
  }
}