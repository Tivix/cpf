import {ReactNode} from 'react';

export interface LevelCardProps {
  title: string;
  band: number;
  score: number;
  icon: ReactNode;
  scoreLabel: string;
}
