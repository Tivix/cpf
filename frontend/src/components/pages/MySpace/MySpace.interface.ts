export interface MySpaceProps {
  data: {
    user: {
      firstName: string;
      lastName: string;
      photo?: string;
      position: string;
    };
    currentLevel: {
      band: number;
      score: number;
    };
    nextLevel: {
      band: number;
      threshold: number;
    };
  };
}

export interface MySpaceHooks {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}
