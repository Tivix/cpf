import { Typography } from '@app/components/common/Typography';
import { MySpaceContext } from "@app/context/MySpaceContext/MySpaceContext";

export default function MySpace() {
  return (
    <MySpaceContext.Provider value={{}}>
      <div>
        <Typography className="mb-10" variant="body-l/semibold" as="h1">
          My Space
        </Typography>
      </div>
    </MySpaceContext.Provider>
  );
}
