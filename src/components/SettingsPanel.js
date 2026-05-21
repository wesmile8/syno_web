export class SettingsPanel {
    constructor() {
        this.settings = {
            refreshInterval: 5,
            theme: 'dark',
            notifications: true,
            autoRefresh: true
        };
    }

    render() {
        return `
            <div class="settings-section" id="settings">
                <div class="section-header">
                    <h2 class="section-title">系统设置</h2>
                </div>
                <div class="settings-grid">
                    <div class="settings-card">
                        <h3 class="settings-card-title">显示设置</h3>
                        <div class="setting-item">
                            <label class="setting-label">主题模式</label>
                            <select class="setting-select" id="themeSelect">
                                <option value="dark" ${this.settings.theme === 'dark' ? 'selected' : ''}>深色模式</option>
                                <option value="light" ${this.settings.theme === 'light' ? 'selected' : ''}>浅色模式</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <label class="setting-label">自动刷新</label>
                            <label class="toggle-switch">
                                <input type="checkbox" id="autoRefreshToggle" ${this.settings.autoRefresh ? 'checked' : ''}>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    <div class="settings-card">
                        <h3 class="settings-card-title">监控设置</h3>
                        <div class="setting-item">
                            <label class="setting-label">刷新间隔 (秒)</label>
                            <input type="range" id="refreshInterval" min="2" max="30" value="${this.settings.refreshInterval}">
                            <span class="range-value">${this.settings.refreshInterval}s</span>
                        </div>
                        <div class="setting-item">
                            <label class="setting-label">启用通知</label>
                            <label class="toggle-switch">
                                <input type="checkbox" id="notificationsToggle" ${this.settings.notifications ? 'checked' : ''}>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    <div class="settings-card">
                        <h3 class="settings-card-title">系统信息</h3>
                        <div class="system-info">
                            <div class="info-item">
                                <span class="info-label">版本</span>
                                <span class="info-value">v1.0.0</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">运行时间</span>
                                <span class="info-value" id="uptime">00:00:00</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">设备数</span>
                                <span class="info-value">12</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="settings-actions">
                    <button class="action-btn btn-secondary" id="resetSettings">重置设置</button>
                    <button class="action-btn btn-primary" id="saveSettings">保存设置</button>
                </div>
            </div>
        `;
    }

    init(container) {
        container.innerHTML = this.render();
        this.setupEventListeners();
        this.startUptime();
    }

    setupEventListeners() {
        const themeSelect = document.getElementById('themeSelect');
        const autoRefreshToggle = document.getElementById('autoRefreshToggle');
        const refreshInterval = document.getElementById('refreshInterval');
        const notificationsToggle = document.getElementById('notificationsToggle');
        const resetSettings = document.getElementById('resetSettings');
        const saveSettings = document.getElementById('saveSettings');

        themeSelect?.addEventListener('change', (e) => {
            this.settings.theme = e.target.value;
        });

        autoRefreshToggle?.addEventListener('change', (e) => {
            this.settings.autoRefresh = e.target.checked;
        });

        refreshInterval?.addEventListener('input', (e) => {
            this.settings.refreshInterval = parseInt(e.target.value);
            const rangeValue = document.querySelector('.range-value');
            if (rangeValue) {
                rangeValue.textContent = e.target.value + 's';
            }
        });

        notificationsToggle?.addEventListener('change', (e) => {
            this.settings.notifications = e.target.checked;
        });

        resetSettings?.addEventListener('click', () => {
            this.settings = {
                refreshInterval: 5,
                theme: 'dark',
                notifications: true,
                autoRefresh: true
            };
            this.updateUI();
        });

        saveSettings?.addEventListener('click', () => {
            localStorage.setItem('arrayManagerSettings', JSON.stringify(this.settings));
            alert('设置已保存');
        });
    }

    updateUI() {
        document.getElementById('themeSelect')?.value = this.settings.theme;
        document.getElementById('autoRefreshToggle')?.checked = this.settings.autoRefresh;
        document.getElementById('refreshInterval')?.value = this.settings.refreshInterval;
        document.getElementById('notificationsToggle')?.checked = this.settings.notifications;
        
        const rangeValue = document.querySelector('.range-value');
        if (rangeValue) {
            rangeValue.textContent = this.settings.refreshInterval + 's';
        }
    }

    startUptime() {
        let seconds = 0;
        setInterval(() => {
            seconds++;
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            const uptimeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            document.getElementById('uptime')?.textContent = uptimeStr;
        }, 1000);
    }
}