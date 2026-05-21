export function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

export function formatTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return `${days}天前`;
}

export function getStatusClass(status) {
    switch (status) {
        case 'online': return 'status-online';
        case 'warning': return 'status-warning';
        case 'offline': return 'status-offline';
        default: return 'status-unknown';
    }
}

export function getStatusBadge(status) {
    const config = {
        online: { label: '在线', className: 'status-online' },
        warning: { label: '警告', className: 'status-warning' },
        offline: { label: '离线', className: 'status-offline' }
    };
    return config[status] || { label: status, className: 'status-unknown' };
}

export function getSeverityClass(severity) {
    switch (severity) {
        case 'critical': return 'severity-critical';
        case 'warning': return 'severity-warning';
        case 'info': return 'severity-info';
        default: return 'severity-info';
    }
}

export function generateId() {
    return 'ARRAY-' + String(Math.floor(Math.random() * 900) + 100);
}

export function validateIP(ip) {
    const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
}

export function calculatePercentage(current, max) {
    if (max === 0) return 0;
    return Math.round((current / max) * 100);
}

export function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

export function debounce(func, wait) {
    let timeout;
    return function() {
        const args = arguments;
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}