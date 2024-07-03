import { LadderCard } from '@app/components/common/LadderCard';
import { getLadders } from '@app/api/ladder';
import {Typography} from "@app/components/common/Typography";

export default async function LibraryPage() {
  const data = await getLadders();

  return (
    <div>
      <Typography className="mb-10" variant="body-l/semibold" as="h1">CPF Library</Typography>
      <Typography className="mb-6 text-navy-600" variant="body-m/regular">Select a career path to view the details.</Typography>
      <div className="grid grid-cols-3 gap-6">
        {data.map((ladder) => (
          <LadderCard key={ladder.ladderSlug} {...ladder} />
        ))}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
