'use client';
import { Button } from '@app/components/common/Button';
import { Combobox } from '@app/components/common/Combobox';
import { Typography } from '@app/components/common/Typography';
import { stepComponentsMap } from '@app/components/modules/SideStepper';
import { useMainLadder } from './MainLadder.hooks';
import { DeleteIcon } from '@app/static/icons/DeleteIcon';
import { generateClassNames } from '@app/utils';
import { ChevronUpIcon } from '@app/static/icons/ChevronUpIcon';
import { Spacer } from './MainLadder.utils';
import { addEmployeeFormNames } from '../AddEmployeeFormProvider';
import { FC } from 'react';
import { MainLadderProps } from './MainLadder.interface';

export const MainLadder: FC<MainLadderProps> = ({ data }) => {
  const {
    technologyFields,
    open,
    ladders,
    technologies,
    setOpen,
    selectedLadder,
    formValid,
    firstTechnology,
    isSubmitting,
  } = useMainLadder(data);

  return (
    <div className="flex flex-col gap-y-10 rounded-[20px] border-navy-200 bg-white p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div>{formValid ? stepComponentsMap.completed : stepComponentsMap.inProgress}</div>
          <Typography variant="head-s/medium">1. Select Ladder</Typography>
        </div>
        <Button
          variant="link"
          className={generateClassNames(`flex h-8 w-8 duration-150 ${open ? 'rotate-0' : 'rotate-180'} items-center`)}
          onClick={() => setOpen((prev) => !prev)}
        >
          {<ChevronUpIcon className="text-navy-600" />}
        </Button>
      </div>
      {open && (
        <div className="flex flex-col gap-y-6">
          <div className="flex w-1/2 flex-col gap-y-6">
            {ladders && (
              <Combobox
                label="Ladder"
                options={ladders}
                name={addEmployeeFormNames.ladder}
                renderRightContent={() => <Spacer />}
              />
            )}
            {technologies &&
              technologyFields.fields.map((tech, i) => {
                return (
                  <Combobox
                    label="Technology"
                    key={tech.id}
                    options={technologies}
                    name={`${addEmployeeFormNames.technology}.${i}`}
                    renderRightContent={() =>
                      i !== 0 ? (
                        <Button
                          variant="link"
                          styleType="natural"
                          className="flex h-8 w-8 items-center"
                          onClick={() => technologyFields.remove(i)}
                        >
                          <DeleteIcon />
                        </Button>
                      ) : (
                        <Spacer />
                      )
                    }
                  />
                );
              })}
            {selectedLadder && (
              <Button
                styleType="primary"
                variant="link"
                className="w-fit"
                onClick={() => technologyFields.append({ id: '', name: '' })}
                disabled={
                  (firstTechnology && !firstTechnology.name) || !technologies || !technologies?.length || isSubmitting
                }
              >
                + Technology
              </Button>
            )}
          </div>
          <div className="self-end">
            <Button
              styleType="primary"
              variant="solid"
              disabled={!formValid || isSubmitting}
              type="submit"
              value="active"
            >
              Confirm and continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
