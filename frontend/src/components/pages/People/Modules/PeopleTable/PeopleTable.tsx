import { Typography } from '@app/components/common/Typography';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { DotVerticalIcon } from '@app/static/icons/DotVerticalIcon';
import { CheckMarkIcon } from '@app/static/icons/CheckMarkIcon';
import Link from 'next/link';
import { employeeMenuOptions } from '../../People.utils';
import { PeopleTableProps } from './PeopleTable.interface';
import { Avatar } from '@app/components/common/Avatar';
import { capitalize, generateClassNames, getInitials } from '@app/utils';
import { Button } from '@app/components/common/Button';
import { userStatus } from '@app/types/user';

export const PeopleTable: FC<PeopleTableProps> = ({ people, currentTab }) => {
  const draft = currentTab?.id === userStatus.draft;
  const deactivated = currentTab?.id === userStatus.deactivated;
  const active = currentTab?.id === userStatus.active;

  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-navy-200 border-b border-navy-200">
            <thead className="text-left uppercase text-navy-500">
              <tr>
                <th
                  scope="col"
                  className={generateClassNames('w-[424px] py-3.5 pl-4 pr-3 text-xs font-medium sm:pl-4')}
                >
                  Employee
                </th>
                <th
                  scope="col"
                  className={generateClassNames('px-3 py-5 text-xs font-medium', {
                    'w-[320px]': deactivated,
                  })}
                >
                  Ladder
                </th>
                <th
                  scope="col"
                  className={generateClassNames('w-[160px] px-3 py-5 text-right text-xs font-medium', {
                    'w-[320px]': deactivated,
                  })}
                >
                  Current Band
                </th>
                {draft && (
                  <th scope="col" className="w-[160px] py-5 pl-14 pr-3 text-left text-xs font-medium">
                    Action
                  </th>
                )}
                {active && (
                  <>
                    <th scope="col" className="w-[160px] px-3 py-5 text-right text-xs font-medium">
                      Active Goal
                    </th>
                    <th scope="col" className="w-[248px] px-9 py-5 text-left text-xs font-medium">
                      Goal Progress
                    </th>
                    <th scope="col" className="w-[160px] px-3 py-5 text-center text-xs font-medium">
                      Latest activity
                    </th>
                  </>
                )}
                <th
                  scope="col"
                  className={generateClassNames('relative px-4 py-3.5 sm:pr-0', {
                    'w-[320px]': deactivated,
                  })}
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-200 bg-white">
              {people?.map((person) => (
                <tr key={person.id} className="h-16">
                  <td className="flex whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                      <div className="h-8 w-8">
                        <Avatar
                          initials={getInitials(person.first_name)}
                          variant="28"
                          width={100}
                          height={100}
                          imageUrl="/cpf/images/avatar_placeholder.jpeg"
                        />
                      </div>
                      <div className="ml-4">
                        <Typography variant="body-s/medium">{person.first_name}</Typography>
                        <Typography variant="body-s/regular" className="text-navy-600">
                          {person.ladder_name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-500 whitespace-nowrap px-3 py-5 text-sm">
                    <div className="flex flex-col gap-y-4">
                      <Typography variant="body-s/regular" className="text-navy-700">
                        {capitalize(person?.ladder_slug) || ''}
                      </Typography>
                    </div>
                  </td>
                  <td className="text-gray-500 whitespace-nowrap px-3 py-5 text-sm">
                    <div className="flex flex-col items-end gap-y-4">
                      <Typography variant="body-s/regular" className="text-navy-700">
                        {/* TODO: add current band */}
                        {0}
                      </Typography>
                    </div>
                  </td>
                  {active && (
                    <td className="text-gray-500 whitespace-nowrap px-3 py-5 text-sm">
                      <div className="flex flex-col items-end gap-y-4">
                        <div className="mr-2 h-4 w-4 text-navy-700">
                          {/* TODO: add active goal */}
                          <CheckMarkIcon className="text-green-600" width={20} height={20} />
                        </div>
                      </div>
                    </td>
                  )}
                  {draft && (
                    <td className="text-gray-500 whitespace-nowrap pl-14 pr-10 text-sm">
                      <div className="flex">
                        <Button variant="border" styleType="natural" className="mr-4">
                          Resume
                        </Button>
                        <Button variant="border" styleType="natural">
                          Activate employee
                        </Button>
                      </div>
                    </td>
                  )}
                  {active && (
                    <>
                      <td className="text-gray-500 whitespace-nowrap px-10 py-5 text-sm">
                        <div className="flex flex-col gap-y-4">
                          <div className="flex h-4 items-center text-navy-700">
                            {/* TODO: add if active goal && */}
                            <div className="mr-3 w-full rounded-full bg-navy-300">
                              <div
                                className="h-2 rounded-full bg-blue-800"
                                //  TODO: add goal progress
                                style={{ width: `${50}%` }}
                              />
                            </div>
                            <Typography variant="body-s/medium" className="text-navy-600">
                              {/* TODO: add goal progress */}
                              {50}%
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="text-gray-500 px-3 text-sm">
                        <div className="flex h-8 w-full items-center justify-center text-navy-700">
                          {/* TODO: add if active goal && */}
                          <div className="b-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-800">
                            <Typography variant="body-s/semibold" className="text-white">
                              {/* TODO: add pending actions */}
                              {3}
                            </Typography>
                          </div>
                        </div>
                      </td>
                    </>
                  )}
                  <td
                    className={generateClassNames('relative whitespace-nowrap py-5 text-sm', {
                      'flex justify-end': deactivated,
                    })}
                  >
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
