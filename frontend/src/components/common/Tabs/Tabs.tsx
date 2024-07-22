import { FC } from 'react';
import { TabsProps } from './Tabs.interface';
import { generateClassNames } from '@app/utils';
import { useTabs } from './Tabs.hooks';

export const Tabs: FC<TabsProps> = ({ tabs, current, onTabChange, className }) => {
  const { handleSelectTab } = useTabs(tabs, onTabChange);
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          onChange={handleSelectTab}
          defaultValue={tabs.find((tab) => tab.id === current.id)?.id}
          className="block w-full rounded-md border-navy-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          {tabs.map((tab) => (
            <option key={tab.id}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-navy-200">
          <nav aria-label="Tabs" className={generateClassNames('flex space-x-8', className)}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => onTabChange(tab)}
                aria-current={tab.id === current.id ? 'page' : undefined}
                className={generateClassNames(
                  'cursor-pointer whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition duration-75 first-letter:uppercase',
                  tab.id === current.id
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-navy-500 hover:border-navy-300 hover:text-navy-700',
                )}
              >
                {tab.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
