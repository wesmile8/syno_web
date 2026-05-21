export class RealtimePanel {
    constructor() {
        this.cpu = 0;
        this.memory = 0;
        this.network = 0;
    }

    render() {
        return `
            <div class="realtime-section">
                <div class="section-header">
                    <h2 class="section-title">实时监控</h2>
                    <div class="live-indicator">
                        <span class="live-dot"></span>
                        <span class="live-text">实时更新中</span>
                    </div>
                </div>
                <div class="realtime-grid">
                    <div class="realtime-card cpu-card">
                        <div class="realtime-icon">💻</div>
                        <div class="realtime-info">
                            <div class="realtime-value" id="realtimeCpu">${this.cpu}%</div>
                            <div class="realtime-label">CPU 使用率</div>
                        </div>
                        <div class="realtime-progress">
                            <div class="progress-track">
                                <div class="progress-fill cpu-fill" style="width: ${this.cpu}%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="realtime-card memory-card">
                        <div class="realtime-icon">🧠</div>
                        <div class="realtime-info">
                            <div class="realtime-value" id="realtimeMemory">${this.memory}%</div>
                            <div class="realtime-label">内存使用率</div>
                        </div>
                        <div class="realtime-progress">
                            <div class="progress-track">
                                <div class="progress-fill memory-fill" style="width: ${this.memory}%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="realtime-card network-card">
                        <div class="realtime-icon">🌐</div>
                        <div class="realtime-info">
                            <div class="realtime-value" id="realtimeNetwork">${this.formatNetwork(this.network)}</div>
                            <div class="realtime-label">网络流量</div>
                        </div>
                        <div class="realtime-progress">
                            <div class="progress-track">
                                <div class="progress-fill network-fill" style="width: ${Math.min(this.network / 100, 100)}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    formatNetwork(value) {
        if (value >= 1000) {
            return (value / 1000).toFixed(1) + ' GB/s';
        }
        return value + ' MB/s';
    }

    init(container) {
        container.innerHTML = this.render();
    }

    update(cpu, memory, network) {
        this.cpu = cpu;
        this.memory = memory;
        this.network = network;

        document.getElementById('realtimeCpu')?.textContent = cpu + '%';
        document.getElementById('realtimeMemory')?.textContent = memory + '%';
        document.getElementById('realtimeNetwork')?.textContent = this.formatNetwork(network);

        const cpuFill = document.querySelector('.cpu-fill');
        const memoryFill = document.querySelector('.memory-fill');
        const networkFill = document.querySelector('.network-fill');

        if (cpuFill) {
            cpuFill.style.width = cpu + '%';
            cpuFill.style.background = cpu > 80 ? '#ff0066' : '#00ffff';
        }
        if (memoryFill) {
            memoryFill.style.width = memory + '%';
            memoryFill.style.background = memory > 80 ? '#ffaa00' : '#8b5cf6';
        }
        if (networkFill) {
            networkFill.style.width = Math.min(network / 10, 100) + '%';
        }
    }
}