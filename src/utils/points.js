// Fonction pour calculer les points attribués aux joueurs lorsqu'ils sont éliminés

export function calculatePoints(place, nbPlayer) {

    const defaultPoints = 1

    switch(nbPlayer) {
        case 6:
            switch(place) {
                case 1: return 38
                case 2: return 22
                default: return defaultPoints
            }

        case 7:
            switch(place) {
                case 1: return 46
                case 2: return 24
                default: return defaultPoints
            }
        case 8:
            switch(place) {
                case 1: return 48
                case 2: return 24
                case 3: return 8
                default: return defaultPoints
            }
    }

    if(nbPlayer < 6) return 0
    if(nbPlayer > 8) {
        switch(place) {
            case 1: return 48
            case 2: return 24
            case 3: return 8
            default: return defaultPoints
        }
    }
}