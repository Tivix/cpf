'use client';

import { routes } from '@app/constants';
import { Breadcrumbs } from '@app/components/modules/Breadcrumbs';
import { Typography } from '@app/components/common/Typography';
import { MySpaceSoftSkillBucketDetailsProps } from './MySpaceSoftSkillBucketDetails.interface';
import { StatusChip } from '@app/components/common/StatusChip';
import { AccordionCard } from '@app/components/common/AccordionCard';
import { AccordionList } from '@app/components/common/AccordionList';
import { SkillStatusIcon } from '@app/components/modules/SkillStatusIcon';

export const MySpaceSoftSkillBucketDetails: React.FC<MySpaceSoftSkillBucketDetailsProps> = ({ data }) => {
  const { description, status, categories } = data;

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'My space', href: routes.mySpace.index, current: false },
          { label: 'Soft skills', href: routes.mySpace.softSkills, current: true },
        ]}
      />
      <section className="mx-28 flex flex-col gap-8 rounded-2xl bg-white px-20 py-12">
        <div className="flex justify-between">
          <div className="flex flex-col gap-6">
            <div className="gap- flex items-center gap-6">
              <Typography variant="head-m/semibold" as="h2">
                Soft skills
              </Typography>
              <StatusChip variant="green">{status}</StatusChip>
            </div>
            <Typography variant="body-m/regular" className="text-navy-600">
              {description}
            </Typography>
            {Object.entries(categories).map(([category, skills]) => (
              <AccordionCard key={category} className="w-full" title={category} small>
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
          </div>
        </div>
      </section>
    </div>
  );
};
