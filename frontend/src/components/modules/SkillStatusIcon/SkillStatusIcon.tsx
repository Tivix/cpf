import { SkillStatusIconProps } from '@app/components/modules/SkillStatusIcon/SkillStatusIcon.interface';
import { FC } from 'react';
import { DashedCircle } from '@app/static/icons/DashedCircle';
import { ProofStatus } from '@app/types/library';
import { CheckMarkIcon } from '@app/static/icons/CheckMarkIcon';
import { ArrowRight } from '@app/static/icons/ArrowRight';
import { CrossIcon } from '@app/static/icons/CrossIcon';

export const SkillStatusIcon: FC<SkillStatusIconProps> = ({ status }) => {
  switch (status) {
    case ProofStatus.approved:
      return (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
          <CheckMarkIcon />
        </div>
      );
    case ProofStatus.pending:
      return (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-white">
          <ArrowRight />
        </div>
      );
    case ProofStatus.rejected:
      return (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white">
          <CrossIcon />
        </div>
      );
    default:
      return <DashedCircle className="text-navy-300" />;
  }
};
