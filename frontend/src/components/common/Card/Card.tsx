import { CardProps } from './Card.interface';
import { PropsWithChildren } from 'react';

export const Card: React.FC<PropsWithChildren<CardProps>> = ({ title, children }) => {
  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-navy-200/5">
      <div className="px-4 py-6 sm:p-8">
        <h3 className="text-xl font-semibold leading-6 text-navy-900">{title}</h3>
        <div className="py-8">{children}</div>
      </div>
    </div>
  );
};
