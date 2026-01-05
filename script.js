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
    updateMouseInfo(e);
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
}

function moveAnimalTo(x, y) {
    // 不移动动物，保持固定位置
}

function handleKeyDown(e) {
    const keyElement = document.querySelector(`[data-key="${e.code}"]`);
    if (keyElement) {
        keyElement.classList.add('active');
        showWaterDropEffect(keyElement);
        animalPressKey(e.code, keyElement);
    }
}

function showWaterDropEffect(keyElement) {
    // 创建水滴效果
    const waterDrop = document.createElement('div');
    waterDrop.className = 'water-drop';
    keyElement.appendChild(waterDrop);
    
    // 移除水滴效果
    setTimeout(() => {
        waterDrop.remove();
    }, 600);
    
    // 扩散到周围键位
    const keyRect = keyElement.getBoundingClientRect();
    const keys = document.querySelectorAll('.key');
    
    keys.forEach(key => {
        if (key === keyElement) return;
        
        const rect = key.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(rect.left - keyRect.left, 2) + 
            Math.pow(rect.top - keyRect.top, 2)
        );
        
        // 只影响距离在100px内的键位
        if (distance < 100) {
            setTimeout(() => {
                key.classList.add('drip-effect');
                setTimeout(() => {
                    key.classList.remove('drip-effect');
                }, 800);
            }, distance * 1.5); // 根据距离设置延迟，模拟扩散效果
        }
    });
}

function handleKeyUp(e) {
    const keyElement = document.querySelector(`[data-key="${e.code}"]`);
    if (keyElement) {
        keyElement.classList.remove('active');
    }
}

function animalPressKey(keyCode, keyElement) {
    // 获取被按下的键位的位置
    const keyRect = keyElement.getBoundingClientRect();
    const keyCenterX = keyRect.left + keyRect.width / 2;
    const keyCenterY = keyRect.top + keyRect.height / 2;
    
    // 获取动物的位置
    const animalRect = animal.getBoundingClientRect();
    
    // 计算手需要移动的距离
    const hand = document.querySelector('.animal-hand-right');
    const handRect = hand.getBoundingClientRect();
    const handCenterX = handRect.left + handRect.width / 2;
    const handCenterY = handRect.top + handRect.height / 2;
    
    // 计算手的移动距离（相对动物）
    const handMoveX = keyCenterX - handCenterX;
    const handMoveY = keyCenterY - handCenterY;
    
    // 计算手的角度，使其指向按键
    const angle = Math.atan2(handMoveY, handMoveX) * 180 / Math.PI;
    
    // 设置手的移动和旋转，添加过渡效果
    hand.style.transition = 'all 0.15s ease-out';
    hand.style.transform = `translateX(${handMoveX}px) translateY(${handMoveY}px) rotate(${angle + 90}deg)`;
    
    // 添加手按压动画
    animal.classList.add('hand-pressing');
    
    // 按键被按下时的效果
    keyElement.classList.add('pressed');
    
    // 移除按压动画并恢复手的位置
    setTimeout(() => {
        animal.classList.remove('hand-pressing');
        hand.style.transition = 'all 0.3s ease-in-out';
        hand.style.transform = `rotate(25deg) translateY(10px)`;
        keyElement.classList.remove('pressed');
    }, 200);
}

function moveAnimalBy(deltaX, deltaY) {
    // 不移动动物，保持固定位置
}

function animateAnimal() {
    // 不执行任何动画，保持动物固定
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
