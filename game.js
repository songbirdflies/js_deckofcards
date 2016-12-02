function PlayerName() { 
				var person = prompt("Hi! What's your name?");

				if (playerName != null) {
					document.getElementById("playerName").innerHTML = "Player: " + person;
				}
			};
function danceMonkey() {
	    		var image = document.getElementById('standingMonkey');
	    		if (image.src.match("dancing_monkey")) {
	        image.src = "images/standing_monkey.gif";
	    		} else {
	        image.src = "images/dancing_monkey.gif";
	    		}
			};

$(document).ready(function(){

	function Card(rank, suit) {
	    this.rank = rank;
	    this.suit = suit;
	}

	function Deck(){
		this.deck = [];

		for (var i = 1; i < 14; i++) { //i is rank
			this.deck.push(new Card(i, "Clubs"));
			this.deck.push(new Card(i, "Spades"));
			this.deck.push(new Card(i, "Hearts"));
			this.deck.push(new Card(i, "Diamonds"));
		}
	}

	function Player(){
		// hit, bust, and get value of hand
		this.deck = new Deck();
		this.hand = [];
		this.value = [];

		function random_range(min, max){
			return Math.floor(Math.random()* (max - min +1)) + min;
		}

		this.hit = function(){
			var card = this.deck.deck[random_range(0,51)]
			//deck from line 21
			this.hand.push(card);
			return card;
		}

		this.handValue = function() {
			var value = 0;
			for (var i=0; i < this.hand.length; i++) {
				if (this.hand[i].rank > 10) {
					value += 10;
				}
				else if (this.hand[i].rank == i && !this.busted()) {
					value +=11;
				}
				else {
					value += this.hand[i].rank;
				}
			}
			return value;
		}

		this.busted = function() {
			if (this.handValue() > 21) {
				return true;
			} else {
				return false;
			}
		}
	}

	function BlackJack() {
		this.deck = new Deck();
		this.dealer = new Player();
		this.player1 = new Player();

		this.removeCard = function(card) {
			for (var i=0; i < 51; i++) {
				if (this.deck.deck[i].rank == card.rank && this.deck.deck[i].suit == card.suit) {
				this.deck.deck.splice(i, 1);
				return this.deck.deck;
				}
			}
		}

	   this.displayCard = function(card) {
      var sprite = { x: null, y: null};
      if (card.suit == "Clubs") {
        sprite.y = 0;
      }
      if (card.suit == "Spades") {
        sprite.y = -98;
      }
      if (card.suit == "Hearts") {
        sprite.y = -196;
      }
      if (card.suit == "Diamonds") {
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
      var playerFirstHit = this.player1.hit();
      var dealerFirstHit = this.dealer.hit();
      var playerSecondHit = this.player1.hit();
      var dealerSecondHit = this.dealer.hit();

      this.removeCard(playerFirstHit);
      this.removeCard(dealerFirstHit);
      this.removeCard(playerSecondHit);
      this.removeCard(dealerSecondHit);

      cord1 = this.displayCard(playerFirstHit);
      cord2 = this.displayCard(playerSecondHit);
      cord3 = this.displayCard(dealerFirstHit);

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
  }
  	
  	bj = new BlackJack();
  	bj.deal();

	$("button").click(function(){
	    attr = $(this).attr("id");
	    if (attr == "hit") {
	      var card = bj.player1.hit();
	      bj.removeCard(card);
	      cord = bj.displayCard(card);

	      var html = $("#player").html();

	      $("#player").html(html + "<p style=\"background-image: url('cards.png'); background-position: " + cord.x + "px " + cord.y + "px;\"></p>");

	      if (bj.player1.handValue() > 21) {
	        alert("You Lost");
	      }
	    }

	    if (attr == "stay") {
	      var cord = bj.displayCard(bj.dealer.hand[1]);
	      $("#dealer_2").css({"background-image": "url('cards.png')", "background-position":cord.x + "px " + cord.y + "px"})
	      while(bj.dealer.handValue() < 18) {
	        var dealerHit = bj.dealer.hit();
	        var html = $("#dealer").html();
	        bj.removeCard(dealerHit);
	        cord = bj.displayCard(dealerHit);
	        $("#dealer").html(html + "<p style=\"background-image: url('cards.png'); background-position: " + cord.x + "px " + cord.y + "px;\"></p>");
	      }
	      if (bj.dealer.handValue() > 21 || bj.dealer.handValue() < bj.player1.handValue()) {
	        alert("You Won");
	        window.location.reload();
	        
	      } else if (bj.dealer.handValue() > bj.player1.handValue()) {
	        alert("You Lost");
	        window.location.reload();
	      }
	    }

	 })

})