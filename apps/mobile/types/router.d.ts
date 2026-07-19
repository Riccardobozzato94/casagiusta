export type AuthRoutes = {
  login: undefined;
  'magic-link-sent': { email: string };
};

export type OnboardingRoutes = {
  welcome: undefined;
  'upload-contract': undefined;
  'analyzing-contract': { documentPath: string };
  'contract-result': { contractId: string };
  completed: undefined;
};

export type TabRoutes = {
  index: undefined;
  vault: undefined;
  giusta: undefined;
  casi: undefined;
  profilo: undefined;
};

export type EmergencyRoutes = {
  index: undefined;
  'kit-generato': { reportId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutes, OnboardingRoutes, TabRoutes, EmergencyRoutes {}
  }
}
