/* 
Урок 3: DOM и события в JS. Живая доска настроения (mood board)
*/

const MOODS = {
    happy: {
        emoji: '😁',
        title: 'Радость',
        subtitle: 'Сегодня просто отличный день - улыбайся!',
        bg: 'linear-gradient(160deg, #2d1f00 0%, #3d2a00 60%, #1a1000 100%)',
        glow: '#ffd166',
        color: '#ffd166',
        key: '1',
        wave: [12, 28, 18, 44, 22, 40, 16, 46, 20, 38, 26, 42, 14, 36],
    },

    calm: {
        emoji: '🌊',
        title: 'Спокойствие',
        subtitle: 'Дышим медленно. Все идет своим чередом.',
        bg: 'linear-gradient(160deg, #001f2d 0%, #002a3d 60%, #000f18 100%)',
        glow: '#6ad4f7',
        color: '#6ad4f7',
        key: '2',
        wave: [8, 14, 10, 18, 8, 16, 12, 20, 8, 14, 10, 18, 8, 14],
    },

    fire: {
        emoji: '🔥',
        title: 'Энергия',
        subtitle: 'Полный заряд! Врываемся и делаем дела.',
        bg: 'linear-gradient(160deg, #2d0500 0%, #3d0e00 60%, #1a0000 100%)',
        glow: '#ff6b35',
        color: '#ff6b35',
        key: '3',
        wave: [22, 46, 30, 50, 26, 48, 32, 46, 24, 44, 30, 48, 22, 44],
    },

    sad: {
        emoji: '🌧️',
        title: 'Грусть',
        subtitle: 'Иногда нужно просто побыть с собой.',
        bg: 'linear-gradient(160deg, #0d1520 0%, #0a1018 60%, #060a10 100%)',
        glow: '#8899bb',
        color: '#8899bb',
        key: '4',
        wave: [6, 10, 8, 12, 6, 10, 8, 14, 6, 10, 8, 12, 6, 10],
    },

    love: {
        emoji: '💘',
        title: 'Любовь',
        subtitle: 'Тепло внутри, тепло снаружи. Ты не один.',
        bg: 'linear-gradient(160deg, #1f0028 0%, #2a0038 60%, #100015 100%)',
        glow: '#c084fc',
        color: '#c084fc',
        key: '5',
        wave: [14, 26, 20, 34, 16, 30, 22, 32, 16, 28, 20, 30, 14, 26],
    },

    chill: {
        emoji: '🌚',
        title: 'Чилл',
        subtitle: 'Поздний вечер, тихая музыка, никуда не спешим.',
        bg: 'linear-gradient(160deg, #080d18 0%, #0d1224 60%, #040608 100%)',
        glow: '#7c9fe0',
        color: '#7c9fe0',
        key: '6',
        wave: [6, 10, 8, 14, 6, 12, 8, 14, 6, 10, 8, 12, 6, 10],
    },
};

// 2. Находим элементы в DOM

const stageEl = document.getElementById('stage');
const glowEl = document.getElementById('stage-glow');
const emojiEl = document.getElementById('mood-emoji');
const titleEl = document.getElementById('mood-title');
const subtitleEl = document.getElementById('mood-subtitle');
const waveEl = document.getElementById('wave');
const clickCountEl = document.getElementById('click-count');
const currentMoodEl = document.getElementById('current-mood');
const keyHintEl = document.getElementById('key-hint');
const windowBadgeEl = document.getElementById('window-badge');
const moodBtns = document.querySelectorAll('.mood-btn');

// 3. Кол-во кликов на кнопках

let clickCount = 0;

// 4. Создаем полосы волны

const BAR_COUNT = 14;

for (let i = 0; i < BAR_COUNT; i++){
    const bar = document.createElement('div');
    bar.className = 'wave-bar';
    bar.style.height = '8px';
    waveEl.appendChild(bar);
}

function applyMood(key) {
    const mood = MOODS[key]
    if(!mood) return;
    // Счетчик
    clickCount++;

    // Фон
    stageEl.style.background = mood.bg;

    // Glow
    glowEl.style.background = mood.glow;
    glowEl.style.opacity = '0.25';

    // Анимация emoji : уменьшение -> меняем emoji -> увеличение
    emojiEl.style.transform = 'scale(0.4)';
    emojiEl.style.opacity = '0';
    setTimeout(()=> {
        emojiEl.textContent = mood.emoji;
        emojiEl.style.transform = 'scale(1)';
        emojiEl.style.opacity = '1';
    }, 160);

    // Текст
    titleEl.textContent = mood.title;
    titleEl.style.color = mood.color;
    subtitleEl.textContent = mood.subtitle;

    //Волна
    const waveBars = waveEl.querySelectorAll('.wave-bar')
    waveBars.forEach((bar, i)=>{
        setTimeout(()=>{
            bar.style.height = (mood.wave[i] ?? 8) + 'px';
            bar.style.background = mood.color;
            bar.style.opacity = '0.65';
        }, i * 25);
    });

    // Активная кнопка
    moodBtns.forEach(b=>b.classList.remove('active'));
    document.querySelector(`[data-mood="${key}"]`).classList.add('active');

    //Статистика
    clickCountEl.textContent = clickCount;
    currentMoodEl.textContent = mood.title;
    keyHintEl.textContent = mood.key;
}

// 5. Обработчики событий

// Клики по кнопкам
moodBtns.forEach(btn => {
    btn.addEventListener('click', (e) =>{
        applyMood(e.currentTarget.dataset.mood);
    });
});


// Нажатие клавиш 1-6
document.addEventListener('keydown', (e) => {
    const entry = Object.entries(MOODS).find(([, mood])=> mood.key === e.key);
    if (entry) applyMood(entry[0]);
});