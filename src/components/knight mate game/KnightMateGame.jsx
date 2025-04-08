import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import styles from './style.module.css';

// GSAP Draggable eklentisini etkinleştiriyoruz.
gsap.registerPlugin(Draggable);

const SQUARE_SIZE = 127.5;
const BOARD_SIZE = 3;
const THRESHOLD = 50; // Bırakılan nokta ile izin verilen karelerin merkezleri arasındaki mesafe eşiği

// Puzzle'da izin verilen hamleler: ya vezir'in bulunduğu kare (index 2) ya da mat hamlesi (index 8)
const ALLOWED_MOVES = [2, 8];

// Başlangıç board state'i: diğer taşlar sabit, knight index 3'te.
const initialBoard = [
    "bishop", // 0. kare
    "king",   // 1. kare
    "queen",  // 2. kare → Vezir
    "knight", // 3. kare → Knight burada başlıyor.
    "rook",   // 4. kare
    "pawn",   // 5. kare
    null,     // 6. kare
    null,     // 7. kare
    null      // 8. kare → Mat hamlesi burada gerçekleşiyor.
];

// Verilen kare index'ine göre sol üst koordinatını döndüren yardımcı fonksiyon.
const getSquareCoord = (index) => {
    const row = Math.floor(index / BOARD_SIZE);
    const col = index % BOARD_SIZE;
    return {
        left: col * SQUARE_SIZE,
        top: row * SQUARE_SIZE,
    };
};

// Verilen kare index'ine göre, kare merkezinin koordinatlarını döndüren yardımcı fonksiyon.
const getSquareCenter = (index) => {
    const coord = getSquareCoord(index);
    return {
        centerX: coord.left + SQUARE_SIZE / 2,
        centerY: coord.top + SQUARE_SIZE / 2,
    };
};

const KnightMateGame = () => {
    const [board, setBoard] = useState(initialBoard);
    const [solved, setSolved] = useState(false);
    const [message, setMessage] = useState("");

    // Board konteyneri ve knight için referanslar
    const boardContainerRef = useRef(null);
    const knightRef = useRef(null);

    // Knight'ın mevcut indexi (başlangıçta 3 olması beklenir)
    const knightIndex = board.findIndex(piece => piece === "knight");

    // Knight'ın başlangıç merkezi (piksel cinsinden)
    const knightInitialCenter = getSquareCenter(knightIndex);

    // Hedef karelerin merkezlerini hesaplayalım:
    const targetCenter = getSquareCenter(8); // mat hamlesi olan index 8
    // Beklenen offset: knight'ın başlangıç merkezinden hedef merkeze kadar olan fark
    const expectedOffset = {
        x: targetCenter.centerX - knightInitialCenter.centerX,
        y: targetCenter.centerY - knightInitialCenter.centerY,
    };

    // İzin verilen hamleler için, knight'ın başlangıç merkezinden hedef kare merkezine ulaşmak için gerekli offset
    const allowedTargets = ALLOWED_MOVES.map(allowedIndex => {
        const center = getSquareCenter(allowedIndex);
        return {
            index: allowedIndex,
            offset: {
                x: center.centerX - knightInitialCenter.centerX,
                y: center.centerY - knightInitialCenter.centerY,
            },
        };
    });

    useEffect(() => {
        if (solved) return; // Puzzle çözüldüyse draggable'ı yeniden oluşturmayalım.
        if (!knightRef.current || !boardContainerRef.current) return;

        // Önceden oluşturulmuş Draggable varsa temizleyelim.
        if (Draggable.get(knightRef.current)) {
            Draggable.get(knightRef.current).kill();
        }

        // Knight öğesini draggable yapıyoruz.
        Draggable.create(knightRef.current, {
            type: "x,y",
            bounds: boardContainerRef.current,
            onDragEnd: function () {
                const { x, y } = this;
                let selectedTarget = null;
                let minDist = Infinity;

                // İzin verilen hamleler için bırakılan nokta (offset) ile hedef offset arasındaki mesafeyi hesaplıyoruz.
                allowedTargets.forEach(target => {
                    const dx = x - target.offset.x;
                    const dy = y - target.offset.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < minDist) {
                        minDist = dist;
                        selectedTarget = target;
                    }
                });

                if (minDist < THRESHOLD && selectedTarget !== null) {
                    gsap.to(knightRef.current, {
                        x: selectedTarget.offset.x,
                        y: selectedTarget.offset.y,
                        duration: 0.3,
                        onComplete: () => {
                            const newBoard = [...board];
                            newBoard[knightIndex] = null;
                            newBoard[selectedTarget.index] = "knight";
                            setBoard(newBoard);
                            setSolved(true);
                            // Seçilen hamleye bağlı mesaj:
                            if (selectedTarget.index === 2) {
                                setMessage("(try again)");
                            } else if (selectedTarget.index === 8) {
                                setMessage("(checkmate)");
                            }
                        }
                    });
                } else {
                    // Geçersiz hamlede knight direkt başlangıç konumuna dönüyor.
                    gsap.to(knightRef.current, { x: 0, y: 0, duration: 0.3 });
                    setMessage("");
                }
            }
        });

        return () => {
            if (knightRef.current && Draggable.get(knightRef.current)) {
                Draggable.get(knightRef.current).kill();
            }
        };
    }, [board, solved, knightIndex, allowedTargets]);

    return (
        <div className={styles.knightGame}>
            <div
                ref={boardContainerRef}
                className={styles.boardContainer}
                style={{
                    position: "relative",
                    width: BOARD_SIZE * SQUARE_SIZE,
                    height: BOARD_SIZE * SQUARE_SIZE,
                }}
            >
                {board.map((piece, index) => (
                    <div
                        key={index}
                        className={styles.square}
                        style={{
                            width: SQUARE_SIZE,
                            height: SQUARE_SIZE,
                            boxSizing: "border-box",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {/* Knight dışındaki parçaları render ediyoruz */}
                        {piece && piece !== "knight" && (
                            <img
                                src={`/assets/chess/${piece}.svg`}
                                alt={piece}
                                style={{ width: "90%", height: "90%" }}
                            />
                        )}
                    </div>
                ))}
                {/* Eğer puzzle çözülmediyse knight'ı draggable olarak render ediyoruz */}
                {!solved && (
                    <img
                        ref={knightRef}
                        src="/assets/chess/knight.svg"
                        alt="knight"
                        className={styles.knight}
                        style={{
                            width: SQUARE_SIZE * 0.8,
                            height: SQUARE_SIZE * 0.8,
                            position: "absolute",
                            left: knightInitialCenter.centerX,
                            top: knightInitialCenter.centerY,
                            transform: "translate(-50%, -50%)",
                            cursor: "grab",
                            zIndex: 10,
                        }}
                    />
                )}
                {/* Puzzle çözüldüyse knight hedef karede sabit olarak gösterilir */}
                {solved && (
                    <img
                        src="/assets/chess/knight.svg"
                        alt="knight"
                        className={styles.knight}
                        style={{
                            width: SQUARE_SIZE * 0.8,
                            height: SQUARE_SIZE * 0.8,
                            position: "absolute",
                            left: getSquareCenter(board.findIndex(piece => piece === "knight")).centerX,
                            top: getSquareCenter(board.findIndex(piece => piece === "knight")).centerY,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                )}
            </div>
            {message && <div className={styles.message}>{message}</div>}
        </div>
    );
};

export default KnightMateGame;
