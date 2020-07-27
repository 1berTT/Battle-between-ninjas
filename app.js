new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100,
        running: false,
        logs: []
    },
    computed: {
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame(){
            this.running = !this.running
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        giveUP(){
            this.running = !this.running
        },
        atack(especial){
            this.hurt('monsterLife',3, 6, especial, 'JIRAYA', 'PAIN', 'player')
            if(this.monsterLife > 0){
                this.hurt('playerLife',4, 8, false, 'PAIN', 'JIRAYA', 'monster')
            }
        },
        hurt(alvo, min, max, especial, atacante, atacado, classe){
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[alvo] = Math.max(this[alvo] - hurt, 0)
            this.registerLog(atacante + " atingiu o " + atacado + " com " + hurt + " de dano.", classe)
        },
        heal(min, max){
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog("JIRAYA ganhou " + heal + " de força.", 'curar')
        },
        healAndHurt(){
            this.heal(6, 10)
            this.hurt('playerLife', 4, 8, false, 'Monstro', 'Jogador', 'monster')
        },
        getRandom(min, max){
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, classe){
            this.logs.unshift({ text, classe })
        }
    },
    watch: {
        hasResult(value){
            if(value){
                this.running = false
            }
        }
    }
})