import { formatTime } from '../utils/helpers.js';

export class AlertsPanel {
    constructor(alerts) {
        this.alerts = alerts;
        this.onAlertClick = null;
    }

    render() {
        return `
            <div class="alerts-section" id="alerts">
                <div class="section-header">
                    <h2 class="section-title">告警中心</h2>
                    <div class="alerts-count">
                        <span class="count-badge critical">${this.alerts.filter(a => a.severity === 'critical').length}</span>
                        <span class="count-badge warning">${this.alerts.filter(a => a.severity === 'warning').length}</span>
                    </div>
                </div>
                <div class="alerts-list" id="alertsList">
                    ${this.alerts.map(alert => this.renderAlertItem(alert)).join('')}
                </div>
                <button class="action-btn btn-secondary" id="clearAlertsBtn">清除全部告警</button>
            </div>
        `;
    }

    renderAlertItem(alert) {
        const severityClass = alert.severity === 'critical' ? 'severity-critical' : 'severity-warning';
        const severityIcon = alert.severity === 'critical' ? '🚨' : '⚠️';
        
        return `
            <div class="alert-item ${severityClass}" data-alert-id="${alert.id}">
                <div class="alert-icon">${severityIcon}</div>
                <div class="alert-content">
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-meta">
                        <span class="alert-device">设备: ${alert.deviceId}</span>
                        <span class="alert-time">${formatTime(alert.time)}</span>
                    </div>
                </div>
                <div class="alert-actions">
                    <button class="action-btn btn-xs btn-primary">查看</button>
                    <button class="action-btn btn-xs btn-danger">忽略</button>
                </div>
            </div>
        `;
    }

    init(container) {
        container.innerHTML = this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const alerts = document.querySelectorAll('.alert-item');
        alerts.forEach(alert => {
            const viewBtn = alert.querySelector('.btn-primary');
            const ignoreBtn = alert.querySelector('.btn-danger');
            
            viewBtn?.addEventListener('click', () => {
                const alertId = alert.dataset.alertId;
                const alertData = this.alerts.find(a => a.id == alertId);
                if (this.onAlertClick && alertData) {
                    this.onAlertClick(alertData);
                }
            });
            
            ignoreBtn?.addEventListener('click', () => {
                const alertId = alert.dataset.alertId;
                this.alerts = this.alerts.filter(a => a.id != alertId);
                this.update();
            });
        });

        document.getElementById('clearAlertsBtn')?.addEventListener('click', () => {
            this.alerts = [];
            this.update();
        });
    }

    update(alerts) {
        if (alerts) {
            this.alerts = alerts;
        }
        const list = document.getElementById('alertsList');
        if (list) {
            list.innerHTML = this.alerts.map(alert => this.renderAlertItem(alert)).join('');
            this.setupEventListeners();
        }
        
        const counts = document.querySelector('.alerts-count');
        if (counts) {
            const criticalCount = this.alerts.filter(a => a.severity === 'critical').length;
            const warningCount = this.alerts.filter(a => a.severity === 'warning').length;
            counts.innerHTML = `
                <span class="count-badge critical">${criticalCount}</span>
                <span class="count-badge warning">${warningCount}</span>
            `;
        }
    }
}