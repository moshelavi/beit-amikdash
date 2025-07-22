(function () {
    function addFont(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
    addFont('https://fonts.googleapis.com/css2?family=Bona+Nova+SC&display=swap');
    addFont('https://db.onlinewebfonts.com/c/1e5f9518cedc2205b9be575333531250?family=Digital-7');

    const scriptPath = getScriptPath();
    const imagePath = scriptPath + encodeURIComponent('בית המקדש.jpg');

    const css = `
@keyframes fadeInSlideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

#destruction-widget-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: rgba(114, 42, 42, 0.5);
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    overflow: hidden;
    max-width: 350px;
    width: auto;
    height: auto;
    box-sizing: border-box;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.4s ease;
    transform: translateY(0);
    font-family: 'Bona Nova SC', Arial, sans-serif;
    color: #ffffff;
    direction: rtl;
    animation: fadeInSlideUp 0.5s 0.2s ease-out forwards;
    opacity: 0;
    cursor: pointer;
}

#destruction-widget-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.3);
}
#destruction-widget-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('${imagePath}');
    background-size: cover;
    background-position: center;
    mix-blend-mode: overlay;
    opacity: 0.5;
    z-index: 0;
    border-radius: 15px;
    filter: blur(1px);
}
#destruction-widget-close-btn {
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: transparent;
    border: none;
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    margin: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
    z-index: 2;
}

#destruction-widget-close-btn:hover {
    background-color: rgba(0, 0, 0, 0.2);
}
#destruction-widget-counter {
    position: relative;
    z-index: 1;
}
#destruction-widget-counter h2 {
    color: #ffffff;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 700;
    line-height: 1.2;
    font-family: 'Bona Nova SC', Arial, sans-serif;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}
.destruction-widget-time-unit {
    display: flex;
    justify-content: center;
    align-items: baseline;
    margin-bottom: 10px;
}
.destruction-widget-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 5px;
}
.destruction-widget-unit-title {
    font-size: 12px;
    color: #bbb;
    margin-top: 4px;
    font-family: 'Bona Nova SC', Arial, sans-serif;
}
.destruction-widget-unit-value-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    direction: ltr;
}
.destruction-widget-unit-value {
    border: none;
    border-radius: 6px;
    background-color: rgba(142, 136, 136, 0.5);
    width: 20px;
    margin: 0 1px;
    height: 30px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
}

.destruction-widget-digit-reel {
    display: flex;
    flex-direction: column;
    transition: transform 0.9s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.destruction-widget-digit-reel > span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Digital-7', Arial, sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    width: 20px;
    min-height: 30px;
    line-height: 30px;
    text-align: center;
}
.destruction-widget-colon {
    font-size: 20px;
    line-height: 30px;
    font-family: 'Digital-7', Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px;
    color: #ffffff;
}

.destruction-widget-action {
    font-size: 14px;
    color: #ffffff;
    margin-top: 10px;
    text-transform: uppercase;
    font-weight: 700;
    font-family: 'Bona Nova SC', Arial, sans-serif;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}
@media (max-width: 480px) {
    #destruction-widget-container {
        padding: 15px;
        right: 5vw;
        width: 90vw;
    }
    .destruction-widget-unit-value {
        font-size: 16px;
    }
    .destruction-widget-colon { 
        font-size: 14px;
        line-height: 30px;
    }
}

#destruction-widget-container.closing {
    opacity: 0;
    transform: translateY(20px);
}
`;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const DESTRUCTION_YEAR = 70;
    const popupContainer = document.createElement('div');
    popupContainer.id = 'destruction-widget-container';
    popupContainer.innerHTML = `
        <div id="destruction-widget-background"></div>
        <button id="destruction-widget-close-btn" aria-label="סגור">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;"><path d="M13 1L1 13M1 1L13 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div id="destruction-widget-counter">
            <h2>זמן שחלף מאז חורבן בית המקדש</h2>
            <div class="destruction-widget-time-unit" id="d-widget-time-units-container"></div>
            <div class="destruction-widget-action">"והראנו בבניינו ושמחנו בתיקונו"</div>
        </div>
    `;
    document.body.appendChild(popupContainer);

    let elementsToUpdate = null;
    let previousTimes = { years: -1, days: -1 };
    const LOCAL_STORAGE_CLOSED_KEY = 'destructionWidgetClosed';

    function getTishaBAvGregorianDate(year) {
        const hebrewYear = year + 3760;
        const isHebrewLeap = (hYear) => ((hYear * 7) + 1) % 19 < 7;
        const hebrewEpoch = 347997;
        const daysInHebrewYear = (hYear) => {
            return elapsedDays(hYear + 1) - elapsedDays(hYear);
        };
        const elapsedDays = (hYear) => {
            const months = Math.floor(((235 * hYear) - 234) / 19);
            const parts = 12084 + (13753 * months);
            let day = (months * 29) + Math.floor(parts / 25920);
            const dayOfWeek = day % 7;
            if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
                day++;
            } else if (dayOfWeek === 1 && (parts % 25920) >= 19440 && !isHebrewLeap(hYear)) {
                day += 2;
            } else if (dayOfWeek === 0 && (parts % 25920) >= 13676 && isHebrewLeap(hYear - 1)) {
                day++;
            }
            return day;
        };
        const fromJD = (jd) => {
            const z = Math.floor(jd + 0.5);
            const a = Math.floor((z - 1867216.25) / 36524.25);
            const b = z + 1 + a - Math.floor(a / 4);
            const c = b + 1524;
            const d = Math.floor((c - 122.1) / 365.25);
            const e = Math.floor(365.25 * d);
            const f = Math.floor((c - e) / 30.6001);
            const day = c - e - Math.floor(30.6001 * f);
            const month = f - (f > 13 ? 13 : 1);
            const gYear = d - (month > 2 ? 4716 : 4715);
            return new Date(Date.UTC(gYear, month - 1, day));
        };
        const yearDays = daysInHebrewYear(hebrewYear);
        let daysFromTishrei1 = (isHebrewLeap(hebrewYear) ? 238 : 209) + (yearDays % 10 === 5 ? 2 : (yearDays % 10 === 4 ? 1 : 0));
        const tishaBAvJd = hebrewEpoch + elapsedDays(hebrewYear) + daysFromTishrei1;
        const date = fromJD(tishaBAvJd);
        if (date.getUTCDay() === 6) {
            date.setUTCDate(date.getUTCDate() + 1);
        }
        return date;
    }

    function createCounterDOM() {
        const timeUnitsContainer = document.getElementById('d-widget-time-units-container');
        timeUnitsContainer.innerHTML = '';
        timeUnitsContainer.setAttribute('aria-live', 'polite');
        const elements = {
            yearValueContainer: null,
            dayValueContainer: null,
            container: timeUnitsContainer
        };
        const TIME_UNITS_META = [
            { key: 'years', title: 'שנים' },
            { key: 'days', title: 'ימים' }
        ];
        TIME_UNITS_META.forEach((meta, index) => {
            const unitContainer = document.createElement('div');
            unitContainer.classList.add('destruction-widget-unit');
            const valueContainer = document.createElement('div');
            valueContainer.classList.add('destruction-widget-unit-value-container');
            if (meta.key === 'years') {
                elements.yearValueContainer = valueContainer;
            } else {
                elements.dayValueContainer = valueContainer;
            }
            unitContainer.appendChild(valueContainer);
            const titleElement = document.createElement('div');
            titleElement.classList.add('destruction-widget-unit-title');
            titleElement.textContent = meta.title;
            unitContainer.appendChild(titleElement);
            timeUnitsContainer.appendChild(unitContainer);
            if (index < TIME_UNITS_META.length - 1) {
                const colonElement = document.createElement('div');
                colonElement.classList.add('destruction-widget-colon');
                colonElement.textContent = ':';
                colonElement.setAttribute('aria-hidden', 'true');
                timeUnitsContainer.appendChild(colonElement);
            }
        });
        return elements;
    }

    function updateDigit(reelElement, newDigit) {
        const digitAsNumber = parseInt(newDigit, 10);
        if (isNaN(digitAsNumber)) return;
        const digitHeight = 30;
        const newTransform = `translateY(-${digitAsNumber * digitHeight}px)`;
        if (reelElement.style.transform !== newTransform) {
            reelElement.style.transform = newTransform;
        }
    }

    function createDigitReel() {
        const numberContainer = document.createElement('div');
        numberContainer.classList.add('destruction-widget-unit-value');
        const reelElement = document.createElement('div');
        reelElement.classList.add('destruction-widget-digit-reel');
        for (let j = 0; j <= 9; j++) {
            const digitSpan = document.createElement('span');
            digitSpan.textContent = j;
            reelElement.appendChild(digitSpan);
        }
        numberContainer.appendChild(reelElement);
        reelElement.style.transform = 'translateY(-30px)';
        return numberContainer;
    }

    function syncUnit(container, valueStr) {
        const currentDigits = container.children.length;
        const requiredDigits = valueStr.length || 1;
        const valueToDisplay = valueStr || '0';
        const structureChanged = currentDigits !== requiredDigits;
        if (requiredDigits > currentDigits) {
            for (let i = 0; i < requiredDigits - currentDigits; i++) {
                container.appendChild(createDigitReel());
            }
        } else if (requiredDigits < currentDigits) {
            for (let i = 0; i < currentDigits - requiredDigits; i++) {
                container.removeChild(container.firstChild);
            }
        }
        const updateValues = () => {
            const reelElements = Array.from(container.children).map(child => child.querySelector('.destruction-widget-digit-reel'));
            valueToDisplay.split('').forEach((char, i) => {
                if (reelElements[i]) {
                    updateDigit(reelElements[i], char);
                }
            });
        };
        if (structureChanged || previousTimes.years === -1) {
            setTimeout(updateValues, 20);
        } else {
            updateValues();
        }
    }

    function updateCounterDisplay(elements, times) {
        if (times.years === previousTimes.years && times.days === previousTimes.days) {
            return;
        }
        const yearStr = times.years.toString();
        const dayStr = times.days.toString();
        syncUnit(elements.yearValueContainer, yearStr);
        syncUnit(elements.dayValueContainer, dayStr);
        elements.container.setAttribute('aria-label', `${times.years} שנים ו-${times.days} ימים`);
        previousTimes = times;
    }

    function runCounterLoop() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const currentYear = today.getFullYear();
        const tishaBAvThisYear = getTishaBAvGregorianDate(currentYear);
        let lastTishaBAv;
        let yearsSinceDestruction = currentYear - DESTRUCTION_YEAR;
        if (today < tishaBAvThisYear) {
            lastTishaBAv = getTishaBAvGregorianDate(currentYear - 1);
            yearsSinceDestruction -= 1;
        } else {
            lastTishaBAv = tishaBAvThisYear;
        }
        const timeDiff = today - lastTishaBAv;
        const daysSinceLastTishaBAv = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const times = {
            years: yearsSinceDestruction,
            days: daysSinceLastTishaBAv,
        };
        updateCounterDisplay(elementsToUpdate, times);
        setTimeout(runCounterLoop, 1000);
    }

    function closeTemplePopup() {
        const popupContainer = document.getElementById('destruction-widget-container');
        if (popupContainer && !popupContainer.classList.contains('closing')) {
            popupContainer.classList.add('closing');
            setTimeout(() => {
                popupContainer.style.display = 'none';
                localStorage.setItem(LOCAL_STORAGE_CLOSED_KEY, Date.now().toString());
            }, 400);
        }
    }

    function getScriptPath() {
        const scripts = document.getElementsByTagName('script');
        const currentScript = scripts[scripts.length - 1];
        const scriptUrl = currentScript.src;
        const pathParts = scriptUrl.split('/');
        pathParts.pop();
        return pathParts.join('/') + '/';
    }

    popupContainer.addEventListener('click', function (event) {
        if (event.target.closest('#destruction-widget-close-btn')) {
            return;
        }
        const projectPageUrl = new URL('Landing page/index.html', scriptPath).href;
        window.location.href = projectPageUrl;
    });

    const closedTimestamp = localStorage.getItem(LOCAL_STORAGE_CLOSED_KEY);
    if (closedTimestamp) {
        const HIDE_DURATION = 15 * 60 * 1000;
        const timeSinceClosed = Date.now() - parseInt(closedTimestamp, 10);

        if (timeSinceClosed < HIDE_DURATION) {
            console.log('Counter widget is hidden because it was closed recently. It will reappear after 15 minutes.');
            popupContainer.style.display = 'none';
            return;
        } else {
            localStorage.removeItem(LOCAL_STORAGE_CLOSED_KEY);
        }
    }

    document.getElementById('destruction-widget-close-btn').addEventListener('click', closeTemplePopup);
    elementsToUpdate = createCounterDOM();
    setTimeout(runCounterLoop, 50);

    function addGoatCounter() {
        const script = document.createElement('script');
        script.dataset.goatcounter = 'https://mnshe.goatcounter.com/count';
        script.async = true;
        script.src = '//gc.zgo.at/count.js';
        document.head.appendChild(script);
    }
    addGoatCounter();
})();
