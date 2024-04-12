export function getDiceBearAvatar(seed) {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=65c9ff,b6e3f4`
}

export function getOxroAvatar(name) {
    return `https://avatar.oxro.io/avatar.svg?name=${name}&background=${getRandomHexColor()}&length=1`
}

function getRandomHexColor() {
    
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
  
    
    let hexR = r.toString(16).padStart(2, '0');
    let hexG = g.toString(16).padStart(2, '0');
    let hexB = b.toString(16).padStart(2, '0');
  
    
    let hexColor = hexR + hexG + hexB;
  
    return hexColor;
  }
  

export function defineAvatar(name, avatar) {

    switch(avatar) {
        case -1: 
            return `https://avatar.oxro.io/avatar.svg?name=${name}&background=${getRandomHexColor()}&length=1`
        case 0:
            return `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=65c9ff,b6e3f4`
    }

    if(avatar > 0) {
        return `${import.meta.env.VITE_BACKEND_SERVER}/static/avatars/avatar${avatar}.png`
    }
}