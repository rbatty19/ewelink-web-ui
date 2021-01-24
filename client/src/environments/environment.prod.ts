export const environment = {
  production: true,
  urlBase: 'https://server-ewelink-api.vercel.app',
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
  urlWebSocket: (region = "us") => `wss://${region}-pconnect3.coolkit.cc:8080/api/ws`,
  alternativeIcon: 'https://static.thenounproject.com/png/252447-200.png'
};
