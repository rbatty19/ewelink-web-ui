export const environment = {
  production: false,
  urlBase: 'https://ewelink-web-api-git-dev.rober191.vercel.app',
  menuLinks: [
    {
      link: 'https://github.com/Rober19/ewelink-web-ui',
      icon: 'folder',
      text: 'App Repository'
    },
    {
      link: 'https://github.com/Rober19',
      icon: 'github',
      text: 'Rober19'
    },
    {
      link: 'https://github.com/DevelopGadget',
      icon: 'github',
      text: 'DevelopGadget'
    }
  ],
  urlWebSocket: (region = "us") => `wss://${region}-pconnect3.coolkit.cc:8080/api/ws`,
  alternativeIcon: 'https://static.thenounproject.com/png/252447-200.png'
};
