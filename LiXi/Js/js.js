const app = {
    isOpenenvelope : false,
    money:[
        
            './LiXi/img/10k.jpg',
            './LiXi/img/20k.jpg',
            './LiXi/img/50k.jpg',
            './LiXi/img/100k.jpg',
            './LiXi/img/200k.jpg',
            './LiXi/img/500k.jpg',
        
    ],
    handleEvents: function(){
        // Xử lí thay đổi gif và chuyển động lời chúc
        let Open_book = false
        let Openenvelope = false
        const gif = document.querySelector('.gif');
        setTimeout(function(){
            if(Open_book === false) {
                setTimeout(function(){
                    gif.style.backgroundImage = "url('https://media1.giphy.com/media/YPvXkXhnTJNm/200w.webp?cid=ecf05e474tit5ezjrc5obn734sg699n0m89psavcjrmy5x43&rid=200w.webp&ct=g')";
                    const rule =document.styleSheets[0].cssRules[0]
                    rule.style.setProperty('--bookAfterBackColor','20px solid #cac670')
                    book.style.animation = 'siuuu 1s ease-in-out infinite'
                },100);
            }
        },5500)
        // Xử lí mở lời chúc
        const book= document.querySelector('.book');
        book.onclick = function (){
            app.isOpen_book = true;
            Open_book = true;
            const page= document.querySelector('.page2');
            const back= document.querySelector('.back');
            const front= document.querySelector('.front');
            book.style.animation = 'siuuu 0s ease-in-out infinite'
            const rule =document.styleSheets[0].cssRules[0]
            rule.style.setProperty('--bookAfterBackColor','0px solid #f0e84e')
            const firework1 = document.querySelector('.firework1');
            firework1.style.display = 'block';

            const gif = document.querySelector('.gif');
            gif.classList.add('displayed')
            setTimeout(function(){
                page.classList.add ('displaying');
            },500)
            back.classList.add ('hoverback');
            front.classList.add ('hoverfront');
            front.classList.remove ('frontbackground');
            setTimeout(function(){
                document.querySelector('.btn').classList.add ('displaying');
            },4000)
            setTimeout(function(){
                document.querySelector('.icon1').classList.add ('displaying');
            },1500)
            // alert(Openenvelope)
        }

        
        

        // Xử lí mở lì xì 
        const envelope = document.querySelector('.envelope')
        const top = document.querySelector('.top')
        const bottom = document.querySelector('.bottom')
        const paper = document.querySelector('.paper')

        envelope.onclick = function(){
            if(!Openenvelope){
                const rd_money = app.money[app.randomMeney()]
                paper.style.backgroundImage = `url(${rd_money})`;
                console.log(rd_money)
                console.log(paper.style.backgroundImage)
                top.classList.add('top-open')
                top.style.zIndex = 1
                setTimeout(function(){
                    bottom.style.zIndex = 1
                },1500)
                paper.classList.add('paper-open')
                setTimeout(function(){
                    
                    paper.classList.add('paper-anime')
                    paper.style.width = '228px';
                    paper.style.height = '550px'
                    paper.style.transform = 'rotate(-90deg)'
                    const message = document.querySelector('.message')
                    setTimeout(function(){
                        message.style.opacity = 1
                    },2000)
                },1500)    
            }
            Openenvelope = true
        }
        

        // Xử lí khi nhấn nút nhận lì xì
        const btn = document.querySelector('.btn-item');
        const modal = document.querySelector('.modal')
        btn.onclick = function(){
            modal.style.display = 'block';
        };
        

        // Xử lí pháo hoa 
        const canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let ctx = canvas.getContext("2d");
        function Firework(x,y,height,yVol,R,G,B){
        this.x = x;
        this.y = y;
        this.yVol = yVol;
        this.height = height;
        this.R = R;
        this.G = G;
        this.B = B;
        this.radius = 2;
        this.boom = false;
        let boomHeight = Math.floor(Math.random() * 200) + 50;
        this.draw = function(){
        
        ctx.fillStyle = "rgba(" + R + "," + G + "," + B + ")";
            ctx.strokeStyle = "rgba(" + R + "," + G + "," + B + ")";
            ctx.beginPath();
            // ctx.arc(this.x,boomHeight,this.radius,Math.PI * 2,0,false);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(this.x,this.y,3,Math.PI * 2,0,false);
            ctx.fill();
        }
        this.update = function(){
            this.y -= this.yVol;
            if(this.radius < 20){
            this.radius += 0.35;
            }
            if(this.y < boomHeight){
            this.boom = true;
            
            for(let i = 0; i < 120; i++){
                particleArray.push(new Particle(
                this.x,
                this.y,
                // (Math.random() * 2) + 0.5//
                (Math.random() * 2) + 1,
                this.R,
                this.G,
                this.B,
                1,
                ))

            }
            }
            this.draw();
        }
        this.update()
        }

        window.addEventListener("click", (e)=>{
            let x = e.clientX;
        let y = canvas.height;
        let R = Math.floor(Math.random() * 255)
        let G = Math.floor(Math.random() * 255)
        let B = Math.floor(Math.random() * 255)
        let height = (Math.floor(Math.random() * 20)) + 10;
        fireworkArray.push(new Firework(x,y,height,5,R,G,B))
        })

        function Particle(x,y,radius,R,G,B,A){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.R = R;
        this.G = G;
        this.B = B;
        this.A = A;
        this.timer = 0;
        this.fade = false;
        
        // Change random spread
        this.xVol = (Math.random() * 10) - 4
        this.yVol = (Math.random() * 10) - 4
        
        
        // console.log(this.xVol,this.yVol)
        this.draw = function(){
        //   ctx.globalCompositeOperation = "lighter"
            ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + this.A + ")";
            ctx.save();
            ctx.beginPath(); 
        // ctx.fillStyle = "white"
            ctx.globalCompositeOperation = "screen"
            ctx.arc(this.x,this.y,this.radius,Math.PI * 2,0,false);
            ctx.fill();
        
            ctx.restore();
        }
        this.update = function(){
            this.x += this.xVol;
            this.y += this.yVol;
            
            // Comment out to stop gravity. 
            if(this.timer < 200){
                this.yVol += 0.12;
            }
            this.A -= 0.02;
            if(this.A < 0){
            this.fade = true;
            }
            this.draw();
        }
        this.update();
        }

        let fireworkArray = [];
        let particleArray = [];
        for(let i = 0; i < 6; i++){
        let x = Math.random() * canvas.width;
        let y = canvas.height;
        let R = Math.floor(Math.random() * 255)
        let G = Math.floor(Math.random() * 255)
        let B = Math.floor(Math.random() * 255)
        let height = (Math.floor(Math.random() * 20)) + 10;
        fireworkArray.push(new Firework(x,y,height,5,R,G,B))
        }


        function animate(){
        requestAnimationFrame(animate);
        // ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "rgba(0,0,0,0.1)"
        ctx.fillRect(0,0,canvas.width,canvas.height);
        for(let i = 0; i < fireworkArray.length; i++){
            fireworkArray[i].update();
        }
        for(let j = 0; j < particleArray.length; j++){
            particleArray[j].update();
        }
        if(fireworkArray.length < 4){
            let x = Math.random() * canvas.width;
            let y = canvas.height;
            let height = Math.floor(Math.random() * 20);
            let yVol = 5;
            let R = Math.floor(Math.random() * 255);
            let G = Math.floor(Math.random() * 255);          
            let B = Math.floor(Math.random() * 255);
            fireworkArray.push(new Firework(x,y,height,yVol,R,G,B));
        }
        
        
        fireworkArray = fireworkArray.filter(obj => !obj.boom);
        particleArray = particleArray.filter(obj => !obj.fade);
        }
        animate();

        window.addEventListener("resize", (e) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        })

        //Xử lí khi blur khỏi bao lì xì
        canvas.onclick = function(){
            modal.style.display = 'none';
        }
    },
    //Xử lí random money
    randomMeney :function(){
        let newMoney = Math.floor(Math.random() * 6) ;
        return newMoney;
    },
    start: function(){
        this.handleEvents()
    }
}
app.start()
