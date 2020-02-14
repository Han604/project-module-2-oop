class Powerup {
    constructor(root, enemyX, enemyY) {
        this.x = enemyX;
        this.y = enemyY;
        this.consumed = false;
        this.domElement = document.createElement('img');
        this.domElement.src = 'images/burgerpowerup.png';
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = `${this.y}px`;
        this.domElement.style.zIndex = '7';
        root.appendChild(this.domElement);
    }
    update3 = () => {
        this.y = this.y + timeDiff * this.speed;
        this.domElement.style.top = `${this.y}px`;
        if(this.y > GAME_HEIGHT) {
            this.root.removechild(this.domElement);
            this.consumed = true;
        }
    }
}