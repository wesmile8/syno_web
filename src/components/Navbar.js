export class Navbar {
    constructor() {
        this.activeSection = 'dashboard';
        this.onSectionChange = null;
    }

    render() {
        return `
            <nav class="navbar">
                <div class="navbar-brand">
                    <div class="brand-icon">⚡</div>
                    <h1 class="brand-title glow-text">ARRAY MANAGER</h1>
                </div>
                <div class="nav-links">
                    <a href="#dashboard" class="nav-link ${this.activeSection === 'dashboard' ? 'active' : ''}" data-section="dashboard">仪表盘</a>
                    <a href="#array" class="nav-link ${this.activeSection === 'array' ? 'active' : ''}" data-section="array">阵列状态</a>
                    <a href="#devices" class="nav-link ${this.activeSection === 'devices' ? 'active' : ''}" data-section="devices">设备管理</a>
                    <a href="#alerts" class="nav-link ${this.activeSection === 'alerts' ? 'active' : ''}" data-section="alerts">告警中心</a>
                    <a href="#settings" class="nav-link ${this.activeSection === 'settings' ? 'active' : ''}" data-section="settings">系统设置</a>
                </div>
                <div class="navbar-status">
                    <span class="status-dot"></span>
                    <span class="status-text">系统运行中</span>
                    <div class="user-menu">
                        <span class="user-icon">👤</span>
                    </div>
                </div>
            </nav>
        `;
    }

    init(container) {
        container.innerHTML = this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.activeSection = section;
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const targetElement = document.getElementById(section);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                
                if (this.onSectionChange) {
                    this.onSectionChange(section);
                }
            });
        });
    }
}