'use client';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { AccordionCard } from '@app/components/common/AccordionCard';
import { AccordionList } from '@app/components/common/AccordionList';
import { Modal } from '@app/components/common/Modal';
import { AdvancementLevelProps } from './AdvancemetLevel.interface';
import { useAdvancementLevel } from '@app/components/modules/AdvancementLevel/AdvancementLevel.hooks';

export const AdvancementLevel: React.FC<AdvancementLevelProps> = ({ showVerticalLine, data }) => {
  const { hideModal, openModal, toggleAccordionOpen, modalOpen, accordionOpen } = useAdvancementLevel();

  const { advancementLevel, description, projects, categories } = data;
  const shouldBeExpandedByDefault = Object.keys(data.categories).length === 1;

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center relative">
        <div
          className="mt-4 mb-2 bg-blue-800 rounded-full w-6 h-6 flex items-center justify-center hover:opacity-50"
          onClick={toggleAccordionOpen}
        >
          <ChevronRightIcon className={`text-white w-3.5 h-3.5 ${!open ? 'rotate-90' : '-rotate-90'}`} />
        </div>
        {showVerticalLine && <div className="w-[1.5px] bg-blue-800 absolute top-12 left-3 h-[calc(100%-40px)]" />}
      </div>
      <div
        className={`p-4 ml-2 flex flex-col gap-4 mb-4 w-full rounded-lg ${!open && 'hover:bg-navy-50'}`}
        onClick={accordionOpen ? undefined : toggleAccordionOpen}
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
      <Modal open={modalOpen} onClose={hideModal} title="An example way to pass level">
        {projects.map(({ title, overview }) => (
          <div key={title} className="text-navy-600 text-base overflow-hidden">
            <p>{title}</p>
            <article className="mt-5 prose">
              <Markdown remarkPlugins={[remarkGfm]}>{overview}</Markdown>
            </article>
          </div>
        ))}
      </Modal>
    </div>
  );
};
