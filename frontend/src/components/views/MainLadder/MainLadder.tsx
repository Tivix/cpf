'use client';
import { Button } from '@app/components/common/Button';
import { Combobox } from '@app/components/common/Combobox';
import { FormProvider } from '@app/components/common/FormProvider';
import { Typography } from '@app/components/common/Typography';
import { stepComponentsMap } from '@app/components/modules/SideStepper';
import { MainLadderForm, MainLadderFormNames } from './MainLadder.interface';
import { useMainLadder } from './MainLadder.hooks';
import { DeleteIcon } from '@app/static/icons/DeleteIcon';
import { generateClassNames } from '@app/utils';
import { ChevronUpIcon } from '@app/static/icons/ChevronUpIcon';
import { Spacer, ladders, technologies } from './MainLadder.utils';

export const MainLadder = () => {
  const { form, technologyFields, open, setOpen, ladderSelected, selectLadderValid } = useMainLadder();
  const values = form.watch();

  return (
    <FormProvider<MainLadderForm> form={form}>
      <div className="flex flex-col gap-y-10 rounded-[20px] border-navy-200 bg-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div>{stepComponentsMap.inProgress}</div>
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
              <Combobox
                label="Ladder"
                options={ladders}
                name={MainLadderFormNames.ladder}
                renderRightContent={() => <Spacer />}
              />
              {values?.[MainLadderFormNames.technology].map((tech, i) => {
                return (
                  <Combobox
                    label="Technology"
                    key={`${tech.id}-${i}`}
                    options={technologies}
                    name={`${MainLadderFormNames.technology}.${i}`}
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
              {ladderSelected && (
                <Button
                  styleType="primary"
                  variant="link"
                  className="w-fit"
                  onClick={() => technologyFields.append({ id: '', name: '' })}
                >
                  + Technology
                </Button>
              )}
            </div>
            <div className="self-end">
              <Button styleType="primary" variant="solid" disabled={!selectLadderValid}>
                Confirm and continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </FormProvider>
  );
};