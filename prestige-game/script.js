document.addEventListener('DOMContentLoaded', function() {
    try {
        let points = 0;
        let prestigePoints = 0;
    const pointsDisplay = document.getElementById('points');
    const generatorsDiv = document.getElementById('generators');
    const boostersDiv = document.getElementById('boosters');
    const prestigeDiv = document.getElementById('prestige');
    const prestigeUpgradesDiv = document.getElementById('prestigeUpgrades');
    const prestigePointsDisplay = document.getElementById('prestigePoints');

    function updateDisplay() {
        pointsDisplay.textContent = points;
    }

    // Example generator
    const generator1 = {
        name: 'Generator 1',
        cost: 10,
        production: 1,
        level: 1,
        button: null
    };

    function createGeneratorButton(generator) {
        const button = document.createElement('button');
        button.textContent = `${generator.name} (Level ${generator.level}) - Cost: ${generator.cost}`;
        button.addEventListener('click', function() {
            if (points >= generator.cost) {
                points -= generator.cost;
                generator.level++;
                generator.cost *= 1.5;
                updateDisplay();
                button.textContent = `${generator.name} (Level ${generator.level}) - Cost: ${generator.cost.toFixed(0)}`;
            }
        });
        return button;
    }

    generator1.button = createGeneratorButton(generator1);
    generatorsDiv.appendChild(generator1.button);

    // Example booster
    const booster1 = {
        name: 'Booster 1',
        cost: 50,
        multiplier: 2,
        purchased: false,
        cooldown: 10, // Cooldown in seconds
        cooldownTimer: 0,
        button: null
    };

    const booster2 = {
        name: 'Booster 2',
        cost: 100,
        multiplier: 1.5,
        purchased: false,
        cooldown: 20,
        cooldownTimer: 0,
        button: null
    };

    const booster3 = {
        name: 'Booster 3',
        cost: 200,
        multiplier: 3,
        purchased: false,
        cooldown: 30,
        cooldownTimer: 0,
        button: null
    };

    function createBoosterButton(booster) {
        const button = document.createElement('button');
        button.textContent = `${booster.name} - Cost: ${booster.cost}`;
        button.addEventListener('click', function() {
            if (points >= booster.cost && !booster.purchased) {
                points -= booster.cost;
                booster.purchased = true;
                booster.cooldownTimer = booster.cooldown;
                updateDisplay();
                button.textContent = `${booster.name} - Cooldown: ${booster.cooldownTimer}`;
                button.disabled = true;
                const interval = setInterval(() => {
                    booster.cooldownTimer--;
                    button.textContent = `${booster.name} - Cooldown: ${booster.cooldownTimer}`;
                    if (booster.cooldownTimer <= 0) {
                        clearInterval(interval);
                        booster.purchased = false;
                        button.textContent = `${booster.name} - Cost: ${booster.cost}`;
                        button.disabled = false;
                    }
                }, 1000);
            }
        });
        return button
    }

    booster1.button = createBoosterButton(booster1);
    boostersDiv.appendChild(booster1.button);
    booster2.button = createBoosterButton(booster2);
    boostersDiv.appendChild(booster2.button);
    booster3.button = createBoosterButton(booster3);
    boostersDiv.appendChild(booster3.button);

    // Example prestige
    const prestigeButton = document.createElement('button');
    prestigeButton.textContent = 'Prestige';
    prestigeButton.addEventListener('click', function() {
        if (points >= 100) {
            prestigePoints += Math.floor(Math.pow(points / 100, 1.5));
            points = 0;
            updateDisplay();
        }
    });
    prestigeDiv.appendChild(prestigeButton);

    // Prestige upgrade
    const prestigeUpgrade1 = {
        name: 'Generator Production +1',
        cost: 1,
        purchased: false,
        button: null
    };

    const prestigeUpgrade2 = {
        name: 'Booster Multiplier +1',
        cost: 2,
        purchased: false,
        button: null
    };

    const prestigeUpgrade3 = {
        name: 'Generator Level +1',
        cost: 3,
        purchased: false,
        button: null
    };

    const prestigeUpgrade4 = {
        name: 'Generator Base Production +1',
        cost: 4,
        purchased: false,
        button: null
    };

    const prestigeUpgrade5 = {
        name: 'Points from Generators +10%',
        cost: 5,
        purchased: false,
        button: null
    };

    function createPrestigeUpgradeButton(upgrade) {
        const button = document.createElement('button');
        button.textContent = `${upgrade.name} - Cost: ${upgrade.cost} Prestige Points`;
        button.addEventListener('click', function() {
            if (prestigePoints >= upgrade.cost) {
                prestigePoints -= upgrade.cost;
                if (upgrade === prestigeUpgrade1) {
                    generator1.production++;
                } else if (upgrade === prestigeUpgrade2) {
                    booster1.multiplier++;
                } else if (upgrade === prestigeUpgrade3) {
                    generator1.level++;
                } else if (upgrade === prestigeUpgrade4) {
                    generator1.production++;
                } else if (upgrade === prestigeUpgrade5) {
                    generator1.production *= 1.1;
                }
                upgrade.cost = Math.ceil(upgrade.cost * 1.5);
                updateDisplay();
                button.textContent = `${upgrade.name} - Cost: ${upgrade.cost} Prestige Points`;
            }
        });
        return button;
    }

    prestigeUpgrade1.button = createPrestigeUpgradeButton(prestigeUpgrade1);
    prestigeUpgradesDiv.appendChild(prestigeUpgrade1.button);
    prestigeUpgrade2.button = createPrestigeUpgradeButton(prestigeUpgrade2);
    prestigeUpgradesDiv.appendChild(prestigeUpgrade2.button);
    prestigeUpgrade3.button = createPrestigeUpgradeButton(prestigeUpgrade3);
    prestigeUpgradesDiv.appendChild(prestigeUpgrade3.button);
    prestigeUpgrade4.button = createPrestigeUpgradeButton(prestigeUpgrade4);
    prestigeUpgradesDiv.appendChild(prestigeUpgrade4.button);
    prestigeUpgrade5.button = createPrestigeUpgradeButton(prestigeUpgrade5);
    prestigeUpgradesDiv.appendChild(prestigeUpgrade5.button);


    setInterval(function() {
        console.log('Points before update:', points);
        points += generator1.level * generator1.production;
        if (booster1.purchased) {
            points += generator1.level * generator1.production * (booster1.multiplier - 1);
        }
        points = Math.round(points);
        console.log('Points after update:', points);
        updateDisplay();
        prestigePointsDisplay.textContent = prestigePoints;
    }, 1000);
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
