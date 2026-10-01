document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const setupScreen = document.getElementById('setup-screen');
    const gameScreen = document.getElementById('game-screen');
    const board = document.getElementById('board');
    const svgOverlay = document.getElementById('svg-overlay');
    const piecesContainer = document.getElementById('pieces-container');
    const playersListEl = document.getElementById('players-list');
    const rollBtn = document.getElementById('roll-btn');
    const resetBtn = document.getElementById('reset-btn');
    const diceEl = document.getElementById('dice');
    const statusText = document.getElementById('status-text');

    // Game State
    let players = [];
    let currentPlayerIndex = 0;
    let isAnimating = false;
    let cellCoords = {};

    const ladders = { 4: 14, 9: 31, 20: 38, 28: 84, 40: 59, 51: 67, 71: 91, 80: 99 };
    const snakes = { 17: 7, 54: 34, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 99: 78 };
    const allJumps = { ...ladders, ...snakes };
    const diceFaces = ['🎲', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    const playerColors = ['var(--p1)', 'var(--p2)', 'var(--p3)', 'var(--p4)'];

    // Audio Context
    let audioCtx = null;
    function initAudio() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }
    function playTone(freq, type, duration, vol=0.1) {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + duration);
    }
    function playStepSound() { playTone(600, 'sine', 0.1, 0.05); }
    function playDiceSound() { playTone(800, 'square', 0.05, 0.02); }
    function playSnakeSound() {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 1);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 1);
    }
    function playLadderSound() {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.8);
    }
    function playWinSound() { 
        playTone(440, 'triangle', 0.2, 0.1); 
        setTimeout(() => playTone(554, 'triangle', 0.2, 0.1), 200); 
        setTimeout(() => playTone(659, 'triangle', 0.6, 0.1), 400); 
    }

    // 1. Initialize Board HTML
    function initBoard() {
        board.innerHTML = '';
        let cellNumbers = [];
        for(let r = 9; r >= 0; r--) {
            let row = [];
            for(let c = 1; c <= 10; c++) row.push(r * 10 + c);
            if (r % 2 !== 0) row.reverse();
            cellNumbers.push(...row);
        }

        cellNumbers.forEach((num, index) => {
            const cell = document.createElement('div');
            cell.className = `cell ${index % 2 === 0 ? 'alt-bg' : ''}`;
            if (num === 100) {
                cell.classList.add('win-cell');
                cell.innerHTML = '👑<br>100';
            } else {
                cell.textContent = num;
            }
            cell.id = `cell-${num}`;
            board.appendChild(cell);
        });

        setTimeout(() => {
            measureCells();
            drawLines();
        }, 100);
    }

    // 2. Measure Cells for SVG and Pieces
    function measureCells() {
        cellCoords = {};
        for(let i = 1; i <= 100; i++) {
            const cell = document.getElementById(`cell-${i}`);
            if(cell) {
                cellCoords[i] = {
                    x: cell.offsetLeft + cell.offsetWidth / 2,
                    y: cell.offsetTop + cell.offsetHeight / 2
                };
            }
        }
    }

    // 3. Draw Snakes and Ladders
    function drawLines() {
        svgOverlay.innerHTML = '';
        const drawEdge = (startNode, endNode, typeClass) => {
            const start = cellCoords[startNode];
            const end = cellCoords[endNode];
            if (!start || !end) return;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', start.x);
            line.setAttribute('y1', start.y);
            line.setAttribute('x2', end.x);
            line.setAttribute('y2', end.y);
            line.setAttribute('class', typeClass);
            svgOverlay.appendChild(line);
        };
        for(let [start, end] of Object.entries(ladders)) drawEdge(start, end, 'line-ladder');
        for(let [start, end] of Object.entries(snakes)) drawEdge(start, end, 'line-snake');
    }

    // 4. Setup Game
    document.querySelectorAll('.player-select button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            initAudio();
            const numPlayers = parseInt(e.target.getAttribute('data-players'));
            startGame(numPlayers);
        });
    });

    function startGame(numPlayers) {
        players = [];
        playersListEl.innerHTML = '';
        piecesContainer.innerHTML = '';
        currentPlayerIndex = 0;
        
        // Remove old win overlay if exists
        const oldWin = document.querySelector('.win-overlay');
        if(oldWin) oldWin.remove();

        for(let i = 0; i < numPlayers; i++) {
            players.push({ id: i, pos: 0, color: playerColors[i] });
            
            // Create Sidebar Card
            const card = document.createElement('div');
            card.className = `player-card ${i === 0 ? 'active' : ''}`;
            card.id = `pcard-${i}`;
            card.innerHTML = `
                <div class="player-info">
                    <div class="p-indicator" style="background: ${playerColors[i]}"></div>
                    <span class="p-name">Player ${i+1}</span>
                </div>
                <div class="p-pos" id="ppos-${i}">Start</div>
            `;
            playersListEl.appendChild(card);

            // Create Board Piece
            const piece = document.createElement('div');
            piece.className = `piece p${i}`;
            piece.id = `piece-${i}`;
            piecesContainer.appendChild(piece);
        }

        setupScreen.classList.remove('active');
        gameScreen.classList.add('active');
        
        setTimeout(() => {
            measureCells();
            drawLines();
        }, 100);

        updateTurnUI();
    }

    // 5. Turn Logic
    function updateTurnUI() {
        document.querySelectorAll('.player-card').forEach((el, idx) => {
            el.classList.toggle('active', idx === currentPlayerIndex);
        });
        statusText.innerHTML = `Player ${currentPlayerIndex + 1}'s Turn <span style="color:${playerColors[currentPlayerIndex]}">●</span>`;
        statusText.style.color = 'var(--text)';
        rollBtn.disabled = false;
        diceEl.textContent = diceFaces[0];
    }

    function updatePiecePosition(playerIndex) {
        const p = players[playerIndex];
        const pieceEl = document.getElementById(`piece-${playerIndex}`);
        const posEl = document.getElementById(`ppos-${playerIndex}`);
        
        if (p.pos === 0) {
            pieceEl.style.opacity = '0';
            posEl.textContent = 'Start';
            return;
        }
        
        pieceEl.style.opacity = '1';
        posEl.textContent = p.pos;
        
        const target = cellCoords[p.pos];
        if (target) {
            // Offset slightly so multiple pieces can be seen on same tile
            const offsets = [
                {x: -8, y: -8}, {x: 8, y: 8}, {x: -8, y: 8}, {x: 8, y: -8}
            ];
            const offset = offsets[playerIndex];
            pieceEl.style.left = `${target.x + offset.x}px`;
            pieceEl.style.top = `${target.y + offset.y}px`;
        }
    }

    async function movePieceStepByStep(playerIndex, start, end) {
        const p = players[playerIndex];
        for (let current = start + 1; current <= end; current++) {
            p.pos = current;
            updatePiecePosition(playerIndex);
            playStepSound();
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }

    rollBtn.addEventListener('click', async () => {
        if (isAnimating) return;
        isAnimating = true;
        rollBtn.disabled = true;
        
        const player = players[currentPlayerIndex];
        diceEl.parentElement.classList.add('rolling');
        statusText.textContent = "Rolling...";
        
        // Play dice rolling sound a few times
        let diceRollInterval = setInterval(() => playDiceSound(), 100);

        await new Promise(resolve => setTimeout(resolve, 500));
        
        clearInterval(diceRollInterval);
        diceEl.parentElement.classList.remove('rolling');
        
        const roll = Math.floor(Math.random() * 6) + 1;
        diceEl.textContent = diceFaces[roll];
        
        let targetPos = player.pos + roll;
        
        if (targetPos > 100) {
            statusText.textContent = `Rolled ${roll}. Needs exactly ${100 - player.pos}!`;
            statusText.style.color = '#fbbf24';
            finishTurn();
            return;
        }

        statusText.textContent = `Player ${currentPlayerIndex + 1} rolled a ${roll}!`;
        
        // Animate piece step by step
        await movePieceStepByStep(currentPlayerIndex, player.pos, targetPos);

        // Wait slightly before checking jumps
        await new Promise(resolve => setTimeout(resolve, 300));

        if (allJumps[player.pos]) {
            const newPos = allJumps[player.pos];
            if (ladders[player.pos]) {
                statusText.textContent = "Ladder! Climbing up! 🪜";
                statusText.style.color = '#10b981';
                playLadderSound();
            }
            if (snakes[player.pos]) {
                statusText.textContent = "Oh no! A snake! 🐍";
                statusText.style.color = '#ef4444';
                playSnakeSound();
            }
            
            player.pos = newPos;
            updatePiecePosition(currentPlayerIndex);
            
            await new Promise(resolve => setTimeout(resolve, 800)); // wait for jump animation
        }
        
        if (player.pos === 100) {
            playWinSound();
            showWinScreen(currentPlayerIndex);
        } else {
            finishTurn();
        }
    });

    function finishTurn() {
        setTimeout(() => {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            isAnimating = false;
            updateTurnUI();
        }, 1200);
    }

    function showWinScreen(winnerIndex) {
        const overlay = document.createElement('div');
        overlay.className = 'win-overlay';
        overlay.innerHTML = `
            <h2 style="color: ${playerColors[winnerIndex]}">Player ${winnerIndex + 1} Wins! 🎉</h2>
            <button class="glow-btn" onclick="location.reload()">Play Again</button>
        `;
        document.querySelector('.board-wrapper').appendChild(overlay);
    }

    resetBtn.addEventListener('click', () => {
        gameScreen.classList.remove('active');
        setupScreen.classList.add('active');
    });

    window.addEventListener('resize', () => {
        if (gameScreen.classList.contains('active')) {
            measureCells();
            drawLines();
            players.forEach((p, idx) => updatePiecePosition(idx));
        }
    });

    initBoard();
});
