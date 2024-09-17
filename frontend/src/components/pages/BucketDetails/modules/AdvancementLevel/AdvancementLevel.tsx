'use client';
import { AccordionCard } from '@app/components/common/AccordionCard';
import { AccordionList } from '@app/components/common/AccordionList';
import { AdvancementLevelProps } from './AdvancemetLevel.interface';
import { useAdvancementLevel } from './AdvancementLevel.hooks';
import { Button } from '@app/components/common/Button';
import { ExpandableSection } from '@app/components/common/ExpandableSection';
import { ExampleWayToPassLevelModal } from '@app/components/modules/ExampleWayToPassLevelModal';
import { FC } from 'react';
import { getAggregatedSkills } from '@app/utils';

export const AdvancementLevel: FC<AdvancementLevelProps> = ({
  verticalLine,
  data,
  open,
  onClick,
  checkboxName,
  handleSelectAll,
}) => {
  const { hideModal, openModal, modalOpen } = useAdvancementLevel();

  const { advancementLevel, description, projects, skills } = data;
  const aggregatedSkills = getAggregatedSkills(skills);

  const shouldBeExpandedByDefault = Object.keys(aggregatedSkills).length === 1;

  return (
    <ExpandableSection
      title={`Advancement level ${advancementLevel}`}
      open={open}
      onClick={onClick}
      description={description}
      verticalLine={verticalLine}
    >
      <>
        {projects.length > 0 && (
          <Button variant="link" onClick={openModal} className="w-fit text-sm">
            An example way to pass level
          </Button>
        )}
        {Object.entries(aggregatedSkills).map(([category, skills]) => (
          <AccordionCard
            key={category}
            className="w-full"
            title={category || 'Category'}
            expandedByDefault={shouldBeExpandedByDefault}
            small
            checkboxName={checkboxName}
            handleSelectAll={(name: string, selected: boolean) => handleSelectAll?.(name, selected, skills)}
          >
            <AccordionList
              checkboxName={checkboxName}
              items={skills.map(({ name, description, skillId }) => ({
                key: skillId,
                title: name,
                children: description ? <p>{description}</p> : undefined,
              }))}
            />
          </AccordionCard>
        ))}
        <ExampleWayToPassLevelModal open={modalOpen} onClose={hideModal} projects={projects} />
      </>
    </ExpandableSection>
  );
};
