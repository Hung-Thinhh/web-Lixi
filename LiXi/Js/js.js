const app = {
    // Mệnh giá + ảnh tương ứng
    moneyOptions: [
        { value: 10000, img: './LiXi/img/10k.jpg' },
        { value: 20000, img: './LiXi/img/20k.jpg' },
        { value: 50000, img: './LiXi/img/50k.jpg' },
        { value: 100000, img: './LiXi/img/100k.jpg' },
        { value: 200000, img: './LiXi/img/200k.jpg' },
        { value: 500000, img: './LiXi/img/500k.jpg' },
    ],


    // Format VND
    formatMoney: function (num) {
        return num.toLocaleString('vi-VN') + 'đ';
    },

    handleEvents: function () {
        // ========== FLIP CARD ==========
        const flipCard = document.getElementById('flipCard');
        const btnWrapper = document.getElementById('btnLixi');
        const cardHint = document.querySelector('.card-hint');

        flipCard.addEventListener('click', function () {
            flipCard.classList.toggle('flipped');
            if (cardHint) cardHint.classList.add('hidden');
            if (flipCard.classList.contains('flipped')) {
                setTimeout(function () {
                    btnWrapper.style.display = 'flex';
                }, 800);
            }
        });

        // ========== MỞ MODAL LÌ XÌ ==========
        const btnOpen = document.getElementById('btnOpenLixi');
        const modal = document.getElementById('modal');

        btnOpen.addEventListener('click', function (e) {
            e.stopPropagation();
            modal.style.display = 'block';
            // Reset trạng thái bao lì xì mỗi lần mở
            app.resetLixi();
        });

        // ========== 3 BAO LÌ XÌ ==========
        let openedCount = 0;
        let totalMoney = 0;

        const envelopes = document.querySelectorAll('.lixi-envelope');
        const summary = document.getElementById('lixiSummary');
        const summaryTotal = document.getElementById('summaryTotal');

        envelopes.forEach(function (env) {
            env.addEventListener('click', function (e) {
                e.stopPropagation();
                if (env.classList.contains('opened')) return;

                // Random mệnh giá
                const pick = app.moneyOptions[Math.floor(Math.random() * app.moneyOptions.length)];
                totalMoney += pick.value;
                openedCount++;

                // Hiện kết quả: ảnh + mệnh giá
                const idx = env.getAttribute('data-index');
                const valueEl = document.getElementById('value' + idx);
                const imgEl = document.getElementById('img' + idx);
                imgEl.src = pick.img;
                valueEl.textContent = app.formatMoney(pick.value);
                env.classList.add('opened');

                // Sau khi mở hết 3 bao → hiện tổng kết
                if (openedCount >= 3) {
                    setTimeout(function () {
                        summaryTotal.textContent = app.formatMoney(totalMoney);
                        summary.style.display = 'flex';
                    }, 800);
                }
            });
        });

        // Reset function
        app.resetLixi = function () {
            openedCount = 0;
            totalMoney = 0;
            envelopes.forEach(function (env) {
                env.classList.remove('opened');
            });
            summary.style.display = 'none';
            for (let i = 0; i < 3; i++) {
                document.getElementById('value' + i).textContent = '';
                document.getElementById('img' + i).src = '';
            }
        };

        // ========== NÚT ĐÓNG MODAL ==========
        const lixiClose = document.getElementById('lixiClose');
        const summaryCloseBtn = document.getElementById('summaryCloseBtn');

        lixiClose.addEventListener('click', function (e) {
            e.stopPropagation();
            modal.style.display = 'none';
        });

        summaryCloseBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            modal.style.display = 'none';
        });

        // ========== PHÁO HOA CANVAS ==========
        const canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let ctx = canvas.getContext("2d");

        function Firework(x, y, height, yVol, R, G, B) {
            this.x = x;
            this.y = y;
            this.yVol = yVol;
            this.height = height;
            this.R = R; this.G = G; this.B = B;
            this.radius = 2;
            this.boom = false;
            let boomHeight = Math.floor(Math.random() * 200) + 50;

            this.draw = function () {
                ctx.fillStyle = "rgba(" + R + "," + G + "," + B + ")";
                ctx.strokeStyle = "rgba(" + R + "," + G + "," + B + ")";
                ctx.beginPath();
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, Math.PI * 2, 0, false);
                ctx.fill();
            };

            this.update = function () {
                this.y -= this.yVol;
                if (this.radius < 20) this.radius += 0.35;
                if (this.y < boomHeight) {
                    this.boom = true;
                    for (let i = 0; i < 120; i++) {
                        particleArray.push(new Particle(
                            this.x, this.y,
                            (Math.random() * 2) + 1,
                            this.R, this.G, this.B, 1
                        ));
                    }
                }
                this.draw();
            };
            this.update();
        }

        window.addEventListener("click", function (e) {
            if (modal.style.display !== 'block') return;
            let x = e.clientX;
            let y = canvas.height;
            let R = Math.floor(Math.random() * 255);
            let G = Math.floor(Math.random() * 255);
            let B = Math.floor(Math.random() * 255);
            fireworkArray.push(new Firework(x, y, 10, 5, R, G, B));
        });

        function Particle(x, y, radius, R, G, B, A) {
            this.x = x; this.y = y;
            this.radius = radius;
            this.R = R; this.G = G; this.B = B;
            this.A = A;
            this.xVol = (Math.random() * 10) - 4;
            this.yVol = (Math.random() * 10) - 4;

            this.draw = function () {
                ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + this.A + ")";
                ctx.save();
                ctx.beginPath();
                ctx.globalCompositeOperation = "screen";
                ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
                ctx.fill();
                ctx.restore();
            };

            this.update = function () {
                this.x += this.xVol;
                this.y += this.yVol;
                if (this.y < 200) this.yVol += 0.12;
                this.A -= 0.02;
                if (this.A < 0) this.fade = true;
                this.draw();
            };
            this.update();
        }

        let fireworkArray = [];
        let particleArray = [];

        for (let i = 0; i < 4; i++) {
            fireworkArray.push(new Firework(
                Math.random() * canvas.width, canvas.height,
                10, 5,
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)
            ));
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < fireworkArray.length; i++) fireworkArray[i].update();
            for (let j = 0; j < particleArray.length; j++) particleArray[j].update();
            if (fireworkArray.length < 3) {
                fireworkArray.push(new Firework(
                    Math.random() * canvas.width, canvas.height,
                    10, 5,
                    Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255)
                ));
            }
            fireworkArray = fireworkArray.filter(function (obj) { return !obj.boom; });
            particleArray = particleArray.filter(function (obj) { return !obj.fade; });
        }
        animate();

        window.addEventListener("resize", function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Click overlay để tắt modal
        canvas.onclick = function () {
            modal.style.display = 'none';
        };
    },

    // ========== HOA RƠI + PARTICLES ==========
    createEffects: function () {
        const petals = document.getElementById('petalsContainer');
        const colors = ['#ffb7c5', '#ff85a1', '#ffc0cb', '#ff69b4', '#ffadc5', '#ffe0ec'];
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.classList.add('petal');
            p.style.left = Math.random() * 100 + 'vw';
            p.style.animationDelay = Math.random() * 10 + 's';
            p.style.animationDuration = (Math.random() * 6 + 6) + 's';
            const size = (Math.random() * 12 + 8) + 'px';
            p.style.width = size;
            p.style.height = size;
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.opacity = (Math.random() * 0.5 + 0.4).toString();
            petals.appendChild(p);
        }

        const particles = document.getElementById('particles');
        for (let i = 0; i < 30; i++) {
            const d = document.createElement('div');
            d.classList.add('particle');
            d.style.left = Math.random() * 100 + '%';
            d.style.top = Math.random() * 100 + '%';
            d.style.animationDelay = Math.random() * 5 + 's';
            d.style.animationDuration = (Math.random() * 3 + 3) + 's';
            const s = (Math.random() * 4 + 2) + 'px';
            d.style.width = s;
            d.style.height = s;
            particles.appendChild(d);
        }
    },

    start: function () {
        this.createEffects();
        this.handleEvents();
    }
};

app.start();
