# OneBlind

<div align="center">
 <a href='https://react.dev/' target="_blank"><img alt='React' src='https://img.shields.io/badge/React-^18.2.0-100000?style=flat&logo=React&logoColor=white&labelColor=4d4c4c&color=0c84bc'/></a>
 <a href='https://vitejs.dev/' target="_blank"><img alt='Vite' src='https://img.shields.io/badge/Vite-^4.4.5-100000?style=flat&logo=Vite&logoColor=white&labelColor=4d4c4c&color=0c84bc'/></a>
 <a href='https://redux.js.org/' target="_blank"><img alt='Redux' src='https://img.shields.io/badge/Redux-^1.9.5-100000?style=flat&logo=Redux&logoColor=white&labelColor=4d4c4c&color=0c84bc'/></a>
</div>


 <p>Poker Manager like blindValet</p>
 <a href='https://github.com/Pyramond/Oneblind-Backend' target="_blank"><img alt='GitHub' src='https://img.shields.io/badge/Backend_Server-100000?style=for-the-badge&logo=GitHub&logoColor=white&labelColor=black&color=black'/></a>

  
## prerequisites

- Install [backend server](https://github.com/Pyramond/Oneblind-Backend)
- Install NodeJs and Npm
- Install Docker


## Configuration

- Create a .env file at the app's root
```
VITE_BACKEND_SERVER=XXXXX
VITE_PORT=XXXX
VITE_SPOTIFY_CLIENT_ID=XXXXXXXXXXXXXX
VITE_SPOTIFY_CLIENT_SECRET=XXXXXXXXXXX
```
(VITE_SPOTIFY_CLIENT_SECRET and VITE_SPOTIFY_CLIENT_ID are only required to use Spotify component)


## Run with npm 

-  Install dependencies ```npm i```

#### Run dev server

- Run server ```npm run dev```

#### Run preview

1. Build server ```npm run buid```
2. Run preview server ```npm run preview```


## Run with docker

1. Create image ```docker build -t oneblind .```
2. Run image ```docker run -p 8080:8080 oneblind```


## Screen
![profile](https://github.com/Pyramond/OneBlind/assets/83555414/cfedbcfe-38c5-4a1f-8b27-f01250fe24d1)
![createTournament](https://github.com/Pyramond/OneBlind/assets/83555414/bd084c5e-29c8-455d-8113-636680239808)
![tournament](https://github.com/Pyramond/OneBlind/assets/83555414/6ba72188-ec85-437f-93b4-1fb6a6f93a86)


