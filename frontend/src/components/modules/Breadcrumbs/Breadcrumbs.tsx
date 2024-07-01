import Link from 'next/link';
import { ChevronRightIcon } from '@app/static/icons/ChevronRightIcon';
import { BreadcrumbsProps } from './Breadcrumbs.interface';
import { generateClassNames } from '@app/utils';

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.label}>
            <div className="flex items-center">
              {index !== 0 && (
                <ChevronRightIcon className="text-gray-400 mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
              )}
              <Link
                href={breadcrumb.href}
                className={generateClassNames('text-lg font-semibold leading-6 text-navy-600 hover:text-navy-900', {
                  'text-navy-900': breadcrumb.current,
                })}
                aria-current={breadcrumb.current ? 'page' : undefined}
              >
                {breadcrumb.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
