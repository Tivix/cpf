import {PropsWithChildren, useState} from "react";
import {ChevronRightIcon} from "@app/static/icons/ChevronRightIcon";
import {generateClassNames} from "@app/utils";
import {AccordionListItemProps} from "./AccordionList.interface";

export const AccordionListItem = ({title, children}: PropsWithChildren<AccordionListItemProps>) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="border-b border-b-navy-200 py-4 px-2">
            <h3>
                <button
                    type="button"
                    className={generateClassNames(
                        'flex items-center justify-between w-full',
                        { 'cursor-auto': !children },
                    )}
                    onClick={() => setOpen(!isOpen)}
                >
                    <span className="text-navy-600 text-base font-medium text-left">{title}</span>
                    <div className="min-w-10 min-h-10 flex justify-center items-center">
                        {children ? (
                            <ChevronRightIcon
                                className={generateClassNames(
                                    'rotate-90 text-navy-500',
                                    { '-rotate-90': isOpen,},
                                )}
                            />
                        ) : undefined}
                    </div>
                </button>
            </h3>
            {children ? (
                <div
                    className={generateClassNames(
                        'mt-4 text-sm text-navy-600 font-normal',
                        { 'hidden': !isOpen },
                    )}
                >
                    {children}
                </div>
            ): undefined}
        </div>
    );
}
