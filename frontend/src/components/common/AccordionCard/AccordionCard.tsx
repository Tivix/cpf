import { AccordionCardProps } from './AccordionCard.interface';
import {ChevronRightIcon} from "@app/static/icons/ChevronRightIcon";
import {PropsWithChildren, useState} from "react";
import {generateClassNames} from "@app/utils";

export const AccordionCard = ({title, children}: PropsWithChildren<AccordionCardProps>) => {
    const [isOpen, setOpen] = useState(false);

    return (
       <div>
           <h2>
               <button
                   type="button"
                   className={generateClassNames(
                       'flex items-center justify-between w-full p-6 border border-navy-200 rounded-2xl',
                       {
                           'hover:bg-transparent rounded-b-none border-b-0 pb-0': isOpen,
                           'hover:bg-navy-100': !isOpen && children,
                           'cursor-auto': !children,
                       },
                   )}
                   onClick={() => setOpen(!isOpen)}
               >
                   <span className="text-navy-900 text-xl font-semibold">{title}</span>
                   {children ? (
                       <div className="rounded-full bg-navy-50 w-8 h-8 flex justify-center items-center">
                           <ChevronRightIcon
                               className={generateClassNames(
                                   'rotate-90 text-navy-500',
                                   { '-rotate-90': isOpen,},
                               )}
                           />
                       </div>
                   ) : undefined}
               </button>
           </h2>
           {children ? (
               <div
                   className={generateClassNames(
                       'border border-navy-200 border-t-0 rounded-b-2xl p-6',
                       { 'hidden': !isOpen,},
                   )}
               >
                   {children}
               </div>
           ): undefined}
       </div>
    );
}
