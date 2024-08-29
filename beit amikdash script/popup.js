// יצירת אלמנט ה-link לטעינת קובץ ה-CSS
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css';
document.head.appendChild(link);

// יצירת אלמנט ה-popup
const popupContainer = document.createElement('div');
popupContainer.id = 'popup-container';

popupContainer.innerHTML = `
    <div id="popup-background"></div>
    <button id="close-btn" onclick="closePopup()" aria-label="סגור">✕</button>
    <div id="temple-counter">
        <h2>זמן שחלף מאז חורבן בית המקדש</h2>
        <div class="time-unit" id="time-units-container"></div>
        <div class="action">"והראנו בבינינו ושמחנו בתיקונו"</div>
    </div>
`;

// הוספת הפופאפ לגוף המסמך
document.body.appendChild(popupContainer);

// פונקציות לוגיקה
const DESTRUCTION_YEAR = 70;

function getTishaBAvDate(year) {
    return new Date(year, 7, 12);
}

function calculateTimeSinceDestruction() {
    const today = new Date();
    const tishaBAvDate = getTishaBAvDate(today.getFullYear());
    const timeSinceDestruction = today - tishaBAvDate;
    const daysSinceDestruction = Math.floor(timeSinceDestruction / (1000 * 60 * 60 * 24)) - 1;
    const yearsSinceDestruction = today.getFullYear() - DESTRUCTION_YEAR;

    const times = {
        days: daysSinceDestruction,
        years: yearsSinceDestruction,
    };

    const timeUnitsContainer = document.getElementById('time-units-container');
    timeUnitsContainer.innerHTML = '';

    // שינוי הסדר כך שימים יופיעו קודם ולאחריהם השנים
    const TIME_UNITS = ['days', 'years'];

    TIME_UNITS.forEach((unit, index) => {
        let unitValue = times[unit].toString().padStart(2, '0');

        const unitContainer = document.createElement('div');
        unitContainer.classList.add('unit');

        const valueContainer = document.createElement('div');
        valueContainer.classList.add('unit-value-container');

        unitValue.split('').forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('unit-value');
            numberElement.textContent = number;
            valueContainer.appendChild(numberElement);
        });

        unitContainer.appendChild(valueContainer);

        const titleElement = document.createElement('div');
        titleElement.classList.add('unit-title');
        titleElement.textContent = unit === 'years' ? 'שנים' : 'ימים';

        unitContainer.appendChild(titleElement);
        timeUnitsContainer.appendChild(unitContainer);

        if (index < TIME_UNITS.length - 1) {
            const colonElement = document.createElement('div');
            colonElement.classList.add('colon');
            colonElement.textContent = ':';
            timeUnitsContainer.appendChild(colonElement);
        }
    });

    requestAnimationFrame(calculateTimeSinceDestruction);
}

calculateTimeSinceDestruction();

function closePopup() {
    const popupContainer = document.getElementById('popup-container');
    if (popupContainer) {
        popupContainer.style.display = 'none';
    }
}
