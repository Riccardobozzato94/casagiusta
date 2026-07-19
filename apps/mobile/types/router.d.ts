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

export type ModalRoutes = {
  abbonamento: undefined;
};

export type StackRoutes = {
  notifiche: undefined;
  avvocati: undefined;
};

export type LawyerRoutes = {
  'avvocati/[id]': { id: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutes, OnboardingRoutes, TabRoutes, EmergencyRoutes, ModalRoutes, StackRoutes, LawyerRoutes {}
  }
}
