// Simple Solitaire Game
const Solitaire = {
    deck: [],
    
    init: function() {
        const container = document.getElementById('solitaire-game');
        if (!container) return;
        
        container.innerHTML = `
            <div class="solitaire-message">
                🎴 Classic Solitaire - Windows XP Style
            </div>
            <div class="solitaire-board">
                <div class="solitaire-top">
                    <div class="solitaire-deck">
                        <div class="card-slot" onclick="Solitaire.drawCard()">
                            <div>DECK</div>
                        </div>
                        <div class="card-slot" id="drawn-card"></div>
                    </div>
                    <div class="solitaire-foundation">
                        <div class="card-slot">♠️</div>
                        <div class="card-slot">♥️</div>
                        <div class="card-slot">♣️</div>
                        <div class="card-slot">♦️</div>
                    </div>
                </div>
            </div>
            <div class="solitaire-controls">
                <button class="solitaire-btn" onclick="Solitaire.newGame()">New Game</button>
                <button class="solitaire-btn" onclick="Solitaire.hint()">Hint</button>
            </div>
            <div class="solitaire-message" id="game-status">
                Click "New Game" to start playing!
            </div>
        `;
        
        this.initDeck();
    },
    
    initDeck: function() {
        const suits = ['♠️', '♥️', '♣️', '♦️'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        this.deck = [];
        suits.forEach(suit => {
            values.forEach(value => {
                this.deck.push({
                    suit: suit,
                    value: value,
                    color: (suit === '♥️' || suit === '♦️') ? 'red' : 'black'
                });
            });
        });
        
        this.shuffle();
    },
    
    shuffle: function() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    },
    
    drawCard: function() {
        if (this.deck.length === 0) {
            this.updateStatus('No more cards in deck!');
            return;
        }
        
        const card = this.deck.pop();
        const drawnSlot = document.getElementById('drawn-card');
        
        if (drawnSlot) {
            drawnSlot.innerHTML = `
                <div class="card ${card.color}">
                    ${card.value}${card.suit}
                </div>
            `;
        }
        
        this.updateStatus(`Drew: ${card.value}${card.suit} | Cards left: ${this.deck.length}`);
    },
    
    newGame: function() {
        this.initDeck();
        const drawnSlot = document.getElementById('drawn-card');
        if (drawnSlot) {
            drawnSlot.innerHTML = '';
        }
        this.updateStatus('New game started! Click DECK to draw cards.');
    },
    
    hint: function() {
        const hints = [
            'Try to build sequences in descending order!',
            'Alternate between red and black cards.',
            'Aces go to the foundation piles.',
            'Keep drawing cards from the deck!',
            'Plan your moves ahead of time.'
        ];
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        this.updateStatus(`💡 Hint: ${randomHint}`);
    },
    
    updateStatus: function(message) {
        const status = document.getElementById('game-status');
        if (status) {
            status.textContent = message;
        }
    }
};