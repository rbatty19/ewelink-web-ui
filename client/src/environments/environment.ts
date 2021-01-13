// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  menuLinks: [
    {
      link: 'https://github.com/Rober19/ewelink-web-ui',
      icon: 'folder',
      text: 'App Repository',
      isSvg: false
    },
    {
      link: 'https://github.com/Rober19',
      icon: 'github',
      text: 'Rober19',
      isSvg: true
    },
    {
      link: 'https://github.com/DevelopGadget',
      icon: 'github',
      text: 'DevelopGadget',
      isSvg: true
    }
  ],
  urlBase: 'https://ewelink-web-api-git-dev.rober191.vercel.app',
  urlWebSocket: (region = "us") => `wss://${region}-pconnect3.coolkit.cc:8080/api/ws`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
