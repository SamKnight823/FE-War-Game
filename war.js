class Card {
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
    describe(){
        console.log(`
        The ${this.name} worth ${this.value} points`)
    }
}
class Deck{
    constructor(){
        this.cards = [];
        this.numbers = ["Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen",
        "King","Ace"];
        this.suits = ["Clubs","Hearts","Spades","Diamonds"];
    }
    makeCards(){
        let name = "";
        for(let suit of this.suits){
            let value = 2;
            for(let number of this.numbers){
                name = `${number} of ${suit}`;
                let card = new Card(name, value);
                this.cards.push(card);
                value ++;
            }
        }     
    }
    shuffle(){
        for(let i = this.cards.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
        return this.cards;
    }
    draw(){
        let card = this.cards.shift();
        return card;
    }
    describe(){
        for(let card of this.cards){
            card.describe();
        }
    }
    
}
class Player{
    constructor(){
        this.hand = [];
        this.score = 0;
    }
    draw(deck){
        let card = deck.draw();
        this.hand.push(card);
        card.describe();

    }
    describe(){
        for(let card of this.hand){
            card.describe();
        }
    }
    flip(){
       return this.hand.shift();
    }
    incrementScore() {
		this.score += 1;
	}

}
class Menu{
    constructor(){
    }
    start(){
        let deck = new Deck;
        deck.makeCards();
        deck.shuffle();
        let player1 = new Player;
        let player2 = new Player;
        this.dealCards(player1, player2, deck); 
        this.playGame(player1, player2);  
        this.printFinalScore(player1, player2);     
    }
    dealCards(p1, p2, deck){
        for (let i = 1; i < 53; i++) {
			if (i % 2 == 0) {
				p1.draw(deck);
			}else {
				p2.draw(deck);
			}
		}
    }
    playGame(p1,p2){
        alert("The game begins!");
        for (let i = 0; i < 26; i++ ) {
			let p1Card = p1.flip();
            let p2Card = p2.flip();
			alert(`Player 1 played the ${p1Card.name} and 
            Player 2 played the ${p2Card.name}`);
			if (p1Card.value > p2Card.value) {
				p1.incrementScore();				
				alert(`Player 1 earns a point new score: ${p1.score}`);
			}else {
				p2.incrementScore();				
				alert(`Player 2 earns a point new score: ${p2.score}`);
			}
		}
    }
    printFinalScore(p1,p2){
        if(p1.score > p2.score){
            alert(`Player 1 won with a total score of ${p1.score}`);
        }else{
            alert(`Player 2 won with a total score of ${p2.score}`);
        }
    }
}
let menu = new Menu;
menu.start();
