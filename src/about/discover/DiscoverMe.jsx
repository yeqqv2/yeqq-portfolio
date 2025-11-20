import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './style.module.css';
import AnimatedSplit from '../../components/animated split/AnimatedSplit';

const cards = [
    {
        id: 1,
        shape: 'puzzle',
        instruction: 'Draw a puzzle piece',
        title: 'The Big Picture',
        description: "I don't just fit pieces together; I solve the whole puzzle. Bridging the gap between user needs, business goals, and technical reality.",
        color: '#1be7ff',
        emoji: '🧩'
    },
    {
        id: 2,
        shape: 'pen',
        instruction: 'Draw a pen inside the box',
        title: 'Design Engineering',
        description: 'Writing code with a designer’s eye. I translate creative concepts into pixel-perfect interfaces without losing clarity in translation.',
        color: '#ff9b0a',
        emoji: '✏️'
    },
    {
        id: 3,
        shape: 'check',
        instruction: 'Draw a checkmark',
        title: 'Shipped & Solid',
        description: 'It’s not done until it feels right. Building accessible, performant, and polished experiences that users can trust.',
        color: '#89fc00',
        emoji: '✓'
    }
];

const Card = ({ card, index }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [paths, setPaths] = useState([]);
    const canvasRef = useRef(null);
    const curtainRef = useRef(null);
    const contentRef = useRef(null);
    const currentPathRef = useRef([]);

    // Helper to size and draw dotted template reliably
    const setupCanvasAndDrawTemplate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        // Use devicePixelRatio for crispness (fallback to 2)
        const ratio = window.devicePixelRatio || 2;
        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;

        const ctx = canvas.getContext('2d');
        // reset any transforms from previous draws
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(ratio, ratio);

        // Clear canvas before drawing
        ctx.clearRect(0, 0, rect.width, rect.height);

        drawTemplate(ctx, card.shape, rect.width, rect.height);
    };

    useEffect(() => {
        // draw template on mount and when shape changes
        // use requestAnimationFrame to ensure correct layout (curtain might be animating)
        requestAnimationFrame(setupCanvasAndDrawTemplate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [card.shape]);

    const drawTemplate = (ctx, shape, width, height) => {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);

        const centerX = width / 2;
        const centerY = height / 2;

        if (shape === "puzzle") {
            const w = 120;
            const h = 120;
            const tabSize = 20;
            const curve = 15;

            const x = centerX - w / 2;
            const y = centerY - h / 2;

            ctx.beginPath();
            ctx.lineWidth = 2;

            // Sol üst köşe
            ctx.moveTo(x + curve, y);

            // Üst kenar
            ctx.lineTo(x + w / 2 - tabSize, y);

            // Üst çıkıntı (tab)
            ctx.arc(
                x + w / 2,           // centerX
                y,                   // centerY
                tabSize,             // radius
                Math.PI,             // start
                2 * Math.PI,         // end
                true                 // anticlockwise
            );

            ctx.lineTo(x + w - curve, y);

            // Sağ üst köşe
            ctx.quadraticCurveTo(x + w, y, x + w, y + curve);

            // Sağ kenar
            ctx.lineTo(x + w, y + h - curve);

            // Sağ alt köşe
            ctx.quadraticCurveTo(x + w, y + h, x + w - curve, y + h);

            // Alt kenar başlangıcı
            ctx.lineTo(x + w / 2 + tabSize, y + h);

            // Alt oyuk (blank)
            ctx.arc(
                x + w / 2,
                y + h,
                tabSize,
                0,
                Math.PI,
                false
            );

            ctx.lineTo(x + curve, y + h);

            // Sol alt köşe
            ctx.quadraticCurveTo(x, y + h, x, y + h - curve);

            // Sol kenar
            ctx.lineTo(x, y + curve);

            // Sol üst köşe
            ctx.quadraticCurveTo(x, y, x + curve, y);

            ctx.closePath();
            ctx.stroke();
        }
        else if (shape === 'pen') {

            const bodyWidth = 22;
            const bodyHalf = bodyWidth / 2;

            const tipHeight = 35;
            const bodyHeight = 90;
            const ferruleHeight = 12;
            const eraserHeight = 18;

            const x = centerX;
            const y = centerY - (tipHeight + bodyHeight + ferruleHeight + eraserHeight) / 2;

            // --- UÇ KISMI (Ahşap + Grafit) ---
            ctx.beginPath();
            ctx.moveTo(x, y);                            // Sivri uç
            ctx.lineTo(x - bodyHalf, y + tipHeight);     // Sol üçgen taraf
            ctx.lineTo(x + bodyHalf, y + tipHeight);     // Sağ üçgen taraf
            ctx.closePath();
            ctx.stroke();

            // --- GÖVDE (Kalemin ana kısmı) ---
            ctx.beginPath();
            ctx.rect(
                x - bodyHalf,
                y + tipHeight,
                bodyWidth,
                bodyHeight
            );
            ctx.stroke();

            // --- METAL HALKA (Ferrule) ---
            ctx.beginPath();
            ctx.rect(
                x - bodyHalf,
                y + tipHeight + bodyHeight,
                bodyWidth,
                ferruleHeight
            );
            ctx.stroke();

            // --- SİLGİ ---
            ctx.beginPath();
            ctx.rect(
                x - bodyHalf,
                y + tipHeight + bodyHeight + ferruleHeight,
                bodyWidth,
                eraserHeight
            );
            ctx.stroke();

            // --- DETAY: Uç çizgisi (grafit)
            ctx.beginPath();
            ctx.moveTo(x - 6, y + tipHeight - 10);
            ctx.lineTo(x + 6, y + tipHeight - 10);
            ctx.stroke();

            // --- DETAY: Ferrule’de metal çizgisi
            ctx.beginPath();
            ctx.moveTo(x - bodyHalf, y + tipHeight + bodyHeight + ferruleHeight / 2);
            ctx.lineTo(x + bodyHalf, y + tipHeight + bodyHeight + ferruleHeight / 2);
            ctx.stroke();
        }
        else if (shape === 'check') {

            const r = 40; // daire yarıçapı

            // --- DAİRE ---
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            ctx.stroke();

            // --- CHECKMARK ---
            ctx.beginPath();
            ctx.moveTo(centerX - r * 0.45, centerY + r * 0.05);   // sol alt
            ctx.lineTo(centerX - r * 0.1, centerY + r * 0.45);    // orta
            ctx.lineTo(centerX + r * 0.5, centerY - r * 0.3);     // sağ üst
            ctx.stroke();
        }
    };

    // MOBİL DÜZELTME: Hem Mouse hem Touch koordinatlarını al
    const getMousePos = (e, canvas) => {
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;

        if (e.touches && e.touches.length > 0) {
            // Dokunmatik ekran
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            // Mouse
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        // MOBİL DÜZELTME: Scrollu engelle
        if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();

        if (isRevealed) return;
        setIsDrawing(true);
        const pos = getMousePos(e, canvasRef.current);
        currentPathRef.current = [pos];
    };

    const draw = (e) => {
        if (!isDrawing || isRevealed) return;

        // MOBİL DÜZELTME: Scrollu engelle
        if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const pos = getMousePos(e, canvas);

        currentPathRef.current.push(pos);

        // Use card color and thicker stroke as requested
        ctx.strokeStyle = card.color || '#000';
        ctx.lineWidth = 6; // increased thickness
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.setLineDash([]);

        const path = currentPathRef.current;
        if (path.length > 1) {
            ctx.beginPath();
            ctx.moveTo(path[path.length - 2].x, path[path.length - 2].y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        if (!isDrawing || isRevealed) return;
        setIsDrawing(false);

        if (currentPathRef.current.length > 5) {
            const newPaths = [...paths, currentPathRef.current];
            setPaths(newPaths);
            checkShape(newPaths);
        }
        currentPathRef.current = [];
    };

    const checkShape = (allPaths) => {
        if (allPaths.length === 0) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        let detected = false;

        const allPoints = allPaths.flat();

        if (allPoints.length < 20) return;

        const xs = allPoints.map(p => p.x);
        const ys = allPoints.map(p => p.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        const width = maxX - minX;
        const height = maxY - minY;
        const area = width * height;

        const inCenter = Math.abs((minX + maxX) / 2 - centerX) < centerX * 0.5 &&
            Math.abs((minY + maxY) / 2 - centerY) < centerY * 0.5;

        if (!inCenter || area < 1000) return;

        if (card.shape === 'puzzle') {
            // Puzzle için: sağ tarafta çıkıntı kontrolü
            const hasRightTab = allPoints.some(p => p.x > centerX + 45 && Math.abs(p.y - centerY) < 30);
            const hasMainBody = width > 70 && height > 60;
            detected = hasRightTab && hasMainBody;
        } else if (card.shape === 'pen') {
            const hasTopPoint = allPoints.some(p =>
                Math.abs(p.x - centerX) < 20 && p.y < centerY - 15 && p.y > centerY - 40
            );
            const hasBody = allPoints.some(p =>
                Math.abs(p.x - centerX) < 20 && p.y > centerY - 10 && p.y < centerY + 30
            );
            detected = hasTopPoint && hasBody && height > 40;
        } else if (card.shape === 'check') {
            const hasLeftStroke = allPoints.some(p => p.x < centerX && p.y > centerY - 20);
            const hasRightStroke = allPoints.some(p => p.x > centerX && p.y < centerY);
            detected = hasLeftStroke && hasRightStroke;
        }

        if (detected) {
            revealContent();
        }
    };

    const revealContent = () => {
        setIsRevealed(true);

        gsap.to(curtainRef.current, {
            y: '-100%',
            duration: 1.2,
            ease: 'power3.inOut',
            onComplete: () => {
                // keep curtain hidden so content is visible
                curtainRef.current.style.display = 'none';
            }
        });

        gsap.fromTo(contentRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' }
        );
    };

    const resetCard = () => {
        // Hide revealed content and restore curtain + template
        setIsRevealed(false);
        setPaths([]);
        currentPathRef.current = [];

        // Ensure curtain is visible and reset gsap transform
        if (curtainRef.current) {
            curtainRef.current.style.display = 'block';
            gsap.set(curtainRef.current, { y: 0 });
        }
        if (contentRef.current) {
            gsap.set(contentRef.current, { opacity: 0, y: 20 });
        }

        // Wait for layout to update, then reinitialize canvas and redraw template
        // requestAnimationFrame ensures the element is rendered and has dimensions
        requestAnimationFrame(() => {
            setupCanvasAndDrawTemplate();
        });
    };

    return (
        <div className={styles.card}>
            <div ref={contentRef} className={styles.cardContent}>
                <AnimatedSplit
                    text={card.title}
                    className={styles.cardTitle}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
                <AnimatedSplit
                    text={card.description}
                    className={styles.cardDescription}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
                <button onClick={resetCard} className={styles.resetButton}>
                    ● wanna draw again?
                </button>
            </div>

            <div ref={curtainRef} className={styles.curtain}>
                <div className={styles.curtainInner}>
                    <div className={styles.instructionHeader}>
                        <AnimatedSplit
                            text={`Discovery #${index + 1}`}
                            className={styles.discoveryNumber}
                            tagName="span"
                            stagger={0.03}
                            duration={1.5}
                            start="top 80%"
                        />
                        <AnimatedSplit
                            text={card.instruction}
                            className={styles.instruction}
                            tagName="span"
                            stagger={0.03}
                            duration={1.5}
                            start="top 80%"
                        />
                    </div>

                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className={`${styles.canvas} ${isRevealed ? styles.canvasRevealed : ''}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default function DiscoverMe() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <AnimatedSplit
                    text={
                        "[discover me]"
                    }
                    className={styles.title}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
                <AnimatedSplit
                    text={
                        "express yourself freely. draw the shapes below to uncover how i work and what drives my creative process."
                    }
                    className={styles.subtitle}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
            </div>

            <div className={styles.cardsGrid}>
                {cards.map((card, index) => (
                    <Card key={card.id} card={card} index={index} />
                ))}
            </div>
        </div>
    );
}