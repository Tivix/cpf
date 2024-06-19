import Image from 'next/image';
import { EmployeeCardProps } from './EmployeeCard.interface';
import { CheckmarkIcon } from '@app/static/icons/CheckmarkIcon';
import { DotsIcon } from '@app/static/icons/DotsIcon';
import { generateClassNames } from '@app/utils';

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { name, title, laddersDetails, active, draft, deactivated } =
    employee;

  return (
    <>
      <tr className="text-navy-700 text-sm w-full h-16 border-t border-navy-200 *:px-4 *:py-0" key={name}>
        <td {...(laddersDetails.length > 1 && {className: 'flex h-16'})}>
          <div className="flex gap-4">
            <div className="relative w-8 h-8 overflow-hidden rounded-full self-center">
              <Image
                width={256}
                height={256}
                alt="User image"
                src="/images/image.jpeg"
                className="overflow-hidden w-full h-auto"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-navy-900 text-sm font-medium leading-[22.4px] tracking-wider">{name}</h3>
              <p className="text-navy-600 text-sm">{title}</p>
            </div>
          </div>
        </td>
        <td>
          {laddersDetails.map((ladder, index) => (
            <span 
              key={index}
              {...(laddersDetails.length > 1 && {className: 'flex items-center h-16 [&:not(:first-of-type)]:-mt-[17px]'})}>
              {ladder.ladderName}
            </span>
          ))}
        </td>
        <td>
          {laddersDetails.map((ladder, index) => (
            <span
              key={index}
              className={generateClassNames('flex justify-end items-center', {
                'h-16 [&:not(:first-of-type)]:-mt-[17px]': laddersDetails.length > 1
              })}>
              {ladder.currentBand}
            </span>
          ))}
        </td>
        <td>
          {laddersDetails.map((ladder, index) => (
            <div
              key={index}
              className={generateClassNames('flex justify-end items-center', {
                'h-16 [&:not(:first-of-type)]:-mt-[17px]': laddersDetails.length > 1
              })}>
              {ladder.activeGoal ? <CheckmarkIcon /> : null}
            </div>
          ))}
        </td>
        <td className="[&]:pl-14">
          {laddersDetails.map((ladder, index) => (
            ladder.activeGoal && (
              <div
                key={index}
                className={generateClassNames('flex items-center gap-2', {
                  'h-16 [&:not(:first-of-type)]:-mt-[17px]': laddersDetails.length > 1
                })}>
                <div className="w-full rounded-full bg-navy-300">
                  <div
                    className={`bg-blue-800 h-2 rounded-full`}
                    style={{width: `${ladder.goalProgress}%`}} />
                </div>
                <span>{ladder.goalProgress}%</span>
              </div>
            )
          ))}
        </td>
        <td>
          {laddersDetails.map((ladder, index) => (
            ladder.activeGoal && (
              <div
                key={index}
                className={generateClassNames('flex justify-center items-center', {
                  'h-16 [&:not(:first-of-type)]:-mt-[17px]': laddersDetails.length > 1
                })}>
                <div className="bg-blue-800 p-2 rounded-full text-white w-7 h-7 font-semibold text-center items-center flex justify-center">
                  {ladder.latestActivity}
                </div>
              </div>
            )
          ))}
        </td>
        <td className="flex justify-center items-center w-12 h-16 [&]:px-0">
          <div className="flex justify-center items-center w-11 h-11 bg-white cursor-pointer">
            <DotsIcon className="w-6 h-6 rounded-full bg-white" />
          </div>
        </td>
      </tr>
    </>
  );
};
