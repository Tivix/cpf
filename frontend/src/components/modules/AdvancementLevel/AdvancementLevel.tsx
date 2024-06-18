'use client';
import { AdvancementLevelProps } from './AdvancemetLevel.interface';
import { ChevronRightIcon } from "@app/static/icons/ChevronRightIcon";
import { useState } from 'react';
import { AccordionCard } from '@app/components/common/AccordionCard';
import { AccordionList } from '@app/components/common/AccordionList';
import { Modal } from '@app/components/common/Modal';

export const AdvancementLevel: React.FC<AdvancementLevelProps> = ({ data, showVerticalLine }) => {
  const { advancementLevel, description, categories, projects } = data;
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const shouldBeExpandedByDefault = Object.keys(categories).length === 1;

  const toggleOpen = () => setOpen((prevState) => !prevState);

  const openModal = () => setModalOpen(true);

  const hideModal = () => setModalOpen(false);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center relative">
        <div
          className="mt-4 mb-2 bg-blue-800 rounded-full w-6 h-6 flex items-center justify-center hover:opacity-50"
          onClick={toggleOpen}
        >
          <ChevronRightIcon className={`text-white w-3.5 h-3.5 ${!open ? 'rotate-90' : '-rotate-90'}`} />
        </div>
        {showVerticalLine && (
          <div className="w-[1.5px] bg-blue-800 absolute top-12 left-3 h-[calc(100%-40px)]" />
        )}
      </div>
      <div
        className={`p-4 ml-2 flex flex-col gap-4 mb-4 w-full rounded-lg ${!open && 'hover:bg-navy-50'}`}
        onClick={open ? undefined : toggleOpen}
      >
        <h3>Advancement level {advancementLevel}</h3>
        <p className="text-base text-navy-600 tracking-wide">{description}</p>
        {open && (
          <>
            {projects.length > 0 && (
              <button
                className="text-blue-800 text-sm hover:text-blue-900 hover:underline hover:underline-offset-4 font-semibold w-fit"
                onClick={openModal}
              >
                An example way to pass level
              </button>
            )}
            {Object.entries(categories).map(([category, skills]) => (
              <AccordionCard
                key={category}
                className="w-full"
                title={category}
                expandedByDefault={shouldBeExpandedByDefault}
              >
                <AccordionList
                  items={skills.map(({ name, description }) => ({
                    key: name,
                    title: name,
                    children: description ? <p>{description}</p> : undefined,
                  }))}
                />
              </AccordionCard>
            ))}
          </>
        )}
      </div>
      <Modal open={isModalOpen} onClose={hideModal} title="An example way to pass level">
        {projects.map(({ title, overview }) => (
          <div key={title} className="text-navy-600 text-base">
            <p>{title}</p>
            <div className="mt-5">
              <p className="font-semibold">Project overview:</p>
              <p>{overview}</p>
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
};
