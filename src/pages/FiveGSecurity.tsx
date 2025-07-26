import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Table, 
  Tag, 
  Space, 
  Button, 
  Modal, 
  Select, 
  Input, 
  Badge, 
  Statistic, 
  Tooltip,
  message,
  Switch,
  Radio,
  Tabs,
  Progress,
  Alert,
  Timeline,
  Descriptions,
  Divider,
  Typography,
  Form,
  InputNumber,
  DatePicker
} from 'antd';
import { 
  SafetyOutlined,
  WifiOutlined,
  UserOutlined,
  LockOutlined,
  UnlockOutlined,
  EyeOutlined,
  ReloadOutlined,
  SettingOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  UploadOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  HistoryOutlined,
  BarChartOutlined,
  PropertySafetyOutlined,
  KeyOutlined,
  MobileOutlined,
  SignalFilled
} from '@ant-design/icons';
import { fiveGCards, securityAuths, networkSecurities, chartData } from '../data/mockData';
import ReactECharts from 'echarts-for-react';

const { Option } = Select;
const { Search } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface SecurityMetrics {
  totalCards: number;
  activeCards: number;
  authSuccessRate: number;
  threatLevel: string;
  blockedThreats: number;
  activeConnections: number;
}

const FiveGSecurity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cards');
  const [filteredCards, setFilteredCards] = useState(fiveGCards);
  const [filteredAuths, setFilteredAuths] = useState(securityAuths);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isCardModalVisible, setIsCardModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [selectedAuth, setSelectedAuth] = useState<any>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    totalCards: 0,
    activeCards: 0,
    authSuccessRate: 0,
    threatLevel: 'low',
    blockedThreats: 0,
    activeConnections: 0
  });

  // 生成当前时间的图表数据
  const generateTimeData = () => {
    const now = new Date();
    const times = [];
    for (let i = 4; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 2 * 60 * 60 * 1000); // 每2小时一个点
      times.push(time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
    }
    return times;
  };

  // 计算安全指标
  useEffect(() => {
    const totalCards = fiveGCards.length;
    const activeCards = fiveGCards.filter(card => card.status === 'active').length;
    const totalAuths = securityAuths.length;
    const successAuths = securityAuths.filter(auth => auth.status === 'success').length;
    const blockedThreats = networkSecurities.reduce((acc, sec) => acc + sec.blockedAttempts, 0);
    const maxThreatLevel = networkSecurities.reduce((max, sec) => {
      const levels = { low: 1, medium: 2, high: 3, critical: 4 };
      return levels[sec.threatLevel as keyof typeof levels] > levels[max as keyof typeof levels] ? sec.threatLevel : max;
    }, 'low');

    setSecurityMetrics({
      totalCards,
      activeCards,
      authSuccessRate: Math.round((successAuths / totalAuths) * 100),
      threatLevel: maxThreatLevel,
      blockedThreats,
      activeConnections: Math.floor(Math.random() * 100) + 50
    });
  }, []);

  // 筛选逻辑
  useEffect(() => {
    let filtered = fiveGCards;

    if (statusFilter) {
      filtered = filtered.filter(card => card.status === statusFilter);
    }

    if (searchText) {
      filtered = filtered.filter(card => 
        card.cardNumber.includes(searchText) ||
        card.location.toLowerCase().includes(searchText.toLowerCase()) ||
        card.deviceId?.includes(searchText)
      );
    }

    setFilteredCards(filtered);
  }, [statusFilter, searchText]);

  // 自动刷新
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        message.info('5G安全数据已刷新');
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleViewCard = (record: any) => {
    setSelectedCard(record);
    setIsCardModalVisible(true);
  };

  const handleViewAuth = (record: any) => {
    setSelectedAuth(record);
    setIsAuthModalVisible(true);
  };

  const handleActivateCard = (cardId: string) => {
    message.success('5G卡激活成功');
  };

  const handleSuspendCard = (cardId: string) => {
    message.warning('5G卡已暂停');
  };

  const handleRefresh = () => {
    message.success('数据已刷新');
  };

  // 5G卡列定义
  const cardColumns = [
    {
      title: '卡号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      width: 200,
      render: (cardNumber: string) => (
        <Text code>{cardNumber}</Text>
      ),
    },
    {
      title: 'ICCID',
      dataIndex: 'iccid',
      key: 'iccid',
      width: 200,
      render: (iccid: string) => (
        <Text code>{iccid}</Text>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const colorMap = {
          active: 'green',
          inactive: 'orange',
          suspended: 'red'
        };
        const textMap = {
          active: '激活',
          inactive: '未激活',
          suspended: '暂停'
        };
        return <Tag color={colorMap[status as keyof typeof colorMap]}>{textMap[status as keyof typeof textMap]}</Tag>;
      },
    },
    {
      title: '激活日期',
      dataIndex: 'activationDate',
      key: 'activationDate',
      width: 120,
    },
    {
      title: '数据使用',
      dataIndex: 'dataUsage',
      key: 'dataUsage',
      width: 120,
      render: (usage: number, record: any) => (
        <Progress 
          percent={Math.round((usage / record.dataLimit) * 100)} 
          size="small" 
          status={usage > record.dataLimit * 0.8 ? 'exception' : 'normal'}
        />
      ),
    },
    {
      title: '信号强度',
      dataIndex: 'signalStrength',
      key: 'signalStrength',
      width: 120,
      render: (strength: number) => (
        <Space>
          <SignalFilled style={{ color: strength > 80 ? '#52c41a' : strength > 60 ? '#faad14' : '#ff4d4f' }} />
          <span>{strength}%</span>
        </Space>
      ),
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: 120,
    },
    {
      title: '最后更新',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleViewCard(record)}
          >
            详情
          </Button>
          {record.status === 'inactive' && (
            <Button 
              type="link" 
              icon={<CheckCircleOutlined />}
              onClick={() => handleActivateCard(record.id)}
            >
              激活
            </Button>
          )}
          {record.status === 'active' && (
            <Button 
              type="link" 
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleSuspendCard(record.id)}
            >
              暂停
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // 认证记录列定义
  const authColumns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 150,
    },
    {
      title: '用户',
      dataIndex: 'userName',
      key: 'userName',
      width: 100,
    },
    {
      title: '认证类型',
      dataIndex: 'authType',
      key: 'authType',
      width: 100,
      render: (type: string) => {
        const textMap = {
          primary: '主认证',
          secondary: '二次认证',
          biometric: '生物识别'
        };
        return textMap[type as keyof typeof textMap] || type;
      },
    },
    {
      title: '认证方法',
      dataIndex: 'authMethod',
      key: 'authMethod',
      width: 100,
      render: (method: string) => {
        const textMap = {
          password: '密码',
          sms: '短信',
          email: '邮箱',
          fingerprint: '指纹',
          face: '人脸',
          biometric: '生物识别'
        };
        return textMap[method as keyof typeof textMap] || method;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const colorMap = {
          success: 'green',
          failed: 'red',
          pending: 'orange'
        };
        const textMap = {
          success: '成功',
          failed: '失败',
          pending: '待处理'
        };
        return <Tag color={colorMap[status as keyof typeof colorMap]}>{textMap[status as keyof typeof textMap]}</Tag>;
      },
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 120,
    },
    {
      title: '设备信息',
      dataIndex: 'deviceInfo',
      key: 'deviceInfo',
      width: 150,
      ellipsis: true,
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: any, record: any) => (
        <Button 
          type="link" 
          icon={<EyeOutlined />}
          onClick={() => handleViewAuth(record)}
        >
          详情
        </Button>
      ),
    },
  ];

  // 网络安全列定义
  const securityColumns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => {
        const textMap = {
          firewall: '防火墙',
          ids: '入侵检测',
          ips: '入侵防护',
          ddos: 'DDoS防护'
        };
        return textMap[type as keyof typeof textMap] || type;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const colorMap = {
          active: 'green',
          inactive: 'orange',
          warning: 'red'
        };
        const textMap = {
          active: '正常',
          inactive: '未激活',
          warning: '警告'
        };
        return <Tag color={colorMap[status as keyof typeof colorMap]}>{textMap[status as keyof typeof textMap]}</Tag>;
      },
    },
    {
      title: '威胁等级',
      dataIndex: 'threatLevel',
      key: 'threatLevel',
      width: 100,
      render: (level: string) => {
        const colorMap = {
          low: 'green',
          medium: 'orange',
          high: 'red',
          critical: 'red'
        };
        const textMap = {
          low: '低',
          medium: '中',
          high: '高',
          critical: '严重'
        };
        return <Tag color={colorMap[level as keyof typeof colorMap]}>{textMap[level as keyof typeof textMap]}</Tag>;
      },
    },
    {
      title: '阻止次数',
      dataIndex: 'blockedAttempts',
      key: 'blockedAttempts',
      width: 100,
    },
    {
      title: '总威胁数',
      dataIndex: 'totalThreats',
      key: 'totalThreats',
      width: 100,
    },
    {
      title: '最后更新',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      width: 150,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
  ];

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <SafetyOutlined style={{ marginRight: 8 }} />
          5G网络安全服务
        </Title>
        <Space>
          <Switch
            checked={autoRefresh}
            onChange={setAutoRefresh}
            checkedChildren="自动刷新"
            unCheckedChildren="手动刷新"
          />
          <Button 
            type="primary" 
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
          >
            刷新数据
          </Button>
          <Button 
            icon={<DownloadOutlined />}
            onClick={() => message.success('安全报告导出成功')}
          >
            导出报告
          </Button>
        </Space>
      </div>

      {/* 安全指标概览 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="5G卡总数"
              value={securityMetrics.totalCards}
              prefix={<MobileOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="激活卡数"
              value={securityMetrics.activeCards}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="认证成功率"
              value={securityMetrics.authSuccessRate}
              suffix="%"
              prefix={<UserOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="威胁等级"
              value={securityMetrics.threatLevel}
              prefix={<PropertySafetyOutlined />}
              valueStyle={{ 
                color: securityMetrics.threatLevel === 'critical' ? '#ff4d4f' : 
                       securityMetrics.threatLevel === 'high' ? '#fa8c16' : 
                       securityMetrics.threatLevel === 'medium' ? '#faad14' : '#52c41a'
              }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="阻止威胁"
              value={securityMetrics.blockedThreats}
              prefix={<LockOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="活跃连接"
              value={securityMetrics.activeConnections}
              prefix={<WifiOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="5G卡管理" key="cards">
            <div style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Search
                    placeholder="搜索卡号、位置或设备ID"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col span={4}>
                  <Select
                    placeholder="状态筛选"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    style={{ width: '100%' }}
                    allowClear
                  >
                    <Option value="active">激活</Option>
                    <Option value="inactive">未激活</Option>
                    <Option value="suspended">暂停</Option>
                  </Select>
                </Col>
              </Row>
            </div>
            <Table
              columns={cardColumns}
              dataSource={filteredCards}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true
              }}
              scroll={{ x: 1400 }}
            />
          </TabPane>

          <TabPane tab="安全认证" key="auth">
            <div style={{ marginBottom: 16 }}>
              <Alert
                message="认证安全状态"
                description={`认证成功率: ${securityMetrics.authSuccessRate}% | 总认证次数: ${securityAuths.length} | 最近认证: ${securityAuths[0]?.timestamp}`}
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            </div>
            <Table
              columns={authColumns}
              dataSource={filteredAuths}
              rowKey="id"
              pagination={{
                pageSize: 15,
                showSizeChanger: true,
                showQuickJumper: true
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="网络安全" key="security">
            <div style={{ marginBottom: 16 }}>
              <Alert
                message="网络安全防护状态"
                description={`当前威胁等级: ${securityMetrics.threatLevel} | 已阻止威胁: ${securityMetrics.blockedThreats} | 活跃防护系统: ${networkSecurities.filter(s => s.status === 'active').length}`}
                type="success"
                showIcon
                style={{ marginBottom: 16 }}
              />
            </div>
            <Table
              columns={securityColumns}
              dataSource={networkSecurities}
              rowKey="id"
              pagination={false}
            />
          </TabPane>

          <TabPane tab="安全统计" key="stats">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="5G卡状态分布" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '5G卡状态分布',
                        left: 'center',
                        textStyle: { fontSize: 14 }
                      },
                      tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                      },
                      legend: {
                        orient: 'vertical',
                        left: 'left',
                        bottom: 0
                      },
                      series: [
                        {
                          name: '5G卡状态',
                          type: 'pie',
                          radius: ['40%', '70%'],
                          avoidLabelOverlap: false,
                          label: {
                            show: false,
                            position: 'center'
                          },
                          emphasis: {
                            label: {
                              show: true,
                              fontSize: '18',
                              fontWeight: 'bold'
                            }
                          },
                          labelLine: {
                            show: false
                          },
                          data: [
                            { value: 4, name: '激活', itemStyle: { color: '#52c41a' } },
                            { value: 0, name: '未激活', itemStyle: { color: '#faad14' } },
                            { value: 1, name: '暂停', itemStyle: { color: '#ff4d4f' } }
                          ]
                        }
                      ]
                    }}
                    style={{ height: 300 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="认证方式统计" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '认证方式统计',
                        left: 'center',
                        textStyle: { fontSize: 14 }
                      },
                      tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'shadow' }
                      },
                      xAxis: {
                        type: 'category',
                        data: ['密码', '短信', '生物识别']
                      },
                      yAxis: {
                        type: 'value',
                        name: '认证次数'
                      },
                      series: [
                        {
                          name: '认证次数',
                          type: 'bar',
                          data: [
                            { value: 2, itemStyle: { color: '#1890ff' } },
                            { value: 1, itemStyle: { color: '#52c41a' } },
                            { value: 1, itemStyle: { color: '#722ed1' } }
                          ],
                          barWidth: '40%'
                        }
                      ]
                    }}
                    style={{ height: 300 }}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={24}>
                <Card title="威胁趋势分析" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '威胁趋势分析',
                        left: 'center',
                        textStyle: { fontSize: 14 }
                      },
                      tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'cross' }
                      },
                      legend: {
                        data: ['防火墙', '入侵检测', '入侵防护', 'DDoS防护'],
                        bottom: 0
                      },
                      xAxis: {
                        type: 'category',
                        data: generateTimeData()
                      },
                      yAxis: {
                        type: 'value',
                        name: '威胁数量'
                      },
                      series: [
                        {
                          name: '防火墙',
                          type: 'line',
                          smooth: true,
                          data: [0, 2, 5, 3, 1],
                          itemStyle: { color: '#52c41a' }
                        },
                        {
                          name: '入侵检测',
                          type: 'line',
                          smooth: true,
                          data: [1, 3, 2, 4, 2],
                          itemStyle: { color: '#faad14' }
                        },
                        {
                          name: '入侵防护',
                          type: 'line',
                          smooth: true,
                          data: [0, 1, 2, 1, 0],
                          itemStyle: { color: '#1890ff' }
                        },
                        {
                          name: 'DDoS防护',
                          type: 'line',
                          smooth: true,
                          data: [0, 0, 1, 0, 0],
                          itemStyle: { color: '#722ed1' }
                        }
                      ]
                    }}
                    style={{ height: 200 }}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* 5G卡详情模态框 */}
      <Modal
        title="5G卡详情"
        visible={isCardModalVisible}
        onCancel={() => setIsCardModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedCard && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="卡号">{selectedCard.cardNumber}</Descriptions.Item>
            <Descriptions.Item label="ICCID">{selectedCard.iccid}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={selectedCard.status === 'active' ? 'green' : selectedCard.status === 'inactive' ? 'orange' : 'red'}>
                {selectedCard.status === 'active' ? '激活' : selectedCard.status === 'inactive' ? '未激活' : '暂停'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="激活日期">{selectedCard.activationDate}</Descriptions.Item>
            <Descriptions.Item label="数据使用">{selectedCard.dataUsage}GB / {selectedCard.dataLimit}GB</Descriptions.Item>
            <Descriptions.Item label="信号强度">{selectedCard.signalStrength}%</Descriptions.Item>
            <Descriptions.Item label="位置">{selectedCard.location}</Descriptions.Item>
            <Descriptions.Item label="设备ID">{selectedCard.deviceId || '未绑定'}</Descriptions.Item>
            <Descriptions.Item label="最后更新">{selectedCard.lastUpdate}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* 认证详情模态框 */}
      <Modal
        title="认证记录详情"
        visible={isAuthModalVisible}
        onCancel={() => setIsAuthModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedAuth && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="认证ID">{selectedAuth.id}</Descriptions.Item>
            <Descriptions.Item label="认证时间">{selectedAuth.timestamp}</Descriptions.Item>
            <Descriptions.Item label="用户ID">{selectedAuth.userId}</Descriptions.Item>
            <Descriptions.Item label="用户名">{selectedAuth.userName}</Descriptions.Item>
            <Descriptions.Item label="认证类型">{selectedAuth.authType}</Descriptions.Item>
            <Descriptions.Item label="认证方法">{selectedAuth.authMethod}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={selectedAuth.status === 'success' ? 'green' : selectedAuth.status === 'failed' ? 'red' : 'orange'}>
                {selectedAuth.status === 'success' ? '成功' : selectedAuth.status === 'failed' ? '失败' : '待处理'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="IP地址">{selectedAuth.ipAddress}</Descriptions.Item>
            <Descriptions.Item label="设备信息" span={2}>{selectedAuth.deviceInfo}</Descriptions.Item>
            <Descriptions.Item label="位置" span={2}>{selectedAuth.location}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default FiveGSecurity; 