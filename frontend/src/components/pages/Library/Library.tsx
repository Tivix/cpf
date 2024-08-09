import { Typography } from '@app/components/common/Typography';
import { LibraryProps } from './Library.interface';
import { PageTitle } from '@app/components/common/PageTitle';

export const Library: React.FC<LibraryProps> = () => {
  return (
    <div>
      <PageTitle title="CPF Library" />
      <Typography className="mb-6 text-navy-600" variant="body-m/regular">
        Select a career path to view the details.
      </Typography>
      {/* TODO: replace with supabase data */}
      {/* <div className="grid grid-cols-3 gap-6">
        {data.map((ladder: LadderCardInterface) => (
          <LadderCard key={ladder.ladderSlug} {...ladder} />
        ))}
      </div> */}
    </div>
  );
};
