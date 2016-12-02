
function Card(rank, suit) { 
			  this.rank = rank;
			  this.suit = suit;

			};

			function Deck () {
				this.deck = [];
				for (var i = 1; i < 14; i++) { //i is rank
					this.deck.push(new Card(i, "Clubs"));
					this.deck.push(new Card(i, "Spades"));
					this.deck.push(new Card(i, "Hearts"));
					this.deck.push(new Card(i, "Diamonds"));
				}
			};

			function Player() {
				// hit, bust, and get value of hand
				this.playerHand = [];
				this.playerScore = [];
				this.playerDeck = new Deck();

				function random_range(min, max){
		 			return Math.floor(Math.random() * (max - min +1)) + min;
					}

				this.hit = function() {
	      		var card = this.playerDeck.deck[random_range(0,51)]; 
	      		//deck from line 21
	      		this.playerHand.push(card);
	      		return card;
	 			}

	 			this.handValue = function() {
	 				var score = 0;
	 				for(var i = 0; i < this.playerHand.length; i++){
	 				if (this.playerHand[i].rank > 10) {
	 					score += 10;
	 				}
	 				else if (this.playerHand[i].rank == 1 && !this.busted()) {
	 					score += 11;
	 				}
	 				else {
	 					score += this.playerHand[i].rank;
	 				}
				  } //closes for loop
				  return score;
	 			} //closes handValue

	 			this.busted = function() {
	 				if (this.handValue() > 21) {
	 					return true;
	 				}
	 				else {
	 					return false;
	 				}
	 			} //closes busted
			};
			
			
		player = new Player();
		player.hit();
		player.hit();
		console.log(player.playerHand);
		console.log(player.handValue());

		function BlackJack (){
			// dealing cards per player, showing score, displaying cards
			// instantiate dealer and card
			// this.player = new Player

			this.deck = new Deck();
			this.dealer = new Player();
			this.userPlayer = new Player();

			this.removeCard = function(card) {
				for (var i = 0; i < 52; i++);
					if (this.deck.deck[i].rank == card.rank && this.deck.deck[i].suit == card.suit) {
						this.deck.deck.splice(i, 1);
						return this.deck.deck;
					}
			} //closes removeCard
		
		}
				
			this.displayCard = function(card) {
		      var sprite = { x: null, y: null};
		      if (card.suite == "Clubs") {
		        sprite.y = 0;
		      }
		      if (card.suite == "Spades") {
		        sprite.y = -98;
		      }
		      if (card.suite == "Hearts") {
		        sprite.y = -196;
		      }
		      if (card.suite == "Diamonds") {
		        sprite.y = -294;
		      }
		      if (card.rank == 1) {
		        sprite.x = 0
		      }
		      if (card.rank == 2) {
		        sprite.x = -73
		      }
		      if (card.rank == 3) {
		        sprite.x = -146
		      }
		      if (card.rank == 4) {
		        sprite.x = -219
		      }                  
		      if (card.rank == 5) {
		        sprite.x = -292
		      }
		      if (card.rank == 6) {
		        sprite.x = -365
		      }   
		      if (card.rank == 7) {
		        sprite.x = -438
		      }
		      if (card.rank == 8) {
		        sprite.x = -511
		      }
		      if (card.rank == 9) {
		        sprite.x = -584
		      }
		      if (card.rank == 10) {
		        sprite.x = -657
		      }
		      if (card.rank == 11) {
		        sprite.x = -730
		      }
		      if (card.rank == 12) {
		        sprite.x = -803
		      }
		      if (card.rank == 13) {
		        sprite.x = -876
		      }
		      return sprite;
		    }

		    this.deal = function() {
		    	var playerFirstHit = this.userPlayer.hit();
		    	var playerSecondHit = this.userPlayer.hit();
		    	var dealerFirstHit = this.dealer.hit();
		    	var dealerSecondHit = this.dealer.hit();

		    	this.removeCard(playerFirstHit);
		    	this.removeCard(playerSecondHit);
		    	this.removeCard(dealerFirstHit);
		    	this.removeCard(dealerSecondHit);

		    	card1 = this.displayCard(playerFirstHit);
		    	card2 = this.displayCard(playerSecondHit);
		    	card3 = this.displayCard(dealerFirstHit);

		    	var playerHand = $("div#player").children('p');
		      var dealerHand = $("div#dealer").children('p');
		      var playerCard1 = playerHand[0];
		      var playerCard2 = playerHand[1];
		      var dealerCard1 = dealerHand[0];
		      var dealerCard2 = dealerHand[1];


		      $(playerCard1).css({"background-image": "url('cards.png')", "background-position":cord1.x + "px " + cord1.y + "px"});
		      $(playerCard2).css({"background-image": "url('cards.png')", "background-position":cord2.x + "px " + cord2.y + "px"});
		      $(dealerCard1).css({"background-image": "url('cards.png')", "background-position":cord3.x + "px " + cord3.y + "px"});
		      $(dealerCard2).css({"background-image": "url('back.png')"});

		    }
		//};

		 bj = new BlackJack();
		 //bj.deal();

		  $("button").click(function(){
		    attr = $(this).attr("id");
		    if (attr == "hit") {
		      var card = bj.userPlayer.hit();
		      bj.removeCard(card);
		      cord = bj.displayCard(card);

		      var html = $("#player").html();

		      $("#player").html(html + "<p style=\"background-image: url('cards.png'); background-position: " + cord.x + "px " + cord.y + "px;\"></p>");

		      if (bj.userPlayer.handValue() > 21) {
		        alert("You Lost");
		      }
		    }

		    if (attr == "stay") {
		      var cord = bj.displayCard(bj.dealer.hand[1]);
		      $("#dealer_2").css({"background-image": "url('cards.png')", "background-position":cord.x + "px " + cord.y + "px"})
		      while(bj.dealer.handValue() < 17) {
		        var dealerHit = bj.dealer.hit();
		        var html = $("#dealer").html();
		        bj.removeCard(dealerHit);
		        cord = bj.displayCard(dealerHit);
		        $("#dealer").html(html + "<p style=\"background-image: url('cards.png'); background-position: " + cord.x + "px " + cord.y + "px;\"></p>");
		      }
		      if (bj.dealer.handValue() > 21 || bj.dealer.handValue() < bj.userPlayer.handValue()) {
		        alert("You Won");
		        window.location.reload();
		      } else if (bj.dealer.handValue() > bj.userPlayer.handValue()) {
		        alert("You Lost");
		        window.location.reload();
		      }
		    }
		  })


