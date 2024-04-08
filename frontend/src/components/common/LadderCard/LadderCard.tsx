import { LadderCardInterface } from './LadderCard.interface';

export const LadderCard = ({ ladderName }: LadderCardInterface) => (
  <div className="border border-navy-200 bg-white rounded-2xl flex justify-center items-center h-44 cursor-pointer hover:bg-navy-200">
    <h2>{ladderName}</h2>
  </div>
);
