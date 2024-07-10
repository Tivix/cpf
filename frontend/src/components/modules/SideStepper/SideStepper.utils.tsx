import { CheckMarkIcon } from '@app/static/icons/CheckmarkIcon';

export const Completed = () => {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-800">
      <CheckMarkIcon />
    </div>
  );
};
export const InProgress = () => {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-800 bg-white">
      <div className="h-[10px] w-[10px] rounded-full bg-blue-800" />
    </div>
  );
};
export const NotStarted = () => {
  return <div className="flex h-7 w-7 items-center justify-center rounded-full border border-navy-300 bg-white" />;
};
