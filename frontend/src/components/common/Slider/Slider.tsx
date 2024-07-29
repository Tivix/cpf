import { FC } from 'react';
import { SliderProps } from '@app/components/common/Slider/Slider.interface';

export const Slider: FC<SliderProps> = (props) => {
  return <input type="range" className="range h-[1px] w-full" {...props} />;
};
