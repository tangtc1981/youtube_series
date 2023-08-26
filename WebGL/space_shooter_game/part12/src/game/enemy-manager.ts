import { SpriteRenderer } from "../sprite-renderer";
import { Enemy } from "./enemy";
import { MeteorEnemy } from "./meteor-enemy";



const SPAWN_INTERVAL = 1000;

export class EnemyManager {
    private timeToSpawn = 0;
    private pool: Enemy[] = [];

    constructor(private width: number, private height: number) {
    }

    private spawnEnemy() {
        if (this.timeToSpawn > SPAWN_INTERVAL) {
            this.timeToSpawn = 0;

            let enemy = this.pool.find(e => !e.active);
            if (!enemy) {
                enemy = new MeteorEnemy(this.width, this.height);
                this.pool.push(enemy);
            }

            enemy.active = true;
            enemy.drawRect.x = Math.random() * (this.width - enemy.drawRect.width);
            enemy.drawRect.y = -enemy.drawRect.height;
        }
    }

    update(dt: number) {
        this.timeToSpawn += dt;
        this.spawnEnemy();

        for (let enemy of this.pool) {
            if (enemy.active) {
                enemy.update(dt);

                if (enemy.drawRect.y > this.height) {
                    enemy.active = false;
                }
            }
        }
    }

    draw(spriteRenderer: SpriteRenderer) {
        for (let enemy of this.pool) {
            if (enemy.active) {
                enemy.draw(spriteRenderer);
            }

        }
    }
}