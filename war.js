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
    //makeCards function loops through both arrays to assign a number and suit then uses an incrementing integer for a value
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
    //shuffle method uses the random number returned by Math.random to mix up indexes of the cards to simulate shuffling a deck
    shuffle(){
        for(let i = this.cards.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
        return this.cards;
    }
    //draw method returns the top card by use of shift on an array since shift returns the first element in an array
    draw(){
        return this.cards.shift();        
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
    //this draw method adds the top card of the deck to the array of cards that each player was given when instantiated
    draw(deck){
        this.hand.push(deck.draw());
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
        console.log("The game begins!");
        for (let i = 0; i < 26; i++ ) {
			let p1Card = p1.flip();
            let p2Card = p2.flip();
			console.log(`Player 1 played the ${p1Card.name} and 
            Player 2 played the ${p2Card.name}`);
			if (p1Card.value > p2Card.value) {
				p1.incrementScore();				
				console.log(`Player 1 earns a point new score: ${p1.score}`);
			}else if(p1Card.value < p2Card.value) {
				p2.incrementScore();				
				console.log(`Player 2 earns a point new score: ${p2.score}`);
			}else{
                console.log("Tie round, no points awarded");
            }
		}
    }
    printFinalScore(p1,p2){
        if(p1.score > p2.score){
            console.log(`Player 1 won with a total score of ${p1.score}`);
        }else{
            console.log(`Player 2 won with a total score of ${p2.score}`);
        }
    }
}
let menu = new Menu;
menu.start();
