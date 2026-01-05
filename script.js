const animal = document.getElementById('animal');
const keyboard = document.getElementById('keyboard');
const clickEffect = document.getElementById('clickEffect');
const mouseInfo = document.getElementById('mouseInfo');

let animalX = window.innerWidth / 2;
let animalY = window.innerHeight * 0.2;
let mouseX = 0;
let mouseY = 0;

function init() {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    animateAnimal();
    updateMouseInfo();
}

function handleMouseDown(e) {
    showClickEffect(e.clientX, e.clientY);
    animal.classList.add('jump');
    setTimeout(() => {
        animal.classList.remove('jump');
    }, 500);
    updateMouseInfo(e);
    moveAnimalTo(e.clientX, e.clientY);
}

function showClickEffect(x, y) {
    clickEffect.style.left = `${x - 15}px`;
    clickEffect.style.top = `${y - 15}px`;
    clickEffect.classList.add('active');
    setTimeout(() => {
        clickEffect.classList.remove('active');
    }, 500);
}

function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateMouseInfo(e);
    lookAtMouse(e.clientX);
}

function lookAtMouse(x) {
    const animalRect = animal.getBoundingClientRect();
    const animalCenterX = animalRect.left + animalRect.width / 2;
    if (x < animalCenterX) {
        animal.classList.add('look-left');
        animal.classList.remove('look-right');
    } else {
        animal.classList.add('look-right');
        animal.classList.remove('look-left');
    }
}

function moveAnimalTo(x, y) {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    const newX = Math.max(50, Math.min(x - 50, maxX));
    const newY = Math.max(50, Math.min(y - 50, maxY));
    animal.style.left = `${newX}px`;
    animal.style.top = `${newY}px`;
}

function handleKeyDown(e) {
    const keyElement = document.querySelector(`[data-key="${e.code}"]`);
    if (keyElement) {
        keyElement.classList.add('active');
        animalReactionToKey(e.code);
    }
}

function handleKeyUp(e) {
    const keyElement = document.querySelector(`[data-key="${e.code}"]`);
    if (keyElement) {
        keyElement.classList.remove('active');
    }
}

function animalReactionToKey(keyCode) {
    switch(keyCode) {
        case 'Space':
            animal.classList.add('jump');
            setTimeout(() => {
                animal.classList.remove('jump');
            }, 500);
            break;
        case 'ArrowLeft':
            moveAnimalBy(-50, 0);
            break;
        case 'ArrowRight':
            moveAnimalBy(50, 0);
            break;
        case 'ArrowUp':
            moveAnimalBy(0, -50);
            break;
        case 'ArrowDown':
            moveAnimalBy(0, 50);
            break;
        default:
            animal.style.transform += ' scale(1.1)';
            setTimeout(() => {
                animal.style.transform = animal.style.transform.replace(' scale(1.1)', '');
            }, 100);
            break;
    }
}

function moveAnimalBy(deltaX, deltaY) {
    const currentLeft = parseInt(animal.style.left) || window.innerWidth / 2 - 50;
    const currentTop = parseInt(animal.style.top) || window.innerHeight * 0.2;
    const newLeft = Math.max(50, Math.min(currentLeft + deltaX, window.innerWidth - 150));
    const newTop = Math.max(50, Math.min(currentTop + deltaY, window.innerHeight - 150));
    animal.style.left = `${newLeft}px`;
    animal.style.top = `${newTop}px`;
}

function animateAnimal() {
    const time = Date.now() * 0.001;
    const floatY = Math.sin(time) * 5;
    animal.style.transform += ` translateY(${floatY}px)`;
    setTimeout(() => {
        animal.style.transform = animal.style.transform.replace(` translateY(${floatY}px)`, '');
    }, 16);
    requestAnimationFrame(animateAnimal);
}

function updateMouseInfo(e) {
    if (!e) return;
    const mouseButton = e.button === 0 ? '左键' : e.button === 1 ? '中键' : e.button === 2 ? '右键' : '未知';
    mouseInfo.innerHTML = `
        <div>鼠标位置: X=${e.clientX}, Y=${e.clientY}</div>
        <div>点击按钮: ${mouseButton}</div>
        <div>按键状态: ${document.hidden ? '隐藏' : '可见'}</div>
    `;
}

window.addEventListener('resize', () => {
    animalX = Math.min(animalX, window.innerWidth - 100);
    animalY = Math.min(animalY, window.innerHeight - 100);
    animal.style.left = `${animalX}px`;
    animal.style.top = `${animalY}px`;
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

init();
