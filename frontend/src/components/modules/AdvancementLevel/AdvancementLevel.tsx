'use client';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { AccordionCard } from '@app/components/common/AccordionCard';
import { AccordionList } from '@app/components/common/AccordionList';
import { Modal } from '@app/components/common/Modal';
import { AdvancementLevelProps } from './AdvancemetLevel.interface';
import { useAdvancementLevel } from '@app/components/modules/AdvancementLevel/AdvancementLevel.hooks';
import { Markdown } from '@app/components/common/Markdown';

export const AdvancementLevel: React.FC<AdvancementLevelProps> = ({ showVerticalLine, data }) => {
  const { hideModal, openModal, toggleAccordionOpen, modalOpen, accordionOpen } = useAdvancementLevel();

  const { advancementLevel, description, projects, categories } = data;
  const shouldBeExpandedByDefault = Object.keys(data.categories).length === 1;

  return (
    <div className="flex flex-row">
      <div className="relative flex flex-col items-center">
        <button
          className="mb-2 mt-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-800 hover:opacity-50"
          onClick={toggleAccordionOpen}
        >
          <ChevronRightIcon className={`h-3.5 w-3.5 text-white ${!accordionOpen ? 'rotate-90' : '-rotate-90'}`} />
        </button>
        {showVerticalLine && <div className="absolute left-3 top-12 h-[calc(100%-40px)] w-[1.5px] bg-blue-800" />}
      </div>
      <div className="mb-4 ml-2 flex w-full flex-col gap-4">
        <button
          className={`flex w-full cursor-pointer flex-col gap-4 rounded-lg p-4 ${!accordionOpen && 'hover:bg-navy-50'}`}
          onClick={toggleAccordionOpen}
        >
          <h3 className="text-lg">Advancement level {advancementLevel}</h3>
          <p className="text-base tracking-wide text-navy-600">{description}</p>
        </button>
        {accordionOpen && (
          <>
            {projects.length > 0 && (
              <button
                className="w-fit text-sm font-semibold text-blue-800 hover:text-blue-900 hover:underline hover:underline-offset-4"
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
                small
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
      <Modal open={modalOpen} onClose={hideModal} title="An example way to pass level">
        {projects.map(({ title, overview }) => (
          <div key={title} className="overflow-hidden text-base text-navy-600">
            <p>{title}</p>
            <article className="prose mt-5">
              <Markdown text={overview} />
            </article>
          </div>
        ))}
      </Modal>
    </div>
  );
};
