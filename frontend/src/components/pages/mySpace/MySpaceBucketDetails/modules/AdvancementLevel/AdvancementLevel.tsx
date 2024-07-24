'use client';
import { AccordionCard } from '@app/components/common/AccordionCard';
import { AccordionList } from '@app/components/common/AccordionList';
import { AdvancementLevelProps } from './AdvancementLevel.interface';
import { Button } from '@app/components/common/Button';
import { ExpandableSection } from '@app/components/common/ExpandableSection';
import { ExampleWayToPassLevelModal } from '@app/components/modules/ExampleWayToPassLevelModal';
import { useAdvancementLevel } from './AdvancementLevel.hooks';
import { SkillStatusIcon } from '@app/components/modules/SkillStatusIcon';

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
          <>
            <Button variant="link" onClick={openModal} className="w-fit text-sm">
              An example way to pass level
            </Button>
            <ExampleWayToPassLevelModal open={modalOpen} onClose={hideModal} projects={projects} />
          </>
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
                icon: <SkillStatusIcon />,
              }))}
            />
          </AccordionCard>
        ))}
      </>
    </ExpandableSection>
  );
};
