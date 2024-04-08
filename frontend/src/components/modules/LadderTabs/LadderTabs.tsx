import { useMemo, useCallback } from 'react';
import { VerticalLineIcon } from '@app/static/icons/VerticalLineIcon';
import { generateBandGrouping } from './utils';
import { LadderTabsProps, LadderInterface } from './LadderTabs.interface';
import { generateClassNames } from '@app/utils';

export const LadderTabs: React.FC<LadderTabsProps> = ({ maximumLadders, activeLadder }) => {
  const generateLadders = useCallback((maxLadders: number): LadderInterface => generateBandGrouping(maxLadders), []);

  const ladders: LadderInterface = useMemo(() => generateLadders(maximumLadders), [generateLadders, maximumLadders]);

  return (
    <div className="max-w-[88px] flex flex-col">
      {Object.keys(ladders).map((positionName: string, index: number) => (
        <>
          <div className="rounded-2xl px-2 py-3 bg-white" key={positionName}>
            <h3 className="text-center uppercase text-xs text-navy-600 tracking-wide mb-2">{positionName}</h3>
            {ladders[positionName].map((ladder: number, index: number) => (
              <>
                <div
                  key={ladder.toString()}
                  className={generateClassNames(
                    'border-2 border-navy-300 text-navy-600 p-2 rounded-full flex items-center justify-center hover:border-blue-800 hover:text-white hover:bg-blue-800 cursor-pointer transition-colors duration-300 ease-in-out',
                    { 'bg-blue-800 text-white border-blue-800': ladder === activeLadder },
                  )}
                >
                  {ladder}
                </div>
                {index !== ladders[positionName].length - 1 && (
                  <VerticalLineIcon className="h-6 w-full text-navy-300" />
                )}
              </>
            ))}
          </div>
          {index !== Object.keys(ladders).length - 1 && (
            <VerticalLineIcon className="h-6 w-full text-navy-300 text-center" />
          )}
        </>
      ))}
    </div>
  );
};
