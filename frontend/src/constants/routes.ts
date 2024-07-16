export const routes = {
  documentation: {
    index: '/documentation',
  },
  library: {
    index: '/library',
  },
  mySpace: {
    index: '/my-space',
  },
  people: {
    index: '/people',
    myProfile: '/people/my-profile',
    addNew: {
      personalDetails: '/people/add-new/personal-details',
      mainLadder: '/people/add-new/main-ladder',
    },
  },
} as const;
