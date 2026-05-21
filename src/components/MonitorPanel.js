export class MonitorPanel {
    constructor(options) {
        this.title = options.title || '监控面板';
        this.type = options.type || 'cpu';
        this.data = options.data || [];
        this.color = options.color || '#00ffff';
        this.realtimeValue = options.realtimeValue || 0;
    }

    render() {
        return `
            <div class="monitor-panel">
                <div class="monitor-header">
                    <h3 class="monitor-title">${this.title}</h3>
                    <div class="monitor-value" style="color: ${this.color}">${this.realtimeValue}%</div>
                </div>
                <div class="chart-container">
                    <canvas class="chart-canvas" id="${this.type}Chart"></canvas>
                    <div class="chart-grid"></div>
                </div>
                <div class="monitor-legend">
                    <span class="legend-color" style="background: ${this.color}"></span>
                    <span class="legend-text">实时数据</span>
                </div>
            </div>
        `;
    }

    init(container) {
        container.innerHTML = this.render();
        this.drawChart();
    }

    drawChart() {
        const canvas = document.getElementById(`${this.type}Chart`);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        
        ctx.clearRect(0, 0, width, height);
        
        const padding = 20;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        if (this.data.length === 0) return;
        
        const maxValue = 100;
        const stepX = chartWidth / (this.data.length - 1);
        
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        
        this.data.forEach((value, index) => {
            const x = padding + index * stepX;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        this.data.forEach((value, index) => {
            const x = padding + index * stepX;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            ctx.lineTo(x, y);
        });
        ctx.lineTo(padding + (this.data.length - 1) * stepX, height - padding);
        ctx.closePath();
        ctx.fillStyle = this.color.replace('rgb', 'rgba').replace(')', ', 0.2)');
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding + (chartHeight / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
    }

    update(data, value) {
        this.data = data;
        this.realtimeValue = value;
        
        const valueElement = document.querySelector(`.monitor-panel:has(.monitor-title:contains("${this.title}")) .monitor-value`);
        if (valueElement) {
            valueElement.textContent = value + '%';
        }
        
        this.drawChart();
    }
}