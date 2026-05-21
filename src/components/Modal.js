export class Modal {
    constructor(options) {
        this.title = options.title || '对话框';
        this.content = options.content || '';
        this.isOpen = false;
        this.onClose = options.onClose || null;
        this.onSubmit = options.onSubmit || null;
    }

    render() {
        return `
            <div class="modal-overlay ${this.isOpen ? 'active' : ''}" id="modalOverlay">
                <div class="modal">
                    <div class="modal-header">
                        <h3 class="modal-title">${this.title}</h3>
                        <span class="modal-close" id="modalClose">×</span>
                    </div>
                    <div class="modal-body" id="modalBody">
                        ${this.content}
                    </div>
                    <div class="modal-footer" id="modalFooter">
                    </div>
                </div>
            </div>
        `;
    }

    init(container) {
        container.innerHTML = this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const overlay = document.getElementById('modalOverlay');
        const closeBtn = document.getElementById('modalClose');
        
        closeBtn?.addEventListener('click', () => this.close());
        overlay?.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.close();
            }
        });
    }

    open() {
        this.isOpen = true;
        const overlay = document.getElementById('modalOverlay');
        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    close() {
        this.isOpen = false;
        const overlay = document.getElementById('modalOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (this.onClose) {
            this.onClose();
        }
    }

    setContent(content) {
        this.content = content;
        const body = document.getElementById('modalBody');
        if (body) {
            body.innerHTML = content;
        }
    }

    setFooter(buttons) {
        const footer = document.getElementById('modalFooter');
        if (footer) {
            footer.innerHTML = buttons.map(btn => `
                <button class="action-btn btn-${btn.type}" ${btn.id ? `id="${btn.id}"` : ''}>${btn.label}</button>
            `).join('');
            
            buttons.forEach(btn => {
                const btnElement = document.getElementById(btn.id) || footer.querySelector(`.btn-${btn.type}`);
                btnElement?.addEventListener('click', btn.onClick);
            });
        }
    }
}