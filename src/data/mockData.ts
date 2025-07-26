// 模拟数据文件

// 生成当前时间戳的辅助函数
export const getCurrentTimestamp = () => {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace('T', ' ');
};

// 生成过去时间戳的辅助函数
export const getPastTimestamp = (minutesAgo: number) => {
  const now = new Date();
  const past = new Date(now.getTime() - minutesAgo * 60 * 1000);
  return past.toISOString().slice(0, 19).replace('T', ' ');
};

export interface Device {
  id: string;
  name: string;
  type: 'camera' | 'phone' | 'sensor' | 'controller';
  status: 'online' | 'offline' | 'warning';
  location: string;
  lastUpdate: string;
  battery?: number;
  signal?: number;
}

export interface OrganizationUnit {
  id: string;
  name: string;
  type: 'department' | 'team' | 'group';
  parentId?: string;
  manager: string;
  managerPhone?: string;
  memberCount: number;
  description?: string;
  location?: string;
  establishedDate?: string;
  budget?: number;
  children?: OrganizationUnit[];
}

export interface User {
  id: string;
  name: string;
  department: string;
  role: string;
  phone: string;
  email?: string;
  status: 'online' | 'offline' | 'busy';
  avatar?: string;
  joinDate?: string;
  supervisor?: string;
  level?: '初级' | '中级' | '高级' | '专家';
  workLocation?: string;
  employeeId?: string;
}

export interface Command {
  id: string;
  title: string;
  content: string;
  sender: string;
  receiver: string;
  status: 'pending' | 'sent' | 'received' | 'completed';
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface SafetyEvent {
  id: string;
  type: 'fire' | 'gas' | 'intrusion' | 'emergency';
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'investigating';
  timestamp: string;
  description: string;
}

export interface DataRecord {
  id: string;
  deviceId: string;
  deviceName: string;
  dataType: 'temperature' | 'humidity' | 'pressure' | 'vibration' | 'voltage';
  value: number;
  unit: string;
  timestamp: string;
  location: string;
}

export interface InspectionRecord {
  id: string;
  title: string;
  type: 'routine' | 'special' | 'emergency' | 'annual';
  inspector: string;
  department: string;
  location: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledDate: string;
  completedDate?: string;
  score?: number;
  issuesFound: number;
  rectificationItems: number;
  description: string;
  remarks?: string;
}

export interface RectificationItem {
  id: string;
  inspectionId: string;
  title: string;
  description: string;
  category: 'safety' | 'equipment' | 'process' | 'environment' | 'documentation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'verified' | 'closed';
  assignee: string;
  department: string;
  dueDate: string;
  createdDate: string;
  completedDate?: string;
  verifiedDate?: string;
  progress: number;
  cost?: number;
  remarks?: string;
}

// 设备数据
export const devices: Device[] = [
  // 高清摄像头系列
  {
    id: 'dev001',
    name: '4K高清摄像头-停车场',
    type: 'camera',
    status: 'online',
    location: '生产车间A区1号生产线',
    lastUpdate: '2025-07-23 14:30:00',
    battery: 85,
    signal: 95,
  },
  {
    id: 'dev002',
    name: '红外夜视摄像头-门岗东',
    type: 'camera',
    status: 'online',
    location: '厂区东门岗哨监控点',
    lastUpdate: '2025-07-23 14:29:30',
    battery: 91,
    signal: 96,
  },
  {
    id: 'dev003',
    name: '360度全景摄像头-中央',
    type: 'camera',
    status: 'online',
    location: '生产车间中央监控塔',
    lastUpdate: '2025-07-23 14:30:15',
    battery: 78,
    signal: 89,
  },
  {
    id: 'dev004',
    name: '防爆摄像头-危险区域A07',
    type: 'camera',
    status: 'warning',
    location: '化学品存储区A-07货架',
    lastUpdate: '2025-07-23 14:28:45',
    battery: 56,
    signal: 82,
  },
  {
    id: 'dev005',
    name: '高速球形摄像头-围墙北',
    type: 'camera',
    status: 'online',
    location: '厂区北围墙监控塔3号',
    lastUpdate: '2025-07-23 14:30:10',
    battery: 94,
    signal: 91,
  },
  {
    id: 'dev006',
    name: '智能AI摄像头-出入口',
    type: 'camera',
    status: 'online',
    location: '主厂房出入口闸机处',
    lastUpdate: '2025-07-23 14:29:50',
    battery: 88,
    signal: 93,
  },
  
  // 语音对讲设备系列
  {
    id: 'dev007',
    name: '5G无线对讲机-班长01',
    type: 'phone',
    status: 'online',
    location: '生产车间A区班长岗位',
    lastUpdate: '2025-07-23 14:29:00',
    battery: 92,
    signal: 98,
  },
  {
    id: 'dev008',
    name: '防水对讲机-维修组长',
    type: 'phone',
    status: 'online',
    location: '设备维修间工具台',
    lastUpdate: '2025-07-23 14:29:45',
    battery: 82,
    signal: 85,
  },
  {
    id: 'dev009',
    name: '车载对讲终端-叉车01',
    type: 'phone',
    status: 'online',
    location: '仓库B区3号叉车',
    lastUpdate: '2025-07-23 14:30:20',
    battery: 71,
    signal: 79,
  },
  {
    id: 'dev010',
    name: '桌面调度终端-控制室',
    type: 'phone',
    status: 'online',
    location: '中央控制室调度台',
    lastUpdate: '2025-07-23 14:30:00',
    signal: 98,
  },
  {
    id: 'dev011',
    name: '应急通信终端-安全部',
    type: 'phone',
    status: 'online',
    location: '安全管理部值班室',
    lastUpdate: '2025-07-23 14:29:50',
    battery: 95,
    signal: 94,
  },
  {
    id: 'dev012',
    name: '便携式对讲机-巡检员',
    type: 'phone',
    status: 'online',
    location: '厂区巡检路线B段',
    lastUpdate: '2025-07-23 14:28:30',
    battery: 64,
    signal: 87,
  },
  
  // 传感器设备系列
  {
    id: 'dev013',
    name: '温湿度传感器-车间A1',
    type: 'sensor',
    status: 'online',
    location: '生产车间A区1号检测点',
    lastUpdate: '2025-07-23 14:28:00',
    battery: 76,
    signal: 87,
  },
  {
    id: 'dev014',
    name: '烟雾报警器-仓库B3',
    type: 'sensor',
    status: 'online',
    location: '仓库B区3号货架顶部',
    lastUpdate: '2025-07-23 14:29:55',
    battery: 68,
    signal: 83,
  },
  {
    id: 'dev015',
    name: '可燃气体检测仪-化学区',
    type: 'sensor',
    status: 'warning',
    location: '化学品处理区域西南角',
    lastUpdate: '2025-07-23 14:25:00',
    battery: 45,
    signal: 76,
  },
  {
    id: 'dev016',
    name: '振动监测仪-设备01',
    type: 'sensor',
    status: 'online',
    location: '主要生产设备机台01轴承',
    lastUpdate: '2025-07-23 14:29:40',
    battery: 88,
    signal: 90,
  },
  {
    id: 'dev017',
    name: '压力传感器-主管道A',
    type: 'sensor',
    status: 'online',
    location: '主管道A段3号监测点',
    lastUpdate: '2025-07-23 14:30:05',
    battery: 72,
    signal: 86,
  },
  {
    id: 'dev018',
    name: '噪声监测仪-车间中央',
    type: 'sensor',
    status: 'online',
    location: '生产车间中央噪声检测点',
    lastUpdate: '2025-07-23 14:29:25',
    battery: 81,
    signal: 84,
  },
  
  // 控制器设备系列
  {
    id: 'dev019',
    name: '智能照明控制器-车间A',
    type: 'controller',
    status: 'online',
    location: '生产车间A区照明控制柜',
    lastUpdate: '2025-07-23 14:30:00',
    battery: 100,
    signal: 95,
  },
  {
    id: 'dev020',
    name: '中央空调控制终端-办公区',
    type: 'controller',
    status: 'online',
    location: '办公楼C座空调机房',
    lastUpdate: '2025-07-23 14:29:30',
    battery: 92,
    signal: 89,
  },
  {
    id: 'dev021',
    name: '门禁控制器-主入口',
    type: 'controller',
    status: 'online',
    location: '办公楼主入口门禁系统',
    lastUpdate: '2025-07-23 14:30:10',
    battery: 87,
    signal: 93,
  },
  {
    id: 'dev022',
    name: '生产线PLC控制器-A1',
    type: 'controller',
    status: 'warning',
    location: '生产线A1电控柜',
    lastUpdate: '2025-07-23 14:25:00',
    battery: 45,
    signal: 78,
  },
  {
    id: 'dev023',
    name: '应急广播控制器-全厂',
    type: 'controller',
    status: 'online',
    location: '应急指挥中心广播室',
    lastUpdate: '2025-07-23 14:30:00',
    battery: 98,
    signal: 97,
  },
  {
    id: 'dev024',
    name: '消防联动控制器-主楼',
    type: 'controller',
    status: 'offline',
    location: '主办公楼消防控制室',
    lastUpdate: '2025-07-23 13:45:00',
    battery: 0,
    signal: 0,
  },
];

// 用户数据 - 山东金科星机电股份有限公司
export const users: User[] = [
  // 总经理办公室
  {
    id: 'user001',
    name: '赵建华',
    department: '总经理办公室',
    role: '总经理',
    phone: '13800138001',
    email: 'zhao.jianhua@jinkexing.com',
    status: 'online',
    joinDate: '2020-01-01',
    supervisor: '',
    level: '专家',
    workLocation: '行政楼3楼',
    employeeId: 'JKX001',
  },
  {
    id: 'user002',
    name: '李秘书',
    department: '总经理办公室',
    role: '总经理秘书',
    phone: '13800138002',
    email: 'li.mishu@jinkexing.com',
    status: 'online',
    joinDate: '2020-03-15',
    supervisor: '赵建华',
    level: '高级',
    workLocation: '行政楼3楼301',
    employeeId: 'JKX002',
  },
  {
    id: 'user003',
    name: '王文博',
    department: '总经理办公室',
    role: '战略规划师',
    phone: '13800138003',
    email: 'wang.wenbo@jinkexing.com',
    status: 'busy',
    joinDate: '2020-06-01',
    supervisor: '赵建华',
    level: '高级',
    workLocation: '行政楼3楼302',
    employeeId: 'JKX003',
  },

  // 生产制造部
  {
    id: 'user004',
    name: '张伟民',
    department: '生产制造部',
    role: '生产总监',
    phone: '13800138010',
    email: 'zhang.weimin@jinkexing.com',
    status: 'online',
    joinDate: '2020-01-01',
    supervisor: '赵建华',
    level: '专家',
    workLocation: '生产厂区A区',
    employeeId: 'JKX010',
  },
  {
    id: 'user005',
    name: '李国强',
    department: '生产制造部',
    role: '机械加工车间主任',
    phone: '13800138011',
    email: 'li.guoqiang@jinkexing.com',
    status: 'online',
    joinDate: '2020-02-01',
    supervisor: '张伟民',
    level: '高级',
    workLocation: '生产厂区A区1号车间',
    employeeId: 'JKX011',
  },
  {
    id: 'user006',
    name: '王建军',
    department: '生产制造部',
    role: '电气装配车间主任',
    phone: '13800138012',
    email: 'wang.jianjun@jinkexing.com',
    status: 'online',
    joinDate: '2020-02-15',
    supervisor: '张伟民',
    level: '高级',
    workLocation: '生产厂区A区2号车间',
    employeeId: 'JKX012',
  },
  {
    id: 'user007',
    name: '陈质检',
    department: '生产制造部',
    role: '质检科长',
    phone: '13800138013',
    email: 'chen.zhijian@jinkexing.com',
    status: 'busy',
    joinDate: '2020-03-01',
    supervisor: '张伟民',
    level: '高级',
    workLocation: '生产厂区A区质检中心',
    employeeId: 'JKX013',
  },
  {
    id: 'user008',
    name: '刘维护',
    department: '生产制造部',
    role: '设备维护主管',
    phone: '13800138014',
    email: 'liu.weihu@jinkexing.com',
    status: 'online',
    joinDate: '2020-04-01',
    supervisor: '张伟民',
    level: '中级',
    workLocation: '生产厂区A区维修中心',
    employeeId: 'JKX014',
  },
  {
    id: 'user009',
    name: '马仓储',
    department: '生产制造部',
    role: '仓储主管',
    phone: '13800138015',
    email: 'ma.cangchu@jinkexing.com',
    status: 'online',
    joinDate: '2020-05-01',
    supervisor: '张伟民',
    level: '中级',
    workLocation: '生产厂区B区仓库',
    employeeId: 'JKX015',
  },
  {
    id: 'user010',
    name: '孙操作',
    department: '生产制造部',
    role: '机床操作员',
    phone: '13800138016',
    email: 'sun.caozuo@jinkexing.com',
    status: 'online',
    joinDate: '2021-01-15',
    supervisor: '李国强',
    level: '中级',
    workLocation: '生产厂区A区1号车间',
    employeeId: 'JKX016',
  },
  {
    id: 'user011',
    name: '周装配',
    department: '生产制造部',
    role: '电气装配工',
    phone: '13800138017',
    email: 'zhou.zhuangpei@jinkexing.com',
    status: 'online',
    joinDate: '2021-02-01',
    supervisor: '王建军',
    level: '中级',
    workLocation: '生产厂区A区2号车间',
    employeeId: 'JKX017',
  },
  {
    id: 'user012',
    name: '吴检验',
    department: '生产制造部',
    role: '质量检验员',
    phone: '13800138018',
    email: 'wu.jianyan@jinkexing.com',
    status: 'busy',
    joinDate: '2021-03-01',
    supervisor: '陈质检',
    level: '初级',
    workLocation: '生产厂区A区质检中心',
    employeeId: 'JKX018',
  },

  // 技术研发部
  {
    id: 'user013',
    name: '陈志远',
    department: '技术研发部',
    role: '技术总监',
    phone: '13800138020',
    email: 'chen.zhiyuan@jinkexing.com',
    status: 'online',
    joinDate: '2020-01-01',
    supervisor: '赵建华',
    level: '专家',
    workLocation: '研发楼2-3楼',
    employeeId: 'JKX020',
  },
  {
    id: 'user014',
    name: '王设计',
    department: '技术研发部',
    role: '机械设计主管',
    phone: '13800138021',
    email: 'wang.sheji@jinkexing.com',
    status: 'online',
    joinDate: '2020-02-01',
    supervisor: '陈志远',
    level: '高级',
    workLocation: '研发楼2楼201',
    employeeId: 'JKX021',
  },
  {
    id: 'user015',
    name: '李电气',
    department: '技术研发部',
    role: '电气工程师',
    phone: '13800138022',
    email: 'li.dianqi@jinkexing.com',
    status: 'busy',
    joinDate: '2020-03-01',
    supervisor: '陈志远',
    level: '高级',
    workLocation: '研发楼2楼202',
    employeeId: 'JKX022',
  },
  {
    id: 'user016',
    name: '张软件',
    department: '技术研发部',
    role: '软件工程师',
    phone: '13800138023',
    email: 'zhang.ruanjian@jinkexing.com',
    status: 'online',
    joinDate: '2020-04-01',
    supervisor: '陈志远',
    level: '高级',
    workLocation: '研发楼3楼301',
    employeeId: 'JKX023',
  },
  {
    id: 'user017',
    name: '刘测试',
    department: '技术研发部',
    role: '测试工程师',
    phone: '13800138024',
    email: 'liu.ceshi@jinkexing.com',
    status: 'online',
    joinDate: '2020-05-01',
    supervisor: '陈志远',
    level: '中级',
    workLocation: '研发楼1楼实验室',
    employeeId: 'JKX024',
  },

  // 销售市场部
  {
    id: 'user018',
    name: '刘营销',
    department: '销售市场部',
    role: '销售总监',
    phone: '13800138030',
    email: 'liu.yingxiao@jinkexing.com',
    status: 'online',
    joinDate: '2020-01-01',
    supervisor: '赵建华',
    level: '专家',
    workLocation: '行政楼2楼',
    employeeId: 'JKX030',
  },
  {
    id: 'user019',
    name: '王华北',
    department: '销售市场部',
    role: '华北区经理',
    phone: '13800138031',
    email: 'wang.huabei@jinkexing.com',
    status: 'busy',
    joinDate: '2020-02-01',
    supervisor: '刘营销',
    level: '高级',
    workLocation: '行政楼2楼201',
    employeeId: 'JKX031',
  },
  {
    id: 'user020',
    name: '李华东',
    department: '销售市场部',
    role: '华东区经理',
    phone: '13800138032',
    email: 'li.huadong@jinkexing.com',
    status: 'online',
    joinDate: '2020-03-01',
    supervisor: '刘营销',
    level: '高级',
    workLocation: '行政楼2楼202',
    employeeId: 'JKX032',
  },
  {
    id: 'user021',
    name: '陈华南',
    department: '销售市场部',
    role: '华南区经理',
    phone: '13800138033',
    email: 'chen.huanan@jinkexing.com',
    status: 'online',
    joinDate: '2020-04-01',
    supervisor: '刘营销',
    level: '高级',
    workLocation: '行政楼2楼203',
    employeeId: 'JKX033',
  },
  {
    id: 'user022',
    name: '张市场',
    department: '销售市场部',
    role: '市场主管',
    phone: '13800138034',
    email: 'zhang.shichang@jinkexing.com',
    status: 'online',
    joinDate: '2020-05-01',
    supervisor: '刘营销',
    level: '中级',
    workLocation: '行政楼2楼204',
    employeeId: 'JKX034',
  },

  // 安全环保部
  {
    id: 'user023',
    name: '马安全',
    department: '安全环保部',
    role: '安全总监',
    phone: '13800138040',
    email: 'ma.anquan@jinkexing.com',
    status: 'online',
    joinDate: '2020-01-01',
    supervisor: '赵建华',
    level: '专家',
    workLocation: '安全楼1-2楼',
    employeeId: 'JKX040',
  },
  {
    id: 'user024',
    name: '孙管理',
    department: '安全环保部',
    role: '安全管理主管',
    phone: '13800138041',
    email: 'sun.guanli@jinkexing.com',
    status: 'online',
    joinDate: '2020-02-01',
    supervisor: '马安全',
    level: '高级',
    workLocation: '安全楼1楼',
    employeeId: 'JKX041',
  },
  {
    id: 'user025',
    name: '周环保',
    department: '安全环保部',
    role: '环保主管',
    phone: '13800138042',
    email: 'zhou.huanbao@jinkexing.com',
    status: 'busy',
    joinDate: '2020-03-01',
    supervisor: '马安全',
    level: '高级',
    workLocation: '安全楼2楼',
    employeeId: 'JKX042',
  },
  {
    id: 'user026',
    name: '吴应急',
    department: '安全环保部',
    role: '应急主管',
    phone: '13800138043',
    email: 'wu.yingji@jinkexing.com',
    status: 'online',
    joinDate: '2020-04-01',
    supervisor: '马安全',
    level: '中级',
    workLocation: '安全楼1楼应急中心',
    employeeId: 'JKX043',
  },

  // 人力资源部
  {
    id: 'user027',
    name: '孙人力',
    department: '人力资源部',
    role: '人力资源总监',
    phone: '13800138050',
    email: 'sun.renli@jinkexing.com',
    status: 'online',
    joinDate: '2020-01-01',
    supervisor: '赵建华',
    level: '专家',
    workLocation: '行政楼1楼',
    employeeId: 'JKX050',
  },
  {
    id: 'user028',
    name: '刘招聘',
    department: '人力资源部',
    role: '招聘主管',
    phone: '13800138051',
    email: 'liu.zhaopin@jinkexing.com',
    status: 'online',
    joinDate: '2020-02-01',
    supervisor: '孙人力',
    level: '高级',
    workLocation: '行政楼1楼101',
    employeeId: 'JKX051',
  },
  {
    id: 'user029',
    name: '王薪酬',
    department: '人力资源部',
    role: '薪酬主管',
    phone: '13800138052',
    email: 'wang.xinchou@jinkexing.com',
    status: 'busy',
    joinDate: '2020-03-01',
    supervisor: '孙人力',
    level: '高级',
    workLocation: '行政楼1楼102',
    employeeId: 'JKX052',
  },
  {
    id: 'user030',
    name: '陈员工',
    department: '人力资源部',
    role: '员工关系主管',
    phone: '13800138053',
    email: 'chen.yuangong@jinkexing.com',
    status: 'online',
    joinDate: '2020-04-01',
    supervisor: '孙人力',
    level: '中级',
    workLocation: '行政楼1楼103',
    employeeId: 'JKX053',
  },

  // 财务管理部
  {
    id: 'user031',
    name: '周财务',
    department: '财务管理部',
    role: '财务总监',
    phone: '13800138060',
    email: 'zhou.caiwu@jinkexing.com',
    status: 'online',
    joinDate: '2020-01-01',
    supervisor: '赵建华',
    level: '专家',
    workLocation: '行政楼1楼',
    employeeId: 'JKX060',
  },
  {
    id: 'user032',
    name: '吴会计',
    department: '财务管理部',
    role: '会计主管',
    phone: '13800138061',
    email: 'wu.kuaiji@jinkexing.com',
    status: 'busy',
    joinDate: '2020-02-01',
    supervisor: '周财务',
    level: '高级',
    workLocation: '行政楼1楼104',
    employeeId: 'JKX061',
  },
  {
    id: 'user033',
    name: '郑成本',
    department: '财务管理部',
    role: '成本主管',
    phone: '13800138062',
    email: 'zheng.chengben@jinkexing.com',
    status: 'online',
    joinDate: '2020-03-01',
    supervisor: '周财务',
    level: '高级',
    workLocation: '行政楼1楼105',
    employeeId: 'JKX062',
  },
  {
    id: 'user034',
    name: '黄资金',
    department: '财务管理部',
    role: '资金主管',
    phone: '13800138063',
    email: 'huang.zijin@jinkexing.com',
    status: 'online',
    joinDate: '2020-04-01',
    supervisor: '周财务',
    level: '中级',
    workLocation: '行政楼1楼106',
    employeeId: 'JKX063',
  },

  // 信息技术部
  {
    id: 'user035',
    name: '郑技术',
    department: '信息技术部',
    role: '信息技术总监',
    phone: '13800138070',
    email: 'zheng.jishu@jinkexing.com',
    status: 'online',
    joinDate: '2020-01-01',
    supervisor: '赵建华',
    level: '专家',
    workLocation: '研发楼1楼',
    employeeId: 'JKX070',
  },
  {
    id: 'user036',
    name: '韩开发',
    department: '信息技术部',
    role: '开发主管',
    phone: '13800138071',
    email: 'han.kaifa@jinkexing.com',
    status: 'busy',
    joinDate: '2020-02-01',
    supervisor: '郑技术',
    level: '高级',
    workLocation: '研发楼1楼101',
    employeeId: 'JKX071',
  },
  {
    id: 'user037',
    name: '冯运维',
    department: '信息技术部',
    role: '运维主管',
    phone: '13800138072',
    email: 'feng.yunwei@jinkexing.com',
    status: 'online',
    joinDate: '2020-03-01',
    supervisor: '郑技术',
    level: '高级',
    workLocation: '研发楼1楼102',
    employeeId: 'JKX072',
  },
  {
    id: 'user038',
    name: '谢数据',
    department: '信息技术部',
    role: '数据分析师',
    phone: '13800138073',
    email: 'xie.shuju@jinkexing.com',
    status: 'online',
    joinDate: '2020-04-01',
    supervisor: '郑技术',
    level: '中级',
    workLocation: '研发楼1楼103',
    employeeId: 'JKX073',
  },
  {
    id: 'user011',
    name: '何维修',
    department: '技术研发部',
    role: '设备维修工',
    phone: '13800138011',
    status: 'online',
  },
  
  // 管理部门
  {
    id: 'user012',
    name: '朱经理',
    department: '综合管理部',
    role: '部门经理',
    phone: '13800138012',
    status: 'online',
  },
  {
    id: 'user013',
    name: '林调度',
    department: '综合管理部',
    role: '调度员',
    phone: '13800138013',
    status: 'online',
  },
  {
    id: 'user014',
    name: '高监控',
    department: '综合管理部',
    role: '监控值班员',
    phone: '13800138014',
    status: 'online',
  },
  
  // 后勤保障
  {
    id: 'user015',
    name: '钱后勤',
    department: '后勤保障部',
    role: '后勤主管',
    phone: '13800138015',
    status: 'online',
  },
  {
    id: 'user016',
    name: '孔仓管',
    department: '后勤保障部',
    role: '仓库管理员',
    phone: '13800138016',
    status: 'busy',
  },
  {
    id: 'user017',
    name: '严巡检',
    department: '后勤保障部',
    role: '设施巡检员',
    phone: '13800138017',
    status: 'online',
  },
  
  // 夜班人员
  {
    id: 'user018',
    name: '龙夜班',
    department: '生产部',
    role: '夜班班长',
    phone: '13800138018',
    status: 'offline',
  },
  {
    id: 'user019',
    name: '白值班',
    department: '安全管理部',
    role: '夜班安全员',
    phone: '13800138019',
    status: 'offline',
  },
  {
    id: 'user020',
    name: '夜保安',
    department: '综合管理部',
    role: '夜班保安',
    phone: '13800138020',
    status: 'offline',
  },
];

// 指挥调度数据
export const commands: Command[] = [
  {
    id: 'cmd001',
    title: '紧急集合通知',
    content: '请各车间负责人立即到会议室集合，有重要事项讨论',
    sender: '张伟民',
    receiver: '全体车间主任',
    status: 'sent',
    timestamp: '2024-01-29 14:30:00',
    priority: 'urgent',
  },
  {
    id: 'cmd002',
    title: '设备检查指令',
    content: '请检查A区生产设备运行状态，确保安全生产。重点关注5号生产线液压系统压力值，如有异常立即上报。',
    sender: '李国强',
    receiver: '王建军',
    status: 'received',
    timestamp: '2024-01-29 14:25:00',
    priority: 'high',
  },
  {
    id: 'cmd003',
    title: '安全巡检通知',
    content: '请各区域安全员进行例行安全巡检，特别关注消防设施和应急通道畅通情况',
    sender: '孙管理',
    receiver: '安全员团队',
    status: 'completed',
    timestamp: '2024-01-29 14:20:00',
    priority: 'medium',
  },
  {
    id: 'cmd004',
    title: '原料供应协调',
    content: 'B区生产线原料库存不足，请物流部门紧急补充化工原料，预计需求量500公斤，确保明日正常生产。',
    sender: '陈生产主管',
    receiver: '物流部门',
    status: 'pending',
    timestamp: '2025-07-23 14:18:00',
    priority: 'high',
  },
  {
    id: 'cmd005',
    title: '设备维护计划',
    content: '3号压缩机定期保养时间到，安排在今晚20:00停机维护，预计维护时间4小时，请做好生产调度安排。',
    sender: '维护部',
    receiver: 'C区生产组',
    status: 'sent',
    timestamp: '2025-07-23 14:15:00',
    priority: 'medium',
  },
  {
    id: 'cmd006',
    title: '质量检验通知',
    content: '第24批次产品已下线，请质检部门尽快安排检验，重点关注产品密度和纯度指标。',
    sender: '刘主管',
    receiver: '质检部',
    status: 'completed',
    timestamp: '2025-07-23 14:12:00',
    priority: 'medium',
  },
  {
    id: 'cmd007',
    title: '环保数据上报',
    content: '本月环保监测数据需在今日16:00前完成整理并上报环保局，请环保专员抓紧时间完成。',
    sender: '环保部',
    receiver: '孙环保专员',
    status: 'received',
    timestamp: '2025-07-23 14:08:00',
    priority: 'high',
  },
  {
    id: 'cmd008',
    title: '员工培训安排',
    content: '新入职员工安全培训定于明日上午9:00在培训中心举行，请各部门安排新员工准时参加。',
    sender: '人事部',
    receiver: '各部门主管',
    status: 'sent',
    timestamp: '2025-07-23 14:05:00',
    priority: 'medium',
  },
  {
    id: 'cmd009',
    title: '紧急停产指令',
    content: '接上级通知，因特殊天气原因，所有露天作业立即停止，人员撤至安全区域。恢复作业时间另行通知。',
    sender: '应急指挥中心',
    receiver: '全体作业人员',
    status: 'sent',
    timestamp: '2025-07-23 14:02:00',
    priority: 'urgent',
  },
  {
    id: 'cmd010',
    title: '库存盘点任务',
    content: '月末库存盘点工作启动，各仓管员请按照盘点清单对所负责区域进行全面盘点，确保账实相符。',
    sender: '仓储部',
    receiver: '各仓管员',
    status: 'pending',
    timestamp: '2025-07-23 14:00:00',
    priority: 'low',
  },
  {
    id: 'cmd011',
    title: '网络系统维护',
    content: '今晚22:00-23:00进行网络系统升级维护，期间可能影响生产系统使用，请各部门提前做好准备。',
    sender: 'IT部门',
    receiver: '各部门',
    status: 'sent',
    timestamp: '2025-07-23 13:58:00',
    priority: 'medium',
  },
  {
    id: 'cmd012',
    title: '消防演练通知',
    content: '定于本周四下午15:00举行全厂消防应急演练，请各部门配合演练工作，听到警报声立即按预案执行。',
    sender: '安全部',
    receiver: '全体员工',
    status: 'pending',
    timestamp: '2025-07-23 13:55:00',
    priority: 'high',
  },
  {
    id: 'cmd013',
    title: '设备故障处理',
    content: 'A区2号反应釜温控系统出现异常，显示温度偏高，请维修人员立即前往现场检查处理。',
    sender: '中控室',
    receiver: '设备维修组',
    status: 'received',
    timestamp: '2025-07-23 13:52:00',
    priority: 'urgent',
  },
  {
    id: 'cmd014',
    title: '产品出货安排',
    content: '客户A订单的产品已检验合格，安排明日上午装车发货，请物流部门协调运输车辆。',
    sender: '销售部',
    receiver: '物流部门',
    status: 'completed',
    timestamp: '2025-07-23 13:50:00',
    priority: 'medium',
  },
  {
    id: 'cmd015',
    title: '用电安全检查',
    content: '近期用电负荷较高，请电工班对各车间配电设施进行全面检查，确保用电安全。',
    sender: '动力部',
    receiver: '电工班',
    status: 'sent',
    timestamp: '2025-07-23 13:48:00',
    priority: 'high',
  },
  {
    id: 'cmd016',
    title: '废料处理指令',
    content: '生产过程中产生的废料已达到处理临界点，请环保部门联系有资质的处理机构进行无害化处理。',
    sender: '生产部',
    receiver: '环保部',
    status: 'pending',
    timestamp: '2025-07-23 13:45:00',
    priority: 'medium',
  },
  {
    id: 'cmd017',
    title: '班组交接检查',
    content: '夜班交接时发现B区设备运行参数异常，请接班人员重点关注并做好记录，如有问题及时汇报。',
    sender: '夜班班长',
    receiver: '早班班长',
    status: 'completed',
    timestamp: '2025-07-23 13:42:00',
    priority: 'medium',
  },
  {
    id: 'cmd018',
    title: '客户投诉处理',
    content: '收到客户对上批产品质量的投诉，请质检部门和技术部门联合调查，48小时内给出处理方案。',
    sender: '客服部',
    receiver: '质检部,技术部',
    status: 'received',
    timestamp: '2025-07-23 13:40:00',
    priority: 'high',
  },
  {
    id: 'cmd019',
    title: '能耗监控报告',
    content: '本月用电量超出预算15%，请各车间节约用电，非必要设备及时关闭，减少能耗浪费。',
    sender: '能源管理部',
    receiver: '各车间主任',
    status: 'sent',
    timestamp: '2025-07-23 13:38:00',
    priority: 'low',
  },
  {
    id: 'cmd020',
    title: '应急物资补充',
    content: '应急救援物资库存偏低，请采购部门紧急采购防毒面具、急救包等应急物资，确保应急准备充足。',
    sender: '应急管理部',
    receiver: '采购部门',
    status: 'pending',
    timestamp: '2025-07-23 13:35:00',
    priority: 'high',
  },
];

// 安全事件数据
export const safetyEvents: SafetyEvent[] = [
  {
    id: 'evt001',
    type: 'gas',
    location: '化学品存储区A-07',
    severity: 'high',
    status: 'investigating',
    timestamp: '2025-07-23 14:15:00',
    description: '可燃气体检测仪报警，检测到甲烷浓度超标，现场已疏散人员，正在排查泄漏源',
  },
  {
    id: 'evt002',
    type: 'fire',
    location: '主办公楼配电室',
    severity: 'critical',
    status: 'active',
    timestamp: '2025-07-23 14:10:00',
    description: '配电室烟雾报警器触发，现场发现电缆起火，消防系统已自动启动，消防队正在赶来',
  },
  {
    id: 'evt003',
    type: 'intrusion',
    location: '厂区东门岗哨',
    severity: 'low',
    status: 'resolved',
    timestamp: '2025-07-23 13:45:00',
    description: '门禁系统检测到未授权刷卡尝试，经核实为新员工首日上班忘记激活门禁卡',
  },
  {
    id: 'evt004',
    type: 'emergency',
    location: '生产车间A区1号生产线',
    severity: 'medium',
    status: 'investigating',
    timestamp: '2025-07-23 13:30:00',
    description: '设备异常停机，疑似机械故障，维修人员正在现场检查，暂停该生产线作业',
  },
  {
    id: 'evt005',
    type: 'gas',
    location: '危化品仓库B区',
    severity: 'low',
    status: 'resolved',
    timestamp: '2025-07-23 12:20:00',
    description: '氨气浓度轻微超标，经检查为通风系统滤网堵塞，已清理并恢复正常',
  },
  {
    id: 'evt006',
    type: 'intrusion',
    location: '仓库B区3号货架',
    severity: 'medium',
    status: 'resolved',
    timestamp: '2025-07-23 11:15:00',
    description: '红外监控发现夜间有人员在非工作时间进入仓库，经查证为夜班员工加班处理紧急订单',
  },
  {
    id: 'evt007',
    type: 'fire',
    location: '生产车间B区焊接工位',
    severity: 'low',
    status: 'resolved',
    timestamp: '2025-07-23 10:30:00',
    description: '焊接作业时火花引燃附近杂物，现场人员及时扑灭，无人员受伤，已加强现场管理',
  },
  {
    id: 'evt008',
    type: 'emergency',
    location: '办公楼C座电梯',
    severity: 'medium',
    status: 'resolved',
    timestamp: '2025-07-23 09:45:00',
    description: '电梯突然停电困人，应急响应小组5分钟内到达现场，手动开门救出3名被困人员',
  },
  {
    id: 'evt009',
    type: 'gas',
    location: '锅炉房',
    severity: 'high',
    status: 'resolved',
    timestamp: '2025-07-14 16:20:00',
    description: '天然气管道接头处发现微量泄漏，已紧急关闭阀门并更换密封件，系统重新投运正常',
  },
  {
    id: 'evt010',
    type: 'intrusion',
    location: '厂区围墙北段',
    severity: 'high',
    status: 'resolved',
    timestamp: '2025-07-14 02:30:00',
    description: '周界报警系统触发，监控发现有人翻越围墙，保安已赶到现场处理并报警',
  },
];

// 数据记录
export const dataRecords: DataRecord[] = [
  // 温湿度数据
  {
    id: 'data001',
    deviceId: 'dev013',
    deviceName: '温湿度传感器-车间A1',
    dataType: 'temperature',
    value: 25.6,
    unit: '°C',
    timestamp: '2025-07-23 14:30:00',
    location: '生产车间A区1号检测点',
  },
  {
    id: 'data002',
    deviceId: 'dev013',
    deviceName: '温湿度传感器-车间A1',
    dataType: 'humidity',
    value: 65.2,
    unit: '%',
    timestamp: '2025-07-23 14:30:00',
    location: '生产车间A区1号检测点',
  },
  {
    id: 'data003',
    deviceId: 'dev014',
    deviceName: '烟雾报警器-仓库B3',
    dataType: 'temperature',
    value: 22.8,
    unit: '°C',
    timestamp: '2025-07-23 14:29:55',
    location: '仓库B区3号货架顶部',
  },
  {
    id: 'data004',
    deviceId: 'dev014',
    deviceName: '烟雾报警器-仓库B3',
    dataType: 'humidity',
    value: 58.9,
    unit: '%',
    timestamp: '2025-07-23 14:29:55',
    location: '仓库B区3号货架顶部',
  },
  
  // 压力数据
  {
    id: 'data005',
    deviceId: 'dev017',
    deviceName: '压力传感器-主管道A',
    dataType: 'pressure',
    value: 2.45,
    unit: 'MPa',
    timestamp: '2025-07-23 14:30:05',
    location: '主管道A段3号监测点',
  },
  {
    id: 'data006',
    deviceId: 'dev017',
    deviceName: '压力传感器-主管道A',
    dataType: 'pressure',
    value: 2.48,
    unit: 'MPa',
    timestamp: '2025-07-23 14:25:05',
    location: '主管道A段3号监测点',
  },
  
  // 振动数据
  {
    id: 'data007',
    deviceId: 'dev016',
    deviceName: '振动监测仪-设备01',
    dataType: 'vibration',
    value: 1.82,
    unit: 'mm/s',
    timestamp: '2025-07-23 14:29:40',
    location: '主要生产设备机台01轴承',
  },
  {
    id: 'data008',
    deviceId: 'dev016',
    deviceName: '振动监测仪-设备01',
    dataType: 'vibration',
    value: 1.75,
    unit: 'mm/s',
    timestamp: '2025-07-23 14:24:40',
    location: '主要生产设备机台01轴承',
  },
  
  // 电压数据
  {
    id: 'data009',
    deviceId: 'dev022',
    deviceName: '生产线PLC控制器-A1',
    dataType: 'voltage',
    value: 220.5,
    unit: 'V',
    timestamp: '2025-07-23 14:29:00',
    location: '生产线A1电控柜',
  },
  {
    id: 'data010',
    deviceId: 'dev019',
    deviceName: '智能照明控制器-车间A',
    dataType: 'voltage',
    value: 380.2,
    unit: 'V',
    timestamp: '2025-07-23 14:30:00',
    location: '生产车间A区照明控制柜',
  },
  {
    id: 'data011',
    deviceId: 'dev020',
    deviceName: '中央空调控制终端-办公区',
    dataType: 'voltage',
    value: 380.8,
    unit: 'V',
    timestamp: '2025-07-23 14:29:30',
    location: '办公楼C座空调机房',
  },
  
  // 历史数据记录
  {
    id: 'data012',
    deviceId: 'dev013',
    deviceName: '温湿度传感器-车间A1',
    dataType: 'temperature',
    value: 24.8,
    unit: '°C',
    timestamp: '2025-07-23 14:25:00',
    location: '生产车间A区1号检测点',
  },
  {
    id: 'data013',
    deviceId: 'dev013',
    deviceName: '温湿度传感器-车间A1',
    dataType: 'humidity',
    value: 63.7,
    unit: '%',
    timestamp: '2025-07-23 14:25:00',
    location: '生产车间A区1号检测点',
  },
  {
    id: 'data014',
    deviceId: 'dev015',
    deviceName: '可燃气体检测仪-化学区',
    dataType: 'pressure',
    value: 1.01,
    unit: 'kPa',
    timestamp: '2025-07-23 14:25:00',
    location: '化学品处理区域西南角',
  },
  {
    id: 'data015',
    deviceId: 'dev018',
    deviceName: '噪声监测仪-车间中央',
    dataType: 'vibration',
    value: 75.6,
    unit: 'dB',
    timestamp: '2025-07-23 14:29:25',
    location: '生产车间中央噪声检测点',
  },
  
  // 温度趋势数据
  {
    id: 'data016',
    deviceId: 'dev013',
    deviceName: '温湿度传感器-车间A1',
    dataType: 'temperature',
    value: 26.2,
    unit: '°C',
    timestamp: '2025-07-23 14:20:00',
    location: '生产车间A区1号检测点',
  },
  {
    id: 'data017',
    deviceId: 'dev013',
    deviceName: '温湿度传感器-车间A1',
    dataType: 'temperature',
    value: 25.1,
    unit: '°C',
    timestamp: '2025-07-23 14:15:00',
    location: '生产车间A区1号检测点',
  },
  {
    id: 'data018',
    deviceId: 'dev013',
    deviceName: '温湿度传感器-车间A1',
    dataType: 'temperature',
    value: 24.9,
    unit: '°C',
    timestamp: '2025-07-23 14:10:00',
    location: '生产车间A区1号检测点',
  },
  
  // 更多设备数据
  {
    id: 'data019',
    deviceId: 'dev017',
    deviceName: '压力传感器-主管道A',
    dataType: 'pressure',
    value: 2.52,
    unit: 'MPa',
    timestamp: '2025-07-23 14:20:05',
    location: '主管道A段3号监测点',
  },
  {
    id: 'data020',
    deviceId: 'dev016',
    deviceName: '振动监测仪-设备01',
    dataType: 'vibration',
    value: 1.91,
    unit: 'mm/s',
    timestamp: '2025-07-23 14:19:40',
    location: '主要生产设备机台01轴承',
  },
];

// 组织架构数据 - 山东金科星机电股份有限公司
export const organizationUnits: OrganizationUnit[] = [
  {
    id: 'dept001',
    name: '总经理办公室',
    type: 'department',
    manager: '赵总',
    managerPhone: '13800138001',
    memberCount: 8,
    description: '负责公司战略规划、综合管理和对外协调',
    location: '行政楼3楼',
    establishedDate: '2020-01-01',
    budget: 2000000,
    children: [
      {
        id: 'team001',
        name: '总经理秘书处',
        type: 'team',
        parentId: 'dept001',
        manager: '秘书长',
        managerPhone: '13800138002',
        memberCount: 3,
        description: '负责总经理日常事务和会议安排',
        location: '行政楼3楼301',
      },
      {
        id: 'team002',
        name: '企业战略部',
        type: 'team',
        parentId: 'dept001',
        manager: '战略主管',
        managerPhone: '13800138003',
        memberCount: 5,
        description: '负责企业发展战略制定和实施',
        location: '行政楼3楼302',
      },
    ],
  },
  {
    id: 'dept002',
    name: '生产制造部',
    type: 'department',
    manager: '张部长',
    managerPhone: '13800138010',
    memberCount: 156,
    description: '负责产品生产制造和质量管控',
    location: '生产厂区A区',
    establishedDate: '2020-01-01',
    budget: 15000000,
    children: [
      {
        id: 'team003',
        name: '机械加工车间',
        type: 'team',
        parentId: 'dept002',
        manager: '李车间主任',
        managerPhone: '13800138011',
        memberCount: 45,
        description: '负责机械零部件加工制造',
        location: '生产厂区A区1号车间',
      },
      {
        id: 'team004',
        name: '电气装配车间',
        type: 'team',
        parentId: 'dept002',
        manager: '王车间主任',
        managerPhone: '13800138012',
        memberCount: 38,
        description: '负责电气设备装配和调试',
        location: '生产厂区A区2号车间',
      },
      {
        id: 'team005',
        name: '质量检验科',
        type: 'team',
        parentId: 'dept002',
        manager: '质检科长',
        managerPhone: '13800138013',
        memberCount: 25,
        description: '负责产品质量检验和认证',
        location: '生产厂区A区质检中心',
      },
      {
        id: 'team006',
        name: '设备维护组',
        type: 'team',
        parentId: 'dept002',
        manager: '设备主管',
        managerPhone: '13800138014',
        memberCount: 22,
        description: '负责生产设备维护和保养',
        location: '生产厂区A区维修中心',
      },
      {
        id: 'team007',
        name: '物料仓储组',
        type: 'team',
        parentId: 'dept002',
        manager: '仓储主管',
        managerPhone: '13800138015',
        memberCount: 26,
        description: '负责原材料和成品仓储管理',
        location: '生产厂区B区仓库',
      },
    ],
  },
  {
    id: 'dept003',
    name: '技术研发部',
    type: 'department',
    manager: '陈部长',
    managerPhone: '13800138020',
    memberCount: 48,
    description: '负责产品技术研发和创新',
    location: '研发楼2-3楼',
    establishedDate: '2020-01-01',
    budget: 8000000,
    children: [
      {
        id: 'team008',
        name: '机械设计组',
        type: 'team',
        parentId: 'dept003',
        manager: '机械设计主管',
        managerPhone: '13800138021',
        memberCount: 15,
        description: '负责机械产品设计和优化',
        location: '研发楼2楼201',
      },
      {
        id: 'team009',
        name: '电气研发组',
        type: 'team',
        parentId: 'dept003',
        manager: '电气主管',
        managerPhone: '13800138022',
    memberCount: 18,
        description: '负责电气系统研发和控制',
        location: '研发楼2楼202',
      },
      {
        id: 'team010',
        name: '软件开发组',
        type: 'team',
        parentId: 'dept003',
        manager: '软件主管',
        managerPhone: '13800138023',
        memberCount: 12,
        description: '负责工业软件和控制系统开发',
        location: '研发楼3楼301',
      },
      {
        id: 'team011',
        name: '实验测试组',
        type: 'team',
        parentId: 'dept003',
        manager: '测试主管',
        managerPhone: '13800138024',
        memberCount: 8,
        description: '负责产品测试和验证',
        location: '研发楼1楼实验室',
      },
    ],
  },
  {
    id: 'dept004',
    name: '销售市场部',
    type: 'department',
    manager: '刘部长',
    managerPhone: '13800138030',
    memberCount: 32,
    description: '负责产品销售和市场推广',
    location: '行政楼2楼',
    establishedDate: '2020-01-01',
    budget: 5000000,
    children: [
      {
        id: 'team012',
        name: '华北销售区',
        type: 'team',
        parentId: 'dept004',
        manager: '华北区经理',
        managerPhone: '13800138031',
        memberCount: 8,
        description: '负责华北地区销售业务',
        location: '行政楼2楼201',
      },
      {
        id: 'team013',
        name: '华东销售区',
        type: 'team',
        parentId: 'dept004',
        manager: '华东区经理',
        managerPhone: '13800138032',
        memberCount: 10,
        description: '负责华东地区销售业务',
        location: '行政楼2楼202',
      },
      {
        id: 'team014',
        name: '华南销售区',
        type: 'team',
        parentId: 'dept004',
        manager: '华南区经理',
        managerPhone: '13800138033',
        memberCount: 7,
        description: '负责华南地区销售业务',
        location: '行政楼2楼203',
      },
      {
        id: 'team015',
        name: '市场推广组',
        type: 'team',
        parentId: 'dept004',
        manager: '市场主管',
        managerPhone: '13800138034',
        memberCount: 7,
        description: '负责品牌推广和市场活动',
        location: '行政楼2楼204',
      },
    ],
  },
  {
    id: 'dept005',
    name: '安全环保部',
    type: 'department',
    manager: '马部长',
    managerPhone: '13800138040',
    memberCount: 28,
    description: '负责生产安全和环境保护',
    location: '安全楼1-2楼',
    establishedDate: '2020-01-01',
    budget: 3000000,
    children: [
      {
        id: 'team016',
        name: '安全管理组',
        type: 'team',
        parentId: 'dept005',
        manager: '安全主管',
        managerPhone: '13800138041',
        memberCount: 15,
        description: '负责安全制度建设和监督执行',
        location: '安全楼1楼',
      },
      {
        id: 'team017',
        name: '环保监测组',
        type: 'team',
        parentId: 'dept005',
        manager: '环保主管',
        managerPhone: '13800138042',
        memberCount: 8,
        description: '负责环境监测和治理',
        location: '安全楼2楼',
      },
      {
        id: 'team018',
        name: '应急救援组',
        type: 'team',
        parentId: 'dept005',
        manager: '应急主管',
        managerPhone: '13800138043',
        memberCount: 5,
        description: '负责应急预案和救援工作',
        location: '安全楼1楼应急中心',
      },
    ],
  },
  {
    id: 'dept006',
    name: '人力资源部',
    type: 'department',
    manager: '孙部长',
    managerPhone: '13800138050',
    memberCount: 16,
    description: '负责人力资源管理和企业文化建设',
    location: '行政楼1楼',
    establishedDate: '2020-01-01',
    budget: 2500000,
    children: [
      {
        id: 'team019',
        name: '招聘培训组',
        type: 'team',
        parentId: 'dept006',
        manager: '招聘主管',
        managerPhone: '13800138051',
        memberCount: 6,
        description: '负责人员招聘和培训管理',
        location: '行政楼1楼101',
      },
      {
        id: 'team020',
        name: '薪酬绩效组',
        type: 'team',
        parentId: 'dept006',
        manager: '薪酬主管',
        managerPhone: '13800138052',
        memberCount: 5,
        description: '负责薪酬设计和绩效管理',
        location: '行政楼1楼102',
      },
      {
        id: 'team021',
        name: '员工关系组',
        type: 'team',
        parentId: 'dept006',
        manager: '员工关系主管',
        managerPhone: '13800138053',
        memberCount: 5,
        description: '负责员工关系维护和企业文化',
        location: '行政楼1楼103',
      },
    ],
  },
  {
    id: 'dept007',
    name: '财务管理部',
    type: 'department',
    manager: '周部长',
    managerPhone: '13800138060',
    memberCount: 20,
    description: '负责财务管理和成本控制',
    location: '行政楼1楼',
    establishedDate: '2020-01-01',
    budget: 1800000,
    children: [
      {
        id: 'team022',
        name: '会计核算组',
        type: 'team',
        parentId: 'dept007',
        manager: '会计主管',
        managerPhone: '13800138061',
        memberCount: 8,
        description: '负责会计核算和报表编制',
        location: '行政楼1楼104',
      },
      {
        id: 'team023',
        name: '成本管理组',
        type: 'team',
        parentId: 'dept007',
        manager: '成本主管',
        managerPhone: '13800138062',
        memberCount: 6,
        description: '负责成本核算和控制',
        location: '行政楼1楼105',
      },
      {
        id: 'team024',
        name: '资金管理组',
        type: 'team',
        parentId: 'dept007',
        manager: '资金主管',
        managerPhone: '13800138063',
        memberCount: 6,
        description: '负责资金管理和投资决策',
        location: '行政楼1楼106',
      },
    ],
  },
  {
    id: 'dept008',
    name: '信息技术部',
    type: 'department',
    manager: '郑部长',
    managerPhone: '13800138070',
    memberCount: 24,
    description: '负责信息系统建设和数据管理',
    location: '研发楼1楼',
    establishedDate: '2020-01-01',
    budget: 4000000,
    children: [
      {
        id: 'team025',
        name: '系统开发组',
        type: 'team',
        parentId: 'dept008',
        manager: '开发主管',
        managerPhone: '13800138071',
        memberCount: 12,
        description: '负责企业信息系统开发',
        location: '研发楼1楼101',
      },
      {
        id: 'team026',
        name: '网络运维组',
        type: 'team',
        parentId: 'dept008',
        manager: '运维主管',
        managerPhone: '13800138072',
        memberCount: 8,
        description: '负责网络设备维护和数据安全',
        location: '研发楼1楼102',
      },
      {
        id: 'team027',
        name: '数据分析组',
        type: 'team',
        parentId: 'dept008',
        manager: '数据主管',
        managerPhone: '13800138073',
        memberCount: 4,
        description: '负责数据分析和商业智能',
        location: '研发楼1楼103',
      },
    ],
  },
];

// 统计数据
export const statistics = {
  totalDevices: devices.length,
  onlineDevices: devices.filter(d => d.status === 'online').length,
  totalUsers: users.length,
  onlineUsers: users.filter(u => u.status === 'online').length,
  activeCommands: commands.filter(c => c.status === 'pending' || c.status === 'sent').length,
  activeSafetyEvents: safetyEvents.filter(e => e.status === 'active').length,
  dataRecordsToday: dataRecords.length,
};

// 图表数据
// 检查记录数据
export const inspectionRecords: InspectionRecord[] = [
  {
    id: 'INSP-001',
    title: '生产车间A区安全检查',
    type: 'routine',
    inspector: '张安全',
    department: '安全监察部',
    location: '生产车间A区',
    status: 'completed',
    priority: 'medium',
    scheduledDate: '2025-07-23',
    completedDate: '2025-07-23',
    score: 85,
    issuesFound: 3,
    rectificationItems: 2,
    description: '对生产车间A区进行例行安全检查，检查消防设施、电气安全、操作规程执行情况',
    remarks: '整体安全状况良好，发现少量问题已责令整改'
  },
  {
    id: 'INSP-002',
    title: '通信设备专项检查',
    type: 'special',
    inspector: '李技术',
    department: '技术维护部',
    location: '通信机房',
    status: 'in_progress',
    priority: 'high',
    scheduledDate: '2025-07-20',
    issuesFound: 1,
    rectificationItems: 1,
    description: '对5G通信设备、语音对讲系统、视频监控系统进行专项技术检查',
    remarks: '检查中发现部分设备需要升级'
  },
  {
    id: 'INSP-003',
    title: '年度消防安全大检查',
    type: 'annual',
    inspector: '王消防',
    department: '安全监察部',
    location: '全厂区',
    status: 'scheduled',
    priority: 'urgent',
    scheduledDate: '2025-07-01',
    issuesFound: 0,
    rectificationItems: 0,
    description: '年度消防安全综合检查，包括消防设施、疏散通道、应急预案等全面检查'
  },
  {
    id: 'INSP-004',
    title: '仓库区域安全检查',
    type: 'routine',
    inspector: '陈管理',
    department: '物流管理部',
    location: '仓库B区',
    status: 'overdue',
    priority: 'medium',
    scheduledDate: '2025-07-10',
    issuesFound: 2,
    rectificationItems: 2,
    description: '仓库货物堆放、通风系统、防火防盗设施检查'
  },
  {
    id: 'INSP-005',
    title: '电气系统紧急检查',
    type: 'emergency',
    inspector: '刘电工',
    department: '设备维护部',
    location: '配电室',
    status: 'completed',
    priority: 'urgent',
    scheduledDate: '2025-07-18',
    completedDate: '2025-07-18',
    score: 92,
    issuesFound: 1,
    rectificationItems: 1,
    description: '因昨日雷雨天气对电气系统进行紧急安全检查',
    remarks: '检查及时，处理迅速，未发现重大隐患'
  }
];

// 整改项目数据
export const rectificationItems: RectificationItem[] = [
  {
    id: 'RECT-001',
    inspectionId: 'INSP-001',
    title: '更换老化消防栓',
    description: '生产车间A区东侧消防栓老化严重，水压不足，需要立即更换',
    category: 'safety',
    severity: 'high',
    status: 'completed',
    assignee: '消防维修班',
    department: '设备维护部',
    dueDate: '2025-07-25',
    createdDate: '2025-07-23',
    completedDate: '2025-07-22',
    verifiedDate: '2025-07-23',
    progress: 100,
    cost: 1200,
    remarks: '已更换新型消防栓，水压测试正常'
  },
  {
    id: 'RECT-002',
    inspectionId: 'INSP-001',
    title: '修复损坏安全标识',
    description: '车间内部分安全警示标识破损，影响安全提醒效果',
    category: 'safety',
    severity: 'medium',
    status: 'verified',
    assignee: '维修班',
    department: '设备维护部',
    dueDate: '2025-07-30',
    createdDate: '2025-07-23',
    completedDate: '2025-07-28',
    verifiedDate: '2025-07-29',
    progress: 100,
    cost: 300,
    remarks: '已重新制作并安装所有安全标识'
  },
  {
    id: 'RECT-003',
    inspectionId: 'INSP-002',
    title: '升级通信设备固件',
    description: '部分5G设备固件版本过低，需要升级到最新版本',
    category: 'equipment',
    severity: 'medium',
    status: 'in_progress',
    assignee: '网络工程师',
    department: '技术维护部',
    dueDate: '2025-07-05',
    createdDate: '2025-07-20',
    progress: 60,
    cost: 0,
    remarks: '正在分批次升级，避免影响正常通信'
  },
  {
    id: 'RECT-004',
    inspectionId: 'INSP-004',
    title: '清理货物堆放通道',
    description: '仓库通道被货物占用，影响人员通行和消防疏散',
    category: 'safety',
    severity: 'high',
    status: 'pending',
    assignee: '仓库管理员',
    department: '物流管理部',
    dueDate: '2025-07-28',
    createdDate: '2025-07-10',
    progress: 0,
    remarks: '已通知相关人员，等待执行'
  },
  {
    id: 'RECT-005',
    inspectionId: 'INSP-004',
    title: '维修仓库通风系统',
    description: '仓库通风系统部分风机故障，通风效果不佳',
    category: 'environment',
    severity: 'medium',
    status: 'pending',
    assignee: '机电维修组',
    department: '设备维护部',
    dueDate: '2025-07-10',
    createdDate: '2025-07-10',
    progress: 0,
    cost: 2500,
    remarks: '需要采购配件后进行维修'
  },
  {
    id: 'RECT-006',
    inspectionId: 'INSP-005',
    title: '加强配电室防雷措施',
    description: '配电室防雷设施需要加强，增加避雷针保护',
    category: 'safety',
    severity: 'high',
    status: 'completed',
    assignee: '电气班',
    department: '设备维护部',
    dueDate: '2025-07-25',
    createdDate: '2025-07-18',
    completedDate: '2025-07-24',
    progress: 100,
    cost: 3500,
    remarks: '已安装新的避雷系统，通过验收'
  }
];

// 原有图表数据保持不变 

// ==================== 新增接口定义 ====================

// 标准化接口相关
export interface ApiLog {
  id: string;
  timestamp: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  user: string;
  requestData?: any;
  responseStatus: number;
  responseTime: number;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  errorMessage?: string;
}

export interface DataSync {
  id: string;
  sourceSystem: string;
  targetSystem: string;
  dataType: string;
  syncTime: string;
  status: 'success' | 'failed' | 'pending';
  recordCount: number;
  duration: number;
  errorMessage?: string;
}

// 5G网络安全服务相关
export interface FiveGCard {
  id: string;
  cardNumber: string;
  iccid: string;
  status: 'active' | 'inactive' | 'suspended';
  activationDate: string;
  dataUsage: number;
  dataLimit: number;
  signalStrength: number;
  location: string;
  deviceId?: string;
  lastUpdate: string;
}

export interface SecurityAuth {
  id: string;
  userId: string;
  userName: string;
  authType: 'primary' | 'secondary' | 'biometric';
  authMethod: 'password' | 'sms' | 'email' | 'fingerprint' | 'face' | 'biometric';
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  ipAddress: string;
  deviceInfo: string;
  location: string;
}

export interface NetworkSecurity {
  id: string;
  type: 'firewall' | 'ids' | 'ips' | 'ddos';
  status: 'active' | 'inactive' | 'warning';
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  lastUpdate: string;
  blockedAttempts: number;
  totalThreats: number;
  description: string;
}

// 感知传输相关
export interface SensorData {
  id: string;
  sensorId: string;
  sensorType: 'temperature' | 'humidity' | 'pressure' | 'motion' | 'light' | 'sound';
  value: number;
  unit: string;
  timestamp: string;
  location: string;
  accuracy: number;
  batteryLevel: number;
  signalStrength: number;
}

export interface TransmissionLog {
  id: string;
  deviceId: string;
  dataType: string;
  transmissionTime: string;
  status: 'success' | 'failed' | 'retrying';
  dataSize: number;
  duration: number;
  retryCount: number;
  errorMessage?: string;
}

// ==================== 新增模拟数据 ====================

// 标准化接口日志数据

export const apiLogs: ApiLog[] = [
  // 设备状态查询
  { id: 'LOG-001', timestamp: getPastTimestamp(1), endpoint: '/api/devices/status', method: 'GET', user: 'admin', responseStatus: 200, responseTime: 45, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-002', timestamp: getPastTimestamp(2), endpoint: '/api/devices/status', method: 'GET', user: 'operator1', responseStatus: 200, responseTime: 52, ipAddress: '192.168.1.101', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-003', timestamp: getPastTimestamp(3), endpoint: '/api/devices/status', method: 'GET', user: 'operator2', responseStatus: 200, responseTime: 48, ipAddress: '192.168.1.102', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-004', timestamp: getPastTimestamp(4), endpoint: '/api/devices/status', method: 'GET', user: 'supervisor', responseStatus: 200, responseTime: 51, ipAddress: '192.168.1.103', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-005', timestamp: getPastTimestamp(5), endpoint: '/api/devices/status', method: 'GET', user: 'manager', responseStatus: 200, responseTime: 47, ipAddress: '192.168.1.104', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 命令发送
  { id: 'LOG-006', timestamp: getPastTimestamp(6), endpoint: '/api/commands/send', method: 'POST', user: 'admin', requestData: { command: 'restart_device', deviceId: 'dev001' }, responseStatus: 201, responseTime: 120, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-007', timestamp: getPastTimestamp(7), endpoint: '/api/commands/send', method: 'POST', user: 'operator1', requestData: { command: 'check_status', deviceId: 'dev002' }, responseStatus: 201, responseTime: 95, ipAddress: '192.168.1.101', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-008', timestamp: getPastTimestamp(8), endpoint: '/api/commands/send', method: 'POST', user: 'operator2', requestData: { command: 'update_config', deviceId: 'dev003' }, responseStatus: 201, responseTime: 156, ipAddress: '192.168.1.102', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-009', timestamp: getPastTimestamp(9), endpoint: '/api/commands/send', method: 'POST', user: 'supervisor', requestData: { command: 'emergency_stop', deviceId: 'dev004' }, responseStatus: 201, responseTime: 78, ipAddress: '192.168.1.103', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-010', timestamp: getPastTimestamp(10), endpoint: '/api/commands/send', method: 'POST', user: 'manager', requestData: { command: 'system_check', deviceId: 'dev005' }, responseStatus: 201, responseTime: 134, ipAddress: '192.168.1.104', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 视频流
  { id: 'LOG-011', timestamp: getPastTimestamp(11), endpoint: '/api/video/stream', method: 'GET', user: 'viewer1', responseStatus: 200, responseTime: 89, ipAddress: '192.168.1.105', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-012', timestamp: getPastTimestamp(12), endpoint: '/api/video/stream', method: 'GET', user: 'viewer2', responseStatus: 200, responseTime: 92, ipAddress: '192.168.1.106', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-013', timestamp: getPastTimestamp(13), endpoint: '/api/video/stream', method: 'GET', user: 'security1', responseStatus: 200, responseTime: 87, ipAddress: '192.168.1.107', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-014', timestamp: getPastTimestamp(14), endpoint: '/api/video/stream', method: 'GET', user: 'security2', responseStatus: 200, responseTime: 94, ipAddress: '192.168.1.108', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-015', timestamp: getPastTimestamp(15), endpoint: '/api/video/stream', method: 'GET', user: 'monitor1', responseStatus: 200, responseTime: 91, ipAddress: '192.168.1.109', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 认证相关
  { id: 'LOG-016', timestamp: getPastTimestamp(16), endpoint: '/api/auth/login', method: 'POST', user: 'user001', requestData: { username: 'user001', password: '****' }, responseStatus: 200, responseTime: 156, ipAddress: '192.168.1.110', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-017', timestamp: getPastTimestamp(17), endpoint: '/api/auth/login', method: 'POST', user: 'user002', requestData: { username: 'user002', password: '****' }, responseStatus: 200, responseTime: 142, ipAddress: '192.168.1.111', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-018', timestamp: getPastTimestamp(18), endpoint: '/api/auth/login', method: 'POST', user: 'user003', requestData: { username: 'user003', password: '****' }, responseStatus: 200, responseTime: 167, ipAddress: '192.168.1.112', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-019', timestamp: getPastTimestamp(19), endpoint: '/api/auth/login', method: 'POST', user: 'unknown', requestData: { username: 'test', password: '****' }, responseStatus: 401, responseTime: 23, ipAddress: '192.168.1.113', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: false, errorMessage: 'Invalid credentials' },
  { id: 'LOG-020', timestamp: getPastTimestamp(20), endpoint: '/api/auth/login', method: 'POST', user: 'unknown', requestData: { username: 'admin', password: '****' }, responseStatus: 401, responseTime: 25, ipAddress: '192.168.1.114', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: false, errorMessage: 'Invalid credentials' },
  
  // 数据同步
  { id: 'LOG-021', timestamp: getPastTimestamp(21), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'full', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 1567, ipAddress: '192.168.1.115', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-022', timestamp: getPastTimestamp(22), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'incremental', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 234, ipAddress: '192.168.1.116', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-023', timestamp: getPastTimestamp(23), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'backup', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 892, ipAddress: '192.168.1.117', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-024', timestamp: getPastTimestamp(24), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'realtime', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 45, ipAddress: '192.168.1.118', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-025', timestamp: getPastTimestamp(25), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'batch', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 1234, ipAddress: '192.168.1.119', userAgent: 'System-Sync-Service/1.0', success: true },
  
  // 传感器数据
  { id: 'LOG-026', timestamp: getPastTimestamp(26), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'TEMP-001', value: 22.5 }, responseStatus: 200, responseTime: 67, ipAddress: '192.168.1.120', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-027', timestamp: getPastTimestamp(27), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'HUM-001', value: 65.2 }, responseStatus: 200, responseTime: 71, ipAddress: '192.168.1.121', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-028', timestamp: getPastTimestamp(28), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'PRESS-001', value: 1013.25 }, responseStatus: 200, responseTime: 69, ipAddress: '192.168.1.122', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-029', timestamp: getPastTimestamp(29), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'MOTION-001', value: 1 }, responseStatus: 200, responseTime: 73, ipAddress: '192.168.1.123', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-030', timestamp: getPastTimestamp(30), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'LIGHT-001', value: 450 }, responseStatus: 200, responseTime: 68, ipAddress: '192.168.1.124', userAgent: 'Sensor-System/2.1', success: true },
  
  // 告警系统
  { id: 'LOG-031', timestamp: getPastTimestamp(31), endpoint: '/api/alerts/create', method: 'POST', user: 'alert_system', requestData: { type: 'temperature_high', location: 'A区车间', severity: 'medium' }, responseStatus: 201, responseTime: 89, ipAddress: '192.168.1.125', userAgent: 'Alert-System/1.5', success: true },
  { id: 'LOG-032', timestamp: getPastTimestamp(32), endpoint: '/api/alerts/create', method: 'POST', user: 'alert_system', requestData: { type: 'device_offline', location: 'B区仓库', severity: 'high' }, responseStatus: 201, responseTime: 92, ipAddress: '192.168.1.126', userAgent: 'Alert-System/1.5', success: true },
  { id: 'LOG-033', timestamp: getPastTimestamp(33), endpoint: '/api/alerts/create', method: 'POST', user: 'alert_system', requestData: { type: 'security_breach', location: 'C区入口', severity: 'critical' }, responseStatus: 201, responseTime: 95, ipAddress: '192.168.1.127', userAgent: 'Alert-System/1.5', success: true },
  { id: 'LOG-034', timestamp: getPastTimestamp(34), endpoint: '/api/alerts/create', method: 'POST', user: 'alert_system', requestData: { type: 'maintenance_due', location: 'D区设备', severity: 'low' }, responseStatus: 201, responseTime: 87, ipAddress: '192.168.1.128', userAgent: 'Alert-System/1.5', success: true },
  { id: 'LOG-035', timestamp: getPastTimestamp(35), endpoint: '/api/alerts/create', method: 'POST', user: 'alert_system', requestData: { type: 'power_consumption', location: 'E区配电室', severity: 'medium' }, responseStatus: 201, responseTime: 91, ipAddress: '192.168.1.129', userAgent: 'Alert-System/1.5', success: true },
  
  // 报表生成
  { id: 'LOG-036', timestamp: getPastTimestamp(36), endpoint: '/api/reports/generate', method: 'POST', user: 'report_system', requestData: { type: 'daily_summary', date: '2025-01-27' }, responseStatus: 200, responseTime: 2345, ipAddress: '192.168.1.130', userAgent: 'Report-System/3.2', success: true },
  { id: 'LOG-037', timestamp: getPastTimestamp(37), endpoint: '/api/reports/generate', method: 'POST', user: 'report_system', requestData: { type: 'weekly_analysis', date: '2025-01-27' }, responseStatus: 200, responseTime: 4567, ipAddress: '192.168.1.131', userAgent: 'Report-System/3.2', success: true },
  { id: 'LOG-038', timestamp: getPastTimestamp(38), endpoint: '/api/reports/generate', method: 'POST', user: 'report_system', requestData: { type: 'monthly_report', date: '2025-01-27' }, responseStatus: 200, responseTime: 7890, ipAddress: '192.168.1.132', userAgent: 'Report-System/3.2', success: true },
  { id: 'LOG-039', timestamp: getPastTimestamp(39), endpoint: '/api/reports/generate', method: 'POST', user: 'report_system', requestData: { type: 'performance_metrics', date: '2025-01-27' }, responseStatus: 200, responseTime: 3456, ipAddress: '192.168.1.133', userAgent: 'Report-System/3.2', success: true },
  { id: 'LOG-040', timestamp: getPastTimestamp(40), endpoint: '/api/reports/generate', method: 'POST', user: 'report_system', requestData: { type: 'security_audit', date: '2025-01-27' }, responseStatus: 200, responseTime: 5678, ipAddress: '192.168.1.134', userAgent: 'Report-System/3.2', success: true },
  
  // 系统配置
  { id: 'LOG-041', timestamp: getPastTimestamp(41), endpoint: '/api/config/update', method: 'PUT', user: 'admin', requestData: { setting: 'auto_backup', value: 'enabled' }, responseStatus: 200, responseTime: 123, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-042', timestamp: getPastTimestamp(42), endpoint: '/api/config/update', method: 'PUT', user: 'admin', requestData: { setting: 'alert_threshold', value: '75' }, responseStatus: 200, responseTime: 98, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-043', timestamp: getPastTimestamp(43), endpoint: '/api/config/update', method: 'PUT', user: 'admin', requestData: { setting: 'sync_interval', value: '300' }, responseStatus: 200, responseTime: 87, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-044', timestamp: getPastTimestamp(44), endpoint: '/api/config/update', method: 'PUT', user: 'admin', requestData: { setting: 'security_level', value: 'high' }, responseStatus: 200, responseTime: 112, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-045', timestamp: getPastTimestamp(45), endpoint: '/api/config/update', method: 'PUT', user: 'admin', requestData: { setting: 'backup_retention', value: '30' }, responseStatus: 200, responseTime: 95, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 用户管理
  { id: 'LOG-046', timestamp: getPastTimestamp(46), endpoint: '/api/users/create', method: 'POST', user: 'admin', requestData: { username: 'newuser', role: 'operator' }, responseStatus: 201, responseTime: 234, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-047', timestamp: getPastTimestamp(47), endpoint: '/api/users/update', method: 'PUT', user: 'admin', requestData: { userId: 'user001', role: 'supervisor' }, responseStatus: 200, responseTime: 156, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-048', timestamp: getPastTimestamp(48), endpoint: '/api/users/delete', method: 'DELETE', user: 'admin', requestData: { userId: 'user999' }, responseStatus: 200, responseTime: 89, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-049', timestamp: getPastTimestamp(49), endpoint: '/api/users/list', method: 'GET', user: 'admin', responseStatus: 200, responseTime: 67, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-050', timestamp: getPastTimestamp(50), endpoint: '/api/users/permissions', method: 'GET', user: 'admin', responseStatus: 200, responseTime: 78, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 设备管理扩展
  { id: 'LOG-051', timestamp: getPastTimestamp(51), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev031', type: 'camera', location: 'G区监控点1' }, responseStatus: 201, responseTime: 189, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-052', timestamp: getPastTimestamp(52), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev032', type: 'sensor', location: 'G区监控点2' }, responseStatus: 201, responseTime: 167, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-053', timestamp: getPastTimestamp(53), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev033', type: 'phone', location: 'G区监控点3' }, responseStatus: 201, responseTime: 145, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-054', timestamp: getPastTimestamp(54), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev034', type: 'controller', location: 'G区监控点4' }, responseStatus: 201, responseTime: 178, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-055', timestamp: getPastTimestamp(55), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev035', type: 'camera', location: 'G区监控点5' }, responseStatus: 201, responseTime: 156, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // H区设备
  { id: 'LOG-056', timestamp: getPastTimestamp(56), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev036', type: 'sensor', location: 'H区监控点1' }, responseStatus: 201, responseTime: 134, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-057', timestamp: getPastTimestamp(57), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev037', type: 'phone', location: 'H区监控点2' }, responseStatus: 201, responseTime: 123, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-058', timestamp: getPastTimestamp(58), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev038', type: 'camera', location: 'H区监控点3' }, responseStatus: 201, responseTime: 167, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-059', timestamp: getPastTimestamp(59), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev039', type: 'controller', location: 'H区监控点4' }, responseStatus: 201, responseTime: 189, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-060', timestamp: getPastTimestamp(60), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev040', type: 'sensor', location: 'H区监控点5' }, responseStatus: 201, responseTime: 145, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // I区设备
  { id: 'LOG-061', timestamp: getPastTimestamp(61), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev041', type: 'camera', location: 'I区监控点1' }, responseStatus: 201, responseTime: 178, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-062', timestamp: getPastTimestamp(62), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev042', type: 'phone', location: 'I区监控点2' }, responseStatus: 201, responseTime: 156, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-063', timestamp: getPastTimestamp(63), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev043', type: 'sensor', location: 'I区监控点3' }, responseStatus: 201, responseTime: 134, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-064', timestamp: getPastTimestamp(64), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev044', type: 'controller', location: 'I区监控点4' }, responseStatus: 201, responseTime: 167, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-065', timestamp: getPastTimestamp(65), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev045', type: 'camera', location: 'I区监控点5' }, responseStatus: 201, responseTime: 189, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // J区设备
  { id: 'LOG-066', timestamp: getPastTimestamp(66), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev046', type: 'sensor', location: 'J区监控点1' }, responseStatus: 201, responseTime: 145, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-067', timestamp: getPastTimestamp(67), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev047', type: 'phone', location: 'J区监控点2' }, responseStatus: 201, responseTime: 123, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-068', timestamp: getPastTimestamp(68), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev048', type: 'camera', location: 'J区监控点3' }, responseStatus: 201, responseTime: 178, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-069', timestamp: getPastTimestamp(69), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev049', type: 'controller', location: 'J区监控点4' }, responseStatus: 201, responseTime: 156, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-070', timestamp: getPastTimestamp(70), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev050', type: 'sensor', location: 'J区监控点5' }, responseStatus: 201, responseTime: 134, ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 设备状态查询扩展
  { id: 'LOG-071', timestamp: getPastTimestamp(71), endpoint: '/api/devices/status', method: 'GET', user: 'operator4', responseStatus: 200, responseTime: 52, ipAddress: '192.168.1.135', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-072', timestamp: getPastTimestamp(72), endpoint: '/api/devices/status', method: 'GET', user: 'operator5', responseStatus: 200, responseTime: 48, ipAddress: '192.168.1.136', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-073', timestamp: getPastTimestamp(73), endpoint: '/api/devices/status', method: 'GET', user: 'operator6', responseStatus: 200, responseTime: 51, ipAddress: '192.168.1.137', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-074', timestamp: getPastTimestamp(74), endpoint: '/api/devices/status', method: 'GET', user: 'operator7', responseStatus: 200, responseTime: 47, ipAddress: '192.168.1.138', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-075', timestamp: getPastTimestamp(75), endpoint: '/api/devices/status', method: 'GET', user: 'operator8', responseStatus: 200, responseTime: 49, ipAddress: '192.168.1.139', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 命令发送扩展
  { id: 'LOG-076', timestamp: getPastTimestamp(76), endpoint: '/api/commands/send', method: 'POST', user: 'operator4', requestData: { command: 'check_network', deviceId: 'dev031' }, responseStatus: 201, responseTime: 95, ipAddress: '192.168.1.135', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-077', timestamp: getPastTimestamp(77), endpoint: '/api/commands/send', method: 'POST', user: 'operator5', requestData: { command: 'update_firmware', deviceId: 'dev032' }, responseStatus: 201, responseTime: 156, ipAddress: '192.168.1.136', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-078', timestamp: getPastTimestamp(78), endpoint: '/api/commands/send', method: 'POST', user: 'operator6', requestData: { command: 'calibrate_sensor', deviceId: 'dev033' }, responseStatus: 201, responseTime: 134, ipAddress: '192.168.1.137', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-079', timestamp: getPastTimestamp(79), endpoint: '/api/commands/send', method: 'POST', user: 'operator7', requestData: { command: 'test_connection', deviceId: 'dev034' }, responseStatus: 201, responseTime: 78, ipAddress: '192.168.1.138', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-080', timestamp: getPastTimestamp(80), endpoint: '/api/commands/send', method: 'POST', user: 'operator8', requestData: { command: 'reset_device', deviceId: 'dev035' }, responseStatus: 201, responseTime: 112, ipAddress: '192.168.1.139', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 视频流扩展
  { id: 'LOG-081', timestamp: getPastTimestamp(81), endpoint: '/api/video/stream', method: 'GET', user: 'viewer3', responseStatus: 200, responseTime: 89, ipAddress: '192.168.1.140', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-082', timestamp: getPastTimestamp(82), endpoint: '/api/video/stream', method: 'GET', user: 'viewer4', responseStatus: 200, responseTime: 92, ipAddress: '192.168.1.141', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-083', timestamp: getPastTimestamp(83), endpoint: '/api/video/stream', method: 'GET', user: 'viewer5', responseStatus: 200, responseTime: 87, ipAddress: '192.168.1.142', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-084', timestamp: getPastTimestamp(84), endpoint: '/api/video/stream', method: 'GET', user: 'viewer6', responseStatus: 200, responseTime: 94, ipAddress: '192.168.1.143', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-085', timestamp: getPastTimestamp(85), endpoint: '/api/video/stream', method: 'GET', user: 'viewer7', responseStatus: 200, responseTime: 91, ipAddress: '192.168.1.144', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 认证扩展
  { id: 'LOG-086', timestamp: getPastTimestamp(86), endpoint: '/api/auth/login', method: 'POST', user: 'user004', requestData: { username: 'user004', password: '****' }, responseStatus: 200, responseTime: 156, ipAddress: '192.168.1.145', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-087', timestamp: getPastTimestamp(87), endpoint: '/api/auth/login', method: 'POST', user: 'user005', requestData: { username: 'user005', password: '****' }, responseStatus: 200, responseTime: 142, ipAddress: '192.168.1.146', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-088', timestamp: getPastTimestamp(88), endpoint: '/api/auth/login', method: 'POST', user: 'user006', requestData: { username: 'user006', password: '****' }, responseStatus: 200, responseTime: 167, ipAddress: '192.168.1.147', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-089', timestamp: getPastTimestamp(89), endpoint: '/api/auth/login', method: 'POST', user: 'user007', requestData: { username: 'user007', password: '****' }, responseStatus: 200, responseTime: 134, ipAddress: '192.168.1.148', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-090', timestamp: getPastTimestamp(90), endpoint: '/api/auth/login', method: 'POST', user: 'user008', requestData: { username: 'user008', password: '****' }, responseStatus: 200, responseTime: 145, ipAddress: '192.168.1.149', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 数据同步扩展
  { id: 'LOG-091', timestamp: getPastTimestamp(91), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'realtime', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 45, ipAddress: '192.168.1.150', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-092', timestamp: getPastTimestamp(92), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'batch', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 1234, ipAddress: '192.168.1.151', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-093', timestamp: getPastTimestamp(93), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'incremental', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 234, ipAddress: '192.168.1.152', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-094', timestamp: getPastTimestamp(94), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'backup', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 892, ipAddress: '192.168.1.153', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-095', timestamp: getPastTimestamp(95), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'full', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 1567, ipAddress: '192.168.1.154', userAgent: 'System-Sync-Service/1.0', success: true },
  
  // 传感器数据扩展
  { id: 'LOG-096', timestamp: getPastTimestamp(96), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'TEMP-G-001', value: 23.1 }, responseStatus: 200, responseTime: 67, ipAddress: '192.168.1.155', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-097', timestamp: getPastTimestamp(97), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'HUM-G-001', value: 68.5 }, responseStatus: 200, responseTime: 71, ipAddress: '192.168.1.156', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-098', timestamp: getPastTimestamp(98), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'PRESS-G-001', value: 1014.78 }, responseStatus: 200, responseTime: 69, ipAddress: '192.168.1.157', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-099', timestamp: getPastTimestamp(99), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'MOTION-G-001', value: 0 }, responseStatus: 200, responseTime: 73, ipAddress: '192.168.1.158', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-100', timestamp: getPastTimestamp(100), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'LIGHT-G-001', value: 380 }, responseStatus: 200, responseTime: 68, ipAddress: '192.168.1.159', userAgent: 'Sensor-System/2.1', success: true },
  
  // 继续添加更多API日志数据 (101-200)
  { id: 'LOG-101', timestamp: getPastTimestamp(101), endpoint: '/api/devices/status', method: 'GET', user: 'operator9', responseStatus: 200, responseTime: 45, ipAddress: '192.168.1.180', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-102', timestamp: getPastTimestamp(102), endpoint: '/api/devices/status', method: 'GET', user: 'operator10', responseStatus: 200, responseTime: 52, ipAddress: '192.168.1.181', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-103', timestamp: getPastTimestamp(103), endpoint: '/api/devices/status', method: 'GET', user: 'operator11', responseStatus: 200, responseTime: 48, ipAddress: '192.168.1.182', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-104', timestamp: getPastTimestamp(104), endpoint: '/api/devices/status', method: 'GET', user: 'operator12', responseStatus: 200, responseTime: 51, ipAddress: '192.168.1.183', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-105', timestamp: getPastTimestamp(105), endpoint: '/api/devices/status', method: 'GET', user: 'operator13', responseStatus: 200, responseTime: 47, ipAddress: '192.168.1.184', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 命令发送扩展 (106-150)
  { id: 'LOG-106', timestamp: getPastTimestamp(106), endpoint: '/api/commands/send', method: 'POST', user: 'operator9', requestData: { command: 'check_network', deviceId: 'dev036' }, responseStatus: 201, responseTime: 89, ipAddress: '192.168.1.180', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-107', timestamp: getPastTimestamp(107), endpoint: '/api/commands/send', method: 'POST', user: 'operator10', requestData: { command: 'update_firmware', deviceId: 'dev037' }, responseStatus: 201, responseTime: 145, ipAddress: '192.168.1.181', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-108', timestamp: getPastTimestamp(108), endpoint: '/api/commands/send', method: 'POST', user: 'operator11', requestData: { command: 'calibrate_sensor', deviceId: 'dev038' }, responseStatus: 201, responseTime: 123, ipAddress: '192.168.1.182', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-109', timestamp: getPastTimestamp(109), endpoint: '/api/commands/send', method: 'POST', user: 'operator12', requestData: { command: 'test_connection', deviceId: 'dev039' }, responseStatus: 201, responseTime: 67, ipAddress: '192.168.1.183', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-110', timestamp: getPastTimestamp(110), endpoint: '/api/commands/send', method: 'POST', user: 'operator13', requestData: { command: 'reset_device', deviceId: 'dev040' }, responseStatus: 201, responseTime: 98, ipAddress: '192.168.1.184', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 视频流扩展 (111-150)
  { id: 'LOG-111', timestamp: getPastTimestamp(111), endpoint: '/api/video/stream', method: 'GET', user: 'viewer8', responseStatus: 200, responseTime: 85, ipAddress: '192.168.1.185', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-112', timestamp: getPastTimestamp(112), endpoint: '/api/video/stream', method: 'GET', user: 'viewer9', responseStatus: 200, responseTime: 92, ipAddress: '192.168.1.186', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-113', timestamp: getPastTimestamp(113), endpoint: '/api/video/stream', method: 'GET', user: 'viewer10', responseStatus: 200, responseTime: 88, ipAddress: '192.168.1.187', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-114', timestamp: getPastTimestamp(114), endpoint: '/api/video/stream', method: 'GET', user: 'viewer11', responseStatus: 200, responseTime: 95, ipAddress: '192.168.1.188', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-115', timestamp: getPastTimestamp(115), endpoint: '/api/video/stream', method: 'GET', user: 'viewer12', responseStatus: 200, responseTime: 91, ipAddress: '192.168.1.189', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 认证扩展 (116-150)
  { id: 'LOG-116', timestamp: getPastTimestamp(116), endpoint: '/api/auth/login', method: 'POST', user: 'user029', requestData: { username: 'user029', password: '****' }, responseStatus: 200, responseTime: 134, ipAddress: '192.168.1.190', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-117', timestamp: getPastTimestamp(117), endpoint: '/api/auth/login', method: 'POST', user: 'user030', requestData: { username: 'user030', password: '****' }, responseStatus: 200, responseTime: 156, ipAddress: '192.168.1.191', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-118', timestamp: getPastTimestamp(118), endpoint: '/api/auth/login', method: 'POST', user: 'user031', requestData: { username: 'user031', password: '****' }, responseStatus: 200, responseTime: 142, ipAddress: '192.168.1.192', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-119', timestamp: getPastTimestamp(119), endpoint: '/api/auth/login', method: 'POST', user: 'user032', requestData: { username: 'user032', password: '****' }, responseStatus: 200, responseTime: 167, ipAddress: '192.168.1.193', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-120', timestamp: getPastTimestamp(120), endpoint: '/api/auth/login', method: 'POST', user: 'user033', requestData: { username: 'user033', password: '****' }, responseStatus: 200, responseTime: 145, ipAddress: '192.168.1.194', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 数据同步扩展 (121-150)
  { id: 'LOG-121', timestamp: getPastTimestamp(121), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'realtime', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 42, ipAddress: '192.168.1.195', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-122', timestamp: getPastTimestamp(122), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'batch', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 1189, ipAddress: '192.168.1.196', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-123', timestamp: getPastTimestamp(123), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'incremental', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 223, ipAddress: '192.168.1.197', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-124', timestamp: getPastTimestamp(124), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'backup', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 856, ipAddress: '192.168.1.198', userAgent: 'System-Sync-Service/1.0', success: true },
  { id: 'LOG-125', timestamp: getPastTimestamp(125), endpoint: '/api/data/sync', method: 'POST', user: 'system', requestData: { syncType: 'full', timestamp: getCurrentTimestamp() }, responseStatus: 200, responseTime: 1498, ipAddress: '192.168.1.199', userAgent: 'System-Sync-Service/1.0', success: true },
  
  // 传感器数据扩展 (126-150)
  { id: 'LOG-126', timestamp: getPastTimestamp(126), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'TEMP-H-001', value: 21.8 }, responseStatus: 200, responseTime: 65, ipAddress: '192.168.1.200', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-127', timestamp: getPastTimestamp(127), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'HUM-H-001', value: 62.3 }, responseStatus: 200, responseTime: 69, ipAddress: '192.168.1.201', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-128', timestamp: getPastTimestamp(128), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'PRESS-H-001', value: 1013.45 }, responseStatus: 200, responseTime: 71, ipAddress: '192.168.1.202', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-129', timestamp: getPastTimestamp(129), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'MOTION-H-001', value: 1 }, responseStatus: 200, responseTime: 67, ipAddress: '192.168.1.203', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-130', timestamp: getPastTimestamp(130), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'LIGHT-H-001', value: 420 }, responseStatus: 200, responseTime: 70, ipAddress: '192.168.1.204', userAgent: 'Sensor-System/2.1', success: true },
  
  // 继续添加更多数据 (131-200)
  { id: 'LOG-131', timestamp: getPastTimestamp(131), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'TEMP-I-001', value: 24.2 }, responseStatus: 200, responseTime: 68, ipAddress: '192.168.1.205', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-132', timestamp: getPastTimestamp(132), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'HUM-I-001', value: 55.8 }, responseStatus: 200, responseTime: 72, ipAddress: '192.168.1.206', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-133', timestamp: getPastTimestamp(133), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'PRESS-I-001', value: 1012.89 }, responseStatus: 200, responseTime: 66, ipAddress: '192.168.1.207', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-134', timestamp: getPastTimestamp(134), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'MOTION-I-001', value: 1 }, responseStatus: 200, responseTime: 64, ipAddress: '192.168.1.208', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-135', timestamp: getPastTimestamp(135), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'LIGHT-I-001', value: 580 }, responseStatus: 200, responseTime: 69, ipAddress: '192.168.1.209', userAgent: 'Sensor-System/2.1', success: true },
  
  // 继续添加更多数据 (136-200)
  { id: 'LOG-136', timestamp: getPastTimestamp(136), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'TEMP-J-001', value: 22.7 }, responseStatus: 200, responseTime: 67, ipAddress: '192.168.1.210', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-137', timestamp: getPastTimestamp(137), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'HUM-J-001', value: 59.4 }, responseStatus: 200, responseTime: 71, ipAddress: '192.168.1.211', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-138', timestamp: getPastTimestamp(138), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'PRESS-J-001', value: 1014.23 }, responseStatus: 200, responseTime: 65, ipAddress: '192.168.1.212', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-139', timestamp: getPastTimestamp(139), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'MOTION-J-001', value: 0 }, responseStatus: 200, responseTime: 63, ipAddress: '192.168.1.213', userAgent: 'Sensor-System/2.1', success: true },
  { id: 'LOG-140', timestamp: getPastTimestamp(140), endpoint: '/api/sensors/data', method: 'POST', user: 'sensor_system', requestData: { sensorId: 'LIGHT-J-001', value: 650 }, responseStatus: 200, responseTime: 68, ipAddress: '192.168.1.214', userAgent: 'Sensor-System/2.1', success: true },
  
  // 继续添加更多数据 (141-200)
  { id: 'LOG-141', timestamp: getPastTimestamp(141), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev051', type: 'camera', location: 'K区监控点1' }, responseStatus: 201, responseTime: 178, ipAddress: '192.168.1.215', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-142', timestamp: getPastTimestamp(142), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev052', type: 'sensor', location: 'K区监控点2' }, responseStatus: 201, responseTime: 156, ipAddress: '192.168.1.216', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-143', timestamp: getPastTimestamp(143), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev053', type: 'phone', location: 'K区监控点3' }, responseStatus: 201, responseTime: 134, ipAddress: '192.168.1.217', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-144', timestamp: getPastTimestamp(144), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev054', type: 'controller', location: 'K区监控点4' }, responseStatus: 201, responseTime: 167, ipAddress: '192.168.1.218', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-145', timestamp: getPastTimestamp(145), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev055', type: 'camera', location: 'K区监控点5' }, responseStatus: 201, responseTime: 189, ipAddress: '192.168.1.219', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  
  // 继续添加更多数据 (146-200)
  { id: 'LOG-146', timestamp: getPastTimestamp(146), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev056', type: 'sensor', location: 'L区监控点1' }, responseStatus: 201, responseTime: 145, ipAddress: '192.168.1.220', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-147', timestamp: getPastTimestamp(147), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev057', type: 'phone', location: 'L区监控点2' }, responseStatus: 201, responseTime: 123, ipAddress: '192.168.1.221', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-148', timestamp: getPastTimestamp(148), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev058', type: 'camera', location: 'L区监控点3' }, responseStatus: 201, responseTime: 178, ipAddress: '192.168.1.222', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-149', timestamp: getPastTimestamp(149), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev059', type: 'controller', location: 'L区监控点4' }, responseStatus: 201, responseTime: 156, ipAddress: '192.168.1.223', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true },
  { id: 'LOG-150', timestamp: getPastTimestamp(150), endpoint: '/api/devices/register', method: 'POST', user: 'admin', requestData: { deviceId: 'dev060', type: 'sensor', location: 'L区监控点5' }, responseStatus: 201, responseTime: 134, ipAddress: '192.168.1.224', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', success: true }
];

// 数据同步记录
export const dataSyncs: DataSync[] = [
  // ERP系统同步
  { id: 'SYNC-001', sourceSystem: 'ERP系统', targetSystem: '融合通信平台', dataType: '用户信息', syncTime: getPastTimestamp(30), status: 'success', recordCount: 156, duration: 45 },
  { id: 'SYNC-002', sourceSystem: 'ERP系统', targetSystem: '融合通信平台', dataType: '部门信息', syncTime: getPastTimestamp(29), status: 'success', recordCount: 23, duration: 12 },
  { id: 'SYNC-003', sourceSystem: 'ERP系统', targetSystem: '融合通信平台', dataType: '权限配置', syncTime: getPastTimestamp(28), status: 'success', recordCount: 89, duration: 34 },
  { id: 'SYNC-004', sourceSystem: 'ERP系统', targetSystem: '融合通信平台', dataType: '组织架构', syncTime: getPastTimestamp(27), status: 'success', recordCount: 45, duration: 18 },
  { id: 'SYNC-005', sourceSystem: 'ERP系统', targetSystem: '融合通信平台', dataType: '工作流程', syncTime: getPastTimestamp(26), status: 'success', recordCount: 67, duration: 28 },
  
  // 设备管理系统同步
  { id: 'SYNC-006', sourceSystem: '设备管理系统', targetSystem: '融合通信平台', dataType: '设备状态', syncTime: getPastTimestamp(25), status: 'success', recordCount: 89, duration: 23 },
  { id: 'SYNC-007', sourceSystem: '设备管理系统', targetSystem: '融合通信平台', dataType: '设备配置', syncTime: getPastTimestamp(24), status: 'success', recordCount: 123, duration: 41 },
  { id: 'SYNC-008', sourceSystem: '设备管理系统', targetSystem: '融合通信平台', dataType: '维护记录', syncTime: getPastTimestamp(23), status: 'success', recordCount: 234, duration: 67 },
  { id: 'SYNC-009', sourceSystem: '设备管理系统', targetSystem: '融合通信平台', dataType: '故障信息', syncTime: getPastTimestamp(22), status: 'success', recordCount: 45, duration: 15 },
  { id: 'SYNC-010', sourceSystem: '设备管理系统', targetSystem: '融合通信平台', dataType: '设备位置', syncTime: getPastTimestamp(21), status: 'success', recordCount: 78, duration: 22 },
  
  // 数据分析系统同步
  { id: 'SYNC-011', sourceSystem: '融合通信平台', targetSystem: '数据分析系统', dataType: '实时数据', syncTime: getPastTimestamp(20), status: 'success', recordCount: 234, duration: 67 },
  { id: 'SYNC-012', sourceSystem: '融合通信平台', targetSystem: '数据分析系统', dataType: '历史数据', syncTime: getPastTimestamp(19), status: 'success', recordCount: 1567, duration: 234 },
  { id: 'SYNC-013', sourceSystem: '融合通信平台', targetSystem: '数据分析系统', dataType: '性能指标', syncTime: getPastTimestamp(18), status: 'success', recordCount: 89, duration: 34 },
  { id: 'SYNC-014', sourceSystem: '融合通信平台', targetSystem: '数据分析系统', dataType: '使用统计', syncTime: getPastTimestamp(17), status: 'success', recordCount: 456, duration: 123 },
  { id: 'SYNC-015', sourceSystem: '融合通信平台', targetSystem: '数据分析系统', dataType: '趋势数据', syncTime: getPastTimestamp(16), status: 'success', recordCount: 789, duration: 189 },
  
  // 安全监控系统同步
  { id: 'SYNC-016', sourceSystem: '安全监控系统', targetSystem: '融合通信平台', dataType: '告警信息', syncTime: getPastTimestamp(15), status: 'failed', recordCount: 0, duration: 0, errorMessage: '网络连接超时' },
  { id: 'SYNC-017', sourceSystem: '安全监控系统', targetSystem: '融合通信平台', dataType: '安全事件', syncTime: getPastTimestamp(14), status: 'success', recordCount: 23, duration: 12 },
  { id: 'SYNC-018', sourceSystem: '安全监控系统', targetSystem: '融合通信平台', dataType: '访问日志', syncTime: getPastTimestamp(13), status: 'success', recordCount: 345, duration: 78 },
  { id: 'SYNC-019', sourceSystem: '安全监控系统', targetSystem: '融合通信平台', dataType: '权限变更', syncTime: getPastTimestamp(12), status: 'success', recordCount: 12, duration: 8 },
  { id: 'SYNC-020', sourceSystem: '安全监控系统', targetSystem: '融合通信平台', dataType: '系统日志', syncTime: getPastTimestamp(11), status: 'success', recordCount: 567, duration: 145 },
  
  // 财务系统同步
  { id: 'SYNC-021', sourceSystem: '财务系统', targetSystem: '融合通信平台', dataType: '成本统计', syncTime: getPastTimestamp(10), status: 'success', recordCount: 89, duration: 34 },
  { id: 'SYNC-022', sourceSystem: '财务系统', targetSystem: '融合通信平台', dataType: '预算信息', syncTime: getPastTimestamp(9), status: 'success', recordCount: 45, duration: 18 },
  { id: 'SYNC-023', sourceSystem: '财务系统', targetSystem: '融合通信平台', dataType: '费用记录', syncTime: getPastTimestamp(8), status: 'success', recordCount: 234, duration: 67 },
  { id: 'SYNC-024', sourceSystem: '财务系统', targetSystem: '融合通信平台', dataType: '审批流程', syncTime: getPastTimestamp(7), status: 'success', recordCount: 67, duration: 23 },
  { id: 'SYNC-025', sourceSystem: '财务系统', targetSystem: '融合通信平台', dataType: '报表数据', syncTime: getPastTimestamp(6), status: 'success', recordCount: 123, duration: 45 },
  
  // 人力资源系统同步
  { id: 'SYNC-026', sourceSystem: '人力资源系统', targetSystem: '融合通信平台', dataType: '员工信息', syncTime: getPastTimestamp(5), status: 'success', recordCount: 456, duration: 89 },
  { id: 'SYNC-027', sourceSystem: '人力资源系统', targetSystem: '融合通信平台', dataType: '考勤数据', syncTime: getPastTimestamp(4), status: 'success', recordCount: 789, duration: 156 },
  { id: 'SYNC-028', sourceSystem: '人力资源系统', targetSystem: '融合通信平台', dataType: '培训记录', syncTime: getPastTimestamp(3), status: 'success', recordCount: 234, duration: 67 },
  { id: 'SYNC-029', sourceSystem: '人力资源系统', targetSystem: '融合通信平台', dataType: '绩效评估', syncTime: getPastTimestamp(2), status: 'success', recordCount: 123, duration: 45 },
  { id: 'SYNC-030', sourceSystem: '人力资源系统', targetSystem: '融合通信平台', dataType: '薪资信息', syncTime: getPastTimestamp(1), status: 'success', recordCount: 345, duration: 78 },
  
  // G区系统数据同步
  { id: 'SYNC-031', sourceSystem: '监控系统', targetSystem: '数据分析系统', dataType: '实时监控数据', syncTime: getPastTimestamp(35), status: 'success', recordCount: 456, duration: 189 },
  { id: 'SYNC-032', sourceSystem: '传感器系统', targetSystem: '监控系统', dataType: '传感器数据', syncTime: getPastTimestamp(36), status: 'success', recordCount: 234, duration: 145 },
  { id: 'SYNC-033', sourceSystem: '报警系统', targetSystem: '应急响应系统', dataType: '报警信息', syncTime: getPastTimestamp(37), status: 'success', recordCount: 12, duration: 23 },
  { id: 'SYNC-034', sourceSystem: '通信系统', targetSystem: '调度系统', dataType: '通信记录', syncTime: getPastTimestamp(38), status: 'success', recordCount: 89, duration: 67 },
  { id: 'SYNC-035', sourceSystem: '调度系统', targetSystem: '监控系统', dataType: '调度指令', syncTime: getPastTimestamp(39), status: 'success', recordCount: 34, duration: 45 },
  
  // H区系统数据同步
  { id: 'SYNC-036', sourceSystem: '仓储管理系统', targetSystem: '物流系统', dataType: '仓储数据', syncTime: getPastTimestamp(40), status: 'success', recordCount: 567, duration: 234 },
  { id: 'SYNC-037', sourceSystem: '物流系统', targetSystem: '配送系统', dataType: '物流信息', syncTime: getPastTimestamp(41), status: 'success', recordCount: 123, duration: 89 },
  { id: 'SYNC-038', sourceSystem: '配送系统', targetSystem: '客户系统', dataType: '配送状态', syncTime: getPastTimestamp(42), status: 'success', recordCount: 78, duration: 56 },
  { id: 'SYNC-039', sourceSystem: '客户系统', targetSystem: 'CRM系统', dataType: '客户反馈', syncTime: getPastTimestamp(43), status: 'success', recordCount: 45, duration: 34 },
  { id: 'SYNC-040', sourceSystem: 'CRM系统', targetSystem: '分析系统', dataType: '客户数据', syncTime: getPastTimestamp(44), status: 'success', recordCount: 234, duration: 178 },
  
  // I区系统数据同步
  { id: 'SYNC-041', sourceSystem: '办公系统', targetSystem: '人事系统', dataType: '员工信息', syncTime: getPastTimestamp(45), status: 'success', recordCount: 89, duration: 67 },
  { id: 'SYNC-042', sourceSystem: '人事系统', targetSystem: '考勤系统', dataType: '考勤数据', syncTime: getPastTimestamp(46), status: 'success', recordCount: 456, duration: 123 },
  { id: 'SYNC-043', sourceSystem: '考勤系统', targetSystem: '薪资系统', dataType: '工时统计', syncTime: getPastTimestamp(47), status: 'success', recordCount: 234, duration: 89 },
  { id: 'SYNC-044', sourceSystem: '薪资系统', targetSystem: '财务系统', dataType: '薪资数据', syncTime: getPastTimestamp(48), status: 'success', recordCount: 123, duration: 67 },
  { id: 'SYNC-045', sourceSystem: '财务系统', targetSystem: 'ERP系统', dataType: '财务数据', syncTime: getPastTimestamp(49), status: 'success', recordCount: 345, duration: 234 },
  
  // J区系统数据同步
  { id: 'SYNC-046', sourceSystem: '会议系统', targetSystem: '文档系统', dataType: '会议记录', syncTime: getPastTimestamp(50), status: 'success', recordCount: 23, duration: 34 },
  { id: 'SYNC-047', sourceSystem: '文档系统', targetSystem: '知识库系统', dataType: '文档资料', syncTime: getPastTimestamp(51), status: 'success', recordCount: 67, duration: 89 },
  { id: 'SYNC-048', sourceSystem: '知识库系统', targetSystem: '培训系统', dataType: '培训资料', syncTime: getPastTimestamp(52), status: 'success', recordCount: 45, duration: 56 },
  { id: 'SYNC-049', sourceSystem: '培训系统', targetSystem: '评估系统', dataType: '培训记录', syncTime: getPastTimestamp(53), status: 'success', recordCount: 34, duration: 45 },
  { id: 'SYNC-050', sourceSystem: '评估系统', targetSystem: '人事系统', dataType: '评估结果', syncTime: getPastTimestamp(54), status: 'success', recordCount: 78, duration: 67 },
  
  // 更多系统间数据同步
  { id: 'SYNC-051', sourceSystem: '质量管理系统', targetSystem: '生产系统', dataType: '质量标准', syncTime: getPastTimestamp(55), status: 'success', recordCount: 123, duration: 89 },
  { id: 'SYNC-052', sourceSystem: '生产系统', targetSystem: '质量管理系统', dataType: '质量检测', syncTime: getPastTimestamp(56), status: 'success', recordCount: 234, duration: 145 },
  { id: 'SYNC-053', sourceSystem: '设备管理系统', targetSystem: '维护系统', dataType: '设备状态', syncTime: getPastTimestamp(57), status: 'success', recordCount: 89, duration: 67 },
  { id: 'SYNC-054', sourceSystem: '维护系统', targetSystem: '备件系统', dataType: '维护计划', syncTime: getPastTimestamp(58), status: 'success', recordCount: 56, duration: 45 },
  { id: 'SYNC-055', sourceSystem: '备件系统', targetSystem: '采购系统', dataType: '备件需求', syncTime: getPastTimestamp(59), status: 'success', recordCount: 34, duration: 34 }
];

// 5G卡数据
export const fiveGCards: FiveGCard[] = [
  // A区设备
  { id: '5G-001', cardNumber: '89860012345678901234', iccid: '89860012345678901234', status: 'active', activationDate: '2025-01-01', dataUsage: 2.5, dataLimit: 10, signalStrength: 85, location: 'A区监控点1', deviceId: 'dev001', lastUpdate: getCurrentTimestamp() },
  { id: '5G-002', cardNumber: '89860012345678901235', iccid: '89860012345678901235', status: 'active', activationDate: '2025-01-01', dataUsage: 1.8, dataLimit: 10, signalStrength: 92, location: 'A区监控点2', deviceId: 'dev002', lastUpdate: getCurrentTimestamp() },
  { id: '5G-003', cardNumber: '89860012345678901236', iccid: '89860012345678901236', status: 'active', activationDate: '2025-01-01', dataUsage: 3.2, dataLimit: 10, signalStrength: 78, location: 'A区监控点3', deviceId: 'dev003', lastUpdate: getCurrentTimestamp() },
  { id: '5G-004', cardNumber: '89860012345678901237', iccid: '89860012345678901237', status: 'active', activationDate: '2025-01-01', dataUsage: 0.9, dataLimit: 10, signalStrength: 95, location: 'A区监控点4', deviceId: 'dev004', lastUpdate: getCurrentTimestamp() },
  { id: '5G-005', cardNumber: '89860012345678901238', iccid: '89860012345678901238', status: 'active', activationDate: '2025-01-01', dataUsage: 4.1, dataLimit: 10, signalStrength: 88, location: 'A区监控点5', deviceId: 'dev005', lastUpdate: getCurrentTimestamp() },
  
  // B区设备
  { id: '5G-006', cardNumber: '89860012345678901239', iccid: '89860012345678901239', status: 'active', activationDate: '2025-01-01', dataUsage: 2.3, dataLimit: 10, signalStrength: 91, location: 'B区监控点1', deviceId: 'dev006', lastUpdate: getCurrentTimestamp() },
  { id: '5G-007', cardNumber: '89860012345678901240', iccid: '89860012345678901240', status: 'active', activationDate: '2025-01-01', dataUsage: 1.6, dataLimit: 10, signalStrength: 87, location: 'B区监控点2', deviceId: 'dev007', lastUpdate: getCurrentTimestamp() },
  { id: '5G-008', cardNumber: '89860012345678901241', iccid: '89860012345678901241', status: 'active', activationDate: '2025-01-01', dataUsage: 3.8, dataLimit: 10, signalStrength: 82, location: 'B区监控点3', deviceId: 'dev008', lastUpdate: getCurrentTimestamp() },
  { id: '5G-009', cardNumber: '89860012345678901242', iccid: '89860012345678901242', status: 'active', activationDate: '2025-01-01', dataUsage: 0.7, dataLimit: 10, signalStrength: 96, location: 'B区监控点4', deviceId: 'dev009', lastUpdate: getCurrentTimestamp() },
  { id: '5G-010', cardNumber: '89860012345678901243', iccid: '89860012345678901243', status: 'active', activationDate: '2025-01-01', dataUsage: 2.9, dataLimit: 10, signalStrength: 89, location: 'B区监控点5', deviceId: 'dev010', lastUpdate: getCurrentTimestamp() },
  
  // C区设备
  { id: '5G-011', cardNumber: '89860012345678901244', iccid: '89860012345678901244', status: 'active', activationDate: '2025-01-01', dataUsage: 1.4, dataLimit: 10, signalStrength: 94, location: 'C区监控点1', deviceId: 'dev011', lastUpdate: getCurrentTimestamp() },
  { id: '5G-012', cardNumber: '89860012345678901245', iccid: '89860012345678901245', status: 'active', activationDate: '2025-01-01', dataUsage: 3.5, dataLimit: 10, signalStrength: 79, location: 'C区监控点2', deviceId: 'dev012', lastUpdate: getCurrentTimestamp() },
  { id: '5G-013', cardNumber: '89860012345678901246', iccid: '89860012345678901246', status: 'active', activationDate: '2025-01-01', dataUsage: 2.1, dataLimit: 10, signalStrength: 86, location: 'C区监控点3', deviceId: 'dev013', lastUpdate: getCurrentTimestamp() },
  { id: '5G-014', cardNumber: '89860012345678901247', iccid: '89860012345678901247', status: 'active', activationDate: '2025-01-01', dataUsage: 1.9, dataLimit: 10, signalStrength: 93, location: 'C区监控点4', deviceId: 'dev014', lastUpdate: getCurrentTimestamp() },
  { id: '5G-015', cardNumber: '89860012345678901248', iccid: '89860012345678901248', status: 'active', activationDate: '2025-01-01', dataUsage: 4.3, dataLimit: 10, signalStrength: 77, location: 'C区监控点5', deviceId: 'dev015', lastUpdate: getCurrentTimestamp() },
  
  // D区设备
  { id: '5G-016', cardNumber: '89860012345678901249', iccid: '89860012345678901249', status: 'active', activationDate: '2025-01-01', dataUsage: 2.7, dataLimit: 10, signalStrength: 90, location: 'D区监控点1', deviceId: 'dev016', lastUpdate: getCurrentTimestamp() },
  { id: '5G-017', cardNumber: '89860012345678901250', iccid: '89860012345678901250', status: 'active', activationDate: '2025-01-01', dataUsage: 1.3, dataLimit: 10, signalStrength: 97, location: 'D区监控点2', deviceId: 'dev017', lastUpdate: getCurrentTimestamp() },
  { id: '5G-018', cardNumber: '89860012345678901251', iccid: '89860012345678901251', status: 'active', activationDate: '2025-01-01', dataUsage: 3.1, dataLimit: 10, signalStrength: 84, location: 'D区监控点3', deviceId: 'dev018', lastUpdate: getCurrentTimestamp() },
  { id: '5G-019', cardNumber: '89860012345678901252', iccid: '89860012345678901252', status: 'active', activationDate: '2025-01-01', dataUsage: 0.8, dataLimit: 10, signalStrength: 98, location: 'D区监控点4', deviceId: 'dev019', lastUpdate: getCurrentTimestamp() },
  { id: '5G-020', cardNumber: '89860012345678901253', iccid: '89860012345678901253', status: 'active', activationDate: '2025-01-01', dataUsage: 2.4, dataLimit: 10, signalStrength: 88, location: 'D区监控点5', deviceId: 'dev020', lastUpdate: getCurrentTimestamp() },
  
  // E区设备
  { id: '5G-021', cardNumber: '89860012345678901254', iccid: '89860012345678901254', status: 'inactive', activationDate: '2025-01-01', dataUsage: 0, dataLimit: 10, signalStrength: 0, location: 'E区监控点1', deviceId: 'dev021', lastUpdate: getPastTimestamp(75) },
  { id: '5G-022', cardNumber: '89860012345678901255', iccid: '89860012345678901255', status: 'suspended', activationDate: '2025-01-01', dataUsage: 1.2, dataLimit: 10, signalStrength: 45, location: 'E区监控点2', deviceId: 'dev022', lastUpdate: getPastTimestamp(60) },
  { id: '5G-023', cardNumber: '89860012345678901256', iccid: '89860012345678901256', status: 'active', activationDate: '2025-01-01', dataUsage: 3.6, dataLimit: 10, signalStrength: 81, location: 'E区监控点3', deviceId: 'dev023', lastUpdate: getCurrentTimestamp() },
  { id: '5G-024', cardNumber: '89860012345678901257', iccid: '89860012345678901257', status: 'active', activationDate: '2025-01-01', dataUsage: 1.7, dataLimit: 10, signalStrength: 92, location: 'E区监控点4', deviceId: 'dev024', lastUpdate: getCurrentTimestamp() },
  { id: '5G-025', cardNumber: '89860012345678901258', iccid: '89860012345678901258', status: 'active', activationDate: '2025-01-01', dataUsage: 2.8, dataLimit: 10, signalStrength: 85, location: 'E区监控点5', deviceId: 'dev025', lastUpdate: getCurrentTimestamp() },
  
  // F区设备
  { id: '5G-026', cardNumber: '89860012345678901259', iccid: '89860012345678901259', status: 'active', activationDate: '2025-01-01', dataUsage: 2.0, dataLimit: 10, signalStrength: 89, location: 'F区监控点1', deviceId: 'dev026', lastUpdate: getCurrentTimestamp() },
  { id: '5G-027', cardNumber: '89860012345678901260', iccid: '89860012345678901260', status: 'active', activationDate: '2025-01-01', dataUsage: 3.9, dataLimit: 10, signalStrength: 76, location: 'F区监控点2', deviceId: 'dev027', lastUpdate: getCurrentTimestamp() },
  { id: '5G-028', cardNumber: '89860012345678901261', iccid: '89860012345678901261', status: 'active', activationDate: '2025-01-01', dataUsage: 1.5, dataLimit: 10, signalStrength: 95, location: 'F区监控点3', deviceId: 'dev028', lastUpdate: getCurrentTimestamp() },
  { id: '5G-029', cardNumber: '89860012345678901262', iccid: '89860012345678901262', status: 'active', activationDate: '2025-01-01', dataUsage: 2.6, dataLimit: 10, signalStrength: 87, location: 'F区监控点4', deviceId: 'dev029', lastUpdate: getCurrentTimestamp() },
  { id: '5G-030', cardNumber: '89860012345678901263', iccid: '89860012345678901263', status: 'active', activationDate: '2025-01-01', dataUsage: 0.6, dataLimit: 10, signalStrength: 99, location: 'F区监控点5', deviceId: 'dev030', lastUpdate: getCurrentTimestamp() },
  
  // G区设备
  { id: '5G-031', cardNumber: '89860012345678901264', iccid: '89860012345678901264', status: 'active', activationDate: '2025-01-01', dataUsage: 2.8, dataLimit: 10, signalStrength: 91, location: 'G区监控点1', deviceId: 'dev031', lastUpdate: getCurrentTimestamp() },
  { id: '5G-032', cardNumber: '89860012345678901265', iccid: '89860012345678901265', status: 'active', activationDate: '2025-01-01', dataUsage: 1.9, dataLimit: 10, signalStrength: 94, location: 'G区监控点2', deviceId: 'dev032', lastUpdate: getCurrentTimestamp() },
  { id: '5G-033', cardNumber: '89860012345678901266', iccid: '89860012345678901266', status: 'active', activationDate: '2025-01-01', dataUsage: 3.4, dataLimit: 10, signalStrength: 82, location: 'G区监控点3', deviceId: 'dev033', lastUpdate: getCurrentTimestamp() },
  { id: '5G-034', cardNumber: '89860012345678901267', iccid: '89860012345678901267', status: 'active', activationDate: '2025-01-01', dataUsage: 1.1, dataLimit: 10, signalStrength: 97, location: 'G区监控点4', deviceId: 'dev034', lastUpdate: getCurrentTimestamp() },
  { id: '5G-035', cardNumber: '89860012345678901268', iccid: '89860012345678901268', status: 'active', activationDate: '2025-01-01', dataUsage: 2.3, dataLimit: 10, signalStrength: 88, location: 'G区监控点5', deviceId: 'dev035', lastUpdate: getCurrentTimestamp() },
  
  // H区设备
  { id: '5G-036', cardNumber: '89860012345678901269', iccid: '89860012345678901269', status: 'active', activationDate: '2025-01-01', dataUsage: 1.7, dataLimit: 10, signalStrength: 96, location: 'H区监控点1', deviceId: 'dev036', lastUpdate: getCurrentTimestamp() },
  { id: '5G-037', cardNumber: '89860012345678901270', iccid: '89860012345678901270', status: 'active', activationDate: '2025-01-01', dataUsage: 3.7, dataLimit: 10, signalStrength: 79, location: 'H区监控点2', deviceId: 'dev037', lastUpdate: getCurrentTimestamp() },
  { id: '5G-038', cardNumber: '89860012345678901271', iccid: '89860012345678901271', status: 'active', activationDate: '2025-01-01', dataUsage: 2.1, dataLimit: 10, signalStrength: 90, location: 'H区监控点3', deviceId: 'dev038', lastUpdate: getCurrentTimestamp() },
  { id: '5G-039', cardNumber: '89860012345678901272', iccid: '89860012345678901272', status: 'active', activationDate: '2025-01-01', dataUsage: 0.8, dataLimit: 10, signalStrength: 98, location: 'H区监控点4', deviceId: 'dev039', lastUpdate: getCurrentTimestamp() },
  { id: '5G-040', cardNumber: '89860012345678901273', iccid: '89860012345678901273', status: 'active', activationDate: '2025-01-01', dataUsage: 2.9, dataLimit: 10, signalStrength: 85, location: 'H区监控点5', deviceId: 'dev040', lastUpdate: getCurrentTimestamp() },
  
  // I区设备
  { id: '5G-041', cardNumber: '89860012345678901274', iccid: '89860012345678901274', status: 'active', activationDate: '2025-01-01', dataUsage: 1.4, dataLimit: 10, signalStrength: 93, location: 'I区监控点1', deviceId: 'dev041', lastUpdate: getCurrentTimestamp() },
  { id: '5G-042', cardNumber: '89860012345678901275', iccid: '89860012345678901275', status: 'active', activationDate: '2025-01-01', dataUsage: 3.2, dataLimit: 10, signalStrength: 81, location: 'I区监控点2', deviceId: 'dev042', lastUpdate: getCurrentTimestamp() },
  { id: '5G-043', cardNumber: '89860012345678901276', iccid: '89860012345678901276', status: 'active', activationDate: '2025-01-01', dataUsage: 2.5, dataLimit: 10, signalStrength: 87, location: 'I区监控点3', deviceId: 'dev043', lastUpdate: getCurrentTimestamp() },
  { id: '5G-044', cardNumber: '89860012345678901277', iccid: '89860012345678901277', status: 'active', activationDate: '2025-01-01', dataUsage: 1.6, dataLimit: 10, signalStrength: 95, location: 'I区监控点4', deviceId: 'dev044', lastUpdate: getCurrentTimestamp() },
  { id: '5G-045', cardNumber: '89860012345678901278', iccid: '89860012345678901278', status: 'active', activationDate: '2025-01-01', dataUsage: 3.8, dataLimit: 10, signalStrength: 78, location: 'I区监控点5', deviceId: 'dev045', lastUpdate: getCurrentTimestamp() },
  
  // J区设备
  { id: '5G-046', cardNumber: '89860012345678901279', iccid: '89860012345678901279', status: 'active', activationDate: '2025-01-01', dataUsage: 2.0, dataLimit: 10, signalStrength: 92, location: 'J区监控点1', deviceId: 'dev046', lastUpdate: getCurrentTimestamp() },
  { id: '5G-047', cardNumber: '89860012345678901280', iccid: '89860012345678901280', status: 'active', activationDate: '2025-01-01', dataUsage: 1.3, dataLimit: 10, signalStrength: 96, location: 'J区监控点2', deviceId: 'dev047', lastUpdate: getCurrentTimestamp() },
  { id: '5G-048', cardNumber: '89860012345678901281', iccid: '89860012345678901281', status: 'active', activationDate: '2025-01-01', dataUsage: 3.1, dataLimit: 10, signalStrength: 83, location: 'J区监控点3', deviceId: 'dev048', lastUpdate: getCurrentTimestamp() },
  { id: '5G-049', cardNumber: '89860012345678901282', iccid: '89860012345678901282', status: 'active', activationDate: '2025-01-01', dataUsage: 2.7, dataLimit: 10, signalStrength: 89, location: 'J区监控点4', deviceId: 'dev049', lastUpdate: getCurrentTimestamp() },
  { id: '5G-050', cardNumber: '89860012345678901283', iccid: '89860012345678901283', status: 'active', activationDate: '2025-01-01', dataUsage: 0.9, dataLimit: 10, signalStrength: 99, location: 'J区监控点5', deviceId: 'dev050', lastUpdate: getCurrentTimestamp() }
];

// 安全认证记录
export const securityAuths: SecurityAuth[] = [
  // 管理员认证记录
  { id: 'AUTH-001', userId: 'user001', userName: 'admin', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(1), ipAddress: '192.168.1.100', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-002', userId: 'user001', userName: 'admin', authType: 'secondary', authMethod: 'sms', status: 'success', timestamp: getPastTimestamp(2), ipAddress: '192.168.1.100', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-003', userId: 'user001', userName: 'admin', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(3), ipAddress: '192.168.1.100', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-004', userId: 'user001', userName: 'admin', authType: 'secondary', authMethod: 'fingerprint', status: 'success', timestamp: getPastTimestamp(4), ipAddress: '192.168.1.100', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-005', userId: 'user001', userName: 'admin', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(5), ipAddress: '192.168.1.100', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  
  // 操作员认证记录
  { id: 'AUTH-006', userId: 'user002', userName: 'operator1', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(6), ipAddress: '192.168.1.101', deviceInfo: 'Windows 10 - Firefox 121.0', location: '山东济南' },
  { id: 'AUTH-007', userId: 'user002', userName: 'operator1', authType: 'secondary', authMethod: 'sms', status: 'success', timestamp: getPastTimestamp(7), ipAddress: '192.168.1.101', deviceInfo: 'Windows 10 - Firefox 121.0', location: '山东济南' },
  { id: 'AUTH-008', userId: 'user003', userName: 'operator2', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(8), ipAddress: '192.168.1.102', deviceInfo: 'macOS - Safari 17.0', location: '山东济南' },
  { id: 'AUTH-009', userId: 'user003', userName: 'operator2', authType: 'secondary', authMethod: 'email', status: 'success', timestamp: getPastTimestamp(9), ipAddress: '192.168.1.102', deviceInfo: 'macOS - Safari 17.0', location: '山东济南' },
  { id: 'AUTH-010', userId: 'user004', userName: 'operator3', authType: 'primary', authMethod: 'password', status: 'failed', timestamp: getPastTimestamp(10), ipAddress: '192.168.1.103', deviceInfo: 'Windows 10 - Edge 120.0', location: '山东济南' },
  
  // 监控员认证记录
  { id: 'AUTH-011', userId: 'user005', userName: 'monitor1', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(11), ipAddress: '192.168.1.104', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-012', userId: 'user005', userName: 'monitor1', authType: 'secondary', authMethod: 'face', status: 'success', timestamp: getPastTimestamp(12), ipAddress: '192.168.1.104', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-013', userId: 'user006', userName: 'monitor2', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(13), ipAddress: '192.168.1.105', deviceInfo: 'Windows 10 - Firefox 121.0', location: '山东济南' },
  { id: 'AUTH-014', userId: 'user006', userName: 'monitor2', authType: 'secondary', authMethod: 'fingerprint', status: 'success', timestamp: getPastTimestamp(14), ipAddress: '192.168.1.105', deviceInfo: 'Windows 10 - Firefox 121.0', location: '山东济南' },
  { id: 'AUTH-015', userId: 'user007', userName: 'monitor3', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(15), ipAddress: '192.168.1.106', deviceInfo: 'macOS - Safari 17.0', location: '山东济南' },
  
  // 安全员认证记录
  { id: 'AUTH-016', userId: 'user008', userName: 'security1', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(16), ipAddress: '192.168.1.107', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-017', userId: 'user008', userName: 'security1', authType: 'secondary', authMethod: 'biometric', status: 'success', timestamp: getPastTimestamp(17), ipAddress: '192.168.1.107', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-018', userId: 'user009', userName: 'security2', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(18), ipAddress: '192.168.1.108', deviceInfo: 'Windows 10 - Firefox 121.0', location: '山东济南' },
  { id: 'AUTH-019', userId: 'user009', userName: 'security2', authType: 'secondary', authMethod: 'sms', status: 'success', timestamp: getPastTimestamp(19), ipAddress: '192.168.1.108', deviceInfo: 'Windows 10 - Firefox 121.0', location: '山东济南' },
  { id: 'AUTH-020', userId: 'user010', userName: 'security3', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(20), ipAddress: '192.168.1.109', deviceInfo: 'macOS - Safari 17.0', location: '山东济南' },
  
  // 主管认证记录
  { id: 'AUTH-021', userId: 'user011', userName: 'supervisor1', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(21), ipAddress: '192.168.1.110', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-022', userId: 'user011', userName: 'supervisor1', authType: 'secondary', authMethod: 'face', status: 'success', timestamp: getPastTimestamp(22), ipAddress: '192.168.1.110', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-023', userId: 'user012', userName: 'supervisor2', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(23), ipAddress: '192.168.1.111', deviceInfo: 'Windows 10 - Firefox 121.0', location: '山东济南' },
  { id: 'AUTH-024', userId: 'user012', userName: 'supervisor2', authType: 'secondary', authMethod: 'fingerprint', status: 'success', timestamp: getPastTimestamp(24), ipAddress: '192.168.1.111', deviceInfo: 'Windows 10 - Firefox 121.0', location: '山东济南' },
  { id: 'AUTH-025', userId: 'user013', userName: 'supervisor3', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(25), ipAddress: '192.168.1.112', deviceInfo: 'macOS - Safari 17.0', location: '山东济南' },
  
  // 经理认证记录
  { id: 'AUTH-026', userId: 'user014', userName: 'manager1', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(26), ipAddress: '192.168.1.113', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-027', userId: 'user014', userName: 'manager1', authType: 'secondary', authMethod: 'biometric', status: 'success', timestamp: getPastTimestamp(27), ipAddress: '192.168.1.113', deviceInfo: 'Windows 10 - Chrome 120.0', location: '山东济南' },
  { id: 'AUTH-028', userId: 'user015', userName: 'manager2', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(28), ipAddress: '192.168.1.114', deviceInfo: 'Windows 10 - Firefox 121.0', location: '山东济南' },
  { id: 'AUTH-029', userId: 'user015', userName: 'manager2', authType: 'secondary', authMethod: 'sms', status: 'success', timestamp: getPastTimestamp(29), ipAddress: '192.168.1.114', deviceInfo: 'Windows 10 - Firefox 121.0', location: '山东济南' },
  { id: 'AUTH-030', userId: 'user016', userName: 'manager3', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(30), ipAddress: '192.168.1.115', deviceInfo: 'macOS - Safari 17.0', location: '山东济南' },
  
  // 系统用户认证记录
  { id: 'AUTH-031', userId: 'system001', userName: 'system_sync', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(31), ipAddress: '192.168.1.116', deviceInfo: 'System-Service/1.0', location: '山东济南' },
  { id: 'AUTH-032', userId: 'system002', userName: 'sensor_system', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(32), ipAddress: '192.168.1.117', deviceInfo: 'Sensor-System/2.1', location: '山东济南' },
  { id: 'AUTH-033', userId: 'system003', userName: 'alert_system', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(33), ipAddress: '192.168.1.118', deviceInfo: 'Alert-System/1.5', location: '山东济南' },
  { id: 'AUTH-034', userId: 'system004', userName: 'report_system', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(34), ipAddress: '192.168.1.119', deviceInfo: 'Report-System/3.2', location: '山东济南' },
  { id: 'AUTH-035', userId: 'system005', userName: 'backup_system', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(35), ipAddress: '192.168.1.120', deviceInfo: 'Backup-System/2.0', location: '山东济南' },
  
  // 失败认证记录
  { id: 'AUTH-036', userId: 'unknown', userName: 'unknown', authType: 'primary', authMethod: 'password', status: 'failed', timestamp: getPastTimestamp(36), ipAddress: '192.168.1.121', deviceInfo: 'Unknown-Device', location: '山东济南' },
  { id: 'AUTH-037', userId: 'unknown', userName: 'unknown', authType: 'primary', authMethod: 'password', status: 'failed', timestamp: getPastTimestamp(37), ipAddress: '192.168.1.122', deviceInfo: 'Unknown-Device', location: '山东济南' },
  { id: 'AUTH-038', userId: 'unknown', userName: 'unknown', authType: 'primary', authMethod: 'password', status: 'failed', timestamp: getPastTimestamp(38), ipAddress: '192.168.1.123', deviceInfo: 'Unknown-Device', location: '山东济南' },
  { id: 'AUTH-039', userId: 'unknown', userName: 'unknown', authType: 'primary', authMethod: 'password', status: 'failed', timestamp: getPastTimestamp(39), ipAddress: '192.168.1.124', deviceInfo: 'Unknown-Device', location: '山东济南' },
  { id: 'AUTH-040', userId: 'unknown', userName: 'unknown', authType: 'primary', authMethod: 'password', status: 'failed', timestamp: getPastTimestamp(40), ipAddress: '192.168.1.125', deviceInfo: 'Unknown-Device', location: '山东济南' },
  
  // G区用户认证记录
  { id: 'AUTH-041', userId: 'user009', userName: 'operator9', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(41), ipAddress: '192.168.1.150', deviceInfo: 'Windows - Chrome 120.0', location: '济南市长清区' },
  { id: 'AUTH-042', userId: 'user010', userName: 'operator10', authType: 'primary', authMethod: 'sms', status: 'success', timestamp: getPastTimestamp(42), ipAddress: '192.168.1.151', deviceInfo: 'iOS - Safari 17.0', location: '济南市章丘区' },
  { id: 'AUTH-043', userId: 'user011', userName: 'operator11', authType: 'secondary', authMethod: 'fingerprint', status: 'success', timestamp: getPastTimestamp(43), ipAddress: '192.168.1.152', deviceInfo: 'Android - Chrome 120.0', location: '济南市济阳区' },
  { id: 'AUTH-044', userId: 'user012', userName: 'operator12', authType: 'biometric', authMethod: 'face', status: 'success', timestamp: getPastTimestamp(44), ipAddress: '192.168.1.153', deviceInfo: 'iOS - Safari 17.0', location: '济南市莱芜区' },
  { id: 'AUTH-045', userId: 'user013', userName: 'operator13', authType: 'biometric', authMethod: 'biometric', status: 'success', timestamp: getPastTimestamp(45), ipAddress: '192.168.1.154', deviceInfo: 'Android - Chrome 120.0', location: '济南市钢城区' },
  
  // H区用户认证记录
  { id: 'AUTH-046', userId: 'user014', userName: 'operator14', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(46), ipAddress: '192.168.1.155', deviceInfo: 'Windows - Edge 120.0', location: '济南市平阴县' },
  { id: 'AUTH-047', userId: 'user015', userName: 'operator15', authType: 'primary', authMethod: 'sms', status: 'success', timestamp: getPastTimestamp(47), ipAddress: '192.168.1.156', deviceInfo: 'iOS - Safari 17.0', location: '济南市商河县' },
  { id: 'AUTH-048', userId: 'user016', userName: 'operator16', authType: 'secondary', authMethod: 'fingerprint', status: 'success', timestamp: getPastTimestamp(48), ipAddress: '192.168.1.157', deviceInfo: 'Android - Chrome 120.0', location: '济南市高新区' },
  { id: 'AUTH-049', userId: 'user017', userName: 'operator17', authType: 'biometric', authMethod: 'face', status: 'success', timestamp: getPastTimestamp(49), ipAddress: '192.168.1.158', deviceInfo: 'iOS - Safari 17.0', location: '济南市南山区' },
  { id: 'AUTH-050', userId: 'user018', userName: 'operator18', authType: 'biometric', authMethod: 'biometric', status: 'success', timestamp: getPastTimestamp(50), ipAddress: '192.168.1.159', deviceInfo: 'Android - Chrome 120.0', location: '济南市先行区' },
  
  // I区用户认证记录
  { id: 'AUTH-051', userId: 'user019', userName: 'operator19', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(51), ipAddress: '192.168.1.160', deviceInfo: 'Windows - Chrome 120.0', location: '济南市起步区' },
  { id: 'AUTH-052', userId: 'user020', userName: 'operator20', authType: 'primary', authMethod: 'sms', status: 'success', timestamp: getPastTimestamp(52), ipAddress: '192.168.1.161', deviceInfo: 'iOS - Safari 17.0', location: '济南市临港区' },
  { id: 'AUTH-053', userId: 'user021', userName: 'operator21', authType: 'secondary', authMethod: 'fingerprint', status: 'success', timestamp: getPastTimestamp(53), ipAddress: '192.168.1.162', deviceInfo: 'Android - Chrome 120.0', location: '济南市空港区' },
  { id: 'AUTH-054', userId: 'user022', userName: 'operator22', authType: 'biometric', authMethod: 'face', status: 'success', timestamp: getPastTimestamp(54), ipAddress: '192.168.1.163', deviceInfo: 'iOS - Safari 17.0', location: '济南市陆港区' },
  { id: 'AUTH-055', userId: 'user023', userName: 'operator23', authType: 'biometric', authMethod: 'biometric', status: 'success', timestamp: getPastTimestamp(55), ipAddress: '192.168.1.164', deviceInfo: 'Android - Chrome 120.0', location: '济南市水港区' },
  
  // J区用户认证记录
  { id: 'AUTH-056', userId: 'user024', userName: 'operator24', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(56), ipAddress: '192.168.1.165', deviceInfo: 'Windows - Edge 120.0', location: '济南市保税区' },
  { id: 'AUTH-057', userId: 'user025', userName: 'operator25', authType: 'primary', authMethod: 'sms', status: 'success', timestamp: getPastTimestamp(57), ipAddress: '192.168.1.166', deviceInfo: 'iOS - Safari 17.0', location: '济南市综保区' },
  { id: 'AUTH-058', userId: 'user026', userName: 'operator26', authType: 'secondary', authMethod: 'fingerprint', status: 'success', timestamp: getPastTimestamp(58), ipAddress: '192.168.1.167', deviceInfo: 'Android - Chrome 120.0', location: '济南市自贸区' },
  { id: 'AUTH-059', userId: 'user027', userName: 'operator27', authType: 'biometric', authMethod: 'face', status: 'success', timestamp: getPastTimestamp(59), ipAddress: '192.168.1.168', deviceInfo: 'iOS - Safari 17.0', location: '济南市创新区' },
  { id: 'AUTH-060', userId: 'user028', userName: 'operator28', authType: 'biometric', authMethod: 'biometric', status: 'success', timestamp: getPastTimestamp(60), ipAddress: '192.168.1.169', deviceInfo: 'Android - Chrome 120.0', location: '济南市智慧区' },
  
  // 系统管理员认证记录
  { id: 'AUTH-061', userId: 'admin001', userName: 'system_admin1', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(61), ipAddress: '192.168.1.170', deviceInfo: 'Windows - Chrome 120.0', location: '济南市总部' },
  { id: 'AUTH-062', userId: 'admin002', userName: 'system_admin2', authType: 'secondary', authMethod: 'fingerprint', status: 'success', timestamp: getPastTimestamp(62), ipAddress: '192.168.1.171', deviceInfo: 'Windows - Edge 120.0', location: '济南市总部' },
  { id: 'AUTH-063', userId: 'admin003', userName: 'system_admin3', authType: 'biometric', authMethod: 'face', status: 'success', timestamp: getPastTimestamp(63), ipAddress: '192.168.1.172', deviceInfo: 'macOS - Safari 17.0', location: '济南市总部' },
  { id: 'AUTH-064', userId: 'admin004', userName: 'system_admin4', authType: 'biometric', authMethod: 'biometric', status: 'success', timestamp: getPastTimestamp(64), ipAddress: '192.168.1.173', deviceInfo: 'Windows - Chrome 120.0', location: '济南市总部' },
  { id: 'AUTH-065', userId: 'admin005', userName: 'system_admin5', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(65), ipAddress: '192.168.1.174', deviceInfo: 'Windows - Edge 120.0', location: '济南市总部' },
  
  // 设备认证记录
  { id: 'AUTH-066', userId: 'dev031', userName: 'camera_g001', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(66), ipAddress: '192.168.1.175', deviceInfo: 'Camera-System/3.1', location: 'G区监控点1' },
  { id: 'AUTH-067', userId: 'dev032', userName: 'sensor_g001', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(67), ipAddress: '192.168.1.176', deviceInfo: 'Sensor-System/2.1', location: 'G区监控点2' },
  { id: 'AUTH-068', userId: 'dev033', userName: 'phone_g001', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(68), ipAddress: '192.168.1.177', deviceInfo: 'Phone-System/1.5', location: 'G区监控点3' },
  { id: 'AUTH-069', userId: 'dev034', userName: 'controller_g001', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(69), ipAddress: '192.168.1.178', deviceInfo: 'Controller-System/2.0', location: 'G区监控点4' },
  { id: 'AUTH-070', userId: 'dev035', userName: 'camera_g002', authType: 'primary', authMethod: 'password', status: 'success', timestamp: getPastTimestamp(70), ipAddress: '192.168.1.179', deviceInfo: 'Camera-System/3.1', location: 'G区监控点5' }
];

// 网络安全状态
export const networkSecurities: NetworkSecurity[] = [
  {
    id: 'SEC-001',
    type: 'firewall',
    status: 'active',
    threatLevel: 'low',
    lastUpdate: getCurrentTimestamp(),
    blockedAttempts: 12,
    totalThreats: 0,
    description: '防火墙正常运行，无异常访问'
  },
  {
    id: 'SEC-002',
    type: 'ids',
    status: 'active',
    threatLevel: 'medium',
    lastUpdate: getCurrentTimestamp(),
    blockedAttempts: 0,
    totalThreats: 3,
    description: '检测到可疑网络活动，已记录'
  },
  {
    id: 'SEC-003',
    type: 'ips',
    status: 'active',
    threatLevel: 'low',
    lastUpdate: getCurrentTimestamp(),
    blockedAttempts: 5,
    totalThreats: 0,
    description: '入侵防护系统正常运行'
  },
  {
    id: 'SEC-004',
    type: 'ddos',
    status: 'active',
    threatLevel: 'low',
    lastUpdate: getCurrentTimestamp(),
    blockedAttempts: 0,
    totalThreats: 0,
    description: 'DDoS防护系统待命状态'
  }
];

// 传感器数据
export const sensorData: SensorData[] = [
  // A区温度传感器
  { id: 'SENSOR-001', sensorId: 'TEMP-A-001', sensorType: 'temperature', value: 22.5, unit: '°C', timestamp: getCurrentTimestamp(), location: 'A区车间1', accuracy: 0.1, batteryLevel: 85, signalStrength: 90 },
  { id: 'SENSOR-002', sensorId: 'TEMP-A-002', sensorType: 'temperature', value: 23.1, unit: '°C', timestamp: getCurrentTimestamp(), location: 'A区车间2', accuracy: 0.1, batteryLevel: 92, signalStrength: 88 },
  { id: 'SENSOR-003', sensorId: 'TEMP-A-003', sensorType: 'temperature', value: 21.8, unit: '°C', timestamp: getCurrentTimestamp(), location: 'A区车间3', accuracy: 0.1, batteryLevel: 78, signalStrength: 85 },
  { id: 'SENSOR-004', sensorId: 'TEMP-A-004', sensorType: 'temperature', value: 24.2, unit: '°C', timestamp: getCurrentTimestamp(), location: 'A区车间4', accuracy: 0.1, batteryLevel: 95, signalStrength: 92 },
  { id: 'SENSOR-005', sensorId: 'TEMP-A-005', sensorType: 'temperature', value: 22.9, unit: '°C', timestamp: getCurrentTimestamp(), location: 'A区车间5', accuracy: 0.1, batteryLevel: 88, signalStrength: 87 },
  
  // A区湿度传感器
  { id: 'SENSOR-006', sensorId: 'HUM-A-001', sensorType: 'humidity', value: 65.2, unit: '%', timestamp: getCurrentTimestamp(), location: 'A区车间1', accuracy: 0.5, batteryLevel: 92, signalStrength: 88 },
  { id: 'SENSOR-007', sensorId: 'HUM-A-002', sensorType: 'humidity', value: 67.8, unit: '%', timestamp: getCurrentTimestamp(), location: 'A区车间2', accuracy: 0.5, batteryLevel: 85, signalStrength: 90 },
  { id: 'SENSOR-008', sensorId: 'HUM-A-003', sensorType: 'humidity', value: 63.5, unit: '%', timestamp: getCurrentTimestamp(), location: 'A区车间3', accuracy: 0.5, batteryLevel: 78, signalStrength: 85 },
  { id: 'SENSOR-009', sensorId: 'HUM-A-004', sensorType: 'humidity', value: 69.1, unit: '%', timestamp: getCurrentTimestamp(), location: 'A区车间4', accuracy: 0.5, batteryLevel: 95, signalStrength: 92 },
  { id: 'SENSOR-010', sensorId: 'HUM-A-005', sensorType: 'humidity', value: 66.3, unit: '%', timestamp: getCurrentTimestamp(), location: 'A区车间5', accuracy: 0.5, batteryLevel: 88, signalStrength: 87 },
  
  // B区压力传感器
  { id: 'SENSOR-011', sensorId: 'PRESS-B-001', sensorType: 'pressure', value: 1013.25, unit: 'hPa', timestamp: getCurrentTimestamp(), location: 'B区仓库1', accuracy: 0.01, batteryLevel: 78, signalStrength: 85 },
  { id: 'SENSOR-012', sensorId: 'PRESS-B-002', sensorType: 'pressure', value: 1012.89, unit: 'hPa', timestamp: getCurrentTimestamp(), location: 'B区仓库2', accuracy: 0.01, batteryLevel: 82, signalStrength: 88 },
  { id: 'SENSOR-013', sensorId: 'PRESS-B-003', sensorType: 'pressure', value: 1014.12, unit: 'hPa', timestamp: getCurrentTimestamp(), location: 'B区仓库3', accuracy: 0.01, batteryLevel: 75, signalStrength: 83 },
  { id: 'SENSOR-014', sensorId: 'PRESS-B-004', sensorType: 'pressure', value: 1013.67, unit: 'hPa', timestamp: getCurrentTimestamp(), location: 'B区仓库4', accuracy: 0.01, batteryLevel: 90, signalStrength: 91 },
  { id: 'SENSOR-015', sensorId: 'PRESS-B-005', sensorType: 'pressure', value: 1012.45, unit: 'hPa', timestamp: getCurrentTimestamp(), location: 'B区仓库5', accuracy: 0.01, batteryLevel: 85, signalStrength: 87 },
  
  // C区运动传感器
  { id: 'SENSOR-016', sensorId: 'MOTION-C-001', sensorType: 'motion', value: 1, unit: 'detected', timestamp: getCurrentTimestamp(), location: 'C区入口1', accuracy: 1, batteryLevel: 95, signalStrength: 92 },
  { id: 'SENSOR-017', sensorId: 'MOTION-C-002', sensorType: 'motion', value: 0, unit: 'detected', timestamp: getCurrentTimestamp(), location: 'C区入口2', accuracy: 1, batteryLevel: 88, signalStrength: 89 },
  { id: 'SENSOR-018', sensorId: 'MOTION-C-003', sensorType: 'motion', value: 1, unit: 'detected', timestamp: getCurrentTimestamp(), location: 'C区入口3', accuracy: 1, batteryLevel: 92, signalStrength: 94 },
  { id: 'SENSOR-019', sensorId: 'MOTION-C-004', sensorType: 'motion', value: 0, unit: 'detected', timestamp: getCurrentTimestamp(), location: 'C区入口4', accuracy: 1, batteryLevel: 85, signalStrength: 86 },
  { id: 'SENSOR-020', sensorId: 'MOTION-C-005', sensorType: 'motion', value: 1, unit: 'detected', timestamp: getCurrentTimestamp(), location: 'C区入口5', accuracy: 1, batteryLevel: 90, signalStrength: 93 },
  
  // D区光照传感器
  { id: 'SENSOR-021', sensorId: 'LIGHT-D-001', sensorType: 'light', value: 450, unit: 'lux', timestamp: getCurrentTimestamp(), location: 'D区办公室1', accuracy: 10, batteryLevel: 88, signalStrength: 87 },
  { id: 'SENSOR-022', sensorId: 'LIGHT-D-002', sensorType: 'light', value: 520, unit: 'lux', timestamp: getCurrentTimestamp(), location: 'D区办公室2', accuracy: 10, batteryLevel: 92, signalStrength: 90 },
  { id: 'SENSOR-023', sensorId: 'LIGHT-D-003', sensorType: 'light', value: 380, unit: 'lux', timestamp: getCurrentTimestamp(), location: 'D区办公室3', accuracy: 10, batteryLevel: 85, signalStrength: 88 },
  { id: 'SENSOR-024', sensorId: 'LIGHT-D-004', sensorType: 'light', value: 600, unit: 'lux', timestamp: getCurrentTimestamp(), location: 'D区办公室4', accuracy: 10, batteryLevel: 95, signalStrength: 93 },
  { id: 'SENSOR-025', sensorId: 'LIGHT-D-005', sensorType: 'light', value: 420, unit: 'lux', timestamp: getCurrentTimestamp(), location: 'D区办公室5', accuracy: 10, batteryLevel: 90, signalStrength: 89 },
  
  // E区声音传感器
  { id: 'SENSOR-026', sensorId: 'SOUND-E-001', sensorType: 'sound', value: 45, unit: 'dB', timestamp: getCurrentTimestamp(), location: 'E区会议室1', accuracy: 1, batteryLevel: 82, signalStrength: 85 },
  { id: 'SENSOR-027', sensorId: 'SOUND-E-002', sensorType: 'sound', value: 52, unit: 'dB', timestamp: getCurrentTimestamp(), location: 'E区会议室2', accuracy: 1, batteryLevel: 88, signalStrength: 87 },
  { id: 'SENSOR-028', sensorId: 'SOUND-E-003', sensorType: 'sound', value: 38, unit: 'dB', timestamp: getCurrentTimestamp(), location: 'E区会议室3', accuracy: 1, batteryLevel: 75, signalStrength: 83 },
  { id: 'SENSOR-029', sensorId: 'SOUND-E-004', sensorType: 'sound', value: 65, unit: 'dB', timestamp: getCurrentTimestamp(), location: 'E区会议室4', accuracy: 1, batteryLevel: 92, signalStrength: 90 },
  { id: 'SENSOR-030', sensorId: 'SOUND-E-005', sensorType: 'sound', value: 48, unit: 'dB', timestamp: getCurrentTimestamp(), location: 'E区会议室5', accuracy: 1, batteryLevel: 85, signalStrength: 86 },
  
  // F区综合传感器
  { id: 'SENSOR-031', sensorId: 'TEMP-F-001', sensorType: 'temperature', value: 20.5, unit: '°C', timestamp: getCurrentTimestamp(), location: 'F区实验室1', accuracy: 0.1, batteryLevel: 95, signalStrength: 94 },
  { id: 'SENSOR-032', sensorId: 'HUM-F-001', sensorType: 'humidity', value: 58.2, unit: '%', timestamp: getCurrentTimestamp(), location: 'F区实验室1', accuracy: 0.5, batteryLevel: 93, signalStrength: 92 },
  { id: 'SENSOR-033', sensorId: 'PRESS-F-001', sensorType: 'pressure', value: 1015.67, unit: 'hPa', timestamp: getCurrentTimestamp(), location: 'F区实验室1', accuracy: 0.01, batteryLevel: 90, signalStrength: 91 },
  { id: 'SENSOR-034', sensorId: 'LIGHT-F-001', sensorType: 'light', value: 750, unit: 'lux', timestamp: getCurrentTimestamp(), location: 'F区实验室1', accuracy: 10, batteryLevel: 88, signalStrength: 89 },
  { id: 'SENSOR-035', sensorId: 'SOUND-F-001', sensorType: 'sound', value: 35, unit: 'dB', timestamp: getCurrentTimestamp(), location: 'F区实验室1', accuracy: 1, batteryLevel: 85, signalStrength: 87 },
  
  // G区传感器
  { id: 'SENSOR-036', sensorId: 'TEMP-G-001', sensorType: 'temperature', value: 23.1, unit: '°C', timestamp: getCurrentTimestamp(), location: 'G区车间1', accuracy: 0.1, batteryLevel: 88, signalStrength: 91 },
  { id: 'SENSOR-037', sensorId: 'HUM-G-001', sensorType: 'humidity', value: 68.5, unit: '%', timestamp: getCurrentTimestamp(), location: 'G区车间1', accuracy: 0.5, batteryLevel: 92, signalStrength: 88 },
  { id: 'SENSOR-038', sensorId: 'PRESS-G-001', sensorType: 'pressure', value: 1014.78, unit: 'hPa', timestamp: getCurrentTimestamp(), location: 'G区车间1', accuracy: 0.01, batteryLevel: 85, signalStrength: 87 },
  { id: 'SENSOR-039', sensorId: 'MOTION-G-001', sensorType: 'motion', value: 0, unit: 'detected', timestamp: getCurrentTimestamp(), location: 'G区车间1', accuracy: 1, batteryLevel: 95, signalStrength: 92 },
  { id: 'SENSOR-040', sensorId: 'LIGHT-G-001', sensorType: 'light', value: 380, unit: 'lux', timestamp: getCurrentTimestamp(), location: 'G区车间1', accuracy: 10, batteryLevel: 90, signalStrength: 89 },
  
  // H区传感器
  { id: 'SENSOR-041', sensorId: 'TEMP-H-001', sensorType: 'temperature', value: 21.8, unit: '°C', timestamp: getCurrentTimestamp(), location: 'H区仓库1', accuracy: 0.1, batteryLevel: 87, signalStrength: 85 },
  { id: 'SENSOR-042', sensorId: 'HUM-H-001', sensorType: 'humidity', value: 62.3, unit: '%', timestamp: getCurrentTimestamp(), location: 'H区仓库1', accuracy: 0.5, batteryLevel: 91, signalStrength: 88 },
  { id: 'SENSOR-043', sensorId: 'PRESS-H-001', sensorType: 'pressure', value: 1013.45, unit: 'hPa', timestamp: getCurrentTimestamp(), location: 'H区仓库1', accuracy: 0.01, batteryLevel: 83, signalStrength: 86 },
  { id: 'SENSOR-044', sensorId: 'MOTION-H-001', sensorType: 'motion', value: 1, unit: 'detected', timestamp: getCurrentTimestamp(), location: 'H区仓库1', accuracy: 1, batteryLevel: 94, signalStrength: 93 },
  { id: 'SENSOR-045', sensorId: 'LIGHT-H-001', sensorType: 'light', value: 420, unit: 'lux', timestamp: getCurrentTimestamp(), location: 'H区仓库1', accuracy: 10, batteryLevel: 89, signalStrength: 87 },
  
  // I区传感器
  { id: 'SENSOR-046', sensorId: 'TEMP-I-001', sensorType: 'temperature', value: 24.2, unit: '°C', timestamp: getCurrentTimestamp(), location: 'I区办公室1', accuracy: 0.1, batteryLevel: 93, signalStrength: 90 },
  { id: 'SENSOR-047', sensorId: 'HUM-I-001', sensorType: 'humidity', value: 55.8, unit: '%', timestamp: getCurrentTimestamp(), location: 'I区办公室1', accuracy: 0.5, batteryLevel: 88, signalStrength: 89 },
  { id: 'SENSOR-048', sensorId: 'PRESS-I-001', sensorType: 'pressure', value: 1012.89, unit: 'hPa', timestamp: getCurrentTimestamp(), location: 'I区办公室1', accuracy: 0.01, batteryLevel: 86, signalStrength: 88 },
  { id: 'SENSOR-049', sensorId: 'MOTION-I-001', sensorType: 'motion', value: 1, unit: 'detected', timestamp: getCurrentTimestamp(), location: 'I区办公室1', accuracy: 1, batteryLevel: 96, signalStrength: 94 },
  { id: 'SENSOR-050', sensorId: 'LIGHT-I-001', sensorType: 'light', value: 580, unit: 'lux', timestamp: getCurrentTimestamp(), location: 'I区办公室1', accuracy: 10, batteryLevel: 92, signalStrength: 91 },
  
  // J区传感器
  { id: 'SENSOR-051', sensorId: 'TEMP-J-001', sensorType: 'temperature', value: 22.7, unit: '°C', timestamp: getCurrentTimestamp(), location: 'J区会议室1', accuracy: 0.1, batteryLevel: 89, signalStrength: 86 },
  { id: 'SENSOR-052', sensorId: 'HUM-J-001', sensorType: 'humidity', value: 59.4, unit: '%', timestamp: getCurrentTimestamp(), location: 'J区会议室1', accuracy: 0.5, batteryLevel: 85, signalStrength: 87 },
  { id: 'SENSOR-053', sensorId: 'PRESS-J-001', sensorType: 'pressure', value: 1014.23, unit: 'hPa', timestamp: getCurrentTimestamp(), location: 'J区会议室1', accuracy: 0.01, batteryLevel: 84, signalStrength: 85 },
  { id: 'SENSOR-054', sensorId: 'MOTION-J-001', sensorType: 'motion', value: 0, unit: 'detected', timestamp: getCurrentTimestamp(), location: 'J区会议室1', accuracy: 1, batteryLevel: 97, signalStrength: 95 },
  { id: 'SENSOR-055', sensorId: 'LIGHT-J-001', sensorType: 'light', value: 650, unit: 'lux', timestamp: getCurrentTimestamp(), location: 'J区会议室1', accuracy: 10, batteryLevel: 91, signalStrength: 90 }
];

// 传输日志
export const transmissionLogs: TransmissionLog[] = [
  // A区设备传输日志
  { id: 'TRANS-001', deviceId: 'dev001', dataType: 'status', transmissionTime: getCurrentTimestamp(), status: 'success', dataSize: 1024, duration: 45, retryCount: 0 },
  { id: 'TRANS-002', deviceId: 'dev002', dataType: 'video', transmissionTime: getPastTimestamp(1), status: 'success', dataSize: 5120, duration: 120, retryCount: 0 },
  { id: 'TRANS-003', deviceId: 'dev003', dataType: 'sensor', transmissionTime: getPastTimestamp(2), status: 'success', dataSize: 256, duration: 23, retryCount: 0 },
  { id: 'TRANS-004', deviceId: 'dev004', dataType: 'audio', transmissionTime: getPastTimestamp(3), status: 'success', dataSize: 2048, duration: 67, retryCount: 0 },
  { id: 'TRANS-005', deviceId: 'dev005', dataType: 'status', transmissionTime: getPastTimestamp(4), status: 'success', dataSize: 1024, duration: 42, retryCount: 0 },
  
  // B区设备传输日志
  { id: 'TRANS-006', deviceId: 'dev006', dataType: 'video', transmissionTime: getPastTimestamp(5), status: 'success', dataSize: 6144, duration: 145, retryCount: 0 },
  { id: 'TRANS-007', deviceId: 'dev007', dataType: 'sensor', transmissionTime: getPastTimestamp(6), status: 'success', dataSize: 512, duration: 34, retryCount: 0 },
  { id: 'TRANS-008', deviceId: 'dev008', dataType: 'status', transmissionTime: getPastTimestamp(7), status: 'success', dataSize: 1024, duration: 48, retryCount: 0 },
  { id: 'TRANS-009', deviceId: 'dev009', dataType: 'audio', transmissionTime: getPastTimestamp(8), status: 'success', dataSize: 1536, duration: 56, retryCount: 0 },
  { id: 'TRANS-010', deviceId: 'dev010', dataType: 'video', transmissionTime: getPastTimestamp(9), status: 'success', dataSize: 4096, duration: 98, retryCount: 0 },
  
  // C区设备传输日志
  { id: 'TRANS-011', deviceId: 'dev011', dataType: 'sensor', transmissionTime: getPastTimestamp(10), status: 'success', dataSize: 768, duration: 67, retryCount: 0 },
  { id: 'TRANS-012', deviceId: 'dev012', dataType: 'status', transmissionTime: getPastTimestamp(11), status: 'success', dataSize: 1024, duration: 45, retryCount: 0 },
  { id: 'TRANS-013', deviceId: 'dev013', dataType: 'video', transmissionTime: getPastTimestamp(12), status: 'success', dataSize: 7168, duration: 167, retryCount: 0 },
  { id: 'TRANS-014', deviceId: 'dev014', dataType: 'audio', transmissionTime: getPastTimestamp(13), status: 'success', dataSize: 1792, duration: 78, retryCount: 0 },
  { id: 'TRANS-015', deviceId: 'dev015', dataType: 'sensor', transmissionTime: getPastTimestamp(14), status: 'success', dataSize: 384, duration: 29, retryCount: 0 },
  
  // D区设备传输日志
  { id: 'TRANS-016', deviceId: 'dev016', dataType: 'status', transmissionTime: getPastTimestamp(15), status: 'success', dataSize: 1024, duration: 51, retryCount: 0 },
  { id: 'TRANS-017', deviceId: 'dev017', dataType: 'video', transmissionTime: getPastTimestamp(16), status: 'success', dataSize: 3584, duration: 89, retryCount: 0 },
  { id: 'TRANS-018', deviceId: 'dev018', dataType: 'sensor', transmissionTime: getPastTimestamp(17), status: 'success', dataSize: 640, duration: 41, retryCount: 0 },
  { id: 'TRANS-019', deviceId: 'dev019', dataType: 'audio', transmissionTime: getPastTimestamp(18), status: 'success', dataSize: 1280, duration: 62, retryCount: 0 },
  { id: 'TRANS-020', deviceId: 'dev020', dataType: 'status', transmissionTime: getPastTimestamp(19), status: 'success', dataSize: 1024, duration: 47, retryCount: 0 },
  
  // E区设备传输日志
  { id: 'TRANS-021', deviceId: 'dev021', dataType: 'sensor', transmissionTime: getPastTimestamp(20), status: 'failed', dataSize: 0, duration: 0, retryCount: 3, errorMessage: '网络连接超时' },
  { id: 'TRANS-022', deviceId: 'dev022', dataType: 'status', transmissionTime: getPastTimestamp(21), status: 'retrying', dataSize: 0, duration: 0, retryCount: 2, errorMessage: '服务器响应超时' },
  { id: 'TRANS-023', deviceId: 'dev023', dataType: 'video', transmissionTime: getPastTimestamp(22), status: 'success', dataSize: 4608, duration: 112, retryCount: 0 },
  { id: 'TRANS-024', deviceId: 'dev024', dataType: 'audio', transmissionTime: getPastTimestamp(23), status: 'success', dataSize: 2304, duration: 95, retryCount: 0 },
  { id: 'TRANS-025', deviceId: 'dev025', dataType: 'sensor', transmissionTime: getPastTimestamp(24), status: 'success', dataSize: 896, duration: 58, retryCount: 0 },
  
  // F区设备传输日志
  { id: 'TRANS-026', deviceId: 'dev026', dataType: 'status', transmissionTime: getPastTimestamp(25), status: 'success', dataSize: 1024, duration: 44, retryCount: 0 },
  { id: 'TRANS-027', deviceId: 'dev027', dataType: 'video', transmissionTime: getPastTimestamp(26), status: 'success', dataSize: 5632, duration: 134, retryCount: 0 },
  { id: 'TRANS-028', deviceId: 'dev028', dataType: 'sensor', transmissionTime: getPastTimestamp(27), status: 'success', dataSize: 320, duration: 26, retryCount: 0 },
  { id: 'TRANS-029', deviceId: 'dev029', dataType: 'audio', transmissionTime: getPastTimestamp(28), status: 'success', dataSize: 1024, duration: 53, retryCount: 0 },
  { id: 'TRANS-030', deviceId: 'dev030', dataType: 'status', transmissionTime: getPastTimestamp(29), status: 'success', dataSize: 1024, duration: 49, retryCount: 0 },
  
  // 传感器数据传输日志
  { id: 'TRANS-031', deviceId: 'TEMP-A-001', dataType: 'temperature', transmissionTime: getPastTimestamp(30), status: 'success', dataSize: 64, duration: 12, retryCount: 0 },
  { id: 'TRANS-032', deviceId: 'HUM-A-001', dataType: 'humidity', transmissionTime: getPastTimestamp(31), status: 'success', dataSize: 64, duration: 11, retryCount: 0 },
  { id: 'TRANS-033', deviceId: 'PRESS-B-001', dataType: 'pressure', transmissionTime: getPastTimestamp(32), status: 'success', dataSize: 64, duration: 13, retryCount: 0 },
  { id: 'TRANS-034', deviceId: 'MOTION-C-001', dataType: 'motion', transmissionTime: getPastTimestamp(33), status: 'success', dataSize: 32, duration: 8, retryCount: 0 },
  { id: 'TRANS-035', deviceId: 'LIGHT-D-001', dataType: 'light', transmissionTime: getPastTimestamp(34), status: 'success', dataSize: 64, duration: 10, retryCount: 0 },
  
  // 系统数据传输日志
  { id: 'TRANS-036', deviceId: 'system_sync', dataType: 'sync_data', transmissionTime: getPastTimestamp(35), status: 'success', dataSize: 8192, duration: 234, retryCount: 0 },
  { id: 'TRANS-037', deviceId: 'sensor_system', dataType: 'sensor_batch', transmissionTime: getPastTimestamp(36), status: 'success', dataSize: 4096, duration: 156, retryCount: 0 },
  { id: 'TRANS-038', deviceId: 'alert_system', dataType: 'alert_data', transmissionTime: getPastTimestamp(37), status: 'success', dataSize: 512, duration: 34, retryCount: 0 },
  { id: 'TRANS-039', deviceId: 'report_system', dataType: 'report_data', transmissionTime: getPastTimestamp(38), status: 'success', dataSize: 16384, duration: 456, retryCount: 0 },
  { id: 'TRANS-040', deviceId: 'backup_system', dataType: 'backup_data', transmissionTime: getPastTimestamp(39), status: 'success', dataSize: 32768, duration: 789, retryCount: 0 },
  
  // G区设备传输日志
  { id: 'TRANS-041', deviceId: 'dev031', dataType: 'status', transmissionTime: getPastTimestamp(40), status: 'success', dataSize: 1024, duration: 46, retryCount: 0 },
  { id: 'TRANS-042', deviceId: 'dev032', dataType: 'sensor', transmissionTime: getPastTimestamp(41), status: 'success', dataSize: 512, duration: 35, retryCount: 0 },
  { id: 'TRANS-043', deviceId: 'dev033', dataType: 'audio', transmissionTime: getPastTimestamp(42), status: 'success', dataSize: 2048, duration: 68, retryCount: 0 },
  { id: 'TRANS-044', deviceId: 'dev034', dataType: 'video', transmissionTime: getPastTimestamp(43), status: 'success', dataSize: 6144, duration: 145, retryCount: 0 },
  { id: 'TRANS-045', deviceId: 'dev035', dataType: 'status', transmissionTime: getPastTimestamp(44), status: 'success', dataSize: 1024, duration: 43, retryCount: 0 },
  
  // H区设备传输日志
  { id: 'TRANS-046', deviceId: 'dev036', dataType: 'sensor', transmissionTime: getPastTimestamp(45), status: 'success', dataSize: 768, duration: 58, retryCount: 0 },
  { id: 'TRANS-047', deviceId: 'dev037', dataType: 'audio', transmissionTime: getPastTimestamp(46), status: 'success', dataSize: 1792, duration: 79, retryCount: 0 },
  { id: 'TRANS-048', deviceId: 'dev038', dataType: 'video', transmissionTime: getPastTimestamp(47), status: 'success', dataSize: 7168, duration: 167, retryCount: 0 },
  { id: 'TRANS-049', deviceId: 'dev039', dataType: 'status', transmissionTime: getPastTimestamp(48), status: 'success', dataSize: 1024, duration: 52, retryCount: 0 },
  { id: 'TRANS-050', deviceId: 'dev040', dataType: 'sensor', transmissionTime: getPastTimestamp(49), status: 'success', dataSize: 640, duration: 42, retryCount: 0 },
  
  // I区设备传输日志
  { id: 'TRANS-051', deviceId: 'dev041', dataType: 'video', transmissionTime: getPastTimestamp(50), status: 'success', dataSize: 4608, duration: 112, retryCount: 0 },
  { id: 'TRANS-052', deviceId: 'dev042', dataType: 'audio', transmissionTime: getPastTimestamp(51), status: 'success', dataSize: 2304, duration: 95, retryCount: 0 },
  { id: 'TRANS-053', deviceId: 'dev043', dataType: 'sensor', transmissionTime: getPastTimestamp(52), status: 'success', dataSize: 896, duration: 58, retryCount: 0 },
  { id: 'TRANS-054', deviceId: 'dev044', dataType: 'status', transmissionTime: getPastTimestamp(53), status: 'success', dataSize: 1024, duration: 48, retryCount: 0 },
  { id: 'TRANS-055', deviceId: 'dev045', dataType: 'video', transmissionTime: getPastTimestamp(54), status: 'success', dataSize: 5632, duration: 134, retryCount: 0 },
  
  // J区设备传输日志
  { id: 'TRANS-056', deviceId: 'dev046', dataType: 'sensor', transmissionTime: getPastTimestamp(55), status: 'success', dataSize: 320, duration: 26, retryCount: 0 },
  { id: 'TRANS-057', deviceId: 'dev047', dataType: 'audio', transmissionTime: getPastTimestamp(56), status: 'success', dataSize: 1024, duration: 53, retryCount: 0 },
  { id: 'TRANS-058', deviceId: 'dev048', dataType: 'video', transmissionTime: getPastTimestamp(57), status: 'success', dataSize: 4096, duration: 98, retryCount: 0 },
  { id: 'TRANS-059', deviceId: 'dev049', dataType: 'status', transmissionTime: getPastTimestamp(58), status: 'success', dataSize: 1024, duration: 49, retryCount: 0 },
  { id: 'TRANS-060', deviceId: 'dev050', dataType: 'sensor', transmissionTime: getPastTimestamp(59), status: 'success', dataSize: 384, duration: 31, retryCount: 0 },
  
  // 新增传感器数据传输日志
  { id: 'TRANS-061', deviceId: 'TEMP-G-001', dataType: 'temperature', transmissionTime: getPastTimestamp(60), status: 'success', dataSize: 64, duration: 12, retryCount: 0 },
  { id: 'TRANS-062', deviceId: 'HUM-G-001', dataType: 'humidity', transmissionTime: getPastTimestamp(61), status: 'success', dataSize: 64, duration: 11, retryCount: 0 },
  { id: 'TRANS-063', deviceId: 'PRESS-G-001', dataType: 'pressure', transmissionTime: getPastTimestamp(62), status: 'success', dataSize: 64, duration: 13, retryCount: 0 },
  { id: 'TRANS-064', deviceId: 'MOTION-G-001', dataType: 'motion', transmissionTime: getPastTimestamp(63), status: 'success', dataSize: 32, duration: 8, retryCount: 0 },
  { id: 'TRANS-065', deviceId: 'LIGHT-G-001', dataType: 'light', transmissionTime: getPastTimestamp(64), status: 'success', dataSize: 64, duration: 10, retryCount: 0 },
  
  // 更多系统数据传输日志
  { id: 'TRANS-066', deviceId: 'monitoring_system', dataType: 'monitor_data', transmissionTime: getPastTimestamp(65), status: 'success', dataSize: 2048, duration: 89, retryCount: 0 },
  { id: 'TRANS-067', deviceId: 'analytics_system', dataType: 'analytics_data', transmissionTime: getPastTimestamp(66), status: 'success', dataSize: 4096, duration: 123, retryCount: 0 },
  { id: 'TRANS-068', deviceId: 'notification_system', dataType: 'notification_data', transmissionTime: getPastTimestamp(67), status: 'success', dataSize: 256, duration: 15, retryCount: 0 },
  { id: 'TRANS-069', deviceId: 'logging_system', dataType: 'log_data', transmissionTime: getPastTimestamp(68), status: 'success', dataSize: 1024, duration: 45, retryCount: 0 },
  { id: 'TRANS-070', deviceId: 'metrics_system', dataType: 'metrics_data', transmissionTime: getPastTimestamp(69), status: 'success', dataSize: 512, duration: 23, retryCount: 0 }
];

// 完整的图表数据，包含原有和新增数据
export const chartData = {
  deviceStatus: [
    { status: '在线', count: devices.filter(d => d.status === 'online').length },
    { status: '离线', count: devices.filter(d => d.status === 'offline').length },
    { status: '警告', count: devices.filter(d => d.status === 'warning').length },
  ],
  safetyEventsByType: [
    { type: '火灾', count: safetyEvents.filter(e => e.type === 'fire').length },
    { type: '气体泄漏', count: safetyEvents.filter(e => e.type === 'gas').length },
    { type: '入侵', count: safetyEvents.filter(e => e.type === 'intrusion').length },
    { type: '紧急情况', count: safetyEvents.filter(e => e.type === 'emergency').length },
  ],
  dataTrend: [
    { time: '08:00', temperature: 22, humidity: 60 },
    { time: '10:00', temperature: 24, humidity: 62 },
    { time: '12:00', temperature: 26, humidity: 65 },
    { time: '14:00', temperature: 25.6, humidity: 65.2 },
    { time: '16:00', temperature: 24, humidity: 63 },
    { time: '18:00', temperature: 23, humidity: 61 },
  ],
  inspectionStats: [
    { status: '已完成', count: inspectionRecords.filter(r => r.status === 'completed').length },
    { status: '进行中', count: inspectionRecords.filter(r => r.status === 'in_progress').length },
    { status: '已安排', count: inspectionRecords.filter(r => r.status === 'scheduled').length },
    { status: '已逾期', count: inspectionRecords.filter(r => r.status === 'overdue').length },
  ],
  rectificationStats: [
    { status: '待处理', count: rectificationItems.filter(r => r.status === 'pending').length },
    { status: '处理中', count: rectificationItems.filter(r => r.status === 'in_progress').length },
    { status: '已完成', count: rectificationItems.filter(r => r.status === 'completed').length },
    { status: '已验证', count: rectificationItems.filter(r => r.status === 'verified').length },
  ],
  // 新增图表数据
  apiLogStats: [
    { status: '成功', count: apiLogs.filter(log => log.success).length },
    { status: '失败', count: apiLogs.filter(log => !log.success).length },
  ],
  fiveGCardStats: [
    { status: '激活', count: fiveGCards.filter(card => card.status === 'active').length },
    { status: '未激活', count: fiveGCards.filter(card => card.status === 'inactive').length },
    { status: '暂停', count: fiveGCards.filter(card => card.status === 'suspended').length },
  ],
  securityAuthStats: [
    { method: '密码', count: securityAuths.filter(auth => auth.authMethod === 'password').length },
    { method: '短信', count: securityAuths.filter(auth => auth.authMethod === 'sms').length },
    { method: '生物识别', count: securityAuths.filter(auth => auth.authMethod === 'biometric').length },
  ],
  sensorDataStats: [
    { type: '温度', count: sensorData.filter(sensor => sensor.sensorType === 'temperature').length },
    { type: '湿度', count: sensorData.filter(sensor => sensor.sensorType === 'humidity').length },
    { type: '压力', count: sensorData.filter(sensor => sensor.sensorType === 'pressure').length },
    { type: '运动', count: sensorData.filter(sensor => sensor.sensorType === 'motion').length },
  ]
}; 