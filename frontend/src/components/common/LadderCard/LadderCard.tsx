import { LadderCardProps } from './LadderCard.interface';

export const LadderCard = ({ ladder }: LadderCardProps) => (
  <div className="border border-navy-200 bg-white rounded-2xl flex justify-center items-center h-44 cursor-pointer hover:bg-navy-200">
    <h2>{ladder.ladderName}</h2>
  </div>
);
