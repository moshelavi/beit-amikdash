const DESTRUCTION_YEAR = 70;

function getTishaBAvDate(year) {
    return new Date(year, 7, 12);
}

const currentYear = new Date().getFullYear();
const tishaBAvDate = getTishaBAvDate(currentYear);

function calculateTimeSinceDestruction() {
    const today = new Date();
    const timeSinceDestruction = today - tishaBAvDate;
    const daysSinceDestruction = Math.floor(timeSinceDestruction / (1000 * 60 * 60 * 24));
    const yearsSinceDestruction = currentYear - DESTRUCTION_YEAR;

    const times = {
        days: daysSinceDestruction,
        years: yearsSinceDestruction,
    };

    const timeUnitsContainer = document.getElementById('time-units-container');
    timeUnitsContainer.innerHTML = '';

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
