import Image from 'next/image';
import { EmployeeCardProps } from './EmployeeCard.interface';
import { CheckmarkIcon } from '@app/static/icons/CheckmarkIcon';
import { DotsIcon } from '@app/static/icons/DotsIcon';
import { generateClassNames } from '@app/utils';

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { name, title, ladder, currentBand, activeGoal, goalProgress, latestActivity, active, draft, deactivated } =
    employee;

  return (
    <>
      <tr className="text-navy-700 text-sm w-full px-4 gap-2 p-10 border-t border-navy-200" key={employee.name}>
        <td className="flex items-center h-[64px] px-4">
          <div className="flex gap-4">
            <div className="relative w-8 h-8 overflow-hidden rounded-full self-center">
              <Image
                width={256}
                height={256}
                alt=""
                src="/images/image.jpeg"
                className="overflow-hidden w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-navy-900 text-sm font-semibold leading-[22.4px]">{employee.name}</h3>
              <p className="text-navy-600 text-sm">{employee.title}</p>
            </div>
          </div>
        </td>
        <td
          className={generateClassNames('px-4 text-center', {
            'h-[112px]': employee.ladder.length >= 2,
          })}
        >
          {employee.ladder.map((ladder, index) => (
            <p key={index} className="flex justify-center items-center h-[64px] [&:not(:first-of-type)]:-mt-[19px]">
              {ladder}
            </p>
          ))}
        </td>
        <td className="px-4 text-end">{employee.currentBand}</td>
        <td className="text-navy-600 text-base px-4">
          <div className="flex justify-end">{employee.activeGoal ? <CheckmarkIcon /> : null}</div>
        </td>
        <td className="px-4 text-end">
          {employee.activeGoal && (
            <div className="flex items-center gap-4">
              <div className="w-full bg-gray-200 rounded-full h-2 bg-navy-300">
                <div className={`bg-blue-800 h-2 rounded-full w-[${employee.goalProgress * 100}%]`} />
              </div>
              <p>{employee.goalProgress * 100}%</p>
            </div>
          )}
        </td>
        <td className="px-4 justify-center">
          <div className="flex justify-center">
            <div className="bg-blue-800 p-2 rounded-full text-white w-7 h-7 font-semibold text-center items-center flex justify-center">
              {employee.latestActivity}
            </div>
          </div>
        </td>
        <td className="px-4">
          <div className="bg-white cursor-pointer">
            <DotsIcon className="w-6 h-6 rounded-full bg-white" />
          </div>
        </td>
      </tr>
    </>
  );
};
