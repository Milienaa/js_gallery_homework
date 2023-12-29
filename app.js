'use strict'

class LightBox { 
    #widthWindow = 0;

    constructor(picWrapper) {
        this.elementStr = picWrapper;
        this.pictures = document.querySelectorAll(this.elementStr);
    }

    defineSize() {
        this.#widthWindow = window.innerWidth;
        console.log(this.#widthWindow);
        if(this.#widthWindow >= 540){
            if(!this.overlay){
                this.createStyle();
                this.creteModalWindow();
                this.addProperies();
                this.pictures.forEach(elem => elem.addEventListener('click',this.openWindow.bind(this)))
                this.overlay.addEventListener('click', this.closeWindow.bind(this));
            }
        } else {
            if (this.overlay) {
                this.overlay.style.display = 'none';
                this.modal.style.display = 'none';
            }
        }
    }

    createStyle() {
        let str = `
        <style>
        .overlay {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(36, 36, 36, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal {
            width: 85vmin;
            background-color: #fff;
            box-shadow: 0 0 5px black;
            padding: 15px;
            position: relative;
        }

        .modal h2 {
           text-align: center;
           padding: 7.5px;
        }
 
        .btn {
            color: white;
            font-weight: bold;
            font-size: 2em;
            display: block;
            position: absolute;
            top: -32px;
            right: -20px;
            transform: rotate(45deg);
            cursor: pointer;
        }

        @keyframes anim1 {
           from{ opacity: 0; }
        
           to{ opacity: 1; }
        }
        </style>
        `
        document.head.insertAdjacentHTML('beforeend', str);
    }

    creteModalWindow() {
        let str = `
        <div class="overlay" style="display: none">
            <div class="modal" style="display: none">
                <img src="" alt="">
                <h2>Lorem, ipsum.</h2>
                <span class="btn">+</span>
            </div>
        </div>
    `
    document.body.insertAdjacentHTML('beforeend',str);
    }

    openWindow(e){
        if(e.target.matches(this.elementStr)) {
            const url = e.target.getAttribute('src');
            const title = e.target.getAttribute('alt');

            
            this.img.setAttribute('src', url);
            this.title.textContent = title;
            this.overlay.style.display = null;
            this.overlay.style.animationName = 'anim1';
            this.overlay.style.animationDuration = '200ms';
            setTimeout(() => {
                this.modal.style.display = null;
                this.modal.style.animationName = 'anim1';
                this.modal.style.animationDuration = '200ms';
            }, 100);
            
        }
    }

    closeWindow(e) {
        const t = e.target;
        if(t.matches('.overlay') || t.matches('.btn')){
            setTimeout(() => {this.overlay.style.display = 'none';}, 100);
            this.modal.style.display = 'none';
        }
    }

    addProperies() {
        this.overlay = document.querySelector('.overlay');
        this.modal = this.overlay.querySelector('.modal');
        this.img = this.modal.querySelector('img');
        this.title = this.modal.querySelector('h2');
    }

    init() {
        console.dir(this);
        window.addEventListener('load', this.defineSize.bind(this));
        window.addEventListener('resize', this.defineSize.bind(this));
        
    }
}



















/*
class LightBox {
    #widthWindow = 0;

    constructor(picWrapper){
        this.pictures = document.querySelectorAll(picWrapper);
    }

    defineSize(){
        this.#widthWindow = window.innerWidth;

        let wrap = document.querySelector('.overlay');
        if(this.#widthWindow >= 640){
            if(!wrap){
                this.#creteModalWindow();
            }
        }
    }

    #creteModalWindow(){
        let str = `
        <div class="overlay" style="display: none">
            <div class="modal">
                <img src="" alt="">
                <h2>Lorem, ipsum.</h2>
                <span class="btn">+</span>
            </div>
        </div>
    `
    document.body.insertAdjacentHTML('beforeend',str);
    }

    #openModalWindow(src, title){
        let wrap = document.querySelector('.overlay');
        wrap.querySelector('img').setAttribute('src',src);
        wrap.querySelector('h2').textContent = title;
        wrap.style.display = null;
    }

    #closeModalWindow(e){
        let wrap = document.querySelector('.overlay');
        if (e.target.matches('.btn')){
            wrap.style.display = 'none';
        }
        
        if (e.target.matches('.overlay')){
            wrap.style.display = 'none';
        }
    }

    init(){
        console.dir(this);

        window.addEventListener('load', this.defineSize.bind(this));
        window.addEventListener('resize', this.defineSize.bind(this));

        this.pictures.forEach(elem => {
            elem.addEventListener('click', () => {
                let pic = elem.getAttribute('src');
                let title = elem.getAttribute('alt');

                this.#openModalWindow(pic, title);
            })
        })
        document.body.addEventListener('click',this.#closeModalWindow.bind(this));

    }
}
*/