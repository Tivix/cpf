import { Typography } from '@app/components/common/Typography';
import { PageTitleProps } from './PageTitle.interface';

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Typography className="mb-10" variant="body-l/semibold" as="h1">
      {title}
    </Typography>
  );
};
