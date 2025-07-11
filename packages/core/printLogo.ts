export default function () {
  if (PROD) {
    const logo = `
____________________________________________________________________________

   _____          ___________.__                                __    
  /     \ ___.__. \_   _____/|  |   ____   _____   ____   _____/  |_  
 /  \ /  <   |  |  |    __)_ |  | _/ __ \ /     \_/ __ \ /    \   __\ 
/    Y    \___  |  |        \|  |_\  ___/|  Y Y  \  ___/|   |  \  |   
\____|__  / ____| /_______  /|____/\___  >__|_|  /\___  >___|  /__|   
        \/\/              \/           \/      \/     \/     \/                       
____________________________________________________________________________
                              author:WqW
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[EricUI]:dev mode...");
  }
}
