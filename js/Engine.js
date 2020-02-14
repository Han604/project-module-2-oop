// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
    // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
    // You need to provide the DOM node when you create an instance of the class
    constructor(theRoot) {
        // We need the DOM element every time we create a new enemy so we
        // store a reference to it in a property of the instance.
        this.root = theRoot;
        // We create our hamburger.
        // Please refer to Player.js for more information about what happens when you create a player
        this.player = new Player(this.root);
        // Initially, we have no enemies in the game. The enemies property refers to an array
        // that contains instances of the Enemy class
        this.enemies = [];
        // we add the bullets array that will contain instances of bullets
        this.bullets = [];
        this.powerups = [];
        this.satellites = [];
        // We add the background image to the game
        addBackground(this.root);
    }

    // The gameLoop will run every few milliseconds. It does several things
    //  - Updates the enemy positions
    //  - Detects a collision between the player and any enemy
    //  - Removes enemies that are too low from the enemies array
    gameLoop = () => {
        // This code is to see how much time, in milliseconds, has elapsed since the last
        // time this method was called.
        // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
        if (this.lastFrame === undefined) this.lastFrame = (new Date).getTime();
        let timeDiff = (new Date).getTime() - this.lastFrame;
        this.lastFrame = (new Date).getTime();
        // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
        // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
        this.powerups.forEach(powerup => {
            powerup.update3(timeDiff);
        })

        this.bullets.forEach(bullet => {
            bullet.update2(timeDiff);
        });
        
        this.enemies.forEach(enemy => {
            enemy.update(timeDiff);
        });
        this.powerups = this.powerups.filter(powerup => {
            return !powerup.consumed;
        })

        this.bullets = this.bullets.filter(bullet => {
            return !bullet.destroyed;
        })
        // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
        // We use filter to accomplish this.
        // Remember: this.enemies only contains instances of the Enemy class.
        this.enemies = this.enemies.filter(enemy => {
            return !enemy.destroyed;
        });
        // We need to perform the addition of enemies until we have enough enemies.
        while (this.enemies.length < MAX_ENEMIES) {
            // We find the next available spot and, using this spot, we create an enemy.
            // We add this enemy to the enemies array 
            const spot = nextEnemySpot(this.enemies);
            this.enemies.push(new Enemy(this.root, spot));
        }
        // We check if the player is dead. If he is, we alert the user
        // and return from the method (Why is the return statement important?)
        if (this.isPlayerDead()) {
            window.alert("Game over");
            return;
        }
        POWERUP_TIMER += 1;
        console.log(POWERUP_TIMER);
        // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
        setTimeout(this.gameLoop, 20);
    }
    // This method is not implemented correctly, which is why
    // the burger never dies. In your exercises you will fix this method.
    
    isPlayerDead = () => {
        // console.log ('upkeep')
        return this.collisionCheck(this.player);
        
    }

    collisionCheck = (player) => {
        let check = false
        // console.log(player);
        // console.log(this.enemies);
        // console.log(`player x:${player.x} player y:${player.y} enemy x:${enemy.x} enemy y:${enemy.y}`)
        this.enemies.forEach(enemy => {
            // console.log(`player x:${player.x} player y:${player.y} enemy x:${enemy.x} enemy y:${enemy.y}`)
            // console.log('player.x < enemy.x + enemy.width', player.x, '<', enemy.x , enemy.width);
            // console.log('player.x + player.width > enemy.x', player.x + player.width > enemy.x);
            // console.log('player.y < enemy.y + enemy.height', player.y < enemy.y + enemy.height);
            // console.log('player.y + player.height > enemy.y', player.y + player.height > enemy.y);
            if (player.x < enemy.x + ENEMY_WIDTH &&
                player.x + PLAYER_WIDTH > enemy.x &&
                player.y < enemy.y + ENEMY_HEIGHT &&
                player.y + PLAYER_HEIGHT > enemy.y) {
                    // console.log('hit')
                    check = true;
                }
            });
            // console.log('check',check)
            return check;
        }
    collisionCheckBullet = () => {
        this.bullets.forEach (cucumber => {
            this.enemies.forEach (enemy => {
                // console.log ('cucumber.x < enemy.x + ENEMY_WIDTH' + cucumber.x, enemy.x, ENEMY_WIDTH)
                if (cucumber.x < enemy.x + ENEMY_WIDTH &&
                    cucumber.x + BULLET_WIDTH > enemy.x &&
                    cucumber.y < enemy.y + ENEMY_HEIGHT &&
                    cucumber.y + BULLET_HEIGHT > enemy.y) {
                        enemy.destroyed = true;
                        bullet.destroyed = true;
                        if (POWERUP_TIMER >= 400) {
                            let powerCheck = (Math.random() * 10)
                            if (powerCheck >= 4) {
                                this.powerups.push(new Powerup(this.root, enemy.x, enemy.y))
                            }
                        }
                    }
            })
        })
    }
    collisionCheckPowerup = () => {
        this.powerups.forEach (powerup => {
            if (powerup.x < this.player.x + PLAYER_WIDTH &&
                powerup.x + POWERUP_WIDTH > this.player.x &&
                powerup.y < this.player.y + PLAYER_HEIGHT &&
                powerup.y + POWERUP_HEIGHT > this.player.y) {
                    powerup.destroyed = true;
                    if (this.satellites.includes(Satellite1)) {
                        this.satellites.push(new Satellite2(this.root, this.player.x));
                    } else if (this.satellites.includes(Satellite2)) {
                        this.satellites.push(new Satellite1(this.root, this.player.x));
                    }else {
                        return;
                    }
                    // this.satellites.push(new Satellite1(this.root, this.player.x));
                }
        })
    };
        
        fireBullet = () => {
            this.bullets.push(new Bullet(this.root, this.player.x));
        }
    }
    // const ENEMY_WIDTH = 75;
    // const ENEMY_HEIGHT = 156;
    // const MAX_ENEMIES = 3;
    //enemy.x enemy.y
    
// // These constants represent the player width and height.
// const PLAYER_WIDTH = 75;
// const PLAYER_HEIGHT = 54;
//player.x player.y