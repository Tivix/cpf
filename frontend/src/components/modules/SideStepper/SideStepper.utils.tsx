import { CheckMarkIcon } from '@app/static/icons/CheckMarkIcon';
import { StepStates } from './SideStepper.interface';

const Completed = () => {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-800">
      <CheckMarkIcon className="text-white" />
    </div>
  );
};
const InProgress = () => {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-800 bg-white">
      <div className="h-[10px] w-[10px] rounded-full bg-blue-800" />
    </div>
  );
};
const NotStarted = () => {
  return <div className="flex h-7 w-7 items-center justify-center rounded-full border border-navy-300 bg-white" />;
};

export const stepComponentsMap: { [key in StepStates]: JSX.Element } = {
  completed: <Completed />,
  inProgress: <InProgress />,
  notStarted: <NotStarted />,
};
