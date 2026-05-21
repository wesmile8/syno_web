import { devicesData, alertsData, deviceTypes, statusConfig } from './data/devices.js';
import { getRandomInt, generateId, validateIP } from './utils/helpers.js';
import { Navbar } from './components/Navbar.js';
import { StatsCard } from './components/StatsCard.js';
import { ArrayGrid } from './components/ArrayGrid.js';
import { MonitorPanel } from './components/MonitorPanel.js';
import { DeviceTable } from './components/DeviceTable.js';
import { AlertsPanel } from './components/AlertsPanel.js';
import { Modal } from './components/Modal.js';
import { RealtimePanel } from './components/RealtimePanel.js';
import { SettingsPanel } from './components/SettingsPanel.js';

class App {
    constructor() {
        this.devices = [...devicesData];
        this.alerts = [...alertsData];
        this.cpuHistory = [45, 48, 52, 47, 55, 62, 58, 51, 49, 53, 57, 61, 56, 52, 48, 54, 59, 63, 58, 55];
        this.memoryHistory = [62, 65, 63, 68, 71, 69, 66, 70, 72, 68, 65, 67, 70, 73, 71, 69, 66, 68, 71, 74];
        
        this.navbar = null;
        this.arrayGrid = null;
        this.deviceTable = null;
        this.alertsPanel = null;
        this.modal = null;
        this.realtimePanel = null;
        this.cpuMonitor = null;
        this.memoryMonitor = null;
        this.settingsPanel = null;
        
        this.initParticles();
        this.init();
    }

    initParticles() {
        const container = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (8 + Math.random() * 4) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            container.appendChild(particle);
        }
    }

    init() {
        this.navbar = new Navbar();
        this.navbar.init(document.getElementById('navbarContainer'));

        this.renderStatsCards();
        
        this.arrayGrid = new ArrayGrid(this.devices);
        this.arrayGrid.onDeviceClick = (device, action) => this.handleDeviceClick(device, action);
        this.arrayGrid.init(document.getElementById('arrayContainer'));

        this.cpuMonitor = new MonitorPanel({
            title: 'CPU 使用率',
            type: 'cpu',
            data: this.cpuHistory,
            color: '#00ffff',
            realtimeValue: this.cpuHistory[this.cpuHistory.length - 1]
        });
        this.cpuMonitor.init(document.getElementById('cpuMonitorContainer'));

        this.memoryMonitor = new MonitorPanel({
            title: '内存使用率',
            type: 'memory',
            data: this.memoryHistory,
            color: '#8b5cf6',
            realtimeValue: this.memoryHistory[this.memoryHistory.length - 1]
        });
        this.memoryMonitor.init(document.getElementById('memoryMonitorContainer'));

        this.realtimePanel = new RealtimePanel();
        this.realtimePanel.init(document.getElementById('realtimeContainer'));

        this.deviceTable = new DeviceTable(this.devices);
        this.deviceTable.onDeviceClick = (device) => this.showDeviceDetail(device);
        this.deviceTable.onRemoveDevice = (deviceId) => this.removeDevice(deviceId);
        this.deviceTable.init(document.getElementById('deviceTableContainer'));

        this.alertsPanel = new AlertsPanel(this.alerts);
        this.alertsPanel.onAlertClick = (alert) => this.showAlertDetail(alert);
        this.alertsPanel.init(document.getElementById('alertsContainer'));

        this.settingsPanel = new SettingsPanel();
        this.settingsPanel.init(document.getElementById('settingsContainer'));

        this.modal = new Modal({ title: '对话框' });
        this.modal.init(document.getElementById('modalContainer'));

        this.startRealtimeUpdate();
    }

    renderStatsCards() {
        const statsContainer = document.getElementById('statsContainer');
        const totalDevices = this.devices.length;
        const activeDevices = this.devices.filter(d => d.status === 'online').length;
        const warningDevices = this.devices.filter(d => d.status === 'warning').length;
        const avgStorage = Math.round(this.devices.filter(d => d.status !== 'offline').reduce((sum, d) => sum + d.storage, 0) / (activeDevices + warningDevices));

        const cards = [
            new StatsCard({ icon: '📦', value: totalDevices, label: '总设备数', color: '#00ffff' }),
            new StatsCard({ icon: '✅', value: activeDevices, label: '运行中', color: '#00ff88' }),
            new StatsCard({ icon: '⚠️', value: warningDevices, label: '警告', color: '#ffaa00' }),
            new StatsCard({ icon: '💾', value: avgStorage + '%', label: '存储使用率', color: '#8b5cf6' })
        ];

        statsContainer.innerHTML = cards.map(card => card.render()).join('');
    }

    handleDeviceClick(device, action) {
        if (action === 'add') {
            this.showAddDeviceModal();
        } else if (device) {
            this.showDeviceDetail(device);
        }
    }

    showDeviceDetail(device) {
        const typeInfo = deviceTypes[device.type];
        const statusInfo = statusConfig[device.status];
        
        const content = `
            <div class="device-detail">
                <div class="detail-header">
                    <div class="detail-icon">${typeInfo.icon}</div>
                    <div class="detail-title">
                        <h3>${device.name}</h3>
                        <span class="detail-id">${device.id}</span>
                    </div>
                    <span class="status-badge" style="background: ${statusInfo.bgColor}; color: ${statusInfo.color}">${statusInfo.label}</span>
                </div>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">IP地址</span>
                        <span class="detail-value">${device.ip}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">设备类型</span>
                        <span class="detail-value" style="color: ${typeInfo.color}">${typeInfo.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">运行时间</span>
                        <span class="detail-value">${device.uptime}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">温度</span>
                        <span class="detail-value">${device.temperature}°C</span>
                    </div>
                    <div class="detail-item full-width">
                        <span class="detail-label">CPU 使用率</span>
                        <div class="detail-progress">
                            <div class="progress-track">
                                <div class="progress-fill" style="width: ${device.cpu}%; background: ${device.cpu > 80 ? '#ff0066' : '#00ffff'}"></div>
                            </div>
                            <span>${device.cpu}%</span>
                        </div>
                    </div>
                    <div class="detail-item full-width">
                        <span class="detail-label">内存使用率</span>
                        <div class="detail-progress">
                            <div class="progress-track">
                                <div class="progress-fill" style="width: ${device.memory}%; background: ${device.memory > 80 ? '#ffaa00' : '#8b5cf6'}"></div>
                            </div>
                            <span>${device.memory}%</span>
                        </div>
                    </div>
                    <div class="detail-item full-width">
                        <span class="detail-label">存储使用率</span>
                        <div class="detail-progress">
                            <div class="progress-track">
                                <div class="progress-fill" style="width: ${device.storage}%; background: ${device.storage > 90 ? '#ff0066' : '#00ff88'}"></div>
                            </div>
                            <span>${device.storage}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.modal.setContent(content);
        this.modal.setFooter([
            { label: '关闭', type: 'secondary', onClick: () => this.modal.close() }
        ]);
        this.modal.open();
    }

    showAddDeviceModal() {
        const content = `
            <form id="addDeviceForm">
                <div class="form-group">
                    <label>设备名称</label>
                    <input type="text" id="deviceName" required placeholder="例如: 存储节点-A7">
                </div>
                <div class="form-group">
                    <label>IP地址</label>
                    <input type="text" id="deviceIp" required placeholder="192.168.1.xxx">
                </div>
                <div class="form-group">
                    <label>设备类型</label>
                    <select id="deviceType" required>
                        <option value="storage">💾 存储节点</option>
                        <option value="compute">💻 计算节点</option>
                        <option value="network">🌐 网络节点</option>
                    </select>
                </div>
            </form>
        `;

        this.modal.setContent(content);
        this.modal.setFooter([
            { label: '取消', type: 'secondary', onClick: () => this.modal.close() },
            { label: '添加', type: 'primary', id: 'submitAddDevice', onClick: () => this.addDevice() }
        ]);
        this.modal.open();
    }

    addDevice() {
        const name = document.getElementById('deviceName')?.value;
        const ip = document.getElementById('deviceIp')?.value;
        const type = document.getElementById('deviceType')?.value;

        if (!name || !ip || !type) {
            alert('请填写所有字段');
            return;
        }

        if (!validateIP(ip)) {
            alert('请输入有效的IP地址');
            return;
        }

        const newDevice = {
            id: generateId(),
            name: name,
            ip: ip,
            type: type,
            status: 'online',
            cpu: getRandomInt(20, 70),
            memory: getRandomInt(40, 75),
            storage: getRandomInt(30, 80),
            uptime: '0d 0h 0m',
            temperature: getRandomInt(35, 55),
            network: getRandomInt(800, 2500),
            lastCheck: new Date().toISOString()
        };

        this.devices.push(newDevice);
        this.updateUI();
        this.modal.close();
    }

    removeDevice(deviceId) {
        if (confirm('确定要移除这个设备吗？')) {
            this.devices = this.devices.filter(d => d.id !== deviceId);
            this.updateUI();
        }
    }

    showAlertDetail(alert) {
        const device = this.devices.find(d => d.id === alert.deviceId);
        const deviceName = device ? device.name : '未知设备';
        
        const content = `
            <div class="alert-detail">
                <div class="alert-severity ${alert.severity === 'critical' ? 'critical' : 'warning'}">
                    ${alert.severity === 'critical' ? '🚨' : '⚠️'} ${alert.severity === 'critical' ? '严重告警' : '警告'}
                </div>
                <div class="alert-message">${alert.message}</div>
                <div class="alert-info">
                    <div class="info-row">
                        <span class="info-label">设备</span>
                        <span class="info-value">${alert.deviceId} - ${deviceName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">告警类型</span>
                        <span class="info-value">${alert.type}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">触发时间</span>
                        <span class="info-value">${new Date(alert.time).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;

        this.modal.setContent(content);
        this.modal.setFooter([
            { label: '关闭', type: 'secondary', onClick: () => this.modal.close() },
            { label: '查看设备', type: 'primary', onClick: () => {
                if (device) {
                    this.modal.close();
                    setTimeout(() => this.showDeviceDetail(device), 300);
                }
            }}
        ]);
        this.modal.open();
    }

    updateUI() {
        this.renderStatsCards();
        this.arrayGrid.update(this.devices);
        this.deviceTable.update(this.devices);
    }

    startRealtimeUpdate() {
        setInterval(() => {
            const cpu = getRandomInt(30, 70);
            const memory = getRandomInt(45, 75);
            const network = getRandomInt(500, 1500);

            this.cpuHistory.push(cpu);
            this.memoryHistory.push(memory);
            
            if (this.cpuHistory.length > 20) {
                this.cpuHistory.shift();
                this.memoryHistory.shift();
            }

            this.cpuMonitor.update(this.cpuHistory, cpu);
            this.memoryMonitor.update(this.memoryHistory, memory);
            this.realtimePanel.update(cpu, memory, network);

            this.devices = this.devices.map(device => {
                if (device.status === 'online') {
                    return {
                        ...device,
                        cpu: getRandomInt(device.cpu - 10, device.cpu + 10),
                        memory: getRandomInt(device.memory - 5, device.memory + 5),
                        temperature: getRandomInt(device.temperature - 3, device.temperature + 3),
                        network: getRandomInt(device.network - 200, device.network + 200)
                    };
                }
                return device;
            });

            this.arrayGrid.update(this.devices);
            this.deviceTable.update(this.devices);
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});