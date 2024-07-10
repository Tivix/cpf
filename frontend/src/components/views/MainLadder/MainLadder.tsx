import { Typography } from '@app/components/common/Typography';
import { stepComponentsMap } from '@app/components/modules/SideStepper';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';

export const MainLadder = () => {
  return (
    <div className="mb-6 flex flex-col gap-y-10 rounded-[20px] border border-navy-200 bg-white p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div>{stepComponentsMap.inProgress}</div>
          <Typography variant="head-s/medium">1. Select Ladder</Typography>
        </div>
        <div className="h-4 w-4 rotate-90">{<ChevronRightIcon className="text-navy-600" />}</div>
      </div>
      <div>Ladder</div>
    </div>
  );
};
