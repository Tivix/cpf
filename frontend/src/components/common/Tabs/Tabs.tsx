import { FC } from 'react';
import { TabsProps } from './Tabs.interface';
import { generateClassNames } from '@app/utils';

export const Tabs: FC<TabsProps> = ({ tabs, currentTab, onTabChange }) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          onChange={(e) => onTabChange(e.target.value)}
          defaultValue={tabs.find((tab) => tab.key === currentTab)?.label}
          className="block w-full rounded-md border-navy-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          {tabs.map((tab) => (
            <option key={tab.key}>{tab.label}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-navy-200">
          <nav aria-label="Tabs" className="flex justify-center space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.key}
                href={tab.href}
                aria-current={tab.key === currentTab ? 'page' : undefined}
                className={generateClassNames(
                  tab.key === currentTab
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-navy-500 hover:border-navy-300 hover:text-navy-700',
                  'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                )}
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
