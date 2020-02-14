class Satellite1{
    constructor(root, playerX) {
        this.x = playerX
        this.y = GAME_HEIGHT-PLAYER_HEIGHT - 10;
        this.destroyed = false;
        this.domElement = document.createElement('img');
        this.domElement.src = 'images/burgerSatellite.png';
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x - PLAYER_WIDTH}px`
        this.domElement.style.top = `${this.y}px`
        this.domElement.style.zIndex = '10';
        root.appendChild(this.domElement);
    }
    satLeft () {
        if (this.x > 0) {
            this.x = this.x - PLAYER_WIDTH;
        }
        this.domElement.style.left = `${this.x}px`
    }
    satRight () {
        if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
            this.x = this.x + PLAYER_WIDTH;
        }
        this.domElement.style.left = `${this.x}px`;
    }
}