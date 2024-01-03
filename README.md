# OneBlind
 Poker Manager like blindValet

 Backend => https://github.com/Pyramond/Oneblind-Backend

 
<p align="center">
 <a href='https://github.com/shivamkapasia0' target="_blank"><img alt='React' src='https://img.shields.io/badge/React-100000?style=plastic&logo=React&logoColor=FEFFFE&labelColor=696868&color=01A1FD'/></a>
 <a href='https://github.com/shivamkapasia0' target="_blank"><img alt='Vite' src='https://img.shields.io/badge/Vite-100000?style=plastic&logo=Vite&logoColor=FEFFFE&labelColor=696868&color=01A1FD'/></a>
 <a href='https://github.com/shivamkapasia0' target="_blank"><img alt='Redux' src='https://img.shields.io/badge/Redux-100000?style=plastic&logo=Redux&logoColor=FEFFFE&labelColor=696868&color=01A1FD'/></a>
 <a href='https://github.com/shivamkapasia0' target="_blank"><img alt='Bootstrap' src='https://img.shields.io/badge/Bootstrap-100000?style=plastic&logo=Bootstrap&logoColor=FEFFFE&labelColor=696868&color=01A1FD'/></a>
</p>

## prerequisites

- Install backend server 
- Install NodeJs and Npn
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
![profile](https://github.com/Pyramond/OneBlind/assets/83555414/4f857815-c681-4b62-a4bb-022047590fb4)
![home](https://github.com/Pyramond/OneBlind/assets/83555414/9492c042-ae3d-46d2-bd35-8f8210f8c480)
![dashboard](https://github.com/Pyramond/OneBlind/assets/83555414/c678aaae-f641-40f7-ac01-ff125c6f3158)
