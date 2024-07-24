import { ProofStatus } from '@app/types/library';
import { ReactNode } from 'react';
import { CheckMarkIcon } from '@app/static/icons/CheckMarkIcon';
import { ArrowRight } from '@app/static/icons/ArrowRight';
import { CrossIcon } from '@app/static/icons/CrossIcon';
import { DashedCircle } from '@app/static/icons/DashedCircle';

export const getSkillIcon = (proofStatus?: string): ReactNode => {
  switch (proofStatus) {
    case ProofStatus.APPROVED:
      return (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
          <CheckMarkIcon />
        </div>
      );
    case ProofStatus.PENDING:
      return (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-white">
          <ArrowRight />
        </div>
      );
    case ProofStatus.REJECTED:
      return (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white">
          <CrossIcon />
        </div>
      );
    default:
      return <DashedCircle className="text-navy-300" />;
  }
};
