import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/erp-platform.css';
import {
  Row,
  Col,
  Card,
  Tabs,
  Table,
  Button,
  Select,
  Input,
  Space,
  Avatar,
  Tag,
  Badge,
  Statistic,
  Progress,
  Timeline,
  Modal,
  Form,
  DatePicker,
  TreeSelect,
  Tooltip,
  Divider,
  Alert,
  message,
  Descriptions,
  Switch,
  Radio,
  Carousel,
  List,
  Empty,
  Drawer,
  Steps,
  Result,
  Popconfirm,
  Upload,
  Spin,
  Cascader,
  Typography
} from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  UserOutlined,
  ClusterOutlined,
  MonitorOutlined,
  ScheduleOutlined,
  FileTextOutlined,
  BarChartOutlined,
  BellOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FilterOutlined,
  ExportOutlined,
  ImportOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  CarOutlined,
  ToolOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  FireOutlined,
  WarningOutlined,
  CalendarOutlined,
  HomeOutlined,
  ShopOutlined,
  BankOutlined,
  RocketOutlined,
  CrownOutlined,
  StarOutlined,
  TrophyOutlined,
  GiftOutlined,
  HeartOutlined,
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  UploadOutlined,
  PrinterOutlined,
  CopyOutlined,
  ScissorOutlined,
  PaperClipOutlined,
  FolderOutlined,
  FileOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  AudioOutlined,
  CodeOutlined,
  BugOutlined,
  BuildOutlined,
  RobotOutlined,
  ThunderboltFilled,
  FireFilled,
  StarFilled,
  HeartFilled
} from '@ant-design/icons';
import { organizationUnits, users, devices, commands, safetyEvents } from '../data/mockData';
import dayjs from 'dayjs';

const { Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Step } = Steps;

// 地图可视化组件
const MapVisualization: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [mapView, setMapView] = useState<'devices' | 'personnel' | 'tasks' | 'emergencies' | 'routes'>('devices');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapCenter, setMapCenter] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // 重新设计的区域布局 - 更合理的空间分布
  const regions = [
    // 生产区域 - 左侧主要区域
    { 
      name: '生产厂区A区', 
      x: 50, y: 80, width: 280, height: 200, 
      color: '#1890ff', 
      buildings: ['1号车间', '2号车间', '主控室'],
      description: '主要生产区域，包含生产线和包装设备'
    },
    { 
      name: '生产厂区B区', 
      x: 380, y: 80, width: 280, height: 200, 
      color: '#52c41a', 
      buildings: ['3号车间', '4号车间', '配电室'],
      description: '装配和检测区域，包含装配线和检测设备'
    },
    // 办公区域 - 中央区域
    { 
      name: '行政楼', 
      x: 50, y: 320, width: 200, height: 120, 
      color: '#722ed1', 
      buildings: ['会议室', '办公室', '人事部'],
      description: '行政管理中心，包含办公和会议设施'
    },
    { 
      name: '研发楼', 
      x: 280, y: 320, width: 220, height: 120, 
      color: '#fa8c16', 
      buildings: ['实验室', '研发中心', '测试室'],
      description: '研发创新中心，包含实验室和测试设备'
    },
    // 安全区域 - 右侧区域
    { 
      name: '安全楼', 
      x: 530, y: 320, width: 180, height: 120, 
      color: '#f5222d', 
      buildings: ['安全中心', '监控室', '应急指挥'],
      description: '安全管理中心，包含监控和应急指挥设施'
    },
    // 仓储区域 - 右侧上方
    { 
      name: '仓库区', 
      x: 740, y: 80, width: 200, height: 160, 
      color: '#13c2c2', 
      buildings: ['原料库', '成品库', '设备库'],
      description: '仓储物流中心，包含各类仓库设施'
    },
    // 辅助设施 - 右侧下方
    { 
      name: '停车场', 
      x: 740, y: 280, width: 120, height: 80, 
      color: '#eb2f96', 
      buildings: ['员工停车场', '访客停车场'],
      description: '车辆停放区域，包含员工和访客停车场'
    },
    { 
      name: '食堂', 
      x: 740, y: 380, width: 120, height: 60, 
      color: '#faad14', 
      buildings: ['员工食堂', '小餐厅'],
      description: '餐饮服务区域，包含员工食堂和小餐厅'
    }
  ];

  // 重新设计的地图数据 - 更合理的设备分布
  const mapData: any = {
    devices: [
      // 生产厂区A区 - 1号车间 (左上角区域)
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `device_a1_${i + 1}`,
        name: `生产线${i + 1}号机`,
        status: Math.random() > 0.1 ? 'online' : 'offline',
        x: 80 + (i % 4) * 50,
        y: 120 + Math.floor(i / 4) * 40,
        region: '生产厂区A区',
        building: '1号车间',
        floor: 1,
        room: i + 1,
        type: 'production_line',
        temperature: Math.floor(Math.random() * 20) + 60,
        pressure: Math.floor(Math.random() * 50) + 100,
        vibration: Math.floor(Math.random() * 10) + 2
      })),
      // 生产厂区A区 - 2号车间 (左下角区域)
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `device_a2_${i + 1}`,
        name: `包装机${i + 1}号`,
        status: Math.random() > 0.08 ? 'online' : 'offline',
        x: 80 + (i % 3) * 60,
        y: 220 + Math.floor(i / 3) * 35,
        region: '生产厂区A区',
        building: '2号车间',
        floor: 1,
        room: i + 1,
        type: 'packaging_machine',
        temperature: Math.floor(Math.random() * 15) + 45,
        pressure: Math.floor(Math.random() * 30) + 80,
        vibration: Math.floor(Math.random() * 8) + 1
      })),
      // 生产厂区A区 - 主控室 (中央上方)
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `control_${i + 1}`,
        name: `控制台${i + 1}号`,
        status: Math.random() > 0.02 ? 'online' : 'offline',
        x: 200 + (i % 2) * 40,
        y: 100 + Math.floor(i / 2) * 30,
        region: '生产厂区A区',
        building: '主控室',
        floor: 2,
        room: i + 1,
        type: 'control_panel',
        temperature: Math.floor(Math.random() * 8) + 22,
        pressure: Math.floor(Math.random() * 5) + 101,
        vibration: Math.floor(Math.random() * 2) + 1
      })),
      // 生产厂区B区 - 3号车间 (右上角区域)
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `device_b3_${i + 1}`,
        name: `装配线${i + 1}号`,
        status: Math.random() > 0.12 ? 'online' : 'offline',
        x: 420 + (i % 5) * 45,
        y: 120 + Math.floor(i / 5) * 35,
        region: '生产厂区B区',
        building: '3号车间',
        floor: 1,
        room: i + 1,
        type: 'assembly_line',
        temperature: Math.floor(Math.random() * 25) + 55,
        pressure: Math.floor(Math.random() * 40) + 90,
        vibration: Math.floor(Math.random() * 12) + 3
      })),
      // 生产厂区B区 - 4号车间 (右下角区域)
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `device_b4_${i + 1}`,
        name: `检测设备${i + 1}号`,
        status: Math.random() > 0.05 ? 'online' : 'offline',
        x: 420 + (i % 4) * 50,
        y: 220 + Math.floor(i / 4) * 30,
        region: '生产厂区B区',
        building: '4号车间',
        floor: 1,
        room: i + 1,
        type: 'testing_equipment',
        temperature: Math.floor(Math.random() * 10) + 35,
        pressure: Math.floor(Math.random() * 20) + 60,
        vibration: Math.floor(Math.random() * 5) + 1
      })),
      // 生产厂区B区 - 配电室 (中央下方)
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `power_${i + 1}`,
        name: `配电柜${i + 1}号`,
        status: Math.random() > 0.03 ? 'online' : 'offline',
        x: 520 + (i % 2) * 35,
        y: 240 + Math.floor(i / 2) * 25,
        region: '生产厂区B区',
        building: '配电室',
        floor: 1,
        room: i + 1,
        type: 'power_distribution',
        temperature: Math.floor(Math.random() * 15) + 40,
        pressure: Math.floor(Math.random() * 10) + 220,
        vibration: Math.floor(Math.random() * 3) + 1
      })),
      // 研发楼 (中央区域)
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `lab_${i + 1}`,
        name: `实验台${i + 1}号`,
        status: Math.random() > 0.04 ? 'online' : 'offline',
        x: 320 + (i % 3) * 50,
        y: 360 + Math.floor(i / 3) * 30,
        region: '研发楼',
        building: '实验室',
        floor: Math.floor(Math.random() * 3) + 1,
        room: i + 1,
        type: 'laboratory_equipment',
        temperature: Math.floor(Math.random() * 12) + 20,
        pressure: Math.floor(Math.random() * 8) + 101,
        vibration: Math.floor(Math.random() * 3) + 1
      })),
      // 行政楼 (左侧中央)
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `admin_${i + 1}`,
        name: `办公设备${i + 1}号`,
        status: Math.random() > 0.1 ? 'online' : 'offline',
        x: 100 + (i % 3) * 40,
        y: 360 + Math.floor(i / 3) * 25,
        region: '行政楼',
        building: '办公室',
        floor: Math.floor(Math.random() * 4) + 1,
        room: i + 1,
        type: 'office_equipment',
        temperature: Math.floor(Math.random() * 6) + 22,
        pressure: Math.floor(Math.random() * 3) + 101,
        vibration: Math.floor(Math.random() * 2) + 1
      })),
      // 安全楼 (右侧中央)
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `security_${i + 1}`,
        name: `监控设备${i + 1}号`,
        status: Math.random() > 0.01 ? 'online' : 'offline',
        x: 580 + (i % 4) * 35,
        y: 360 + Math.floor(i / 4) * 25,
        region: '安全楼',
        building: '安全中心',
        floor: Math.floor(Math.random() * 2) + 1,
        room: i + 1,
        type: 'security_equipment',
        temperature: Math.floor(Math.random() * 8) + 20,
        pressure: Math.floor(Math.random() * 4) + 101,
        vibration: Math.floor(Math.random() * 2) + 1
      })),
      // 仓库区 (最右侧)
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `warehouse_${i + 1}`,
        name: `仓储设备${i + 1}号`,
        status: Math.random() > 0.06 ? 'online' : 'offline',
        x: 780 + (i % 3) * 50,
        y: 120 + Math.floor(i / 3) * 40,
        region: '仓库区',
        building: '原料库',
        floor: 1,
        room: i + 1,
        type: 'warehouse_equipment',
        temperature: Math.floor(Math.random() * 10) + 18,
        pressure: Math.floor(Math.random() * 5) + 101,
        vibration: Math.floor(Math.random() * 3) + 1
      }))
    ],
    personnel: [
      // 生产部人员 - 分布在生产车间内部，减少密度
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `prod_${i + 1}`,
        name: `生产员工${i + 1}`,
        x: i < 8 ? 80 + (i % 4) * 50 + Math.random() * 20 : 420 + ((i - 8) % 4) * 45 + Math.random() * 20,
        y: i < 8 ? 120 + Math.floor(i / 4) * 40 + Math.random() * 15 : 120 + Math.floor((i - 8) / 4) * 35 + Math.random() * 15,
        currentTask: ['设备操作', '质量检查', '产品包装', '设备维护', '生产监控', '物料搬运', '清洁工作', '安全检查'][Math.floor(Math.random() * 8)],
        region: i < 8 ? '生产厂区A区' : '生产厂区B区',
        department: '生产部',
        status: ['在线', '忙碌', '休息中', '培训中'][Math.floor(Math.random() * 4)],
        lastUpdate: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
        shift: ['早班', '中班', '晚班'][Math.floor(Math.random() * 3)],
        experience: Math.floor(Math.random() * 10) + 1
      })),
      // 技术部人员 - 分布在主控室和研发楼内部
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `tech_${i + 1}`,
        name: `技术人员${i + 1}`,
        x: i < 4 ? 200 + (i % 2) * 40 + Math.random() * 15 : 320 + ((i - 4) % 3) * 50 + Math.random() * 20,
        y: i < 4 ? 100 + Math.floor(i / 2) * 30 + Math.random() * 10 : 360 + Math.floor((i - 4) / 3) * 30 + Math.random() * 15,
        currentTask: ['设备调试', '系统维护', '故障排除', '技术培训', '设备升级', '性能优化', '数据采集', '技术咨询'][Math.floor(Math.random() * 8)],
        region: i < 4 ? '生产厂区A区' : '研发楼',
        department: '技术部',
        status: ['在线', '忙碌', '会议中', '外出'][Math.floor(Math.random() * 4)],
        lastUpdate: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
        shift: ['白班', '值班'][Math.floor(Math.random() * 2)],
        experience: Math.floor(Math.random() * 15) + 3
      })),
      // 安全部人员 - 分布在安全楼内部
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `security_${i + 1}`,
        name: `安全员${i + 1}`,
        x: 580 + (i % 4) * 35 + Math.random() * 15,
        y: 360 + Math.floor(i / 4) * 25 + Math.random() * 10,
        currentTask: ['安全巡检', '应急演练', '安全检查', '安全培训', '事故调查', '安全评估', '消防检查', '应急预案'][Math.floor(Math.random() * 8)],
        region: '安全楼',
        department: '安全部',
        status: ['在线', '忙碌', '巡逻中', '培训中'][Math.floor(Math.random() * 4)],
        lastUpdate: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
        shift: ['白班', '夜班', '值班'][Math.floor(Math.random() * 3)],
        experience: Math.floor(Math.random() * 12) + 2
      })),
      // 行政部人员 - 分布在行政楼内部
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `admin_${i + 1}`,
        name: `行政人员${i + 1}`,
        x: 100 + (i % 3) * 40 + Math.random() * 15,
        y: 360 + Math.floor(i / 3) * 25 + Math.random() * 10,
        currentTask: ['文件处理', '会议安排', '接待访客', '办公用品管理', '档案整理', '后勤保障', '人事协调', '行政事务'][Math.floor(Math.random() * 8)],
        region: '行政楼',
        department: '行政部',
        status: ['在线', '忙碌', '会议中', '外出'][Math.floor(Math.random() * 4)],
        lastUpdate: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
        shift: ['白班'],
        experience: Math.floor(Math.random() * 8) + 1
      })),
      // 研发部人员 - 分布在研发楼内部
      ...Array.from({ length: 12 }, (_, i) => ({
        id: `rd_${i + 1}`,
        name: `研发人员${i + 1}`,
        x: 320 + (i % 3) * 50 + Math.random() * 20,
        y: 360 + Math.floor(i / 3) * 30 + Math.random() * 15,
        currentTask: ['产品研发', '技术攻关', '实验测试', '数据分析', '方案设计', '技术评审', '专利申请', '技术交流'][Math.floor(Math.random() * 8)],
        region: '研发楼',
        department: '研发部',
        status: ['在线', '忙碌', '会议中', '实验中'][Math.floor(Math.random() * 4)],
        lastUpdate: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
        shift: ['白班', '加班'][Math.floor(Math.random() * 2)],
        experience: Math.floor(Math.random() * 20) + 5
      })),
      // 质检部人员 - 分布在生产厂区B区内部
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `qc_${i + 1}`,
        name: `质检员${i + 1}`,
        x: 420 + (i % 4) * 50 + Math.random() * 15,
        y: 220 + Math.floor(i / 4) * 30 + Math.random() * 10,
        currentTask: ['质量检测', '产品检验', '质量分析', '检测报告', '质量培训', '标准制定', '质量改进', '不合格品处理'][Math.floor(Math.random() * 8)],
        region: '生产厂区B区',
        department: '质检部',
        status: ['在线', '忙碌', '检测中', '培训中'][Math.floor(Math.random() * 4)],
        lastUpdate: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
        shift: ['早班', '中班', '晚班'][Math.floor(Math.random() * 3)],
        experience: Math.floor(Math.random() * 10) + 2
      })),
      // 维护部人员 - 分布在各个区域内部
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `maintenance_${i + 1}`,
        name: `维护员${i + 1}`,
        x: i < 4 ? 80 + (i % 2) * 60 + Math.random() * 20 : 
           i < 8 ? 420 + ((i - 4) % 2) * 50 + Math.random() * 20 : 
           520 + ((i - 8) % 2) * 35 + Math.random() * 15,
        y: i < 4 ? 220 + Math.floor(i / 2) * 35 + Math.random() * 15 : 
           i < 8 ? 220 + Math.floor((i - 4) / 2) * 30 + Math.random() * 15 : 
           240 + Math.floor((i - 8) / 2) * 25 + Math.random() * 10,
        currentTask: ['设备维护', '预防性保养', '故障维修', '设备调试', '备件管理', '维护记录', '技术培训', '设备改造'][Math.floor(Math.random() * 8)],
        region: i < 4 ? '生产厂区A区' : i < 8 ? '生产厂区B区' : '生产厂区B区',
        department: '维护部',
        status: ['在线', '忙碌', '维修中', '培训中'][Math.floor(Math.random() * 4)],
        lastUpdate: new Date(Date.now() - Math.random() * 300000).toLocaleTimeString(),
        shift: ['白班', '夜班', '值班'][Math.floor(Math.random() * 3)],
        experience: Math.floor(Math.random() * 15) + 3
      }))
    ],
    tasks: [
      // 生产任务
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `task_prod_${i + 1}`,
        title: `生产任务${i + 1}`,
        description: `生产${['电机', '控制器', '传感器', '外壳', '电路板', '连接器', '散热器', '包装'][i]}产品`,
        status: ['pending', 'in_progress', 'completed'][Math.floor(Math.random() * 3)],
        priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)],
        assignee: `生产员工${Math.floor(Math.random() * 15) + 1}`,
        location: i < 4 ? '生产厂区A区' : '生产厂区B区',
        x: i < 4 ? 80 + (i % 2) * 100 + Math.random() * 30 : 420 + ((i - 4) % 2) * 100 + Math.random() * 30,
        y: i < 4 ? 120 + Math.floor(i / 2) * 40 + Math.random() * 20 : 120 + Math.floor((i - 4) / 2) * 40 + Math.random() * 20,
        progress: Math.floor(Math.random() * 100),
        estimatedTime: `${Math.floor(Math.random() * 8) + 2}小时`,
        deadline: new Date(Date.now() + Math.random() * 86400000).toLocaleDateString(),
        department: '生产部'
      })),
      // 维护任务
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `task_maintenance_${i + 1}`,
        title: `维护任务${i + 1}`,
        description: `${['设备保养', '故障维修', '预防性维护', '设备调试', '备件更换', '技术升级'][i]}`,
        status: ['pending', 'in_progress', 'completed'][Math.floor(Math.random() * 3)],
        priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)],
        assignee: `维护员${Math.floor(Math.random() * 10) + 1}`,
        location: i < 3 ? '生产厂区A区' : '生产厂区B区',
        x: i < 3 ? 80 + (i % 3) * 80 + Math.random() * 40 : 420 + ((i - 3) % 3) * 80 + Math.random() * 40,
        y: i < 3 ? 220 + Math.floor(i / 3) * 35 + Math.random() * 20 : 220 + Math.floor((i - 3) / 3) * 35 + Math.random() * 20,
        progress: Math.floor(Math.random() * 100),
        estimatedTime: `${Math.floor(Math.random() * 4) + 1}小时`,
        deadline: new Date(Date.now() + Math.random() * 43200000).toLocaleDateString(),
        department: '维护部'
      })),
      // 研发任务
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `task_rd_${i + 1}`,
        title: `研发任务${i + 1}`,
        description: `${['产品设计', '技术攻关', '实验测试', '数据分析', '方案优化'][i]}`,
        status: ['pending', 'in_progress', 'completed'][Math.floor(Math.random() * 3)],
        priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)],
        assignee: `研发人员${Math.floor(Math.random() * 12) + 1}`,
        location: '研发楼',
        x: 320 + (i % 3) * 50 + Math.random() * 30,
        y: 360 + Math.floor(i / 3) * 30 + Math.random() * 20,
        progress: Math.floor(Math.random() * 100),
        estimatedTime: `${Math.floor(Math.random() * 24) + 8}小时`,
        deadline: new Date(Date.now() + Math.random() * 172800000).toLocaleDateString(),
        department: '研发部'
      })),
      // 安全任务
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `task_security_${i + 1}`,
        title: `安全任务${i + 1}`,
        description: `${['安全巡检', '应急演练', '安全检查', '安全培训'][i]}`,
        status: ['pending', 'in_progress', 'completed'][Math.floor(Math.random() * 3)],
        priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)],
        assignee: `安全员${Math.floor(Math.random() * 8) + 1}`,
        location: '安全楼',
        x: 580 + (i % 2) * 35 + Math.random() * 20,
        y: 360 + Math.floor(i / 2) * 25 + Math.random() * 15,
        progress: Math.floor(Math.random() * 100),
        estimatedTime: `${Math.floor(Math.random() * 6) + 2}小时`,
        deadline: new Date(Date.now() + Math.random() * 86400000).toLocaleDateString(),
        department: '安全部'
      }))
    ],
    emergencies: [
      // 设备故障
      ...Array.from({ length: 3 }, (_, i) => ({
        id: `emergency_equipment_${i + 1}`,
        type: 'equipment',
        level: ['low', 'high', 'urgent'][i],
        title: `设备故障${i + 1}`,
        description: `${['温度异常', '压力过高', '振动异常'][i]}，需要立即处理`,
        status: ['active', 'investigating', 'resolved'][Math.floor(Math.random() * 3)],
        location: i < 2 ? '生产厂区A区' : '生产厂区B区',
        x: i < 2 ? 80 + (i % 2) * 100 + Math.random() * 30 : 420 + Math.random() * 50,
        y: i < 2 ? 120 + Math.floor(i / 2) * 40 + Math.random() * 20 : 120 + Math.random() * 30,
        time: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
        responseTeam: ['技术部', '维护部', '安全部'][Math.floor(Math.random() * 3)],
        eta: `${Math.floor(Math.random() * 10) + 5}分钟`,
        department: '技术部'
      })),
      // 安全事件
      ...Array.from({ length: 2 }, (_, i) => ({
        id: `emergency_safety_${i + 1}`,
        type: 'safety',
        level: ['high', 'urgent'][i],
        title: `安全事件${i + 1}`,
        description: `${['人员受伤', '火灾隐患'][i]}，需要紧急响应`,
        status: ['active', 'investigating'][Math.floor(Math.random() * 2)],
        location: i === 0 ? '生产厂区A区' : '安全楼',
        x: i === 0 ? 80 + Math.random() * 50 : 580 + Math.random() * 30,
        y: i === 0 ? 220 + Math.random() * 30 : 360 + Math.random() * 20,
        time: new Date(Date.now() - Math.random() * 1800000).toLocaleTimeString(),
        responseTeam: '安全部',
        eta: `${Math.floor(Math.random() * 5) + 2}分钟`,
        department: '安全部'
      })),
      // 环境事件
      ...Array.from({ length: 2 }, (_, i) => ({
        id: `emergency_environment_${i + 1}`,
        type: 'environment',
        level: ['medium', 'high'][i],
        title: `环境事件${i + 1}`,
        description: `${['噪音超标', '粉尘浓度过高'][i]}，需要环境监测`,
        status: ['active', 'investigating'][Math.floor(Math.random() * 2)],
        location: i === 0 ? '生产厂区B区' : '研发楼',
        x: i === 0 ? 420 + Math.random() * 50 : 320 + Math.random() * 40,
        y: i === 0 ? 220 + Math.random() * 30 : 360 + Math.random() * 20,
        time: new Date(Date.now() - Math.random() * 2700000).toLocaleTimeString(),
        responseTeam: ['安全部', '技术部'][Math.floor(Math.random() * 2)],
        eta: `${Math.floor(Math.random() * 8) + 3}分钟`,
        department: '安全部'
      }))
    ],
    routes: [
      // 主要运输路线
      {
        id: 'route_main',
        name: '主要运输路线',
        status: 'active',
        points: [
          { x: 100, y: 200 },
          { x: 300, y: 200 },
          { x: 500, y: 200 },
          { x: 700, y: 200 }
        ]
      },
      // 人员流动路线
      {
        id: 'route_personnel',
        name: '人员流动路线',
        status: 'active',
        points: [
          { x: 200, y: 100 },
          { x: 200, y: 300 },
          { x: 200, y: 400 }
        ]
      },
      // 应急响应路线
      {
        id: 'route_emergency',
        name: '应急响应路线',
        status: 'active',
        points: [
          { x: 580, y: 360 },
          { x: 400, y: 300 },
          { x: 200, y: 200 },
          { x: 100, y: 150 }
        ]
      }
    ]
  };

  // 实时刷新处理函数
  const handleRefresh = () => {
    setIsRefreshing(true);
    message.loading('正在刷新地图数据...');
    setTimeout(() => {
      setIsRefreshing(false);
      message.success('地图数据刷新完成');
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      online: '#52c41a',
      offline: '#ff4d4f',
      warning: '#faad14',
      active: '#ff4d4f',
      pending: '#faad14',
      in_progress: '#1890ff',
      completed: '#52c41a',
      resolved: '#52c41a',
      investigating: '#722ed1',
      '在线': '#52c41a',
      '忙碌': '#faad14',
      '离线': '#ff4d4f',
      '会议中': '#722ed1'
    };
    return colors[status as keyof typeof colors] || '#d9d9d9';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: '#52c41a',
      medium: '#faad14',
      high: '#ff7a45',
      urgent: '#ff4d4f'
    };
    return colors[priority as keyof typeof colors] || '#d9d9d9';
  };

  const getEmergencyIcon = (type: string) => {
    const icons = {
      fire: '🔥',
      equipment: '⚙️',
      safety: '⚠️',
      medical: '🏥'
    };
    return icons[type as keyof typeof icons] || '🚨';
  };

  const handleMapClick = (item: any) => {
    setSelectedLocation(item);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.5));
  };

  const renderMapItems = () => {
    let displayData: any[] = [];
    
    if (mapView === 'devices') {
      // 设备视图 - 智能显示，避免过度拥挤
      const keyDevices = mapData.devices.filter((d: any) => 
        d.status === 'offline' || 
        d.type === 'control_panel' || 
        d.type === 'power_distribution' ||
        d.type === 'security_equipment'
      );
      
      // 按区域分组显示设备，每个区域限制显示数量
      const devicesByRegion: { [key: string]: any[] } = {};
      mapData.devices.forEach((device: any) => {
        if (!devicesByRegion[device.region]) {
          devicesByRegion[device.region] = [];
        }
        devicesByRegion[device.region].push(device);
      });

      Object.entries(devicesByRegion).forEach(([region, devices]) => {
        const onlineDevices = devices.filter((d: any) => d.status === 'online').slice(0, 6);
        const regionDevices = [...keyDevices.filter((d: any) => d.region === region), ...onlineDevices].slice(0, 10);
        displayData.push(...regionDevices);
      });
    } else if (mapView === 'personnel') {
      // 人员视图 - 智能显示关键人员
      const keyPersonnel = mapData.personnel.filter((p: any) => 
        p.status === '忙碌' || 
        p.department === '安全部' || 
        p.department === '维护部' ||
        p.currentTask.includes('应急') ||
        p.currentTask.includes('故障')
      );
      
      // 按部门分组显示人员，每个部门限制显示数量
      const personnelByDept: { [key: string]: any[] } = {};
      mapData.personnel.forEach((person: any) => {
        if (!personnelByDept[person.department]) {
          personnelByDept[person.department] = [];
        }
        personnelByDept[person.department].push(person);
      });

      Object.entries(personnelByDept).forEach(([dept, personnel]) => {
        const onlinePersonnel = personnel.filter((p: any) => p.status === '在线').slice(0, 4);
        const deptPersonnel = [...keyPersonnel.filter((p: any) => p.department === dept), ...onlinePersonnel].slice(0, 6);
        displayData.push(...deptPersonnel);
      });
    } else if (mapView === 'tasks') {
      // 任务视图 - 只显示进行中和高优先级任务
      displayData = mapData.tasks.filter((t: any) => 
        t.status === 'in_progress' || 
        t.priority === 'high' || 
        t.priority === 'urgent'
      );
    } else if (mapView === 'emergencies') {
      // 应急事件视图 - 显示所有应急事件
      displayData = mapData.emergencies;
    }
    
    return displayData.map((item: any, index: number) => {
      let size = 16;
      let icon = '';
      let borderWidth = 2;
      
      if (mapView === 'emergencies') {
        size = item.level === 'urgent' ? 28 : item.level === 'high' ? 24 : 20;
        icon = getEmergencyIcon(item.type);
        borderWidth = item.level === 'urgent' ? 3 : 2;
      } else if (mapView === 'devices') {
        size = item.status === 'offline' ? 22 : item.type === 'control_panel' ? 20 : 16;
        borderWidth = item.status === 'offline' ? 3 : 2;
      } else if (mapView === 'personnel') {
        size = item.status === '忙碌' ? 20 : item.department === '安全部' ? 18 : 14;
        borderWidth = item.status === '忙碌' ? 3 : 2;
      } else if (mapView === 'tasks') {
        size = item.priority === 'urgent' ? 22 : item.priority === 'high' ? 18 : 14;
        borderWidth = item.priority === 'urgent' ? 3 : 2;
      }
      
      return (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: (item.x + mapCenter.x) * zoomLevel,
            top: (item.y + mapCenter.y) * zoomLevel,
            width: size,
            height: size,
            borderRadius: mapView === 'emergencies' ? '4px' : '50%',
            backgroundColor: getStatusColor(item.status || item.priority),
            border: `${borderWidth}px solid #fff`,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: size > 16 ? '12px' : '10px',
            fontWeight: 'bold',
            color: '#fff',
            transition: 'all 0.2s ease',
            transform: selectedLocation?.id === item.id ? 'scale(1.2)' : 'scale(1)'
          }}
          onClick={() => handleMapClick(item)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = selectedLocation?.id === item.id ? 'scale(1.2)' : 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
          }}
        >
          <Tooltip 
            title={
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {item.name || item.title || item.type}
                </div>
                <div>位置: {item.region || item.location || item.department}</div>
                <div>状态: {item.status || item.priority}</div>
                {item.currentTask && <div>任务: {item.currentTask}</div>}
                {item.temperature && <div>温度: {item.temperature}°C</div>}
              </div>
            }
            placement="top"
          >
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon}
            </div>
          </Tooltip>
        </div>
      );
    });
  };

  const renderRoutes = () => {
    if (!showRoutes) return null;
    
    return mapData.routes.map((route: any, index: number) => (
      <svg
        key={route.id}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 500,
          pointerEvents: 'none'
        }}
      >
        <path
          d={`M ${route.points.map((p: any, i: number) => `${(p.x + mapCenter.x) * zoomLevel} ${(p.y + mapCenter.y) * zoomLevel}`).join(' L ')}`}
          stroke={route.status === 'active' ? '#1890ff' : '#d9d9d9'}
          strokeWidth="3"
          fill="none"
          strokeDasharray={route.status === 'active' ? 'none' : '5,5'}
          opacity={route.status === 'active' ? 0.8 : 0.4}
        />
        {route.points.map((point: any, i: number) => (
          <circle
            key={i}
            cx={(point.x + mapCenter.x) * zoomLevel}
            cy={(point.y + mapCenter.y) * zoomLevel}
            r="4"
            fill={route.status === 'active' ? '#1890ff' : '#d9d9d9'}
            opacity={route.status === 'active' ? 0.8 : 0.4}
          />
        ))}
      </svg>
    ));
  };

  const renderHeatmap = () => {
    if (!showHeatmap) return null;
    
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 150px 150px, rgba(255, 0, 0, 0.2) 0%, transparent 40%), 
          radial-gradient(circle at 450px 200px, rgba(255, 165, 0, 0.15) 0%, transparent 35%), 
          radial-gradient(circle at 750px 250px, rgba(255, 255, 0, 0.1) 0%, transparent 30%),
          radial-gradient(circle at 300px 350px, rgba(0, 255, 0, 0.1) 0%, transparent 25%)
        `,
        zIndex: 300,
        pointerEvents: 'none'
      }} />
    );
  };

  // 拖拽处理函数
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapCenter.x, y: e.clientY - mapCenter.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapCenter({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev * delta)));
  };

  return (
    <div>
      {/* 控制面板 */}
      <div style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col>
            <Space>
              <span>地图视图：</span>
              <Radio.Group value={mapView} onChange={(e) => setMapView(e.target.value)}>
                <Radio.Button value="devices">设备分布</Radio.Button>
                <Radio.Button value="personnel">人员位置</Radio.Button>
                <Radio.Button value="tasks">任务分配</Radio.Button>
                <Radio.Button value="emergencies">应急事件</Radio.Button>
                <Radio.Button value="routes">路径规划</Radio.Button>
              </Radio.Group>
            </Space>
          </Col>
          <Col>
            <Space>
              <Switch checked={showHeatmap} onChange={setShowHeatmap} />
              <span>热力图</span>
              <Switch checked={showRoutes} onChange={setShowRoutes} />
              <span>路径显示</span>
            </Space>
          </Col>
          <Col>
            <Space>
              <Button size="small" onClick={handleZoomOut} disabled={zoomLevel <= 0.5}>-</Button>
              <span>{Math.round(zoomLevel * 100)}%</span>
              <Button size="small" onClick={handleZoomIn} disabled={zoomLevel >= 3}>+</Button>
            </Space>
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<SyncOutlined spin={isRefreshing} />} 
              size="small"
              onClick={handleRefresh}
              loading={isRefreshing}
            >
              实时刷新
            </Button>
          </Col>
          <Col>
            <Button 
              size="small"
              onClick={() => {
                setMapCenter({ x: 0, y: 0 });
                setZoomLevel(1);
              }}
            >
              重置视图
            </Button>
          </Col>
        </Row>
      </div>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="在线设备"
              value={mapData.devices.filter((d: any) => d.status === 'online').length}
              suffix={`/${mapData.devices.length}`}
              valueStyle={{ color: '#52c41a' }}
            />
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              在线率: {Math.round((mapData.devices.filter((d: any) => d.status === 'online').length / mapData.devices.length) * 100)}%
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="在线人员"
              value={mapData.personnel.filter((p: any) => p.status === '在线').length}
              suffix={`/${mapData.personnel.length}`}
              valueStyle={{ color: '#1890ff' }}
            />
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              在线率: {Math.round((mapData.personnel.filter((p: any) => p.status === '在线').length / mapData.personnel.length) * 100)}%
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="进行中任务"
              value={mapData.tasks.filter((t: any) => t.status === 'in_progress').length}
              suffix={`/${mapData.tasks.length}`}
              valueStyle={{ color: '#faad14' }}
            />
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              完成率: {Math.round((mapData.tasks.filter((t: any) => t.status === 'completed').length / mapData.tasks.length) * 100)}%
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="应急事件"
              value={mapData.emergencies.filter((e: any) => e.status === 'active').length}
              suffix={`/${mapData.emergencies.length}`}
              valueStyle={{ color: '#ff4d4f' }}
            />
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              处理率: {Math.round((mapData.emergencies.filter((e: any) => e.status === 'resolved').length / mapData.emergencies.length) * 100)}%
            </div>
          </Card>
        </Col>
      </Row>

      {/* 地图容器 */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: 600, 
          border: '1px solid #d9d9d9', 
          borderRadius: 8, 
          overflow: 'hidden',
          background: '#fafafa',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* 地图背景 */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'linear-gradient(45deg, #f0f2f5 25%, transparent 25%), linear-gradient(-45deg, #f0f2f5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f2f5 75%), linear-gradient(-45deg, transparent 75%, #f0f2f5 75%)',
          backgroundSize: '20px 20px',
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left'
        }}>
          {/* 区域划分 */}
          {regions.map((region, index) => (
            <div 
              key={region.name}
              style={{ 
                position: 'absolute', 
                top: region.y, 
                left: region.x, 
                width: region.width, 
                height: region.height, 
                border: `2px dashed ${region.color}`, 
                borderRadius: 8,
                background: `${region.color}10`,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${region.color}20`;
                e.currentTarget.style.border = `2px solid ${region.color}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${region.color}10`;
                e.currentTarget.style.border = `2px dashed ${region.color}`;
              }}
            >
              <div style={{ 
                padding: '8px 12px', 
                background: `${region.color}20`, 
                borderRadius: 6,
                border: `1px solid ${region.color}30`
              }}>
                <div style={{ fontSize: 12, color: region.color, fontWeight: 'bold', marginBottom: 4 }}>
                  {region.name}
                </div>
                <div style={{ fontSize: 10, color: region.color + '80' }}>
                  {region.buildings.join('、')}
                </div>
                <div style={{ fontSize: 9, color: region.color + '60', marginTop: 2 }}>
                  {region.description}
                </div>
              </div>
            </div>
          ))}

          {/* 道路网络 */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100 }}>
            <path d="M 100 200 L 700 200" stroke="#d9d9d9" strokeWidth="2" strokeDasharray="5,5" />
            <path d="M 100 300 L 700 300" stroke="#d9d9d9" strokeWidth="2" strokeDasharray="5,5" />
            <path d="M 200 100 L 200 400" stroke="#d9d9d9" strokeWidth="2" strokeDasharray="5,5" />
            <path d="M 400 100 L 400 400" stroke="#d9d9d9" strokeWidth="2" strokeDasharray="5,5" />
            <path d="M 600 100 L 600 400" stroke="#d9d9d9" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* 热力图 */}
        {renderHeatmap()}

        {/* 路径规划 */}
        {renderRoutes()}

        {/* 地图项目 */}
        {renderMapItems()}

        {/* 图例 */}
        <div style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'rgba(255,255,255,0.95)',
          padding: '12px',
          borderRadius: '6px',
          border: '1px solid #d9d9d9',
          fontSize: '12px',
          zIndex: 2000,
          minWidth: '180px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '13px' }}>
            {mapView === 'devices' ? '设备状态' : 
             mapView === 'personnel' ? '人员状态' : 
             mapView === 'tasks' ? '任务状态' : '应急事件'}
          </div>
          <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px', lineHeight: '1.3' }}>
            {mapView === 'devices' ? '显示关键设备 (离线/控制台/配电/监控)' :
             mapView === 'personnel' ? '显示关键人员 (忙碌/安全/维护/应急)' :
             mapView === 'tasks' ? '显示进行中和高优先级任务' : '显示所有应急事件'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#52c41a', marginRight: '8px' }}></div>
            <span>正常/在线</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#faad14', marginRight: '8px' }}></div>
            <span>警告/忙碌</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff4d4f', marginRight: '8px' }}></div>
            <span>异常/离线</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#1890ff', marginRight: '8px' }}></div>
            <span>进行中/高优先级</span>
          </div>
          {mapView === 'devices' && (
            <div style={{ fontSize: '10px', color: '#999', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '6px' }}>
              点大小: 离线设备 {'>'} 控制台 {'>'} 普通设备
            </div>
          )}
          {mapView === 'personnel' && (
            <div style={{ fontSize: '10px', color: '#999', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '6px' }}>
              点大小: 忙碌人员 {'>'} 安全部 {'>'} 其他部门
            </div>
          )}
          {mapView === 'tasks' && (
            <div style={{ fontSize: '10px', color: '#999', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '6px' }}>
              点大小: 紧急任务 {'>'} 高优先级 {'>'} 普通任务
            </div>
          )}
          {mapView === 'emergencies' && (
            <div style={{ fontSize: '10px', color: '#999', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '6px' }}>
              点大小: 紧急 {'>'} 高级 {'>'} 普通
            </div>
          )}
        </div>

        {/* 操作提示 */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          background: 'rgba(0,0,0,0.7)',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '11px',
          zIndex: 2000
        }}>
          <div>🖱️ 拖拽移动 | 🔍 滚轮缩放 | 👆 点击查看详情</div>
        </div>
      </div>

      {/* 详情面板 */}
      {selectedLocation && (
        <div style={{ marginTop: 16 }}>
          <Card size="small" title="详细信息">
            <Descriptions column={2} size="small">
              <Descriptions.Item label="名称">{selectedLocation.name || selectedLocation.title || selectedLocation.type}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Badge status={selectedLocation.status === 'online' || selectedLocation.status === 'completed' || selectedLocation.status === '在线' ? 'success' : 
                              selectedLocation.status === 'warning' || selectedLocation.status === 'pending' || selectedLocation.status === '忙碌' ? 'warning' : 'error'} 
                       text={selectedLocation.status} />
              </Descriptions.Item>
              <Descriptions.Item label="位置">{selectedLocation.location || selectedLocation.region}</Descriptions.Item>
              <Descriptions.Item label="负责人">{selectedLocation.assignee || selectedLocation.department || '未分配'}</Descriptions.Item>
              {selectedLocation.building && (
                <Descriptions.Item label="建筑">{selectedLocation.building}</Descriptions.Item>
              )}
              {selectedLocation.floor && (
                <Descriptions.Item label="楼层">{selectedLocation.floor}层</Descriptions.Item>
              )}
              {selectedLocation.room && (
                <Descriptions.Item label="房间号">{selectedLocation.room}号</Descriptions.Item>
              )}
              {selectedLocation.type && (
                <Descriptions.Item label="设备类型">{selectedLocation.type}</Descriptions.Item>
              )}
              {selectedLocation.temperature && (
                <Descriptions.Item label="温度">{selectedLocation.temperature}°C</Descriptions.Item>
              )}
              {selectedLocation.pressure && (
                <Descriptions.Item label="压力">{selectedLocation.pressure}kPa</Descriptions.Item>
              )}
              {selectedLocation.vibration && (
                <Descriptions.Item label="振动">{selectedLocation.vibration}mm/s</Descriptions.Item>
              )}
              {selectedLocation.currentTask && (
                <Descriptions.Item label="当前任务">{selectedLocation.currentTask}</Descriptions.Item>
              )}
              {selectedLocation.department && (
                <Descriptions.Item label="部门">{selectedLocation.department}</Descriptions.Item>
              )}
              {selectedLocation.shift && (
                <Descriptions.Item label="班次">{selectedLocation.shift}</Descriptions.Item>
              )}
              {selectedLocation.experience && (
                <Descriptions.Item label="工作经验">{selectedLocation.experience}年</Descriptions.Item>
              )}
              {selectedLocation.priority && (
                <Descriptions.Item label="优先级">
                  <Tag>{selectedLocation.priority}</Tag>
                </Descriptions.Item>
              )}
              {selectedLocation.estimatedTime && (
                <Descriptions.Item label="预计时间">{selectedLocation.estimatedTime}</Descriptions.Item>
              )}
              {selectedLocation.deadline && (
                <Descriptions.Item label="截止时间">{selectedLocation.deadline}</Descriptions.Item>
              )}
              {selectedLocation.progress !== undefined && (
                <Descriptions.Item label="进度">
                  <Progress percent={selectedLocation.progress} size="small" />
                </Descriptions.Item>
              )}
              {selectedLocation.time && (
                <Descriptions.Item label="时间">{selectedLocation.time}</Descriptions.Item>
              )}
              {selectedLocation.lastUpdate && (
                <Descriptions.Item label="最后更新">{selectedLocation.lastUpdate}</Descriptions.Item>
              )}
              {selectedLocation.description && (
                <Descriptions.Item label="描述" span={2}>{selectedLocation.description}</Descriptions.Item>
              )}
              {selectedLocation.responseTeam && (
                <Descriptions.Item label="响应团队">{selectedLocation.responseTeam}</Descriptions.Item>
              )}
              {selectedLocation.eta && (
                <Descriptions.Item label="预计到达">{selectedLocation.eta}</Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </div>
      )}
    </div>
  );
};

// 智能调度组件
const IntelligentScheduling: React.FC = () => {
  // 智能调度重写开始
  const realNames = [
    '王建国', '李志强', '张明华', '陈志伟', '刘建华', '赵安全', '孙环保', '周志强', '吴建国', '郑安全',
    '林质检', '黄志明', '马建国', '朱志强', '胡明华', '韩开发', '冯志强', '秦建国', '许志明', '何志强',
    '刘招聘', '张培训', '李管理', '王应急', '陈质量', '赵仓储', '钱志强', '孙建国', '周志明', '吴志强'
  ];
  const departments = [
    '生产制造部', '安全环保部', '质量检测部', '信息技术部', '人力资源部', '物流仓储部'
  ];
  const taskTypes = [
    '设备维护', '安全巡检', '质量检测', '系统升级', '员工培训', '仓储管理', '应急演练', '生产调度', '能耗分析', '设备校准'
  ];
  const locations = [
    '生产厂区A区1号车间', '生产厂区A区2号车间', '生产厂区B区3号车间', '生产厂区B区4号车间', '生产厂区C区5号车间',
    '全厂区', '化学品仓库', '环保处理站', '特种设备区域', '厂区空地', '质检中心', '机房', '网络中心', '办公区',
    '监控中心', '培训室A', '培训室B', '会议室', '原材料仓库', '成品仓库', '全仓库', '仓储设备区', '物流中心'
  ];
  const resources = [
    '维护工具', '备件库存', '技术人员', '起重机', '检测设备', '安全检查表', '通讯设备', '服务器', '多媒体设备', '培训材料',
    '环保设备', '仓储设备', '网络设备', '应急设备', '标准件', '样品', '记录设备', '测试设备', '起重设备', '包装材料'
  ];
  const priorities = ['urgent', 'high', 'medium', 'low'];
  const statuses = ['pending', 'scheduled', 'in_progress', 'completed'];

  function randomPick(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function generateScheduleData(count = 232) {
    const now = new Date();
    const baseTasks = [
      {
        title: '设备维护计划',
        type: '设备维护',
        description: '对生产线设备进行定期维护检查',
      },
      {
        title: '安全巡检任务',
        type: '安全巡检',
        description: '日常安全巡检，检查消防设施和安全隐患',
      },
      {
        title: '质量检测',
        type: '质量检测',
        description: '对新生产的批次进行质量检测',
      },
      {
        title: '系统升级',
        type: '系统升级',
        description: '生产管理系统升级，需要停机维护',
      },
      {
        title: '员工培训',
        type: '员工培训',
        description: '新员工安全培训和操作规程培训',
      },
      {
        title: '仓储盘点',
        type: '仓储管理',
        description: '对全厂库存进行盘点，核对账目',
      },
      {
        title: '应急演练',
        type: '应急演练',
        description: '组织员工进行应急疏散演练',
      },
      {
        title: '生产调度',
        type: '生产调度',
        description: '生产线任务调度与人员分配',
      },
      {
        title: '能耗分析',
        type: '能耗分析',
        description: '对厂区能耗进行分析与优化',
      },
      {
        title: '设备校准',
        type: '设备校准',
        description: '对关键设备进行精度校准',
      },
    ];
    const data = [];
    for (let i = 0; i < count; i++) {
      const base = baseTasks[i % baseTasks.length];
      // 以当前时间为起点，startTime=now+0~3小时，endTime=startTime+2~4小时
      const start = new Date(now);
      start.setHours(start.getHours() + Math.floor(Math.random() * 4));
      start.setMinutes(Math.floor(Math.random() * 60));
      const end = new Date(start);
      end.setHours(start.getHours() + 2 + Math.floor(Math.random() * 3));
      data.push({
        id: `sch${(i + 1).toString().padStart(3, '0')}`,
        title: base.title,
        type: base.type,
        assignee: randomPick(realNames),
        department: randomPick(departments),
        priority: randomPick(priorities),
        startTime: start.toISOString().slice(0, 16).replace('T', ' '),
        endTime: end.toISOString().slice(0, 16).replace('T', ' '),
        status: randomPick(statuses),
        location: randomPick(locations),
        description: base.description,
        resources: Array.from({length: 2 + (i % 3)}, () => randomPick(resources)),
      });
    }
    return data;
  }

  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    const data = generateScheduleData(232);
    setScheduleData(data);
    setFilteredData(data);
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    filterData(value, statusFilter, dateRange);
  };
  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    filterData(searchText, value, dateRange);
  };
  const handleDateFilter = (dates: any, dateStrings: [string, string]) => {
    setDateRange(dates);
    filterData(searchText, statusFilter, dates);
  };
  const filterData = (search: string, status: string, dates: any[]) => {
    let filtered = [...scheduleData];
    if (search) {
      filtered = filtered.filter(item =>
        item.title.includes(search) ||
        item.assignee.includes(search) ||
        item.department.includes(search) ||
        item.location.includes(search)
      );
    }
    if (status !== 'all') {
      filtered = filtered.filter(item => item.status === status);
    }
    if (dates && dates.length === 2) {
      filtered = filtered.filter(item => {
        const itemDate = dayjs(item.startTime);
        return itemDate.isAfter(dates[0]) && itemDate.isBefore(dates[1]);
      });
    }
    setFilteredData(filtered);
    setCurrentPage(1);
  };
  const handleEdit = (record: any) => {
    setEditingSchedule(record);
    editForm.setFieldsValue(record);
    setIsEditModalVisible(true);
  };
  const handleDelete = (record: any) => {
    const newData = scheduleData.filter(item => item.id !== record.id);
    setScheduleData(newData);
    setFilteredData(newData);
  };
  const handleEditSubmit = () => {
    editForm.validateFields().then(values => {
      const updatedData = scheduleData.map(item =>
        item.id === editingSchedule.id ? { ...item, ...values } : item
      );
      setScheduleData(updatedData);
      setFilteredData(updatedData);
      setIsEditModalVisible(false);
    });
  };
  const handleScheduleSubmit = () => {
    form.validateFields().then(values => {
      const newSchedule = {
        ...values,
        id: `sch${(scheduleData.length + 1).toString().padStart(3, '0')}`,
        status: 'pending',
      };
      const newData = [...scheduleData, newSchedule];
      setScheduleData(newData);
      setFilteredData(newData);
      setIsScheduleModalVisible(false);
    });
  };
  const scheduleColumns = [
    {
      title: '任务名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <span>
          <a onClick={() => setSelectedSchedule(record)}>详情</a>
          <span style={{ margin: '0 8px' }}>|</span>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <span style={{ margin: '0 8px' }}>|</span>
          <a onClick={() => handleDelete(record)} style={{ color: 'red' }}>删除</a>
        </span>
      ),
    },
  ];
  // ... existing code ...

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Search 
            placeholder="搜索任务或负责人" 
            style={{ width: 200 }} 
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Select 
            value={statusFilter} 
            style={{ width: 120 }}
            onChange={handleStatusFilter}
          >
            <Option value="all">全部状态</Option>
            <Option value="pending">待执行</Option>
            <Option value="in_progress">进行中</Option>
            <Option value="completed">已完成</Option>
            <Option value="scheduled">已计划</Option>
          </Select>
          <RangePicker onChange={handleDateFilter} />
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsScheduleModalVisible(true)}>
          创建调度
        </Button>
      </div>

      <Table
        dataSource={filteredData}
        columns={scheduleColumns}
        pagination={{ pageSize: 10 }}
        size="middle"
      />

      {/* 创建调度模态框 */}
      <Modal
        title="创建调度计划"
        visible={isScheduleModalVisible}
        onOk={handleScheduleSubmit}
        onCancel={() => {
          setIsScheduleModalVisible(false);
          form.resetFields();
        }}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="title" label="任务标题" rules={[{ required: true, message: '请输入任务标题' }]}>
                <Input placeholder="请输入任务标题" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type" label="任务类型" rules={[{ required: true, message: '请选择任务类型' }]}>
                <Select placeholder="请选择任务类型">
                  <Option value="maintenance">维护</Option>
                  <Option value="inspection">检查</Option>
                  <Option value="quality">质检</Option>
                  <Option value="upgrade">升级</Option>
                  <Option value="training">培训</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="assignee" label="负责人" rules={[{ required: true, message: '请选择负责人' }]}>
                <Select placeholder="请选择负责人">
                  {users.map(user => (
                    <Option key={user.id} value={user.name}>{user.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="priority" label="优先级" rules={[{ required: true, message: '请选择优先级' }]}>
                <Select placeholder="请选择优先级">
                  <Option value="low">低</Option>
                  <Option value="medium">中</Option>
                  <Option value="high">高</Option>
                  <Option value="urgent">紧急</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startTime" label="开始时间" rules={[{ required: true, message: '请选择开始时间' }]}>
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="endTime" label="结束时间" rules={[{ required: true, message: '请选择结束时间' }]}>
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="location" label="执行地点" rules={[{ required: true, message: '请输入执行地点' }]}>
                <Input placeholder="请输入执行地点" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="所属部门" rules={[{ required: true, message: '请选择所属部门' }]}>
                <Select placeholder="请选择所属部门">
                  {organizationUnits.map(unit => (
                    <Option key={unit.id} value={unit.name}>{unit.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="任务描述">
            <TextArea rows={3} placeholder="请输入任务描述" />
          </Form.Item>
          <Form.Item name="resources" label="所需资源">
            <Select mode="tags" placeholder="请输入所需资源">
              <Option value="人员">人员</Option>
              <Option value="设备">设备</Option>
              <Option value="工具">工具</Option>
              <Option value="材料">材料</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑调度模态框 */}
      <Modal
        title="编辑调度计划"
        visible={isEditModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => {
          setIsEditModalVisible(false);
          editForm.resetFields();
        }}
        width={800}
      >
        <Form form={editForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="title" label="任务标题" rules={[{ required: true, message: '请输入任务标题' }]}>
                <Input placeholder="请输入任务标题" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type" label="任务类型" rules={[{ required: true, message: '请选择任务类型' }]}>
                <Select placeholder="请选择任务类型">
                  <Option value="maintenance">维护</Option>
                  <Option value="inspection">检查</Option>
                  <Option value="quality">质检</Option>
                  <Option value="upgrade">升级</Option>
                  <Option value="training">培训</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="assignee" label="负责人" rules={[{ required: true, message: '请选择负责人' }]}>
                <Select placeholder="请选择负责人">
                  {users.map(user => (
                    <Option key={user.id} value={user.name}>{user.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="priority" label="优先级" rules={[{ required: true, message: '请选择优先级' }]}>
                <Select placeholder="请选择优先级">
                  <Option value="low">低</Option>
                  <Option value="medium">中</Option>
                  <Option value="high">高</Option>
                  <Option value="urgent">紧急</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startTime" label="开始时间" rules={[{ required: true, message: '请选择开始时间' }]}>
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="endTime" label="结束时间" rules={[{ required: true, message: '请选择结束时间' }]}>
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="location" label="执行地点" rules={[{ required: true, message: '请输入执行地点' }]}>
                <Input placeholder="请输入执行地点" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="所属部门" rules={[{ required: true, message: '请选择所属部门' }]}>
                <Select placeholder="请选择所属部门">
                  {organizationUnits.map(unit => (
                    <Option key={unit.id} value={unit.name}>{unit.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="任务描述">
            <TextArea rows={3} placeholder="请输入任务描述" />
          </Form.Item>
          <Form.Item name="resources" label="所需资源">
            <Select mode="tags" placeholder="请输入所需资源">
              <Option value="人员">人员</Option>
              <Option value="设备">设备</Option>
              <Option value="工具">工具</Option>
              <Option value="材料">材料</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 任务详情抽屉 */}
      <Drawer
        title="任务详情"
        placement="right"
        width={500}
        visible={!!selectedSchedule}
        onClose={() => setSelectedSchedule(null)}
      >
        {selectedSchedule && (
          <div>
            <Descriptions title={selectedSchedule.title} bordered column={1}>
              <Descriptions.Item label="任务ID">{selectedSchedule.id}</Descriptions.Item>
              <Descriptions.Item label="任务类型">{selectedSchedule.type}</Descriptions.Item>
              <Descriptions.Item label="负责人">{selectedSchedule.assignee}</Descriptions.Item>
              <Descriptions.Item label="所属部门">{selectedSchedule.department}</Descriptions.Item>
              <Descriptions.Item label="优先级">
                <Tag>{selectedSchedule.priority}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag>{selectedSchedule.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="开始时间">{selectedSchedule.startTime}</Descriptions.Item>
              <Descriptions.Item label="结束时间">{selectedSchedule.endTime}</Descriptions.Item>
              <Descriptions.Item label="执行地点">{selectedSchedule.location}</Descriptions.Item>
              <Descriptions.Item label="任务描述">{selectedSchedule.description}</Descriptions.Item>
              <Descriptions.Item label="所需资源">
                {selectedSchedule.resources?.map((resource: string, index: number) => (
                  <Tag key={index} color="blue">{resource}</Tag>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Drawer>
    </div>
  );
};

// 综合管理面板
const ComprehensiveManagement: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const [kpiData, setKpiData] = useState<any>({});
  const [alertData, setAlertData] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [taskForm] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // 获取当前时间
    const now = new Date();
    // 模拟KPI数据
    setKpiData({
      totalEmployees: 312,
      onlineEmployees: 287,
      totalDevices: devices.length,
      onlineDevices: devices.filter(d => d.status === 'online').length,
      activeAlerts: 3,
      completedTasks: 28,
      efficiency: 94.2,
      satisfaction: 96.8
    });

    // 动态生成告警数据
    setAlertData([
      { id: 1, type: 'error', message: '设备离线警告', time: new Date(now.getTime() - 1000 * 60 * 0).toISOString().slice(0, 16).replace('T', ' '), level: 'high' },
      { id: 2, type: 'warning', message: '人员未到岗', time: new Date(now.getTime() - 1000 * 60 * 5).toISOString().slice(0, 16).replace('T', ' '), level: 'medium' },
      { id: 3, type: 'info', message: '任务即将到期', time: new Date(now.getTime() - 1000 * 60 * 10).toISOString().slice(0, 16).replace('T', ' '), level: 'low' }
    ]);

    // 动态生成最近活动
    setRecentActivities([
      { id: 1, user: '张伟民', action: '完成了设备维护任务', time: new Date(now.getTime() - 1000 * 60 * 0).toISOString().slice(0, 16).replace('T', ' ') },
      { id: 2, user: '陈志远', action: '创建了新的研发项目', time: new Date(now.getTime() - 1000 * 60 * 5).toISOString().slice(0, 16).replace('T', ' ') },
      { id: 3, user: '刘营销', action: '更新了客户信息', time: new Date(now.getTime() - 1000 * 60 * 10).toISOString().slice(0, 16).replace('T', ' ') },
      { id: 4, user: '马安全', action: '处理了安全事件', time: new Date(now.getTime() - 1000 * 60 * 15).toISOString().slice(0, 16).replace('T', ' ') },
      { id: 5, user: '孙人力', action: '审核了员工申请', time: new Date(now.getTime() - 1000 * 60 * 20).toISOString().slice(0, 16).replace('T', ' ') }
    ]);
  }, []);

  // 快速操作处理函数
  const handleCreateTask = () => {
    setIsTaskModalVisible(true);
  };

  const handleScheduleArrangement = () => {
    // 切换到智能调度选项卡，而不是跳转页面
    setActiveTab('schedule');
  };

  const handlePersonnelManagement = () => {
    navigate('/organization');
  };

  const handleSystemSettings = () => {
    navigate('/system-settings');
  };

  const handleGenerateReport = () => {
    message.loading('正在生成报表...');
    setTimeout(() => {
      message.success('报表生成完成');
    }, 2000);
  };

  const handleExportData = () => {
    Modal.confirm({
      title: '导出数据',
      content: '确定要导出当前数据吗？',
      onOk() {
        message.loading('正在导出数据...');
        setTimeout(() => {
          message.success('数据导出完成');
        }, 1500);
      },
    });
  };

  const handleTaskSubmit = () => {
    taskForm.validateFields().then(values => {
      console.log('新任务:', values);
      message.success('任务创建成功');
      setIsTaskModalVisible(false);
      taskForm.resetFields();
    });
  };

  const getAlertIcon = (type: string) => {
    const icons = {
      error: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
      warning: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
      info: <CheckCircleOutlined style={{ color: '#52c41a' }} />
    };
    return icons[type as keyof typeof icons] || <ClockCircleOutlined />;
  };

  return (
    <div>
      {/* KPI指标 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总员工数"
              value={kpiData.totalEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="在线员工"
              value={kpiData.onlineEmployees}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress
              percent={Math.round((kpiData.onlineEmployees / kpiData.totalEmployees) * 100)}
              size="small"
              showInfo={false}
              strokeColor="#1890ff"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="设备在线率"
              value={Math.round((kpiData.onlineDevices / kpiData.totalDevices) * 100)}
              suffix="%"
              prefix={<SearchOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress
              percent={Math.round((kpiData.onlineDevices / kpiData.totalDevices) * 100)}
              size="small"
              showInfo={false}
              strokeColor="#1890ff"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="运营效率"
              value={kpiData.efficiency}
              suffix="%"
              prefix={<BellOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="实时告警" size="small" style={{ height: 400 }}>
            <List
              dataSource={alertData}
              renderItem={(item: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={getAlertIcon(item.type)}
                    title={<span style={{ fontWeight: 'bold' }}>{item.message}</span>}
                    description={
                      <Space>
                        <span>{item.time}</span>
                        <Tag color={item.level === 'high' ? 'red' : item.level === 'medium' ? 'orange' : 'green'}>
                          {item.level}
                        </Tag>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="最近活动" size="small" style={{ height: 400 }}>
            <Timeline>
              {recentActivities.map((activity: any) => (
                <Timeline.Item key={activity.id}>
                  <div>
                    <strong>{activity.user}</strong> {activity.action}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{activity.time}</div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* 快速操作 */}
      <Card title="快速操作" style={{ marginTop: 16 }}>
        <Space size="large">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTask}>
            创建任务
          </Button>
          <Button icon={<ScheduleOutlined />} onClick={handleScheduleArrangement}>
            安排调度
          </Button>
          <Button icon={<TeamOutlined />} onClick={handlePersonnelManagement}>
            人员管理
          </Button>
          <Button icon={<SettingOutlined />} onClick={handleSystemSettings}>
            系统设置
          </Button>
          <Button icon={<FileTextOutlined />} onClick={handleGenerateReport}>
            生成报表
          </Button>
          <Button icon={<ExportOutlined />} onClick={handleExportData}>
            导出数据
          </Button>
        </Space>
      </Card>

      {/* 创建任务模态框 */}
      <Modal
        title="创建新任务"
        visible={isTaskModalVisible}
        onOk={handleTaskSubmit}
        onCancel={() => {
          setIsTaskModalVisible(false);
          taskForm.resetFields();
        }}
        width={600}
      >
        <Form form={taskForm} layout="vertical">
          <Form.Item name="title" label="任务标题" rules={[{ required: true, message: '请输入任务标题' }]}>
            <Input placeholder="请输入任务标题" />
          </Form.Item>
          <Form.Item name="type" label="任务类型" rules={[{ required: true, message: '请选择任务类型' }]}>
            <Select placeholder="请选择任务类型">
              <Option value="maintenance">设备维护</Option>
              <Option value="inspection">安全检查</Option>
              <Option value="quality">质量控制</Option>
              <Option value="management">管理任务</Option>
              <Option value="development">开发任务</Option>
            </Select>
          </Form.Item>
          <Form.Item name="assignee" label="指派人员" rules={[{ required: true, message: '请选择指派人员' }]}>
            <Select placeholder="请选择指派人员">
              {users.map(user => (
                <Option key={user.id} value={user.name}>{user.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="priority" label="优先级" rules={[{ required: true, message: '请选择优先级' }]}>
            <Select placeholder="请选择优先级">
              <Option value="low">低</Option>
              <Option value="medium">中</Option>
              <Option value="high">高</Option>
              <Option value="urgent">紧急</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dueDate" label="截止时间" rules={[{ required: true, message: '请选择截止时间' }]}>
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="description" label="任务描述">
            <TextArea rows={4} placeholder="请输入任务描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const ERPPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  // 通知按钮处理
  const handleNotifications = () => {
    Modal.info({
      title: '系统通知',
      content: (
        <div>
          <p>• 设备离线警告 (2025-07-23 14:30)</p>
          <p>• 人员未到岗提醒 (2025-07-23 14:25)</p>
          <p>• 任务即将到期 (2025-07-23 14:20)</p>
        </div>
      ),
      onOk() {},
    });
  };

  // 同步数据处理
  const handleSyncData = () => {
    message.loading('正在同步数据...');
    setTimeout(() => {
      message.success('数据同步完成');
    }, 2000);
  };

  // 导航处理
  const handleGoToOrganization = () => {
    navigate('/organization');
  };

  const handleGoToDeviceMonitor = () => {
    navigate('/status-monitor');
  };

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0 }}>
            <EnvironmentOutlined style={{ marginRight: 8 }} />
            ERP平台升级
          </h2>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            优化企业原有的ERP系统，通过提供标准化接口，实现与融合通信管理平台的无缝对接
          </Text>
        </div>
        <Space>
          <Badge count={3} size="small">
            <Button icon={<BellOutlined />} onClick={handleNotifications} />
          </Badge>
          <Button type="primary" icon={<SyncOutlined />} onClick={handleSyncData}>
            同步数据
          </Button>
        </Space>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} type="card" size="large">
        <TabPane tab={<span><DashboardOutlined />综合管理</span>} key="dashboard">
          <ComprehensiveManagement setActiveTab={setActiveTab} />
        </TabPane>
        
        <TabPane tab={<span><EnvironmentOutlined />地图调度</span>} key="map">
          <MapVisualization />
        </TabPane>
        
        <TabPane tab={<span><ScheduleOutlined />智能调度</span>} key="schedule">
          <IntelligentScheduling />
        </TabPane>
        
        <TabPane tab={<span><TeamOutlined />组织管理</span>} key="organization">
          <div style={{ textAlign: 'center', padding: 50 }}>
            <Result
              icon={<TeamOutlined />}
              title="组织架构管理"
              subTitle="此功能已集成到独立的组织管理页面"
              extra={<Button type="primary" onClick={handleGoToOrganization}>前往组织管理</Button>}
            />
          </div>
        </TabPane>
        
        <TabPane tab={<span><MonitorOutlined />设备监控</span>} key="devices">
          <div style={{ textAlign: 'center', padding: 50 }}>
            <Result
              icon={<MonitorOutlined />}
              title="设备状态监控"
              subTitle="此功能已集成到状态监控页面"
              extra={<Button type="primary" onClick={handleGoToDeviceMonitor}>前往设备监控</Button>}
            />
          </div>
        </TabPane>
        
        <TabPane tab={<span><FileTextOutlined />日报表分析</span>} key="reports">
          <div style={{ textAlign: 'center', padding: 50 }}>
            <Result
              icon={<BarChartOutlined />}
              title="数据报表分析"
              subTitle="此功能已集成到数据分析页面"
              extra={<Button type="primary">前往数据分析</Button>}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ERPPlatform; 