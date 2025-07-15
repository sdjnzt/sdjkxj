import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Table, 
  Tag, 
  Progress, 
  Badge, 
  Typography, 
  Space, 
  Divider,
  Timeline,
  Alert,
  Radio,
  Select,
  Tabs,
  Button,
  Tooltip,
  Avatar,
  List,
  Drawer,
  Modal,
  Input,
  DatePicker,
  Switch,
  Flex,
  Dropdown,
  MenuProps
} from 'antd';
import { 
  VideoCameraOutlined, 
  PhoneOutlined, 
  SafetyOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  DashboardOutlined,
  WifiOutlined,
  BarsOutlined,
  EnvironmentOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  SyncOutlined,
  FireOutlined,
  EyeOutlined,
  NodeIndexOutlined,
  RadarChartOutlined,
  SettingOutlined,
  BellOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  DownloadOutlined,
  FilterOutlined,
  SearchOutlined,
  UserOutlined,
  CloudOutlined,
  SecurityScanOutlined,
  MonitorOutlined,
  ApiOutlined,
  GlobalOutlined,
  HomeOutlined,
  RocketOutlined,
  HeartOutlined,
  MoreOutlined,
  StarOutlined,
  TeamOutlined,
  DatabaseOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons';
import { Pie, Line, Area, Rose, Column } from '@ant-design/plots';
import { statistics, devices, safetyEvents } from '../data/mockData';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface RealTimeData {
  cpu: number;
  memory: number;
  network: number;
  storage: number;
  timestamp: string;
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Dashboard: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState<RealTimeData[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [isLoading, setIsLoading] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [showAlertDrawer, setShowAlertDrawer] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showControlModal, setShowControlModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [filteredDevices, setFilteredDevices] = useState(devices);

  // 模拟实时数据更新
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      const newData: RealTimeData = {
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100),
        storage: Math.floor(Math.random() * 100),
        timestamp: new Date().toLocaleTimeString()
      };
      setRealTimeData(prev => [...prev.slice(-19), newData]);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // 模拟系统警报
  useEffect(() => {
    const alerts: SystemAlert[] = [
      {
        id: '1',
        type: 'warning',
        title: '设备电量预警',
        message: '传感器 SEN-005 电池电量低于20%，建议及时更换',
        time: '14:23',
        read: false
      },
      {
        id: '2',
        type: 'error',
        title: '网络连接异常',
        message: '摄像头 CAM-003 网络连接中断，正在自动重连',
        time: '14:15',
        read: false
      },
      {
        id: '3',
        type: 'success',
        title: '系统检测完成',
        message: '所有设备健康检查已完成，系统运行正常',
        time: '14:08',
        read: true
      }
    ];
    setSystemAlerts(alerts);
  }, []);

  // 核心指标数据
  const coreMetrics = [
    {
      title: '5G网络覆盖',
      value: 98.5,
      unit: '%',
      icon: <WifiOutlined />,
      color: '#1890ff',
      trend: { direction: 'up', value: '+2.3%', desc: '网络优化提升' },
      status: 'excellent'
    },
    {
      title: '系统响应',
      value: 12,
      unit: 'ms',
      icon: <ThunderboltOutlined />,
      color: '#f759ab',
      trend: { direction: 'down', value: '-3ms', desc: '性能持续优化' },
      status: 'good'
    },
    {
      title: '设备在线',
      value: 94.2,
      unit: '%',
      icon: <MonitorOutlined />,
      color: '#13c2c2',
      trend: { direction: 'up', value: '+1.2%', desc: '连接稳定性提升' },
      status: 'good'
    },
    {
      title: '数据吞吐',
      value: 2.3,
      unit: 'TB/h',
      icon: <DatabaseOutlined />,
      color: '#52c41a',
      trend: { direction: 'up', value: '+0.5TB', desc: '处理能力增强' },
      status: 'excellent'
    }
  ];

  // 系统健康度计算
  const systemHealth = Math.floor((statistics.onlineDevices / statistics.totalDevices) * 100);
  
  // 功能模块数据
  const functionalModules = [
    {
      title: '视频监控',
      count: 18,
      status: 'active',
      color: '#1890ff',
      icon: <VideoCameraOutlined />,
      description: '高清视频实时监控'
    },
    {
      title: '语音通信',
      count: 12,
      status: 'active',
      color: '#52c41a',
      icon: <PhoneOutlined />,
      description: '双向语音对讲系统'
    },
    {
      title: '安全防护',
      count: 24,
      status: 'active',
      color: '#52c41a',
      icon: <SafetyOutlined />,
      description: '智能安全防护系统'
    },
    {
      title: '数据分析',
      count: 8,
      status: 'active',
      color: '#722ed1',
      icon: <RadarChartOutlined />,
      description: '实时数据分析处理'
    }
  ];

  // 实时活动数据
  const recentActivities = [
    {
      id: '1',
      type: 'success',
      title: '设备上线',
      description: 'CAM-015 摄像头重新连接成功',
      time: '2分钟前',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
    },
    {
      id: '2',
      type: 'warning',
      title: '电量预警',
      description: 'SEN-008 传感器电量低于20%',
      time: '5分钟前',
      icon: <ExclamationCircleOutlined style={{ color: '#fa8c16' }} />
    },
    {
      id: '3',
      type: 'info',
      title: '系统巡检',
      description: '定时健康检查任务完成',
      time: '10分钟前',
      icon: <SyncOutlined style={{ color: '#1890ff' }} />
    },
    {
      id: '4',
      type: 'error',
      title: '连接异常',
      description: 'NET-003 网络设备响应超时',
      time: '15分钟前',
      icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
    }
  ];

  // 系统健康度计算
  const safeSystemHealth = isNaN(systemHealth) ? 0 : systemHealth;

  // 网络流量趋势
  const networkTrendConfig = {
    data: Array.from({ length: 24 }, (_, i) => ({
      hour: `${String(i).padStart(2, '0')}:00`,
      inbound: Math.floor(Math.random() * 1000 + 500),
      outbound: Math.floor(Math.random() * 800 + 300),
    })),
    xField: 'hour',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 1000,
      },
    },
  };

  // 设备分布柱状图
  const deviceDistributionConfig = {
    data: [
      { zone: 'A区', count: 8, type: '监控设备' },
      { zone: 'A区', count: 6, type: '通信设备' },
      { zone: 'A区', count: 4, type: '传感设备' },
      { zone: 'B区', count: 6, type: '监控设备' },
      { zone: 'B区', count: 4, type: '通信设备' },
      { zone: 'B区', count: 5, type: '传感设备' },
      { zone: 'C区', count: 4, type: '监控设备' },
      { zone: 'C区', count: 2, type: '通信设备' },
      { zone: 'C区', count: 3, type: '传感设备' },
    ],
    xField: 'zone',
    yField: 'count',
    seriesField: 'type',
    isGroup: true,
    color: ['#5B8FF9', '#5AD8A6', '#5D7092'],
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
  };

  // 设备搜索和筛选
  useEffect(() => {
    let filtered = devices;
    
    // 按状态筛选
    if (filterStatus !== 'all') {
      filtered = filtered.filter(device => device.status === filterStatus);
    }
    
    // 按搜索文本筛选
    if (searchText) {
      filtered = filtered.filter(device => 
        device.name.toLowerCase().includes(searchText.toLowerCase()) ||
        device.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    setFilteredDevices(filtered);
  }, [searchText, filterStatus]);

  // 数据刷新函数
  const handleRefresh = () => {
    setIsLoading(true);
    // 模拟数据刷新
    setTimeout(() => {
      setIsLoading(false);
      // 可以在这里添加实际的数据刷新逻辑
      Modal.success({
        title: '刷新完成',
        content: '数据已更新到最新状态',
      });
    }, 1000);
  };

  // 导出数据函数
  const handleExportData = () => {
    const data = {
      devices: filteredDevices,
      metrics: coreMetrics,
      systemHealth: safeSystemHealth,
      exportTime: new Date().toLocaleString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    Modal.success({
      title: '导出成功',
      content: '数据已成功导出到本地文件',
    });
  };

  // 系统配置函数
  const handleSystemConfig = () => {
    setShowConfigModal(true);
  };

  // 系统日志函数
  const handleSystemLog = () => {
    Modal.info({
      title: '系统日志',
      width: 800,
      content: (
        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
          <Timeline
            items={[
              {
                children: '2024-01-15 14:23:15 - 设备 CAM-015 上线',
                color: 'green'
              },
              {
                children: '2024-01-15 14:20:32 - 系统健康检查完成',
                color: 'blue'
              },
              {
                children: '2024-01-15 14:15:45 - 设备 SEN-008 电量预警',
                color: 'orange'
              },
              {
                children: '2024-01-15 14:10:12 - 网络连接异常恢复',
                color: 'green'
              },
              {
                children: '2024-01-15 14:05:33 - 系统启动完成',
                color: 'blue'
              }
            ]}
          />
        </div>
      ),
    });
  };

  // 设备详情函数
  const handleDeviceDetail = (device: any) => {
    setSelectedDevice(device);
    setShowDeviceModal(true);
  };

  // 设备控制函数
  const handleDeviceControl = (device: any) => {
    setSelectedDevice(device);
    setShowControlModal(true);
  };

  // 搜索函数
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // 筛选函数
  const handleFilter = (status: string) => {
    setFilterStatus(status);
  };

  // 标记警报为已读
  const markAlertAsRead = (alertId: string) => {
    setSystemAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  // 清除所有警报
  const clearAllAlerts = () => {
    setSystemAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
  };

  // 更多操作菜单处理
  const handleMoreAction = ({ key }: { key: string }) => {
    switch (key) {
      case 'export':
        handleExportData();
        break;
      case 'config':
        handleSystemConfig();
        break;
      case 'log':
        handleSystemLog();
        break;
    }
  };

  // 更多操作菜单
  const moreActions: MenuProps['items'] = [
    {
      key: 'export',
      label: '导出数据',
      icon: <DownloadOutlined />,
    },
    {
      key: 'config',
      label: '系统配置',
      icon: <SettingOutlined />,
    },
    {
      key: 'log',
      label: '系统日志',
      icon: <BarsOutlined />,
    },
  ];

  return (
      <div style={{ 
      background: '#f0f2f5',
      minHeight: '100%',
      padding: '24px'
    }}>
      {/* 顶部导航栏 */}
      <div style={{ 
        background: '#fff',
        borderRadius: '8px',
        padding: '20px 24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0'
      }}>
        <Flex justify="space-between" align="center">
        <div>
            <Title level={2} style={{ 
              margin: 0, 
              color: '#262626',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              <RocketOutlined style={{ marginRight: 8, color: '#1890ff' }} />
              智能融合通信中心
          </Title>
            <Text style={{ 
              fontSize: '14px', 
              color: '#8c8c8c'
            }}>
              实时监控 · 智能分析 · 安全防护 · 一体化管理
          </Text>
        </div>
        <Space size="middle">
              <Text style={{ 
                color: '#8c8c8c',
                fontSize: '14px'
              }}>
                <ClockCircleOutlined style={{ marginRight: 8 }} />
                {new Date().toLocaleString()}
              </Text>
            <Switch 
              checked={autoRefresh}
              onChange={setAutoRefresh}
              checkedChildren="自动"
              unCheckedChildren="手动"
            />
            <Badge count={systemAlerts.filter(a => !a.read).length}>
              <Button 
                  type="primary"
                icon={<BellOutlined />}
                onClick={() => setShowAlertDrawer(true)}
              >
                  通知
              </Button>
            </Badge>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={handleRefresh}
                loading={isLoading}
              >
                刷新
            </Button>
              <Dropdown 
                menu={{ 
                  items: moreActions,
                  onClick: handleMoreAction
                }} 
                placement="bottomRight"
              >
                <Button 
                  icon={<MoreOutlined />}
                />
              </Dropdown>
        </Space>
        </Flex>
      </div>

      {/* 系统状态横幅 */}
      <div style={{ marginBottom: '24px' }}>
          <Alert
            message={
            <Flex justify="space-between" align="center">
                <Space size="large">
                  <Space>
                  <Text strong style={{ color: '#52c41a' }}>系统运行正常</Text>
                  </Space>
                  <Divider type="vertical" />
                  <Space>
                  <MonitorOutlined style={{ color: '#1890ff' }} />
                  <Text>
                    在线设备: <Text strong style={{ color: '#52c41a' }}>{statistics.onlineDevices}</Text>/{statistics.totalDevices}
                  </Text>
                  </Space>
                  <Space>
                  <TeamOutlined style={{ color: '#722ed1' }} />
                  <Text>
                    活跃用户: <Text strong style={{ color: '#722ed1' }}>{statistics.onlineUsers}</Text>
                  </Text>
                  </Space>
                  <Space>
                  <GlobalOutlined style={{ color: '#fa8c16' }} />
                  <Text>
                    网络状态: <Text strong style={{ color: '#52c41a' }}>优秀</Text>
                  </Text>
                  </Space>
                </Space>
              <Text style={{ 
                fontSize: '12px', 
                color: '#8c8c8c'
              }}>
                运行时长: 15天 3小时 45分钟
                  </Text>
            </Flex>
            }
            type="success"
            style={{ 
            borderRadius: '8px'
          }}
        />
      </div>

      {/* 核心指标卡片 - 重新设计 */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        {coreMetrics.map((metric, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card 
              style={{ 
                borderRadius: '12px',
                height: '160px',
                background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                border: `2px solid ${metric.color}15`,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              bodyStyle={{ 
                padding: '24px', 
                height: '112px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              hoverable
            >
              {/* 顶部：图标和标题 */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ 
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: `linear-gradient(135deg, ${metric.color}20, ${metric.color}10)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <span style={{ 
                    fontSize: '20px',
                    color: metric.color
                  }}>
                    {metric.icon}
                  </span>
                  </div>
                <div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#262626',
                    fontWeight: '600',
                    marginBottom: '2px'
                  }}>
                    {metric.title}
                    </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#8c8c8c'
                  }}>
                    {metric.trend.desc}
                    </div>
                  </div>
                </div>

              {/* 中间：数值 */}
              <div style={{ 
                textAlign: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ 
                  fontSize: '36px', 
                  fontWeight: 'bold',
                  color: '#262626',
                  lineHeight: '1',
                  marginBottom: '4px'
                }}>
                    {metric.value}
                  <span style={{ 
                    fontSize: '16px', 
                    marginLeft: '4px',
                    color: '#8c8c8c',
                    fontWeight: 'normal'
                  }}>
                      {metric.unit}
                    </span>
                  </div>
                </div>

              {/* 底部：趋势信息 */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 12px',
                background: metric.trend.direction === 'up' ? '#f6ffed' : '#fff2f0',
                borderRadius: '8px',
                border: `1px solid ${metric.trend.direction === 'up' ? '#b7eb8f' : '#ffb3b3'}`
              }}>
                {metric.trend.direction === 'up' ? 
                  <RiseOutlined style={{ marginRight: '6px', color: '#52c41a', fontSize: '14px' }} /> : 
                  <FallOutlined style={{ marginRight: '6px', color: '#ff4d4f', fontSize: '14px' }} />
                }
                <Text style={{ 
                  color: metric.trend.direction === 'up' ? '#52c41a' : '#ff4d4f', 
                  fontSize: '13px', 
                  fontWeight: '600' 
                }}>
                  {metric.trend.value}
                </Text>
                <Text style={{ 
                  fontSize: '12px', 
                  color: '#8c8c8c',
                  marginLeft: '8px'
                }}>
                  vs 上期
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 主要监控面板 - 重新布局 */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        {/* 系统健康监控 */}
        <Col xs={24} lg={8}>
                     <Card 
             title={
               <Space>
                <HeartOutlined style={{ color: '#ff4757' }} />
                <span>系统健康监控</span>
                <Badge status="processing" text="实时" />
               </Space>
             }
             style={{ 
               borderRadius: '8px',
              height: '480px'
            }}
            bodyStyle={{ 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              height: '420px'
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Progress
                type="circle"
                  percent={safeSystemHealth}
                size={200}
                strokeColor={{
                    '0%': safeSystemHealth > 80 ? '#52c41a' : safeSystemHealth > 60 ? '#fa8c16' : '#ff4d4f',
                    '100%': safeSystemHealth > 80 ? '#73d13d' : safeSystemHealth > 60 ? '#ffc53d' : '#ff7875',
                }}
                strokeWidth={12}
                format={(percent) => (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '36px', 
                      fontWeight: 'bold',
                        color: safeSystemHealth > 80 ? '#52c41a' : safeSystemHealth > 60 ? '#fa8c16' : '#ff4d4f',
                      marginBottom: '8px'
                    }}>
                      {percent}%
                    </div>
                    <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                      系统健康度
                    </div>
                  </div>
                )}
              />
              </div>
              
              <Row gutter={[16, 16]}>
                  <Col span={12}>
                  <div style={{ 
                    textAlign: 'center',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    color: 'white'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {realTimeData[realTimeData.length - 1]?.cpu || 0}%
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>CPU使用率</div>
                  </div>
                  </Col>
                  <Col span={12}>
                  <div style={{ 
                    textAlign: 'center',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    borderRadius: '12px',
                    color: 'white'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {realTimeData[realTimeData.length - 1]?.memory || 0}%
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>内存使用率</div>
                  </div>
                  </Col>
                </Row>
            </div>
          </Card>
        </Col>

        {/* 功能模块状态 */}
        <Col xs={24} lg={8}>
                     <Card 
             title={
               <Space>
                <NodeIndexOutlined style={{ color: '#5352ed' }} />
                <span>功能模块状态</span>
               </Space>
             }
             style={{ 
               borderRadius: '8px',
              height: '480px'
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Row gutter={[12, 12]} style={{ height: '100%' }}>
              {functionalModules.map((module, index) => (
                <Col span={12} key={index}>
                  <div style={{
                    background: '#fafafa',
                    border: `1px solid ${module.color}40`,
                    borderRadius: '8px',
                    padding: '12px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                        fontSize: '24px', 
                        color: module.color,
                        marginBottom: '8px'
                      }}>
                        {module.icon}
                      </div>
                      <div style={{ 
                        fontSize: '13px', 
                      fontWeight: 'bold',
                        marginBottom: '4px'
                      }}>
                        {module.title}
                      </div>
                      <div style={{ 
                        fontSize: '11px', 
                        color: '#8c8c8c',
                      marginBottom: '8px'
                    }}>
                        {module.description}
                    </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold',
                        color: module.color,
                        marginBottom: '4px'
                      }}>
                        {module.count}
                  </div>
                      <Tag 
                        color={module.status === 'active' ? 'green' : 'orange'}
                        style={{ 
                          borderRadius: '8px',
                          fontSize: '10px'
                        }}
                      >
                        {module.status === 'active' ? '正常' : '警告'}
                      </Tag>
              </div>
            </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* 实时活动 */}
        <Col xs={24} lg={8}>
                     <Card 
             title={
               <Space>
                <PlayCircleOutlined style={{ color: '#2ed573' }} />
                <span>实时活动</span>
                <Badge count={recentActivities.length} />
               </Space>
             }
             style={{ 
               borderRadius: '8px',
              height: '480px'
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <Timeline
              mode="left"
              items={recentActivities.map(activity => ({
                dot: activity.icon,
                children: (
                  <div style={{ marginLeft: '16px' }}>
                    <div style={{ 
                      fontSize: '14px', 
                              fontWeight: 'bold',
                      marginBottom: '4px'
                    }}>
                      {activity.title}
                  </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#64748b',
                      marginBottom: '4px'
                    }}>
                      {activity.description}
              </div>
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#94a3b8'
                    }}>
                      {activity.time}
            </div>
                  </div>
                )
              }))}
            />
          </Card>
        </Col>
      </Row>

      {/* 数据分析图表 */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        {/* 设备分布统计 */}
        <Col xs={24} lg={12}>
                     <Card 
             title={
               <Space>
                <RadarChartOutlined style={{ color: '#ff6b6b' }} />
                <span>设备分布统计</span>
               </Space>
             }
             extra={
               <Space>
                <Select defaultValue="all" size="small" style={{ width: 100 }}>
                  <Option value="all">全部区域</Option>
                  <Option value="A">A区</Option>
                  <Option value="B">B区</Option>
                  <Option value="C">C区</Option>
                 </Select>
               </Space>
             }
             style={{ 
               borderRadius: '8px',
              height: '500px'
             }}
          >
            <Column {...deviceDistributionConfig} height={400} />
          </Card>
        </Col>

        {/* 性能趋势分析 */}
        <Col xs={24} lg={12}>
                     <Card 
             title={
               <Space>
                <SyncOutlined spin style={{ color: '#4ecdc4' }} />
                <span>性能趋势分析</span>
                 <Badge status="processing" text="实时更新" />
               </Space>
             }
             extra={
                 <Radio.Group 
                   size="small" 
                   value={selectedTimeRange} 
                   onChange={(e) => setSelectedTimeRange(e.target.value)}
                 >
                   <Radio.Button value="1h">1小时</Radio.Button>
                   <Radio.Button value="24h">24小时</Radio.Button>
                   <Radio.Button value="7d">7天</Radio.Button>
                 </Radio.Group>
             }
             style={{ 
               borderRadius: '8px',
              height: '500px'
            }}
          >
            <Line 
              data={realTimeData.map(item => [
                { time: item.timestamp, value: item.cpu, type: 'CPU使用率' },
                { time: item.timestamp, value: item.memory, type: '内存使用率' },
                { time: item.timestamp, value: item.network, type: '网络使用率' },
                { time: item.timestamp, value: item.storage, type: '存储使用率' }
              ]).flat()}
              xField="time"
              yField="value"
              seriesField="type"
              smooth={true}
              animation={{
                appear: {
                  animation: 'wave-in',
                  duration: 1500,
                },
              }}
              color={['#667EEA', '#4ECDC4', '#45B7D1', '#96CEB4']}
              height={400}
            />
          </Card>
        </Col>
      </Row>

      {/* 详细数据表格 */}
      <Row gutter={[24, 24]}>
        {/* 设备监控详情 */}
        <Col span={24}>
                     <Card 
             title={
               <Space>
                <MonitorOutlined style={{ color: '#3742fa' }} />
                <span>设备监控详情</span>
                 <Badge count={devices.length} />
               </Space>
             }
             extra={
               <Space>
                 <Text type="secondary">
                  在线: <Text style={{ color: '#52c41a', fontWeight: 'bold' }}>{statistics.onlineDevices}</Text>
                 </Text>
                 <Divider type="vertical" />
                 <Text type="secondary">
                  离线: <Text style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{statistics.totalDevices - statistics.onlineDevices}</Text>
                 </Text>
                 <Input.Search
                   placeholder="搜索设备名称或位置"
                   allowClear
                   size="small"
                   style={{ width: 200 }}
                   onSearch={handleSearch}
                   onChange={(e) => handleSearch(e.target.value)}
                 />
                 <Select
                   size="small"
                   value={filterStatus}
                   onChange={handleFilter}
                   style={{ width: 100 }}
                 >
                   <Option value="all">全部状态</Option>
                   <Option value="online">在线</Option>
                   <Option value="offline">离线</Option>
                   <Option value="warning">警告</Option>
                 </Select>
               </Space>
             }
             style={{ 
              borderRadius: '8px'
             }}
          >
                         <Table
              dataSource={filteredDevices}
              size="middle"
               pagination={{
                 pageSize: 10,
                 showSizeChanger: true,
                 showQuickJumper: true,
                showTotal: (total, range) => 
                  `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
               }}
              columns={[
                {
                  title: '设备信息',
                  dataIndex: 'name',
                  key: 'name',
                  width: 200,
                  render: (text: string, record: any) => (
                    <Space>
                      <Avatar 
                        size="large" 
                        icon={<MonitorOutlined />}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{text}</div>
                        <div style={{ color: '#8c8c8c', fontSize: '12px' }}>
                          {record.type || '监控设备'}
                        </div>
                      </div>
                    </Space>
                  )
                },
                {
                  title: '运行状态',
                  dataIndex: 'status',
                  key: 'status',
                  width: 120,
                  render: (status: string) => {
                    const statusConfig = {
                      online: { color: 'success', text: '在线', icon: <CheckCircleOutlined /> },
                      offline: { color: 'error', text: '离线', icon: <CloseCircleOutlined /> },
                      warning: { color: 'warning', text: '警告', icon: <ExclamationCircleOutlined /> },
                    };
                    const config = statusConfig[status as keyof typeof statusConfig];
                    return (
                      <Tag 
                        color={config.color} 
                        icon={config.icon}
                        style={{
                          borderRadius: '12px',
                          padding: '4px 12px',
                          fontSize: '12px'
                        }}
                      >
                        {config.text}
                      </Tag>
                    );
                  },
                },
                {
                  title: '安装位置',
                  dataIndex: 'location',
                  key: 'location',
                  ellipsis: true,
                },
                {
                  title: '设备健康度',
                  dataIndex: 'battery',
                  key: 'battery',
                  width: 150,
                  render: (battery: number) => {
                    if (battery === undefined) return <Text>-</Text>;
                    return (
                      <div>
                        <Progress 
                          percent={battery} 
                          size="small" 
                          strokeColor={
                            battery > 80 ? '#52c41a' : 
                            battery > 50 ? '#fa8c16' : '#ff4d4f'
                          }
                          format={(percent) => `${percent}%`}
                        />
                      </div>
                    );
                  },
                },
                {
                  title: '最后更新',
                  key: 'lastUpdate',
                  width: 120,
                  render: () => (
                    <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
                      {Math.floor(Math.random() * 60)}分钟前
                    </Text>
                  ),
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 120,
                  render: (_, record) => (
               <Space>
                      <Button 
                        size="small" 
                        type="link"
                        onClick={() => handleDeviceDetail(record)}
                      >
                        详情
                      </Button>
                      <Button 
               size="small"
                        type="link"
                        onClick={() => handleDeviceControl(record)}
                      >
                        控制
                      </Button>
                      </Space>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      {/* 系统警报抽屉 - 现代化设计 */}
      <Drawer
        title={
          <Flex justify="space-between" align="center">
          <Space>
              <BellOutlined style={{ color: '#fa8c16' }} />
              <span>系统通知</span>
            <Badge count={systemAlerts.filter(a => !a.read).length} />
          </Space>
            <Button 
              type="link" 
              size="small"
              onClick={clearAllAlerts}
            >
              全部已读
            </Button>
          </Flex>
        }
        placement="right"
        onClose={() => setShowAlertDrawer(false)}
        open={showAlertDrawer}
        width={400}
      >
        <List
          dataSource={systemAlerts}
          renderItem={(alert) => (
            <List.Item
              style={{
                background: alert.read ? '#fafafa' : '#fff',
                border: `1px solid ${alert.read ? '#f0f0f0' : '#e6f7ff'}`,
                borderRadius: '8px',
                marginBottom: '12px',
                padding: '16px',
                cursor: 'pointer'
              }}
              onClick={() => markAlertAsRead(alert.id)}
            >
              <List.Item.Meta
                avatar={
                  <Badge 
                    dot={!alert.read}
                    color={
                      alert.type === 'error' ? '#ff4d4f' : 
                      alert.type === 'warning' ? '#fa8c16' : 
                      alert.type === 'success' ? '#52c41a' : '#1890ff'
                    }
                  >
                    <Avatar 
                      size="default"
                      icon={
                        alert.type === 'error' ? <CloseCircleOutlined /> :
                        alert.type === 'warning' ? <ExclamationCircleOutlined /> :
                        alert.type === 'success' ? <CheckCircleOutlined /> :
                        <BellOutlined />
                      }
                      style={{
                        background: 
                          alert.type === 'error' ? '#ff4d4f' : 
                          alert.type === 'warning' ? '#fa8c16' : 
                          alert.type === 'success' ? '#52c41a' : 
                          '#1890ff'
                      }}
                    />
                  </Badge>
                }
                title={
                  <Text strong>
                    {alert.title}
                  </Text>
                }
                description={
                  <div>
                    <Paragraph style={{ 
                      margin: '4px 0',
                      color: '#8c8c8c'
                    }}>
                      {alert.message}
                    </Paragraph>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      <ClockCircleOutlined style={{ marginRight: '4px' }} />
                      {alert.time}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>

      {/* 设备详情模态框 */}
      <Modal
        title={
          <Space>
            <MonitorOutlined style={{ color: '#1890ff' }} />
            <span>设备详情</span>
          </Space>
        }
        open={showDeviceModal}
        onCancel={() => setShowDeviceModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowDeviceModal(false)}>
            关闭
          </Button>,
          <Button key="control" type="primary" onClick={() => {
            setShowDeviceModal(false);
            setShowControlModal(true);
          }}>
            远程控制
          </Button>
        ]}
        width={600}
      >
        {selectedDevice && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card size="small" title="基本信息">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div><Text strong>设备名称：</Text>{selectedDevice.name}</div>
                    <div><Text strong>设备类型：</Text>{selectedDevice.type || '监控设备'}</div>
                    <div><Text strong>安装位置：</Text>{selectedDevice.location}</div>
                    <div><Text strong>运行状态：</Text>
                      <Tag color={selectedDevice.status === 'online' ? 'green' : 'red'}>
                        {selectedDevice.status === 'online' ? '在线' : '离线'}
                      </Tag>
                    </div>
                  </Space>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="运行参数">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div><Text strong>设备健康度：</Text>
                      <Progress 
                        percent={selectedDevice.battery || 85} 
                        size="small" 
                        style={{ width: '60%' }}
                      />
                    </div>
                    <div><Text strong>运行时长：</Text>158小时32分钟</div>
                    <div><Text strong>数据传输：</Text>正常</div>
                    <div><Text strong>最后检查：</Text>5分钟前</div>
                  </Space>
                </Card>
              </Col>
            </Row>
            <Card size="small" title="实时数据" style={{ marginTop: 16 }}>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Statistic title="CPU使用率" value={Math.floor(Math.random() * 80 + 10)} suffix="%" />
                </Col>
                <Col span={6}>
                  <Statistic title="内存使用" value={Math.floor(Math.random() * 60 + 20)} suffix="%" />
                </Col>
                <Col span={6}>
                  <Statistic title="网络延迟" value={Math.floor(Math.random() * 30 + 5)} suffix="ms" />
                </Col>
                <Col span={6}>
                  <Statistic title="连接数" value={Math.floor(Math.random() * 50 + 10)} />
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </Modal>

      {/* 设备控制模态框 */}
      <Modal
        title={
          <Space>
            <SettingOutlined style={{ color: '#52c41a' }} />
            <span>设备控制</span>
          </Space>
        }
        open={showControlModal}
        onCancel={() => setShowControlModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowControlModal(false)}>
            取消
          </Button>,
          <Button key="apply" type="primary" onClick={() => {
            Modal.success({
              title: '控制命令已发送',
              content: '设备参数调整成功，正在应用新配置...',
            });
            setShowControlModal(false);
          }}>
            应用设置
          </Button>
        ]}
        width={500}
      >
        {selectedDevice && (
          <div>
            <Alert
              message={`正在控制设备：${selectedDevice.name}`}
              type="info"
              style={{ marginBottom: 16 }}
            />
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Text strong>设备开关：</Text>
                <Switch 
                  checked={selectedDevice.status === 'online'} 
                  checkedChildren="开启" 
                  unCheckedChildren="关闭" 
                  style={{ marginLeft: 16 }}
                />
              </div>
              <div>
                <Text strong>采集频率：</Text>
                <Select 
                  defaultValue="5" 
                  style={{ width: 120, marginLeft: 16 }}
                >
                  <Option value="1">1秒</Option>
                  <Option value="5">5秒</Option>
                  <Option value="10">10秒</Option>
                  <Option value="30">30秒</Option>
                </Select>
              </div>
              <div>
                <Text strong>数据质量：</Text>
                <Select 
                  defaultValue="high" 
                  style={{ width: 120, marginLeft: 16 }}
                >
                  <Option value="low">低质量</Option>
                  <Option value="medium">中等质量</Option>
                  <Option value="high">高质量</Option>
                </Select>
              </div>
              <div>
                <Text strong>报警阈值：</Text>
                <Input 
                  placeholder="输入阈值" 
                  defaultValue="80" 
                  style={{ width: 120, marginLeft: 16 }}
                  suffix="%"
                />
              </div>
              <div>
                <Button type="primary" danger size="small">
                  重启设备
                </Button>
                <Button type="default" size="small" style={{ marginLeft: 8 }}>
                  重置配置
                </Button>
                <Button type="default" size="small" style={{ marginLeft: 8 }}>
                  运行诊断
                </Button>
              </div>
            </Space>
          </div>
        )}
      </Modal>

      {/* 系统配置模态框 */}
      <Modal
        title={
          <Space>
            <SettingOutlined style={{ color: '#722ed1' }} />
            <span>系统配置</span>
          </Space>
        }
        open={showConfigModal}
        onCancel={() => setShowConfigModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowConfigModal(false)}>
            取消
          </Button>,
          <Button key="save" type="primary" onClick={() => {
            Modal.success({
              title: '配置保存成功',
              content: '系统配置已更新，部分设置需要重启后生效',
            });
            setShowConfigModal(false);
          }}>
            保存配置
          </Button>
        ]}
        width={700}
      >
        <Tabs defaultActiveKey="general">
          <TabPane tab="常规设置" key="general">
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Text strong>自动刷新间隔：</Text>
                <Select defaultValue="3" style={{ width: 150, marginLeft: 16 }}>
                  <Option value="1">1秒</Option>
                  <Option value="3">3秒</Option>
                  <Option value="5">5秒</Option>
                  <Option value="10">10秒</Option>
                </Select>
              </div>
              <div>
                <Text strong>数据保留时间：</Text>
                <Select defaultValue="30" style={{ width: 150, marginLeft: 16 }}>
                  <Option value="7">7天</Option>
                  <Option value="30">30天</Option>
                  <Option value="90">90天</Option>
                  <Option value="365">1年</Option>
                </Select>
              </div>
              <div>
                <Text strong>告警通知：</Text>
                <Switch defaultChecked style={{ marginLeft: 16 }} />
              </div>
              <div>
                <Text strong>邮件推送：</Text>
                <Switch defaultChecked style={{ marginLeft: 16 }} />
              </div>
            </Space>
          </TabPane>
          <TabPane tab="网络设置" key="network">
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Text strong>服务器地址：</Text>
                <Input defaultValue="192.168.1.100" style={{ width: 200, marginLeft: 16 }} />
              </div>
              <div>
                <Text strong>端口号：</Text>
                <Input defaultValue="8080" style={{ width: 120, marginLeft: 16 }} />
              </div>
              <div>
                <Text strong>连接超时：</Text>
                <Input defaultValue="30" style={{ width: 120, marginLeft: 16 }} suffix="秒" />
              </div>
            </Space>
          </TabPane>
          <TabPane tab="安全设置" key="security">
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Text strong>登录超时：</Text>
                <Select defaultValue="8" style={{ width: 150, marginLeft: 16 }}>
                  <Option value="2">2小时</Option>
                  <Option value="4">4小时</Option>
                  <Option value="8">8小时</Option>
                  <Option value="24">24小时</Option>
                </Select>
              </div>
              <div>
                <Text strong>密码强度：</Text>
                <Select defaultValue="medium" style={{ width: 150, marginLeft: 16 }}>
                  <Option value="low">低</Option>
                  <Option value="medium">中</Option>
                  <Option value="high">高</Option>
                </Select>
              </div>
              <div>
                <Text strong>双因子认证：</Text>
                <Switch style={{ marginLeft: 16 }} />
              </div>
            </Space>
          </TabPane>
        </Tabs>
      </Modal>

    </div>
  );
};

export default Dashboard; 