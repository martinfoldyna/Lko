export const Config = {
  microsoft: {
    appId: '74a68785-0491-4ba1-8edf-24d1f91db681', // PSLIB - Klíč pro Microsoft přihlášení
    // appId: '3363a6fa-a0eb-4ba4-a1d7-c8c6d0f22aa1', // LOCALHOST - Klíč pro Microsoft přihlášení
    scopes: ["user.read"]
  },
  google: {
    // providerID: '63183198040-t7kq60occjo8uqpc60bmasg6g0s2r42p.apps.googleusercontent.com', // Localhost - Klíč pro Google přihlášení
    providerID: '752176834537-n6n0f6q82e1v69kv1q333fc7m0ubkue2.apps.googleusercontent.com', // PSLIB - Klíč pro Google přihlášení
  },
  apiUrl: 'https://lyceum.pslib.cloud/api/', // PSLIB - URL k api
  // apiUrl: 'http://localhost:3000/api/', // LOCALHOST - URL k api
}
