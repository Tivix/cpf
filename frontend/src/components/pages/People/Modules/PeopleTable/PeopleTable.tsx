import Image from 'next/image';

import { Typography } from '@app/components/common/Typography';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { DotVerticalIcon } from '@app/static/icons/DotVerticalIcon';
import { CheckMarkIcon } from '@app/static/icons/CheckMarkIcon';
import Link from 'next/link';
import { employeeMenuOptions } from '../../People.utils';
import { PeopleTableProps } from './PeopleTable.interface';
import { formatDate } from '@app/utils';

export const PeopleTable: FC<PeopleTableProps> = ({ people }) => {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-navy-200 border-b border-navy-200">
            <thead className="text-left uppercase text-navy-500">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-xs font-medium sm:pl-4">
                  Employee
                </th>
                <th scope="col" className="px-3 py-5 text-xs font-medium">
                  Ladder
                </th>
                <th scope="col" className="w-[160px] px-3 py-5 text-right text-xs font-medium">
                  Current Band
                </th>
                <th scope="col" className="w-[160px] px-3 py-5 text-right text-xs font-medium">
                  Active Goal
                </th>
                <th scope="col" className="w-[248px] px-3 py-5 text-center text-xs font-medium">
                  Goal Progress
                </th>
                <th scope="col" className="w-[160px] px-3 py-5 text-center text-xs font-medium">
                  Pending actions
                </th>
                <th scope="col" className="w-[160px] px-3 py-5 text-center text-xs font-medium">
                  Last activity date
                </th>
                <th scope="col" className="relative px-4 py-3.5 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-200 bg-white">
              {people?.map((person) => (
                <tr key={person.id}>
                  <td className="flex whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                      <div className="h-8 w-8">
                        <Image
                          width={200}
                          height={200}
                          alt="User image"
                          src="/images/avatar_placeholder.jpeg"
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <Typography variant="body-s/medium">{person.name}</Typography>
                        <Typography variant="body-s/regular" className="text-navy-600">
                          {person.title}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-500 whitespace-nowrap px-3 py-5 text-sm">
                    <div className="flex flex-col gap-y-4">
                      {person?.laddersDetails?.map((ladder) => (
                        <Typography key={ladder.ladderName} variant="body-s/regular" className="text-navy-700">
                          {ladder.ladderName}
                        </Typography>
                      ))}
                    </div>
                  </td>
                  <td className="text-gray-500 whitespace-nowrap px-3 py-5 text-sm">
                    <div className="flex flex-col items-end gap-y-4">
                      {person?.laddersDetails?.map((ladder) => (
                        <Typography key={ladder.ladderName} variant="body-s/regular" className="text-navy-700">
                          {ladder?.currentBand}
                        </Typography>
                      ))}
                    </div>
                  </td>
                  <td className="text-gray-500 whitespace-nowrap px-3 py-5 text-sm">
                    <div className="flex flex-col items-end gap-y-4">
                      {person?.laddersDetails?.map((ladder) => (
                        <div key={ladder.ladderName} className="mr-2 h-4 w-4 text-navy-700">
                          {ladder?.activeGoal && <CheckMarkIcon className="text-green-600" width={20} height={20} />}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="text-gray-500 whitespace-nowrap px-10 py-5 text-sm">
                    <div className="flex flex-col gap-y-4">
                      {person?.laddersDetails?.map((ladder) => (
                        <div key={ladder.ladderName} className="flex h-4 items-center text-navy-700">
                          {ladder.activeGoal && (
                            <>
                              <div className="mr-3 w-full rounded-full bg-navy-300">
                                <div
                                  className="h-2 rounded-full bg-blue-800"
                                  style={{ width: `${ladder.goalProgress}%` }}
                                />
                              </div>
                              <Typography variant="body-s/medium" className="text-navy-600">
                                {ladder.goalProgress}%
                              </Typography>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="text-gray-500 flex flex-col items-center whitespace-nowrap px-3 py-8 text-sm">
                    {person?.laddersDetails?.map((details) => (
                      <div key={details.ladderName} className="flex h-8 w-8 items-center justify-center text-navy-700">
                        {details.activeGoal && (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-800">
                            <Typography variant="body-s/semibold" className="text-white">
                              {details.pendingActions}
                            </Typography>
                          </div>
                        )}
                      </div>
                    ))}
                  </td>
                  <td className="text-gray-500 whitespace-nowrap px-10 py-5 text-sm">
                    {person?.laddersDetails?.map((details) => (
                      <div key={details.ladderName} className="flex h-8 w-8 items-center justify-center">
                        {details.lastActivityDate && (
                          <Typography variant="body-s/regular" className="text-navy-700">
                            {formatDate(details.lastActivityDate)}
                          </Typography>
                        )}
                      </div>
                    ))}
                  </td>
                  <td className="relative whitespace-nowrap py-5 text-sm font-medium">
                    {/* TODO: Create new component Dropdown Menu */}
                    <Menu as="div" className="relative">
                      <MenuButton>
                        <span className="sr-only">Open user menu</span>
                        <DotVerticalIcon />
                      </MenuButton>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1">
                          {employeeMenuOptions.map(({ href, label }) => (
                            <MenuItem key={label}>
                              <Link
                                href={href}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-navy-700 hover:bg-navy-100"
                              >
                                <span>{label}</span>
                              </Link>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
