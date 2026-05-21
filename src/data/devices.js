export const devicesData = [
    {
        id: 'ARRAY-001',
        name: '存储节点-A1',
        ip: '192.168.1.101',
        type: 'storage',
        status: 'online',
        cpu: 45,
        memory: 62,
        storage: 78,
        uptime: '12d 8h 32m',
        temperature: 42,
        network: 1250,
        lastCheck: new Date().toISOString()
    },
    {
        id: 'ARRAY-002',
        name: '存储节点-A2',
        ip: '192.168.1.102',
        type: 'storage',
        status: 'online',
        cpu: 38,
        memory: 55,
        storage: 82,
        uptime: '8d 15h 45m',
        temperature: 38,
        network: 980,
        lastCheck: new Date().toISOString()
    },
    {
        id: 'ARRAY-003',
        name: '计算节点-C1',
        ip: '192.168.1.103',
        type: 'compute',
        status: 'online',
        cpu: 72,
        memory: 78,
        storage: 45,
        uptime: '5d 2h 18m',
        temperature: 55,
        network: 2100,
        lastCheck: new Date().toISOString()
    },
    {
        id: 'ARRAY-004',
        name: '计算节点-C2',
        ip: '192.168.1.104',
        type: 'compute',
        status: 'warning',
        cpu: 91,
        memory: 89,
        storage: 67,
        uptime: '3d 10h 22m',
        temperature: 68,
        network: 1850,
        lastCheck: new Date().toISOString()
    },
    {
        id: 'ARRAY-005',
        name: '网络节点-N1',
        ip: '192.168.1.105',
        type: 'network',
        status: 'online',
        cpu: 23,
        memory: 34,
        storage: 22,
        uptime: '20d 1h 5m',
        temperature: 35,
        network: 5500,
        lastCheck: new Date().toISOString()
    },
    {
        id: 'ARRAY-006',
        name: '存储节点-A3',
        ip: '192.168.1.106',
        type: 'storage',
        status: 'offline',
        cpu: 0,
        memory: 0,
        storage: 0,
        uptime: 'N/A',
        temperature: 0,
        network: 0,
        lastCheck: null
    },
    {
        id: 'ARRAY-007',
        name: '存储节点-A4',
        ip: '192.168.1.107',
        type: 'storage',
        status: 'online',
        cpu: 56,
        memory: 68,
        storage: 71,
        uptime: '15d 6h 30m',
        temperature: 44,
        network: 1420,
        lastCheck: new Date().toISOString()
    },
    {
        id: 'ARRAY-008',
        name: '计算节点-C3',
        ip: '192.168.1.108',
        type: 'compute',
        status: 'online',
        cpu: 41,
        memory: 52,
        storage: 38,
        uptime: '7d 12h 15m',
        temperature: 48,
        network: 1650,
        lastCheck: new Date().toISOString()
    },
    {
        id: 'ARRAY-009',
        name: '管理节点-M1',
        ip: '192.168.1.109',
        type: 'network',
        status: 'online',
        cpu: 18,
        memory: 42,
        storage: 15,
        uptime: '30d 4h 22m',
        temperature: 32,
        network: 890,
        lastCheck: new Date().toISOString()
    },
    {
        id: 'ARRAY-010',
        name: '存储节点-A5',
        ip: '192.168.1.110',
        type: 'storage',
        status: 'warning',
        cpu: 85,
        memory: 76,
        storage: 93,
        uptime: '2d 18h 40m',
        temperature: 62,
        network: 1980,
        lastCheck: new Date().toISOString()
    },
    {
        id: 'ARRAY-011',
        name: '计算节点-C4',
        ip: '192.168.1.111',
        type: 'compute',
        status: 'online',
        cpu: 62,
        memory: 71,
        storage: 54,
        uptime: '10d 3h 55m',
        temperature: 51,
        network: 2300,
        lastCheck: new Date().toISOString()
    },
    {
        id: 'ARRAY-012',
        name: '存储节点-A6',
        ip: '192.168.1.112',
        type: 'storage',
        status: 'online',
        cpu: 33,
        memory: 47,
        storage: 65,
        uptime: '18d 9h 12m',
        temperature: 40,
        network: 1100,
        lastCheck: new Date().toISOString()
    }
];

export const systemMetrics = {
    totalDevices: 12,
    onlineDevices: 10,
    warningDevices: 2,
    offlineDevices: 1,
    avgCpu: 52,
    avgMemory: 61,
    avgStorage: 62,
    networkTotal: 18620,
    activeConnections: 156
};

export const alertsData = [
    { id: 1, deviceId: 'ARRAY-004', type: 'high_cpu', message: 'CPU使用率超过90%', severity: 'warning', time: new Date(Date.now() - 300000).toISOString() },
    { id: 2, deviceId: 'ARRAY-010', type: 'high_storage', message: '存储使用率超过90%', severity: 'warning', time: new Date(Date.now() - 600000).toISOString() },
    { id: 3, deviceId: 'ARRAY-006', type: 'offline', message: '设备离线', severity: 'critical', time: new Date(Date.now() - 1800000).toISOString() },
    { id: 4, deviceId: 'ARRAY-004', type: 'high_temp', message: '温度过高 (68°C)', severity: 'warning', time: new Date(Date.now() - 120000).toISOString() }
];

export const taskHistory = [
    { id: 1, type: 'backup', status: 'completed', deviceId: 'ARRAY-001', startTime: new Date(Date.now() - 3600000).toISOString(), duration: '2h 30m' },
    { id: 2, type: 'sync', status: 'completed', deviceId: 'ARRAY-002', startTime: new Date(Date.now() - 7200000).toISOString(), duration: '45m' },
    { id: 3, type: 'scan', status: 'running', deviceId: 'ARRAY-003', startTime: new Date(Date.now() - 1800000).toISOString(), duration: null },
    { id: 4, type: 'update', status: 'pending', deviceId: 'ARRAY-005', startTime: null, duration: null }
];

export const deviceTypes = {
    storage: { name: '存储节点', icon: '💾', color: '#00ffff' },
    compute: { name: '计算节点', icon: '💻', color: '#8b5cf6' },
    network: { name: '网络节点', icon: '🌐', color: '#00ff88' }
};

export const statusConfig = {
    online: { label: '在线', color: '#00ff00', bgColor: 'rgba(0, 255, 0, 0.2)' },
    warning: { label: '警告', color: '#ffaa00', bgColor: 'rgba(255, 170, 0, 0.2)' },
    offline: { label: '离线', color: '#ff0000', bgColor: 'rgba(255, 0, 0, 0.2)' }
};