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
  Typography
} from 'antd';
import { 
  ApiOutlined,
  SyncOutlined,
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
  WifiOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  HistoryOutlined,
  BarChartOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import { apiLogs, dataSyncs, chartData } from '../data/mockData';
import ReactECharts from 'echarts-for-react';

const { Option } = Select;
const { Search } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface ApiMetrics {
  totalRequests: number;
  successRate: number;
  avgResponseTime: number;
  errorCount: number;
  activeConnections: number;
}

interface SyncMetrics {
  totalSyncs: number;
  successRate: number;
  avgDuration: number;
  totalRecords: number;
  lastSyncTime: string;
}

const ApiInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('logs');
  const [filteredLogs, setFilteredLogs] = useState(apiLogs);
  const [filteredSyncs, setFilteredSyncs] = useState(dataSyncs);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [apiMetrics, setApiMetrics] = useState<ApiMetrics>({
    totalRequests: 0,
    successRate: 0,
    avgResponseTime: 0,
    errorCount: 0,
    activeConnections: 0
  });
  const [syncMetrics, setSyncMetrics] = useState<SyncMetrics>({
    totalSyncs: 0,
    successRate: 0,
    avgDuration: 0,
    totalRecords: 0,
    lastSyncTime: ''
  });

  // 生成当前时间的图表数据
  const generateTimeData = () => {
    const now = new Date();
    const times = [];
    for (let i = 6; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 2 * 60 * 60 * 1000); // 每2小时一个点
      times.push(time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
    }
    return times;
  };

  // 计算API指标
  useEffect(() => {
    const total = apiLogs.length;
    const success = apiLogs.filter(log => log.success).length;
    const avgTime = apiLogs.reduce((acc, log) => acc + log.responseTime, 0) / total;
    const errors = apiLogs.filter(log => !log.success).length;

    setApiMetrics({
      totalRequests: total,
      successRate: Math.round((success / total) * 100),
      avgResponseTime: Math.round(avgTime),
      errorCount: errors,
      activeConnections: Math.floor(Math.random() * 50) + 20 // 模拟活跃连接数
    });
  }, []);

  // 计算同步指标
  useEffect(() => {
    const total = dataSyncs.length;
    const success = dataSyncs.filter(sync => sync.status === 'success').length;
    const avgDuration = dataSyncs.reduce((acc, sync) => acc + sync.duration, 0) / total;
    const totalRecords = dataSyncs.reduce((acc, sync) => acc + sync.recordCount, 0);
    const lastSync = dataSyncs.sort((a, b) => new Date(b.syncTime).getTime() - new Date(a.syncTime).getTime())[0];

    setSyncMetrics({
      totalSyncs: total,
      successRate: Math.round((success / total) * 100),
      avgDuration: Math.round(avgDuration),
      totalRecords: totalRecords,
      lastSyncTime: lastSync?.syncTime || ''
    });
  }, []);

  // 筛选逻辑
  useEffect(() => {
    let filtered = apiLogs;

    if (statusFilter) {
      filtered = filtered.filter(log => 
        statusFilter === 'success' ? log.success : !log.success
      );
    }

    if (methodFilter) {
      filtered = filtered.filter(log => log.method === methodFilter);
    }

    if (searchText) {
      filtered = filtered.filter(log => 
        log.endpoint.toLowerCase().includes(searchText.toLowerCase()) ||
        log.user.toLowerCase().includes(searchText.toLowerCase()) ||
        log.ipAddress.includes(searchText)
      );
    }

    setFilteredLogs(filtered);
  }, [statusFilter, methodFilter, searchText]);

  // 自动刷新
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // 模拟新数据
        message.info('接口数据已刷新');
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleViewDetail = (record: any) => {
    setSelectedLog(record);
    setIsDetailModalVisible(true);
  };

  const handleRefresh = () => {
    message.success('数据已刷新');
  };

  const handleExport = () => {
    message.success('数据导出成功');
  };

  // API日志列定义
  const apiLogColumns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 150,
      render: (timestamp: string) => (
        <Text type="secondary">{timestamp}</Text>
      ),
    },
    {
      title: '接口',
      dataIndex: 'endpoint',
      key: 'endpoint',
      width: 200,
      render: (endpoint: string) => (
        <Text code>{endpoint}</Text>
      ),
    },
    {
      title: '方法',
      dataIndex: 'method',
      key: 'method',
      width: 80,
      render: (method: string) => {
        const colorMap = {
          GET: 'blue',
          POST: 'green',
          PUT: 'orange',
          DELETE: 'red'
        };
        return <Tag color={colorMap[method as keyof typeof colorMap]}>{method}</Tag>;
      },
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'success',
      key: 'success',
      width: 100,
      render: (success: boolean, record: any) => (
        <Space>
          <Badge 
            status={success ? 'success' : 'error'} 
          />
          <span>{record.responseStatus}</span>
        </Space>
      ),
    },
    {
      title: '响应时间',
      dataIndex: 'responseTime',
      key: 'responseTime',
      width: 100,
      render: (time: number) => (
        <Text type={time > 1000 ? 'danger' : time > 500 ? 'warning' : 'secondary'}>
          {time}ms
        </Text>
      ),
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: any, record: any) => (
        <Button 
          type="link" 
          icon={<EyeOutlined />}
          onClick={() => handleViewDetail(record)}
        >
          详情
        </Button>
      ),
    },
  ];

  // 数据同步列定义
  const syncColumns = [
    {
      title: '同步时间',
      dataIndex: 'syncTime',
      key: 'syncTime',
      width: 150,
    },
    {
      title: '源系统',
      dataIndex: 'sourceSystem',
      key: 'sourceSystem',
      width: 120,
    },
    {
      title: '目标系统',
      dataIndex: 'targetSystem',
      key: 'targetSystem',
      width: 120,
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
      width: 100,
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
        return <Tag color={colorMap[status as keyof typeof colorMap]}>{status}</Tag>;
      },
    },
    {
      title: '记录数',
      dataIndex: 'recordCount',
      key: 'recordCount',
      width: 100,
    },
    {
      title: '耗时',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      render: (duration: number) => `${duration}ms`,
    },
  ];

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <ApiOutlined style={{ marginRight: 8 }} />
          标准化接口管理
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
            onClick={handleExport}
          >
            导出日志
          </Button>
        </Space>
      </div>

      {/* 指标概览 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="总请求数"
              value={apiMetrics.totalRequests}
              prefix={<ApiOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="成功率"
              value={apiMetrics.successRate}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="平均响应时间"
              value={apiMetrics.avgResponseTime}
              suffix="ms"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="错误数"
              value={apiMetrics.errorCount}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="活跃连接"
              value={apiMetrics.activeConnections}
              prefix={<WifiOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="数据同步成功率"
              value={syncMetrics.successRate}
              suffix="%"
              prefix={<SyncOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="接口日志" key="logs">
            <div style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={6}>
                  <Search
                    placeholder="搜索接口、用户或IP"
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
                    <Option value="success">成功</Option>
                    <Option value="failed">失败</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <Select
                    placeholder="方法筛选"
                    value={methodFilter}
                    onChange={setMethodFilter}
                    style={{ width: '100%' }}
                    allowClear
                  >
                    <Option value="GET">GET</Option>
                    <Option value="POST">POST</Option>
                    <Option value="PUT">PUT</Option>
                    <Option value="DELETE">DELETE</Option>
                  </Select>
                </Col>
              </Row>
            </div>
            <Table
              columns={apiLogColumns}
              dataSource={filteredLogs}
              rowKey="id"
              pagination={{
                pageSize: 20,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="数据同步" key="sync">
            <div style={{ marginBottom: 16 }}>
              <Alert
                message="数据同步状态"
                description={`最近同步时间: ${syncMetrics.lastSyncTime} | 总同步次数: ${syncMetrics.totalSyncs} | 平均耗时: ${syncMetrics.avgDuration}ms`}
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            </div>
            <Table
              columns={syncColumns}
              dataSource={filteredSyncs}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true
              }}
              scroll={{ x: 1000 }}
            />
          </TabPane>

          <TabPane tab="接口统计" key="stats">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="接口调用趋势" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '接口调用趋势',
                        left: 'center',
                        textStyle: { fontSize: 14 }
                      },
                      tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'cross' }
                      },
                      legend: {
                        data: ['成功请求', '失败请求'],
                        bottom: 0
                      },
                      xAxis: {
                        type: 'category',
                        data: generateTimeData()
                      },
                      yAxis: {
                        type: 'value',
                        name: '请求数量'
                      },
                      series: [
                        {
                          name: '成功请求',
                          type: 'line',
                          smooth: true,
                          data: [120, 132, 101, 134, 90, 230, 210],
                          itemStyle: { color: '#52c41a' }
                        },
                        {
                          name: '失败请求',
                          type: 'line',
                          smooth: true,
                          data: [5, 8, 3, 7, 2, 12, 8],
                          itemStyle: { color: '#ff4d4f' }
                        }
                      ]
                    }}
                    style={{ height: 300 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="响应时间分布" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '响应时间分布',
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
                          name: '响应时间',
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
                            { value: 335, name: '<100ms', itemStyle: { color: '#52c41a' } },
                            { value: 310, name: '100-500ms', itemStyle: { color: '#1890ff' } },
                            { value: 234, name: '500-1000ms', itemStyle: { color: '#faad14' } },
                            { value: 135, name: '>1000ms', itemStyle: { color: '#ff4d4f' } }
                          ]
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
                <Card title="系统间数据流" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '系统间数据流向',
                        left: 'center',
                        textStyle: { fontSize: 14 }
                      },
                      tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c}'
                      },
                      series: [
                        {
                          type: 'sankey',
                          layout: 'none',
                          data: [
                            { name: 'ERP系统' },
                            { name: '设备管理系统' },
                            { name: '融合通信平台' },
                            { name: '数据分析系统' },
                            { name: '安全监控系统' }
                          ],
                          links: [
                            { source: 'ERP系统', target: '融合通信平台', value: 156 },
                            { source: '设备管理系统', target: '融合通信平台', value: 89 },
                            { source: '融合通信平台', target: '数据分析系统', value: 234 },
                            { source: '安全监控系统', target: '融合通信平台', value: 45 }
                          ],
                          itemStyle: {
                            borderWidth: 1,
                            borderColor: '#aaa'
                          },
                          lineStyle: {
                            color: 'source',
                            curveness: 0.5
                          }
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

      {/* 详情模态框 */}
      <Modal
        title="接口调用详情"
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedLog && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="请求ID">{selectedLog.id}</Descriptions.Item>
            <Descriptions.Item label="调用时间">{selectedLog.timestamp}</Descriptions.Item>
            <Descriptions.Item label="接口地址">{selectedLog.endpoint}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{selectedLog.method}</Descriptions.Item>
            <Descriptions.Item label="用户">{selectedLog.user}</Descriptions.Item>
            <Descriptions.Item label="IP地址">{selectedLog.ipAddress}</Descriptions.Item>
            <Descriptions.Item label="响应状态">{selectedLog.responseStatus}</Descriptions.Item>
            <Descriptions.Item label="响应时间">{selectedLog.responseTime}ms</Descriptions.Item>
            <Descriptions.Item label="成功状态">
              <Tag color={selectedLog.success ? 'green' : 'red'}>
                {selectedLog.success ? '成功' : '失败'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="用户代理">{selectedLog.userAgent}</Descriptions.Item>
            {selectedLog.requestData && (
              <Descriptions.Item label="请求数据" span={2}>
                <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
                  {JSON.stringify(selectedLog.requestData, null, 2)}
                </pre>
              </Descriptions.Item>
            )}
            {selectedLog.errorMessage && (
              <Descriptions.Item label="错误信息" span={2}>
                <Text type="danger">{selectedLog.errorMessage}</Text>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default ApiInterface; 