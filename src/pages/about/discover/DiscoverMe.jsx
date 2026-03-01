import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import styles from './style.module.css';
import AnimatedSplit from '../../../components/animated split/AnimatedSplit';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

// Görsel varlıklar (Dilden bağımsız)
const cardAssets = [
    { id: 1, shape: 'puzzle', color: '#1be7ff' },
    { id: 2, shape: 'pen', color: '#ff9b0a' },
    { id: 3, shape: 'check', color: '#89fc00' }
];

const Card = ({ asset, content, index }) => {
    const { t } = useTranslation();
    const [isDrawing, setIsDrawing] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [paths, setPaths] = useState([]);
    
    const canvasRef = useRef(null);
    const curtainRef = useRef(null);
    const contentRef = useRef(null);
    const currentPathRef = useRef([]);

    const setupCanvasAndDrawTemplate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 2;
        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;
        const ctx = canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(ratio, ratio);
        ctx.clearRect(0, 0, rect.width, rect.height);
        drawTemplate(ctx, asset.shape, rect.width, rect.height);
    };

    useEffect(() => {
        requestAnimationFrame(setupCanvasAndDrawTemplate);
    }, [asset.shape]);

    const drawTemplate = (ctx, shape, width, height) => {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        const centerX = width / 2;
        const centerY = height / 2;

        if (shape === "puzzle") {
            const w = 120, h = 120, tab = 20, curve = 15;
            const x = centerX - w / 2, y = centerY - h / 2;
            ctx.beginPath();
            ctx.moveTo(x + curve, y);
            ctx.lineTo(x + w / 2 - tab, y);
            ctx.arc(x + w / 2, y, tab, Math.PI, 2 * Math.PI, true);
            ctx.lineTo(x + w - curve, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + curve);
            ctx.lineTo(x + w, y + h - curve);
            ctx.quadraticCurveTo(x + w, y + h, x + w - curve, y + h);
            ctx.lineTo(x + w / 2 + tab, y + h);
            ctx.arc(x + w / 2, y + h, tab, 0, Math.PI, false);
            ctx.lineTo(x + curve, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - curve);
            ctx.lineTo(x, y + curve);
            ctx.quadraticCurveTo(x, y, x + curve, y);
            ctx.closePath();
            ctx.stroke();
        } else if (shape === 'pen') {
            const bw = 22, bh = 90, th = 35, fh = 12, eh = 18;
            const x = centerX, y = centerY - (th + bh + fh + eh) / 2;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - bw/2, y + th); ctx.lineTo(x + bw/2, y + th); ctx.closePath(); ctx.stroke();
            ctx.beginPath(); ctx.rect(x - bw/2, y + th, bw, bh); ctx.stroke();
            ctx.beginPath(); ctx.rect(x - bw/2, y + th + bh, bw, fh); ctx.stroke();
            ctx.beginPath(); ctx.rect(x - bw/2, y + th + bh + fh, bw, eh); ctx.stroke();
        } else if (shape === 'check') {
            const r = 40;
            ctx.beginPath(); ctx.arc(centerX, centerY, r, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(centerX - r * 0.45, centerY + r * 0.05);
            ctx.lineTo(centerX - r * 0.1, centerY + r * 0.45);
            ctx.lineTo(centerX + r * 0.5, centerY - r * 0.3); ctx.stroke();
        }
    };

    const getMousePos = (e, canvas) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const startDrawing = (e) => {
        if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();
        if (isRevealed) return;
        setIsDrawing(true);
        currentPathRef.current = [getMousePos(e, canvasRef.current)];
    };

    const draw = (e) => {
        if (!isDrawing || isRevealed) return;
        if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const pos = getMousePos(e, canvas);
        currentPathRef.current.push(pos);
        ctx.strokeStyle = asset.color;
        ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.setLineDash([]);
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
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.width / 2, centerY = rect.height / 2;
        const allPoints = allPaths.flat();
        if (allPoints.length < 20) return;

        const xs = allPoints.map(p => p.x), ys = allPoints.map(p => p.y);
        const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
        const inCenter = Math.abs((minX + maxX) / 2 - centerX) < centerX * 0.5 && Math.abs((minY + maxY) / 2 - centerY) < centerY * 0.5;
        if (!inCenter || (maxX - minX) * (maxY - minY) < 1000) return;

        let detected = false;
        if (asset.shape === 'puzzle') {
            detected = allPoints.some(p => p.x > centerX + 45 && Math.abs(p.y - centerY) < 30);
        } else if (asset.shape === 'pen') {
            detected = allPoints.some(p => p.y < centerY - 15) && allPoints.some(p => p.y > centerY + 15);
        } else if (asset.shape === 'check') {
            detected = allPoints.some(p => p.x < centerX) && allPoints.some(p => p.x > centerX);
        }

        if (detected) revealContent();
    };

    const revealContent = () => {
        setIsRevealed(true);
        gsap.to(curtainRef.current, { y: '-100%', duration: 1.2, ease: 'hop', onComplete: () => { curtainRef.current.style.display = 'none'; } });
        gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'hop' });
    };

    const resetCard = () => {
        setIsRevealed(false);
        setPaths([]);
        currentPathRef.current = [];
        if (curtainRef.current) {
            curtainRef.current.style.display = 'block';
            gsap.set(curtainRef.current, { y: 0 });
        }
        gsap.set(contentRef.current, { opacity: 0, y: 20 });
        requestAnimationFrame(setupCanvasAndDrawTemplate);
    };

    return (
        <div className={styles.card}>
            <div ref={contentRef} className={styles.cardContent}>
                <AnimatedSplit key={content.title} text={content.title} className={styles.cardTitle} tagName="span" stagger={0.03} duration={1.5} start="top 80%" />
                <AnimatedSplit key={content.description} text={content.description} className={styles.cardDescription} tagName="span" stagger={0.03} duration={1.5} start="top 80%" />
                <button onClick={resetCard} className={styles.resetButton}>{t('discover.reset')}</button>
            </div>

            <div ref={curtainRef} className={styles.curtain}>
                <div className={styles.curtainInner}>
                    <div className={styles.instructionHeader}>
                        <AnimatedSplit key={`${t('discover.discovery')}-${index}`} text={`${t('discover.discovery')} #${index + 1}`} className={styles.discoveryNumber} tagName="span" stagger={0.03} duration={1.5} start="top 80%" />
                        <AnimatedSplit key={content.instruction} text={content.instruction} className={styles.instruction} tagName="span" stagger={0.03} duration={1.5} start="top 80%" />
                    </div>
                    <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} className={`${styles.canvas} ${isRevealed ? styles.canvasRevealed : ''}`} />
                </div>
            </div>
        </div>
    );
};

export default function DiscoverMe() {
    const { t } = useTranslation();
    const translatedCards = t('discover.cards', { returnObjects: true });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <AnimatedSplit key={t('discover.title')} text={t('discover.title')} className={styles.title} tagName="span" stagger={0.03} duration={1.5} start="top 80%" />
                <AnimatedSplit key={t('discover.subtitle')} text={t('discover.subtitle')} className={styles.subtitle} tagName="span" stagger={0.03} duration={1.5} start="top 80%" />
            </div>
            <div className={styles.cardsGrid}>
                {cardAssets.map((asset, index) => (
                    <Card key={asset.id} asset={asset} content={translatedCards[index] || {}} index={index} />
                ))}
            </div>
        </div>
    );
}