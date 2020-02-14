class Powerup {
    constructor(root, enemyX, enemyY) {
        this.x = enemyX;
        this.y = enemyY;
        this.root = root;
        this.destroyed = false;
        this.domElement = document.createElement('img');
        this.domElement.id = 'powerup';
        this.domElement.src = 'images/burgerpowerup.png';
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = `${this.y}px`;
        this.domElement.style.zIndex = '7';
        root.appendChild(this.domElement);
    }
    destroy = () => {
        this.root.removeChild(document.getElementById('powerup'));
        this.destroyed = true;  
    }
    update3 = (timeDiff) => {
        this.y = this.y + timeDiff * .5;
        this.domElement.style.top = `${this.y}px`;
        if(this.y > GAME_HEIGHT) {
            console.log('root' + this.root)
            console.log('dom element' + this.domElement)
            
            this.root.removeChild(document.getElementById('powerup'));
            this.destroyed = true;

        }
    }
}