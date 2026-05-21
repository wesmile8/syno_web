import { deviceTypes, statusConfig } from '../data/devices.js';
import { formatNumber } from '../utils/helpers.js';

export class DeviceTable {
    constructor(devices) {
        this.devices = devices;
        this.searchQuery = '';
        this.statusFilter = 'all';
        this.onDeviceClick = null;
        this.onRemoveDevice = null;
    }

    render() {
        const filteredDevices = this.filterDevices();
        
        return `
            <div class="device-section" id="devices">
                <div class="section-header">
                    <h2 class="section-title">设备列表</h2>
                    <div class="section-filters">
                        <input 
                            type="text" 
                            class="search-input" 
                            id="deviceSearch"
                            placeholder="搜索设备..."
                            value="${this.searchQuery}"
                        >
                        <select class="filter-select" id="statusFilter">
                            <option value="all" ${this.statusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                            <option value="online" ${this.statusFilter === 'online' ? 'selected' : ''}>在线</option>
                            <option value="warning" ${this.statusFilter === 'warning' ? 'selected' : ''}>警告</option>
                            <option value="offline" ${this.statusFilter === 'offline' ? 'selected' : ''}>离线</option>
                        </select>
                    </div>
                </div>
                <div class="table-container">
                    <table class="device-table">
                        <thead>
                            <tr>
                                <th>设备ID</th>
                                <th>名称</th>
                                <th>类型</th>
                                <th>状态</th>
                                <th>CPU</th>
                                <th>内存</th>
                                <th>存储</th>
                                <th>网络</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody id="deviceTableBody">
                            ${filteredDevices.map(device => this.renderDeviceRow(device)).join('')}
                        </tbody>
                    </table>
                </div>
                ${filteredDevices.length === 0 ? '<div class="empty-state">暂无设备</div>' : ''}
            </div>
        `;
    }

    renderDeviceRow(device) {
        const typeInfo = deviceTypes[device.type];
        const statusInfo = statusConfig[device.status];
        
        return `
            <tr class="device-row" data-device-id="${device.id}">
                <td class="device-id">${device.id}</td>
                <td class="device-name">${device.name}</td>
                <td>
                    <span class="type-badge" style="color: ${typeInfo.color}">${typeInfo.icon} ${typeInfo.name}</span>
                </td>
                <td>
                    <span class="status-badge" style="background: ${statusInfo.bgColor}; color: ${statusInfo.color}">
                        ${statusInfo.label}
                    </span>
                </td>
                <td>
                    <div class="mini-progress">
                        <div class="mini-fill" style="width: ${device.cpu}%; background: ${device.cpu > 80 ? '#ff0066' : '#00ffff'}"></div>
                    </div>
                    <span>${device.cpu}%</span>
                </td>
                <td>
                    <div class="mini-progress">
                        <div class="mini-fill" style="width: ${device.memory}%; background: ${device.memory > 80 ? '#ffaa00' : '#8b5cf6'}"></div>
                    </div>
                    <span>${device.memory}%</span>
                </td>
                <td>
                    <div class="mini-progress">
                        <div class="mini-fill" style="width: ${device.storage}%; background: ${device.storage > 90 ? '#ff0066' : '#00ff88'}"></div>
                    </div>
                    <span>${device.storage}%</span>
                </td>
                <td>${formatNumber(device.network)} Mbps</td>
                <td class="device-actions">
                    <button class="action-btn btn-sm btn-primary" data-action="detail">详情</button>
                    <button class="action-btn btn-sm btn-danger" data-action="remove">移除</button>
                </td>
            </tr>
        `;
    }

    filterDevices() {
        return this.devices.filter(device => {
            const matchesSearch = !this.searchQuery || 
                device.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                device.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                device.ip.includes(this.searchQuery);
            const matchesStatus = this.statusFilter === 'all' || device.status === this.statusFilter;
            return matchesSearch && matchesStatus;
        });
    }

    init(container) {
        container.innerHTML = this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('deviceSearch');
        const filterSelect = document.getElementById('statusFilter');
        
        searchInput?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.update();
        });
        
        filterSelect?.addEventListener('change', (e) => {
            this.statusFilter = e.target.value;
            this.update();
        });

        const rows = document.querySelectorAll('.device-row');
        rows.forEach(row => {
            const detailBtn = row.querySelector('[data-action="detail"]');
            const removeBtn = row.querySelector('[data-action="remove"]');
            
            detailBtn?.addEventListener('click', () => {
                const deviceId = row.dataset.deviceId;
                const device = this.devices.find(d => d.id === deviceId);
                if (this.onDeviceClick && device) {
                    this.onDeviceClick(device);
                }
            });
            
            removeBtn?.addEventListener('click', () => {
                const deviceId = row.dataset.deviceId;
                if (this.onRemoveDevice) {
                    this.onRemoveDevice(deviceId);
                }
            });
        });
    }

    update(devices) {
        if (devices) {
            this.devices = devices;
        }
        const tbody = document.getElementById('deviceTableBody');
        if (tbody) {
            tbody.innerHTML = this.filterDevices().map(device => this.renderDeviceRow(device)).join('');
            this.setupEventListeners();
        }
    }
}