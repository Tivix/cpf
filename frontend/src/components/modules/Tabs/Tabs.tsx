import { generateClassNames } from '@app/utils';
import { TabsProps } from './Tabs.interface';

export const Tabs = ({ tabs, active, setActive, className }: TabsProps) => (
  <nav className={`flex ${className}`} aria-label="Tab">
    <ol role="list" className="flex space-x-2 gap-4 pt-4">
      {tabs.map((tab, index) => (
        <li key={index}>
          <div
            className={generateClassNames('flex flex-col pb-4  cursor-pointer', {
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
