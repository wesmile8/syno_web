export class StatsCard {
    constructor(options) {
        this.icon = options.icon || '📊';
        this.value = options.value || 0;
        this.label = options.label || '未命名';
        this.color = options.color || '#00ffff';
        this.onClick = options.onClick || null;
    }

    render() {
        return `
            <div class="stat-card" style="--card-color: ${this.color}" onclick="${this.onClick ? this.onClick : ''}">
                <div class="stat-icon" style="color: ${this.color}">${this.icon}</div>
                <div class="stat-value glow-text">${this.value}</div>
                <div class="stat-label">${this.label}</div>
                <div class="stat-glow"></div>
            </div>
        `;
    }

    update(value) {
        this.value = value;
        const card = document.querySelector(`.stat-card:has(.stat-label:contains("${this.label}"))`);
        if (card) {
            const valueElement = card.querySelector('.stat-value');
            if (valueElement) {
                valueElement.textContent = value;
            }
        }
    }
}