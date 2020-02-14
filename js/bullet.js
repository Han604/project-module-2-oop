class Bullet {
    constructor(root, playerX){
        this.x = playerX;
        this.y = 0;
        // console.log(this.y);
        this.domElement = document.createElement('img');
        this.domElement.src = 'images/cucumber.png';
        this.domElement.style.position = 'absolute';
        this.destroyed = false;
        this.domElement.style.left = `${this.x}px`
        this.domElement.style.bottom = `${this.y}px`
        root.appendChild(this.domElement);
        this.domElement.style.transform = 'rotate (720deg)'
    }
    update2(timeDiff) {
        this.y = this.y + timeDiff;
        this.domElement.style.top = `${this.y += 10}px`
        // console.log(this.domElement.style.top)
        if (this.y = 0)  {
            this.root.removeChild(this.domElement);
            this.destroyed = true;
        }
    }
}