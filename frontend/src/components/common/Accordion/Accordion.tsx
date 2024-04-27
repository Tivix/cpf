import { AccordionProps } from './Accordion.interface';
import {ChevronRightIcon} from "@app/static/icons/ChevronRightIcon";
import {PropsWithChildren, useState} from "react";
import {generateClassNames} from "@app/utils";

export const Accordion = ({title, children}: PropsWithChildren<AccordionProps>) => {
    const [isOpen, setOpen] = useState(false);

    return (
       <div>
           <h2>
               <button
                   type="button"
                   className={generateClassNames(
                       'flex items-center justify-between w-full p-6 border border-navy-200 rounded-2xl hover:bg-navy-100',
                       { 'hover:bg-transparent rounded-b-none border-b-0 pb-0': isOpen },
                   )}
                   onClick={() => setOpen(!isOpen)}
               >
                   <span className="text-navy-900 text-xl font-semibold">{title}</span>
                   <div className="rounded-full bg-navy-50 w-8 h-8 flex justify-center items-center">
                       <ChevronRightIcon
                           className={generateClassNames(
                               'rotate-90 text-navy-500',
                               { '-rotate-90': isOpen,},
                           )}
                       />
                   </div>
               </button>
           </h2>
           <div
               className={generateClassNames(
                   'border border-navy-200 border-t-0 rounded-b-2xl p-6',
                   { 'hidden': !isOpen,},
               )}
           >
               {children}
           </div>
       </div>
    );
}
