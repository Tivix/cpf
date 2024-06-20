import { AdvancementLevelProps } from './AdvancemetLevel.interface';
import { AdvancementLevelComponent } from '@app/components/modules/AdvancementLevel/AdvancementLevel';
import { useAdvancementLevel } from '@app/components/modules/AdvancementLevel/AdvancementLevel.hooks';

export const AdvancementLevel: React.FC<AdvancementLevelProps> = ({ data, showVerticalLine }) => {
  const props = useAdvancementLevel(data);

  return <AdvancementLevelComponent data={data} showVerticalLine={showVerticalLine} {...props} />;
};
