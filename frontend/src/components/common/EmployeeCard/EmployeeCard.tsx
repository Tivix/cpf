import Image from 'next/image';
import { EmployeeCardProps } from './EmployeeCard.interface';
import { CheckmarkIcon } from '@app/static/icons/CheckmarkIcon';
import { DotsIcon } from '@app/static/icons/DotsIcon';
import { generateClassNames } from '@app/utils';
import { tabs } from '@app/const';

export const EmployeeCard = ({ employee, tabSelected }: EmployeeCardProps) => {
  const { name, title, laddersDetails } = employee;

  return (
    <>

      <tr className="text-navy-700 text-sm w-full h-16 border-t border-navy-200 *:px-4 *:py-0" key={name}>
        <td {...(laddersDetails.length > 1 && { className: 'flex h-16' })}>
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
              <h3 className="text-navy-900 text-sm font-medium leading-[22.4px]">{name}</h3>
              <p className="text-navy-600 text-sm">{title}</p>
            </div>
          </div>
        </td>
        <td>
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
        </td>
        <td>
          {laddersDetails.map((ladder, index) => (
            <span
              key={index}
              className={generateClassNames('flex justify-end items-center', {
                'h-16 [&:not(:first-of-type)]:-mt-[17px]': laddersDetails.length > 1,
              })}
            >
              {ladder.currentBand}
            </span>
          ))}
        </td>
        {tabSelected === tabs[0] &&
          <>
            <td>
              {laddersDetails.map((ladder, index) => (
                <div
                  key={index}
                  className={generateClassNames('flex justify-end', {
                    'h-16 [&:not(:first-of-type)]:-mt-[17px]': laddersDetails.length > 1,
                  })}
                >
                  {ladder.activeGoal ? <CheckmarkIcon /> : null}
                </div>
              ))}
            </td>
            <td className="[&]:pl-14">
              {laddersDetails.map(
                (ladder, index) =>
                  ladder.activeGoal && (
                    <div
                      key={index}
                      className={generateClassNames('flex items-center gap-2', {
                        'h-16 [&:not(:first-of-type)]:-mt-[17px]': laddersDetails.length > 1,
                      })}
                    >
                      <div className="w-full rounded-full bg-navy-300">
                        <div className={`bg-blue-800 h-2 rounded-full`} style={{ width: `${ladder.goalProgress}%` }} />
                      </div>
                      <span>{ladder.goalProgress}%</span>
                    </div>
                  ),
              )}
            </td>
            <td>
              {laddersDetails.map(
                (ladder, index) =>
                  ladder.activeGoal && (
                    <div
                      key={index}
                      className={generateClassNames('flex justify-center items-center', {
                        'h-16 [&:not(:first-of-type)]:-mt-[17px]': laddersDetails.length > 1,
                      })}
                    >
                      <div className="bg-blue-800 p-2 rounded-full text-white w-7 h-7 font-semibold text-center items-center flex justify-center">
                        {ladder.latestActivity}
                      </div>
                    </div>
                  ),
              )}
            </td>
          </>
        }
        {tabSelected === tabs[1] &&
          <td className="flex gap-4 [&]:pr-2 [&]:pl-14">
            <button className="h-11 px-5 text-navy-600 font-semibold border border-navy-300 rounded-full">Resume</button>
            <button className="h-11 px-5 text-navy-600 font-semibold border border-navy-300 rounded-full">Activate employee</button>
          </td>
        }
        <td className={generateClassNames('[&]:px-0', {
          '[&]:px-4': tabSelected === tabs[2]
          })}
        >
          <div className={generateClassNames('flex justify-center cursor-pointer', {
            'justify-end': tabSelected === tabs[2]
            })}
          >
            <DotsIcon className="w-[18px] h-[18px]" />
          </div>
        </td>
      </tr>
    </>
  );
};
