import { CardProps } from './Card.interface';
import { PropsWithChildren } from 'react';
import {Typography} from "@app/components/common/Typography";

export const Card: React.FC<PropsWithChildren<CardProps>> = ({ title, children }) => {
  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-navy-200/5 lg:w-[750px]">
      <div className="px-4 py-6 sm:p-8">
        <Typography as="h3" variant="head-s/semibold">{title}</Typography>
        <div className="py-8">{children}</div>
      </div>
    </div>
  );
};
