document.addEventListener('DOMContentLoaded', () => {
    // Requires chess.js to be loaded via CDN in index.html
    const game = new Chess();
    
    const boardEl = document.getElementById('chessboard');
    const turnIndicator = document.getElementById('turn-indicator');
    const statusText = document.getElementById('status-text');
    const capturedWhiteEl = document.getElementById('captured-by-white');
    const capturedBlackEl = document.getElementById('captured-by-black');
    
    let selectedSquare = null;
    let legalMoves = [];

    const unicodePieces = {
        'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚'
    };
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    function initBoard() {
        boardEl.innerHTML = '';
        let isLight = true;

        for (let rank = 8; rank >= 1; rank--) {
            for (let i = 0; i < 8; i++) {
                const file = files[i];
                const squareId = file + rank;
                
                const squareEl = document.createElement('div');
                squareEl.className = `square ${isLight ? 'light' : 'dark'}`;
                squareEl.id = squareId;
                
                squareEl.addEventListener('click', () => handleSquareClick(squareId));
                boardEl.appendChild(squareEl);
                
                isLight = !isLight;
            }
            isLight = !isLight; // offset next row
        }
    }

    function renderBoard() {
        // Clear old pieces and states
        document.querySelectorAll('.square').forEach(sq => {
            sq.innerHTML = '';
            sq.classList.remove('selected', 'legal-move', 'in-check');
        });

        const boardState = game.board(); // 8x8 array from a8 to h1
        let currentWhitePieces = { p:0, r:0, n:0, b:0, q:0 };
        let currentBlackPieces = { p:0, r:0, n:0, b:0, q:0 };

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = boardState[r][c];
                if (piece) {
                    const rank = 8 - r;
                    const file = files[c];
                    const squareId = file + rank;
                    
                    const squareEl = document.getElementById(squareId);
                    const pieceEl = document.createElement('div');
                    pieceEl.className = `piece ${piece.color}`; // 'w' or 'b'
                    pieceEl.textContent = unicodePieces[piece.type];
                    squareEl.appendChild(pieceEl);

                    // Track pieces for captures
                    if (piece.type !== 'k') {
                        if (piece.color === 'w') currentWhitePieces[piece.type]++;
                        if (piece.color === 'b') currentBlackPieces[piece.type]++;
                    }

                    // Highlight king in check
                    if (piece.type === 'k' && piece.color === game.turn() && game.in_check()) {
                        squareEl.classList.add('in-check');
                    }
                }
            }
        }

        renderCapturedPieces(currentWhitePieces, currentBlackPieces);
        updateStatus();
    }

    function handleSquareClick(squareId) {
        if (game.game_over()) return;

        const piece = game.get(squareId);
        const isOwnPiece = piece && piece.color === game.turn();

        // If clicking on own piece, select it
        if (isOwnPiece) {
            selectSquare(squareId);
            return;
        }

        // If something is selected and click on target, try to move
        if (selectedSquare) {
            const move = legalMoves.find(m => m.to === squareId);
            if (move) {
                game.move({
                    from: selectedSquare,
                    to: squareId,
                    promotion: 'q' // auto promote to queen for simplicity
                });
                selectedSquare = null;
                legalMoves = [];
                renderBoard();
            } else {
                clearSelection();
            }
        }
    }

    function selectSquare(squareId) {
        clearSelection();
        selectedSquare = squareId;
        
        const squareEl = document.getElementById(squareId);
        squareEl.classList.add('selected');

        legalMoves = game.moves({ square: squareId, verbose: true });
        legalMoves.forEach(move => {
            document.getElementById(move.to).classList.add('legal-move');
        });
    }

    function clearSelection() {
        selectedSquare = null;
        legalMoves = [];
        document.querySelectorAll('.square').forEach(sq => {
            sq.classList.remove('selected', 'legal-move');
        });
    }

    function renderCapturedPieces(wCount, bCount) {
        const startingPieces = { p:8, r:2, n:2, b:2, q:1 };
        
        const renderCaptures = (current, typeOrder, colorClass, container) => {
            container.innerHTML = '';
            for (let type of typeOrder) {
                const capturedAmount = startingPieces[type] - current[type];
                for (let i = 0; i < capturedAmount; i++) {
                    const span = document.createElement('span');
                    span.className = colorClass;
                    span.textContent = unicodePieces[type];
                    container.appendChild(span);
                }
            }
        };

        const types = ['q', 'r', 'b', 'n', 'p'];
        // White captures black pieces -> show missing black pieces
        renderCaptures(bCount, types, 'black', capturedWhiteEl);
        // Black captures white pieces -> show missing white pieces
        renderCaptures(wCount, types, 'white', capturedBlackEl);
    }

    function updateStatus() {
        let status = '';
        let moveColor = game.turn() === 'w' ? 'White' : 'Black';
        turnIndicator.textContent = `${moveColor} to Move`;
        turnIndicator.style.color = game.turn() === 'w' ? '#f8fafc' : '#475569';
        if(game.turn() === 'b') turnIndicator.style.webkitTextStroke = '1px rgba(255,255,255,0.4)';
        else turnIndicator.style.webkitTextStroke = 'none';

        if (game.in_checkmate()) {
            status = `Game over, ${moveColor} is in checkmate.`;
            turnIndicator.textContent = "Checkmate!";
            turnIndicator.style.color = 'var(--check-alert)';
        } else if (game.in_draw()) {
            status = 'Game over, drawn position';
            turnIndicator.textContent = "Draw!";
        } else {
            status = game.in_check() ? 'Check!' : 'Playing...';
            if(game.in_check()) turnIndicator.style.color = 'var(--check-alert)';
        }
        
        statusText.textContent = status;
    }

    document.getElementById('reset-btn').addEventListener('click', () => {
        game.reset();
        clearSelection();
        renderBoard();
    });

    document.getElementById('undo-btn').addEventListener('click', () => {
        game.undo();
        clearSelection();
        renderBoard();
    });

    // Start
    initBoard();
    renderBoard();
});
