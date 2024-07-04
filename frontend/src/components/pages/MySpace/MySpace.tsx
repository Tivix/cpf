import { Typography } from '@app/components/common/Typography';
import { MySpaceProps } from '@app/components/pages/MySpace/MySpace.interface';
import { Header } from '@app/components/pages/MySpace/modules/Header';

export const MySpace: React.FC<MySpaceProps> = ({ data }) => {
  const { user, currentLevel, nextLevel } = data;
  return (
    <div>
      <Typography className="mb-10" variant="body-l/semibold" as="h1">
        My Space
      </Typography>
      <Header user={user} currentLevel={currentLevel} nextLevel={nextLevel} />
    </div>
  );
};
