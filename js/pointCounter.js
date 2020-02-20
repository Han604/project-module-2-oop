class Pointcounter {
    constructor(root) {
        this.domElement = document.createElement('div');
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = '10px';
        this.domElement.style.top = '10px'
        this.domElement.style.zIndex = '3';
        this.domElement.style.color = 'white';
        root.appendChild(this.domElement);
    }
    updatePoint() {
        this.domElement.innerHTML = `POINTS:${POINT_COUNTER}`
    }
}