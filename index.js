// ดอกไม้ 
function drawFlower(ctx, x, y, size = 10, petalColor = "#F7DC6F", centerColor = "#E67E22") {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.arc(0, size, size/2, 0, Math.PI * 2);
        ctx.fillStyle = petalColor;
        ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(0, 0, size/2.2, 0, Math.PI * 2);
    ctx.fillStyle = centerColor;
    ctx.fill();
    ctx.restore();
}

//วาดก้อนเมฆ
function drawCloud(ctx, x, y, scale = 1.2) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    ctx.globalAlpha = 1.0;
    ctx.fillStyle = "white";


    let circles = [
        {x: 0, y: 0, r: 28},
        {x: 25, y: -8, r: 26},
        {x: -25, y: -6, r: 24},
        {x: 12, y: 18, r: 22},
        {x: -15, y: 15, r: 22},
        {x: 35, y: 10, r: 20},
        {x: -35, y: 12, r: 20},
        {x: 0, y: 22, r: 18}
    ];

    circles.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
    });

    // เงารอบเมฆ 
    const grad = ctx.createRadialGradient(0, 5, 30, 0, 5, 80);
    grad.addColorStop(0, "rgba(255,255,255,0.7)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 5, 85, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

import { getContext, FPS } from "./utils-module.js";

// ตั้งชื่อเอกสาร
document.title = "A01 - App Graphics 2D";
document.addEventListener("DOMContentLoaded", main);

function main(ev) {
    const ctx = getContext("#myCanvas");

    // Mouse position
    let mousePos = { x: 0, y: 0 };
    ctx.canvas.addEventListener("mousemove", function(e) {
        const rect = ctx.canvas.getBoundingClientRect();
        mousePos.x = Math.round(e.clientX - rect.left);
        mousePos.y = Math.round(e.clientY - rect.top);
    });

    const config = {
    width : 800,
    height : 600,
    bgColor : "skyblue",
    debug : true,
    targetFPS: 144,
    };

    ctx.canvas.width = config.width;
    ctx.canvas.height = config.height;

    let lastTime = 0;
    const interval = 1000 / config.targetFPS;

    //animation
    let sunOffset = 0;
    let cloudOffset = 0;

    //แม่น้ำ
    function drawRiver() {
        const groundHeight = 180; 
        const startX1 = 360, startX2 = 390; 
        const startY = config.height - groundHeight; 
        const endX1 = 280, endX2 = 480; 
        const endY = config.height; 

        ctx.beginPath();
        ctx.moveTo(startX1, startY); 
        ctx.bezierCurveTo(320, config.height - 160, 300, config.height - 80, endX1, endY);
        
        ctx.lineTo(endX2, endY); 
        ctx.bezierCurveTo(440, config.height - 80, 420, config.height - 160, startX2, startY);
        ctx.closePath();

    // ไล่สีแม่น้ำใหม่
    const riverGradient = ctx.createLinearGradient(0, startY, 0, endY);
    riverGradient.addColorStop(0, "#b3e6ff"); // ฟ้าอ่อน
    riverGradient.addColorStop(0.3, "#5DADE2"); // ฟ้า
    riverGradient.addColorStop(0.7, "#276a94"); // น้ำเงิน
    riverGradient.addColorStop(1, "#1B263B"); // น้ำเงินเข้ม
    ctx.fillStyle = riverGradient;
    ctx.fill();

        // เส้นขอบแม่น้ำ
        ctx.strokeStyle = "#1B4F72";
        ctx.lineWidth = 1.2;
        ctx.stroke();
    }

    //ต้นสน
    function drawPineTree(x, y, scale = 1) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.fillStyle = "#6B4226";
        ctx.fillRect(-7, 0, 14, 40);

        ctx.fillStyle = "#127433ff";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.8;

        ctx.beginPath();
        ctx.moveTo(-50, 0);
        ctx.lineTo(0, -80);
        ctx.lineTo(50, 0);
        ctx.closePath();
        // ไล่สีใบไม้ (เข้มมาก -> อ่อน)
        const leafGradient = ctx.createLinearGradient(0, -120, 0, 0);
        leafGradient.addColorStop(0, "#145531ff"); // เขียวเข้มมาก
        leafGradient.addColorStop(0.5, "#155029ff"); // เขียวกลาง
        leafGradient.addColorStop(1, "#2b6c2bff"); // เขียวอ่อน
        ctx.fillStyle = leafGradient;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-40, -30);
        ctx.lineTo(0, -100);
        ctx.lineTo(40, -30);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-30, -60);
        ctx.lineTo(0, -120);
        ctx.lineTo(30, -60);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }

    // บ้าน
    function drawHouse(x, y, scale = 1) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1.2;
        ctx.fillRect(-50, -40, 100, 40);
        ctx.strokeRect(-50, -40, 100, 40);

        ctx.beginPath();
        ctx.moveTo(-60, -40);
        ctx.lineTo(0, -90);
        ctx.lineTo(60, -40);
        ctx.closePath();
        ctx.fillStyle = "#c0392b";
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#6b4226";
        ctx.fillRect(-10, -20, 20, 20);
        ctx.strokeRect(-10, -20, 20, 20);

        ctx.fillStyle = "#73a5c7ff";
        ctx.fillRect(-35, -30, 20, 15);
        ctx.strokeRect(-35, -30, 20, 15);

        ctx.fillStyle = "#3498db";
        ctx.fillRect(15, -30, 20, 15);
        ctx.strokeRect(15, -30, 20, 15);

        ctx.restore();
    }

    function draw(timestamp) {
        const delta = timestamp - lastTime;
        if (delta < interval) {
            requestAnimationFrame(draw);
            return;
        }
        lastTime = timestamp;

        FPS.update();

        //  animation
        cloudOffset = (timestamp / 50) % config.width;  
        sunOffset = Math.sin(timestamp / 3000) * 40;   // 

        // ท้องฟ้า
        const skyGradient = ctx.createLinearGradient(0, 0, 0, config.height);
        skyGradient.addColorStop(0, "#87CEFA");
        skyGradient.addColorStop(1, "#4682B4");
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, config.width, config.height);

        // เมฆ 
        drawCloud(ctx, 120 + cloudOffset * 0.3, 80, 1.2);
        drawCloud(ctx, 250 + cloudOffset * 0.2, 60, 1.0);
        drawCloud(ctx, 370 + cloudOffset * 0.15, 110, 1.1);

    // พื้นหญ้า (ไล่สี)
    const groundHeight = 180;
    const grassGradient = ctx.createLinearGradient(0, config.height - groundHeight, 0, config.height);
    grassGradient.addColorStop(0, "#7ED957"); // เขียวอ่อน
    grassGradient.addColorStop(0.5, "#4CAF50"); // เขียวกลาง
    grassGradient.addColorStop(1, "#145A32"); // เขียวเข้ม
    ctx.fillStyle = grassGradient;
    ctx.fillRect(0, config.height - groundHeight, config.width, groundHeight);

        // ดอกไม้ข้างบ้าน
        for (let i = 0; i < 6; i++) {
            const fx = 494 + (i % 3) * 14;
            const fy = 466 + Math.floor(i / 3) * 16;
            const size = 7 + (i % 2);
            const colors = ["#F7DC6F", "#F1948A", "#BB8FCE"];
            const petalColor = colors[i % colors.length];
            drawFlower(ctx, fx, fy, size, petalColor);
        }

        // ภูเขา
        function drawMountains(peaks, opacity, offsetY = 0) {
            ctx.beginPath();
            ctx.moveTo(0, config.height - groundHeight);
            let minY = config.height;
            for (let i = 0; i < peaks.length; i++) {
                let [cx, cy, ex] = peaks[i];
                let peakY = cy + offsetY;
                if (peakY < minY) minY = peakY;
                ctx.quadraticCurveTo(cx, peakY, ex, config.height - groundHeight);
            }
            ctx.lineTo(config.width, config.height - groundHeight);
            ctx.closePath();

            const gradient = ctx.createLinearGradient(0, minY, 0, config.height - groundHeight);
            gradient.addColorStop(0, `rgba(60,160,60,${opacity})`);
            gradient.addColorStop(1, `rgba(20,60,20,${opacity})`);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        drawMountains([[150, 180, 300],[400, 120, 550],[680, 150, 800]], 0.5);
        drawMountains([[100, 220, 260],[360, 160, 520],[680, 210, 800]], 1.0);

        //พระอาทิตย์
        const sunX = 550, sunY = 150 + sunOffset, sunRadius = 45;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();

        //รัศมีพระอาทิตย์
        const gradient = ctx.createRadialGradient(sunX, sunY, 30, sunX, sunY, 120);
        gradient.addColorStop(0, "rgba(245, 92, 15, 0.8)");
        gradient.addColorStop(1, "rgba(255, 255, 0, 0)");
        ctx.beginPath();
        ctx.arc(sunX, sunY, 120, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();

        //แม่น้ำ
        drawRiver();

        //ต้นสน 3 ต้น
        drawPineTree(100, 490, 0.9);
        drawPineTree(160, 490, 1.2);
        drawPineTree(220, 490, 1.0);

        //บ้าน
        drawHouse(650, config.height - groundHeight + 40, 1.2);

        //แปลงนา
        ctx.fillStyle = "#82E0AA";
        ctx.strokeStyle = "#145A32";
        ctx.lineWidth = 2;

        const points = [
            {x: 560, y: config.height - groundHeight + 80},
            {x: 730, y: config.height - groundHeight + 80},
            {x: 700, y: config.height - groundHeight + 160},
            {x: 510, y: config.height - groundHeight + 160}
        ];

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        const rows = 4, cols = 5;
        for (let r = 1; r < rows; r++) {
            const t = r / rows;
            const leftX = points[0].x + t * (points[3].x - points[0].x);
            const leftY = points[0].y + t * (points[3].y - points[0].y);
            const rightX = points[1].x + t * (points[2].x - points[1].x);
            const rightY = points[1].y + t * (points[2].y - points[1].y);
            ctx.beginPath();
            ctx.moveTo(leftX, leftY);
            ctx.lineTo(rightX, rightY);
            ctx.stroke();
        }

        function drawRiceV(x, y, size = 16, color = "#229954") {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x - size/2, y);
            ctx.lineTo(x, y + size);
            ctx.lineTo(x + size/2, y);
            ctx.stroke();
            ctx.restore();
        }

        const margin = 0.18;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const tRow = (r + margin) / rows + (1 - 2 * margin) * 0.5 / rows;
                const tCol = (c + margin) / cols + (1 - 2 * margin) * 0.5 / cols;
                const leftX = points[0].x + tRow * (points[3].x - points[0].x);
                const leftY = points[0].y + tRow * (points[3].y - points[0].y);
                const rightX = points[1].x + tRow * (points[2].x - points[1].x);
                const rightY = points[1].y + tRow * (points[2].y - points[1].y);
                const x = leftX + tCol * (rightX - leftX);
                const y = leftY + tCol * (rightY - leftY);
                drawRiceV(x, y - 4, 10);
            }
        }

        for (let c = 1; c < cols; c++) {
            const t = c / cols;
            const topX = points[0].x + t * (points[1].x - points[0].x);
            const topY = points[0].y + t * (points[1].y - points[0].y);
            const bottomX = points[3].x + t * (points[2].x - points[3].x);
            const bottomY = points[3].y + t * (points[2].y - points[3].y);
            ctx.beginPath();
            ctx.moveTo(topX, topY);
            ctx.lineTo(bottomX, bottomY);
            ctx.stroke();
        }

        // ---- Debug mouse + FPS ----
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`Mouse: ${mousePos.x}, ${mousePos.y}`, config.width - 150, 20);
        if (config.debug) FPS.show(ctx, 10, 28);

        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
}
