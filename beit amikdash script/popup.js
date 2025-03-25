(function() {
    const scriptPath = getScriptPath();
    const imagePath = scriptPath + 'בית המקדש.JPG';
    
    const css = `
@import url('https://fonts.googleapis.com/css2?family=Bona+Nova+SC&display=swap');
#temple-popup-container {
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
    width: calc(100% - 60px);
    height: auto;
    box-sizing: border-box;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    transform: translateY(-10px);
    font-family: 'Bona Nova SC', Arial, sans-serif;
    color: #ffffff;
    margin: 0 auto;
}
#temple-popup-container:hover {
    transform: translateY(-15px);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.3);
}
#temple-popup-background {
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
#temple-close-btn {
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: transparent;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    z-index: 2;
}
#temple-counter {
    position: relative;
    z-index: 1;
}
#temple-counter h2 {
    color: #ffffff;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 700;
    line-height: 1.2;
    font-family: 'Bona Nova SC', Arial, sans-serif;
}
.temple-time-unit {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    flex-direction: row-reverse;
}
.temple-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 5px;
}
.temple-unit-title {
    font-size: 12px;
    color: #bbb;
    margin-top: 4px;
    font-family: 'Bona Nova SC', Arial, sans-serif;
}
.temple-unit-value-container {
    direction: ltr;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
}
.temple-unit-value {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 5px;
    border-radius: 6px;
    background-color: rgba(142, 136, 136, 0.5);
    font-family: 'Digital-7', Arial, sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    min-width: 20px;
    width: 20px;
    margin: 0 1px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    box-sizing: border-box;
}
.temple-colon {
    font-size: 16px;
    line-height: 30px;
    font-family: 'Digital-7', Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    margin: 0 2px;
    position: relative;
    top: -8px;
    color: #ffffff;
}
.temple-action {
    font-size: 14px;
    color: #ffffff;
    margin-top: 10px;
    text-transform: uppercase;
    font-weight: 700;
    font-family: 'Bona Nova SC', Arial, sans-serif;
}
@media (max-width: 480px) {
    #temple-popup-container {
        width: calc(100% - 20px);
        padding: 5px;
        right: 10px;
        left: 10px;
    }
    .temple-unit-value {
        font-size: 16px;
        height: auto;
    }
    .temple-colon {
        font-size: 14px;
        line-height: 16px;
    }
}
@media (max-width: 320px) {
    .temple-unit-value {
        font-size: 14px;
        padding: 3px;
    }
}
`;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const DESTRUCTION_YEAR = 70;

    const popupContainer = document.createElement('div');
    popupContainer.id = 'temple-popup-container';
    popupContainer.innerHTML = `
        <div id="temple-popup-background"></div>
        <button id="temple-close-btn" aria-label="סגור">✕</button>
        <div id="temple-counter">
            <h2>זמן שחלף מאז חורבן בית המקדש</h2>
            <div class="temple-time-unit" id="temple-time-units-container"></div>
            <div class="temple-action">"והראנו בבניינו ושמחנו בתיקונו"</div>
        </div>
    `;
    document.body.appendChild(popupContainer);

    function getTishaBAvDate(year) {
        return new Date(year, 7, 12);
    }

    function calculateTimeSinceDestruction() {
        const today = new Date();
        let tishaBAvDate = getTishaBAvDate(today.getFullYear());
        
        if (today < tishaBAvDate) {
            tishaBAvDate = getTishaBAvDate(today.getFullYear() - 1);
        }
        
        const timeSinceDestruction = today - tishaBAvDate;
        const daysSinceDestruction = Math.floor(timeSinceDestruction / (1000 * 60 * 60 * 24));
        
        let yearsSinceDestruction = today.getFullYear() - DESTRUCTION_YEAR;
        if (today < tishaBAvDate) {
            yearsSinceDestruction -= 1;
        }
        
        const times = {
            days: daysSinceDestruction,
            years: yearsSinceDestruction,
        };
        
        const timeUnitsContainer = document.getElementById('temple-time-units-container');
        timeUnitsContainer.innerHTML = '';
        
        const TIME_UNITS = ['days', 'years'];
        TIME_UNITS.forEach((unit, index) => {
            let unitValue = times[unit].toString().padStart(2, '0');
            const unitContainer = document.createElement('div');
            unitContainer.classList.add('temple-unit');
            
            const valueContainer = document.createElement('div');
            valueContainer.classList.add('temple-unit-value-container');
            
            unitValue.split('').forEach(number => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('temple-unit-value');
                numberElement.textContent = number;
                valueContainer.appendChild(numberElement);
            });
            
            unitContainer.appendChild(valueContainer);
            
            const titleElement = document.createElement('div');
            titleElement.classList.add('temple-unit-title');
            titleElement.textContent = unit === 'years' ? 'שנים' : 'ימים';
            unitContainer.appendChild(titleElement);
            
            timeUnitsContainer.appendChild(unitContainer);
            
            if (index < TIME_UNITS.length - 1) {
                const colonElement = document.createElement('div');
                colonElement.classList.add('temple-colon');
                colonElement.textContent = ':';
                timeUnitsContainer.appendChild(colonElement);
            }
        });
        
        requestAnimationFrame(calculateTimeSinceDestruction);
    }

    function closeTemplePopup() {
        const popupContainer = document.getElementById('temple-popup-container');
        if (popupContainer) {
            popupContainer.style.display = 'none';
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

    document.getElementById('temple-close-btn').addEventListener('click', closeTemplePopup);

    calculateTimeSinceDestruction();
})();
