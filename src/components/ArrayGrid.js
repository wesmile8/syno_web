import { deviceTypes, statusConfig } from '../data/devices.js';

export class ArrayGrid {
    constructor(devices) {
        this.devices = devices;
        this.onDeviceClick = null;
    }

    render() {
        return `
            <div class="array-section" id="array">
                <div class="section-header">
                    <h2 class="section-title">阵列布局</h2>
                    <div class="section-actions">
                        <button class="action-btn btn-primary" id="addDeviceBtn">添加设备</button>
                        <button class="action-btn btn-secondary" id="refreshBtn">刷新</button>
                    </div>
                </div>
                <div class="array-grid" id="arrayGrid">
                    ${this.devices.map(device => this.renderDeviceItem(device)).join('')}
                </div>
            </div>
        `;
    }

    renderDeviceItem(device) {
        const typeInfo = deviceTypes[device.type];
        const statusInfo = statusConfig[device.status];
        
        return `
            <div 
                class="array-item ${device.status}" 
                data-device-id="${device.id}"
                style="--status-color: ${statusInfo.color}"
            >
                <div class="array-icon">${typeInfo.icon}</div>
                <div class="array-id">${device.id.split('-')[1]}</div>
                <div class="array-status">
                    <span class="status-indicator" style="background: ${statusInfo.color}"></span>
                </div>
                <div class="array-progress">
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${device.storage}%"></div>
                    </div>
                    <span class="progress-text">${device.storage}%</span>
                </div>
                <div class="array-glow"></div>
            </div>
        `;
    }

    init(container) {
        container.innerHTML = this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const items = document.querySelectorAll('.array-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const deviceId = item.dataset.deviceId;
                const device = this.devices.find(d => d.id === deviceId);
                if (this.onDeviceClick && device) {
                    this.onDeviceClick(device);
                }
            });
        });

        document.getElementById('addDeviceBtn')?.addEventListener('click', () => {
            if (this.onDeviceClick) {
                this.onDeviceClick(null, 'add');
            }
        });

        document.getElementById('refreshBtn')?.addEventListener('click', () => {
            this.update(this.devices);
        });
    }

    update(devices) {
        this.devices = devices;
        const grid = document.getElementById('arrayGrid');
        if (grid) {
            grid.innerHTML = devices.map(device => this.renderDeviceItem(device)).join('');
            this.setupEventListeners();
        }
    }
}