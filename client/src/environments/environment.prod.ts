export const environment = {
  production: true,
  urlBase: 'https://server-ewelink-api.vercel.app',
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
  urlWebSocket: (region = "us") => `wss://${region}-pconnect3.coolkit.cc:8080/api/ws`
};
