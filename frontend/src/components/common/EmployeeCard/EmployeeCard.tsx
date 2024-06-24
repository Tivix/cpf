import Image from 'next/image';
import { EmployeeCardProps } from './EmployeeCard.interface';
import { CheckmarkIcon } from '@app/static/icons/CheckmarkIcon';
import { DotsIcon } from '@app/static/icons/DotsIcon';
import { generateClassNames } from '@app/utils';
import { tabs } from '@app/const';

export const EmployeeCard = ({ employee, tabSelected }: EmployeeCardProps) => {
  const { name, title, laddersDetails } = employee;

  return (
    <div className="contents *:flex *:items-center *:text-sm *:text-navy-700 *:px-4 *:border-t *:border-navy-200">
      <div
        className={generateClassNames('col-start-1', {
          '[&]:items-start': laddersDetails.length > 1,
        })}
      >
        <div
          className={generateClassNames('flex gap-3', {
            'h-16': laddersDetails.length > 1,
          })}
        >
          <div className="relative w-7 h-7 overflow-hidden rounded-full self-center">
            <Image
              width={256}
              height={256}
              alt="User image"
              src="/images/image.jpeg"
              className="overflow-hidden w-full h-auto"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-navy-900 font-medium">{name}</h3>
            <p className="text-navy-600">{title}</p>
          </div>
        </div>
      </div>
      <div
        {...(laddersDetails.length > 1 && {
          className: 'flex-col [&]:items-start',
        })}
      >
        {laddersDetails.map((ladder, index) => (
          <span
            key={index}
            {...(laddersDetails.length > 1 && {
              className: 'flex items-center h-16 [&:not(:first-of-type)]:-mt-[17px]',
            })}
          >
            {ladder.ladderName}
          </span>
        ))}
      </div>
      <div
        className={generateClassNames('justify-end', {
          'flex-col [&]:items-end': laddersDetails.length > 1,
        })}
      >
        {laddersDetails.map((ladder, index) => (
          <span
            key={index}
            {...(laddersDetails.length > 1 && {
              className: 'flex items-center h-16 [&:not(:first-of-type)]:-mt-[17px]',
            })}
          >
            {ladder.currentBand}
          </span>
        ))}
      </div>

      {tabSelected === tabs[0] && (
        <>
          <div className="justify-end">
            {laddersDetails.map((ladder, index) => (
              <span
                key={index}
                {...(laddersDetails.length > 1 && {
                  className: '[&:not(:first-of-type)]:-mt-[17px]',
                })}
              >
                {ladder.activeGoal ? <CheckmarkIcon /> : null}
              </span>
            ))}
          </div>
          <div className="[&]:pl-14 ">
            {laddersDetails.map(
              (ladder, index) =>
                ladder.activeGoal && (
                  <div
                    key={index}
                    className={generateClassNames('flex items-center gap-2 w-full', {
                      '[&:not(:first-of-type)]:-mt-[17px]': laddersDetails.length > 1,
                    })}
                  >
                    <div className="w-full rounded-full bg-navy-300">
                      <div className="bg-blue-800 h-2 rounded-full" style={{ width: `${ladder.goalProgress}%` }} />
                    </div>
                    <span>{ladder.goalProgress}%</span>
                  </div>
                ),
            )}
          </div>
          <div className="justify-center">
            {laddersDetails.map(
              (ladder, index) =>
                ladder.activeGoal && (
                  <div
                    key={index}
                    {...(laddersDetails.length > 1 && {
                      className: '[&:not(:first-of-type)]:-mt-[17px]',
                    })}
                  >
                    <div className="flex items-center justify-center bg-blue-800 rounded-full text-white w-7 h-7 font-semibold p-2">
                      {ladder.latestActivity}
                    </div>
                  </div>
                ),
            )}
          </div>
        </>
      )}

      {tabSelected === tabs[1] && (
        <div className="flex gap-4 [&]:pr-2 [&]:pl-14">
          <button className="h-11 px-5 text-navy-600 font-semibold border border-navy-300 rounded-full">Resume</button>
          <button className="h-11 px-5 text-navy-600 font-semibold border border-navy-300 rounded-full">
            Activate employee
          </button>
        </div>
      )}

      <div
        className={generateClassNames('justify-center [&]:p-0', {
          'justify-end': tabSelected === tabs[2],
        })}
      >
        <div className="flex justify-center items-center w-11 h-11 cursor-pointer">
          <span>
            <DotsIcon className="w-[18px] h-[18px]" />
          </span>
        </div>
      </div>
    </div>
  );
};
