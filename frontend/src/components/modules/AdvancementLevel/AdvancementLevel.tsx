'use client';
import { AccordionCard } from '@app/components/common/AccordionCard';
import { AccordionList } from '@app/components/common/AccordionList';
import { Modal } from '@app/components/common/Modal';
import { AdvancementLevelProps } from './AdvancemetLevel.interface';
import { useAdvancementLevel } from './AdvancementLevel.hooks';
import { Markdown } from '@app/components/common/Markdown';
import { Button } from '@app/components/common/Button';
import { ExpandableSection } from '@app/components/common/ExpandableSection';

export const AdvancementLevel: React.FC<AdvancementLevelProps> = ({ showVerticalLine, data, open, onClick }) => {
  const { hideModal, openModal, modalOpen } = useAdvancementLevel();

  const { advancementLevel, description, projects, categories } = data;
  const shouldBeExpandedByDefault = Object.keys(data.categories).length === 1;

  return (
    <ExpandableSection
      title={`Advancement level ${advancementLevel}`}
      open={open}
      onClick={onClick}
      description={description}
      showVerticalLine={showVerticalLine}
    >
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
      </>
    </ExpandableSection>
  );
};
