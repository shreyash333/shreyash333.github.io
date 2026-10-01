document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const svgOverlay = document.getElementById('svg-overlay');
    const player = document.getElementById('player');
    const rollBtn = document.getElementById('roll-btn');
    const resetBtn = document.getElementById('reset-btn');
    const diceEl = document.getElementById('dice');
    const statusText = document.getElementById('status-text');

    let currentPos = 0;
    let isAnimating = false;
    let cellCoords = {};

    const ladders = { 4: 14, 9: 31, 20: 38, 28: 84, 40: 59, 51: 67, 71: 91, 80: 99 }; // 80 to 99 so win isn't instant
    const snakes = { 17: 7, 54: 34, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 99: 78 };
    const allJumps = { ...ladders, ...snakes };

    const diceFaces = ['🎲', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

    function initBoard() {
        board.innerHTML = '';
        let cellNumbers = [];
        
        // Generate zig-zag pattern
        for(let r = 9; r >= 0; r--) {
            let row = [];
            for(let c = 1; c <= 10; c++) row.push(r * 10 + c);
            if (r % 2 !== 0) row.reverse();
            cellNumbers.push(...row);
        }

        cellNumbers.forEach((num, index) => {
            const cell = document.createElement('div');
            cell.className = `cell ${index % 2 === 0 ? 'alt-bg' : ''}`;
            if (num === 100) cell.classList.add('win-cell');
            cell.id = `cell-${num}`;
            cell.textContent = num;
            board.appendChild(cell);
        });

        // Small delay to ensure DOM layout is complete before measuring
        setTimeout(() => {
            measureCells();
            drawLines();
        }, 100);
    }

    function measureCells() {
        cellCoords = {};
        for(let i = 1; i <= 100; i++) {
            const cell = document.getElementById(`cell-${i}`);
            if(cell) {
                // Get center of cell relative to board wrapper
                cellCoords[i] = {
                    x: cell.offsetLeft + cell.offsetWidth / 2,
                    y: cell.offsetTop + cell.offsetHeight / 2
                };
            }
        }
    }

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

    function updatePlayerPosition(pos) {
        if (pos === 0) {
            player.style.opacity = '0';
            return;
        }
        player.style.opacity = '1';
        const target = cellCoords[pos];
        if (target) {
            player.style.left = `${target.x}px`;
            player.style.top = `${target.y}px`;
        }
    }

    rollBtn.addEventListener('click', () => {
        if (isAnimating) return;
        if (currentPos === 100) return;

        isAnimating = true;
        rollBtn.disabled = true;
        diceEl.parentElement.classList.add('rolling');
        statusText.textContent = "Rolling...";

        setTimeout(() => {
            diceEl.parentElement.classList.remove('rolling');
            const roll = Math.floor(Math.random() * 6) + 1;
            diceEl.textContent = diceFaces[roll];
            
            let targetPos = currentPos + roll;
            if (targetPos > 100) {
                statusText.textContent = `Rolled ${roll}. Too high!`;
                finishTurn();
                return;
            }

            statusText.textContent = `Rolled a ${roll}!`;
            currentPos = targetPos;
            updatePlayerPosition(currentPos);

            // Check for jumps after piece lands
            setTimeout(() => {
                if (allJumps[currentPos]) {
                    const newPos = allJumps[currentPos];
                    if (ladders[currentPos]) statusText.textContent = "Ladder! Climbing up!";
                    if (snakes[currentPos]) statusText.textContent = "Oh no! A snake!";
                    
                    currentPos = newPos;
                    updatePlayerPosition(currentPos);
                }
                
                if (currentPos === 100) {
                    statusText.textContent = "🎉 YOU WIN! 🎉";
                    player.style.transform = 'translate(-50%, -50%) scale(1.5)';
                }
                
                finishTurn();
            }, 600);

        }, 500); // dice roll duration
    });

    function finishTurn() {
        setTimeout(() => {
            isAnimating = false;
            if (currentPos !== 100) rollBtn.disabled = false;
        }, 400);
    }

    resetBtn.addEventListener('click', () => {
        currentPos = 0;
        diceEl.textContent = diceFaces[0];
        statusText.textContent = "Roll the dice to start!";
        player.style.transform = 'translate(-50%, -50%)';
        updatePlayerPosition(0);
        rollBtn.disabled = false;
    });

    window.addEventListener('resize', () => {
        measureCells();
        drawLines();
        updatePlayerPosition(currentPos);
    });

    initBoard();
});
