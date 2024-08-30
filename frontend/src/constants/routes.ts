export const routes = {
  auth: {
    index: '/auth',
  },
  documentation: {
    index: '/documentation',
  },
  library: {
    index: '/library',
  },
  mySpace: {
    index: '/my-space',
    softSkills: '/my-space/soft-skills',
    addNew: {
      projectDetails: '/my-space/add-new/project-details',
      scope: '/my-space/add-new/project-scope',
    },
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
