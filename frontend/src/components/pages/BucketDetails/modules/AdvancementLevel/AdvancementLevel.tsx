'use client';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { AccordionCard } from '@app/components/common/AccordionCard';
import { AccordionList } from '@app/components/common/AccordionList';
import { Modal } from '@app/components/common/Modal';
import { AdvancementLevelProps } from './AdvancemetLevel.interface';
import { useAdvancementLevel } from './AdvancementLevel.hooks';
import { Markdown } from '@app/components/common/Markdown';
import { Typography } from '@app/components/common/Typography';
import { Button } from '@app/components/common/Button';

export const AdvancementLevel: React.FC<AdvancementLevelProps> = ({ showVerticalLine, data }) => {
  const { hideModal, openModal, toggleAccordionOpen, modalOpen, accordionOpen } = useAdvancementLevel();

  const { advancementLevel, description, projects, categories } = data;
  const shouldBeExpandedByDefault = Object.keys(data.categories).length === 1;

  return (
    <div className="flex flex-row gap-2">
      <div className="relative flex flex-col items-center">
        <button
          className="mb-2 mt-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-800 hover:opacity-50"
          onClick={toggleAccordionOpen}
        >
          <ChevronRightIcon className={`h-3.5 w-3.5 text-white ${!accordionOpen ? 'rotate-90' : '-rotate-90'}`} />
        </button>
        {showVerticalLine && <div className="absolute left-3 top-12 h-[calc(100%-40px)] w-[1.5px] bg-blue-800" />}
      </div>
      <div className="mb-4 ml-4 flex w-full flex-col gap-4">
        <button
          className={`flex w-full cursor-pointer flex-col gap-4 rounded-lg ${!accordionOpen && 'hover:bg-navy-50'}`}
          onClick={toggleAccordionOpen}
        >
          <Typography as="h3" variant="body-l/semibold">
            Advancement level {advancementLevel}
          </Typography>
          <Typography variant="body-m/regular" className="text-navy-600">
            {description}
          </Typography>
        </button>
        {accordionOpen && (
          <>
            {projects.length > 0 && (
              <Button variant="link" onClick={openModal} className="w-fit text-sm">
                An example way to pass level
              </Button>
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