import { generateClassNames } from '@app/utils';
import { TabsProps } from './Tabs.interface';

export const Tabs = ({ tabs, active, setActive, className }: TabsProps) => (
  <nav className={`flex ${className}`} aria-label="Tab">
    <ol role="list" className="flex gap-8 pt-4">
      {tabs.map((tab, index) => (
        <li key={index}>
          <div
            className={generateClassNames('flex cursor-pointer flex-col px-2 pb-4 font-medium text-navy-500', {
              'border-b-2 border-blue-800 text-blue-800': tab.title === active,
            })}
            onClick={() => setActive(tab.title)}
          >
            {tab.title} ({tab.employees})
          </div>
        </li>
      ))}
    </ol>
  </nav>
);
