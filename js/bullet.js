class Bullet {
    constructor(root, playerX){
        this.root = root;
        this.x = playerX;
        this.y = GAME_HEIGHT;
        // console.log(this.y);
        this.domElement = document.createElement('img');
        this.domElement.src = 'images/cucumber.png';
        this.domElement.style.position = 'absolute';
        this.destroyed = false;
        this.domElement.style.left = `${this.x}px`
        this.domElement.style.top = `${this.y}px`
        root.appendChild(this.domElement);
        this.domElement.style.transform = 'rotate (720deg)'
    }
    destroy(){
        this.root.removeChild(this.domElement);
        this.destroyed = true;
    }
    update2(timeDiff) {
        this.y = this.y - timeDiff * 0.8;
        this.domElement.style.top = `${this.y}px`
        // console.log(this.domElement.style.top)
        if (this.y === 0)  {
            this.root.removeChild(this.domElement);
            this.destroyed = true;
        }
    }
}