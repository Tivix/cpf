import { generateClassNames } from '@app/utils';
import { TabsProps } from './Tabs.interface';

export const Tabs = ({ tabs, active, onChange, className }: TabsProps) => (
  <div className={`flex ${className}`} aria-label="Tab">
    <ol role="list" className="flex gap-8 pt-4">
      {tabs.map((tab) => (
        <li key={tab.id}>
          <div
            className={generateClassNames('flex cursor-pointer gap-x-1 px-2 pb-4 font-medium text-navy-500', {
              'border-b-2 border-blue-800 text-blue-800': tab.id === active.id,
            })}
            onClick={() => onChange(tab)}
          >
            <span className="first-letter:uppercase">{tab.name}</span>
          </div>
        </li>
      ))}
    </ol>
  </div>
);
