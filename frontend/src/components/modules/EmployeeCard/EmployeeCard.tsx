import Image from 'next/image';
import { EmployeeCardProps } from './EmployeeCard.interface';
import { CheckmarkIcon } from '@app/static/icons/CheckmarkIcon';
import { generateClassNames } from '@app/utils';
import { tabs } from '@app/const';
import { DropdownMenuComponent } from '../../common/DropdownMenuComponent';

export const EmployeeCard = ({ employee, tabSelected }: EmployeeCardProps) => {
  const { name, title, laddersDetails } = employee;
  const multipleItems = 'flex items-center h-16 [&:not(:first-of-type)]:-mt-[17px]';

  return (
    <div className="contents *:flex *:items-center *:border-t *:border-navy-200 *:px-4 *:text-sm *:text-navy-700">
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
          <div className="relative h-7 w-7 self-center overflow-hidden rounded-full">
            <Image
              width={256}
              height={256}
              alt="User image"
              src="/images/image.jpeg"
              className="h-auto w-full overflow-hidden"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-medium text-navy-900">{name}</h3>
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
              className: multipleItems,
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
              className: multipleItems,
            })}
          >
            {ladder.currentBand}
          </span>
        ))}
      </div>

      {tabSelected === tabs[0].title && (
        <>
          <div
            className={generateClassNames('justify-end', {
              'flex-col [&]:items-end': laddersDetails.length > 1,
            })}
          >
            {laddersDetails.map((ladder, index) => (
              <span
                key={index}
                {...(laddersDetails.length > 1 && {
                  className: multipleItems,
                })}
              >
                {ladder.activeGoal ? <CheckmarkIcon /> : null}
              </span>
            ))}
          </div>
          <div
            className={generateClassNames('[&]:pl-14', {
              'flex-col': laddersDetails.length > 1,
            })}
          >
            {laddersDetails.map((ladder, index) => (
              <div
                key={index}
                className={generateClassNames('flex w-full items-center gap-2', {
                  'h-16 [&:not(:first-of-type)]:-mt-[17px]': laddersDetails.length > 1,
                })}
              >
                {ladder.activeGoal && (
                  <>
                    <div className="w-full rounded-full bg-navy-300">
                      <div className="h-2 rounded-full bg-blue-800" style={{ width: `${ladder.goalProgress}%` }} />
                    </div>
                    <span>{ladder.goalProgress}%</span>
                  </>
                )}
              </div>
            ))}
          </div>
          <div
            className={generateClassNames('justify-center', {
              'flex-col': laddersDetails.length > 1,
            })}
          >
            {laddersDetails.map((ladder, index) => (
              <div
                key={index}
                {...(laddersDetails.length > 1 && {
                  className: multipleItems,
                })}
              >
                {ladder.activeGoal && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-800 p-2 font-semibold text-white">
                    {ladder.latestActivity}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {tabSelected === tabs[1].title && (
        <div className="flex h-16 gap-4 font-semibold text-navy-600 *:h-11 *:rounded-full *:border *:border-navy-300 *:px-5 *:transition *:duration-300 *:ease-out [&]:pl-14 [&]:pr-2">
          <button className="hover:bg-navy-300">Resume</button>
          <button className="hover:bg-navy-300">Activate employee</button>
        </div>
      )}
      <DropdownMenuComponent tabSelected={tabSelected} />
    </div>
  );
};
