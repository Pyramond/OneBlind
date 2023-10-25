// Fonction pour calculer les points attribués aux joueurs lorsqu'ils sont éliminés

export function calculatePoints(place) {
    
    switch(place) {
        case 1:
            return 50
        case 2:
            return 25
        case 3:
            return 15
        case 3 && 4:
            return 5
        default:
            return 0
    }
}