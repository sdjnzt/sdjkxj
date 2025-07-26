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
  RadarChartOutlined,
  WifiOutlined,
  EnvironmentOutlined,
  ThunderboltOutlined,
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
  FileTextOutlined,
  HistoryOutlined,
  BarChartOutlined,
  SafetyOutlined,
  SignalFilled,
  BulbOutlined,
  SoundOutlined,
  FireOutlined,
  CloudOutlined
} from '@ant-design/icons';
import { sensorData, transmissionLogs, chartData } from '../data/mockData';
import ReactECharts from 'echarts-for-react';

const { Option } = Select;
const { Search } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface TransmissionMetrics {
  totalSensors: number;
  onlineSensors: number;
  transmissionSuccessRate: number;
  avgDataSize: number;
  totalTransmissions: number;
  activeStreams: number;
}

const SensorTransmission: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sensors');
  const [filteredSensors, setFilteredSensors] = useState(sensorData);
  const [filteredLogs, setFilteredLogs] = useState(transmissionLogs);
  const [searchText, setSearchText] = useState('');
  const [sensorTypeFilter, setSensorTypeFilter] = useState('');
  const [isSensorModalVisible, setIsSensorModalVisible] = useState(false);
  const [isLogModalVisible, setIsLogModalVisible] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<any>(null);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [transmissionMetrics, setTransmissionMetrics] = useState<TransmissionMetrics>({
    totalSensors: 0,
    onlineSensors: 0,
    transmissionSuccessRate: 0,
    avgDataSize: 0,
    totalTransmissions: 0,
    activeStreams: 0
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

  // 计算传输指标
  useEffect(() => {
    const totalSensors = sensorData.length;
    const onlineSensors = sensorData.filter(sensor => sensor.signalStrength > 0).length;
    const totalLogs = transmissionLogs.length;
    const successLogs = transmissionLogs.filter(log => log.status === 'success').length;
    const avgDataSize = transmissionLogs.reduce((acc, log) => acc + log.dataSize, 0) / totalLogs;

    setTransmissionMetrics({
      totalSensors,
      onlineSensors,
      transmissionSuccessRate: Math.round((successLogs / totalLogs) * 100),
      avgDataSize: Math.round(avgDataSize),
      totalTransmissions: totalLogs,
      activeStreams: Math.floor(Math.random() * 20) + 10
    });
  }, []);

  // 筛选逻辑
  useEffect(() => {
    let filtered = sensorData;

    if (sensorTypeFilter) {
      filtered = filtered.filter(sensor => sensor.sensorType === sensorTypeFilter);
    }

    if (searchText) {
      filtered = filtered.filter(sensor => 
        sensor.sensorId.toLowerCase().includes(searchText.toLowerCase()) ||
        sensor.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredSensors(filtered);
  }, [sensorTypeFilter, searchText]);

  // 自动刷新
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        message.info('传感器数据已刷新');
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleViewSensor = (record: any) => {
    setSelectedSensor(record);
    setIsSensorModalVisible(true);
  };

  const handleViewLog = (record: any) => {
    setSelectedLog(record);
    setIsLogModalVisible(true);
  };

  const handleRefresh = () => {
    message.success('数据已刷新');
  };

  const getSensorIcon = (type: string) => {
    const iconMap = {
      temperature: <FireOutlined style={{ color: '#ff4d4f' }} />,
      humidity: <CloudOutlined style={{ color: '#1890ff' }} />,
      pressure: <BarChartOutlined style={{ color: '#52c41a' }} />,
      motion: <RadarChartOutlined style={{ color: '#faad14' }} />,
      light: <BulbOutlined style={{ color: '#722ed1' }} />,
      sound: <SoundOutlined style={{ color: '#13c2c2' }} />
    };
    return iconMap[type as keyof typeof iconMap] || <EnvironmentOutlined />;
  };

  const getSensorTypeText = (type: string) => {
    const textMap = {
      temperature: '温度传感器',
      humidity: '湿度传感器',
      pressure: '压力传感器',
      motion: '运动传感器',
      light: '光照传感器',
      sound: '声音传感器'
    };
    return textMap[type as keyof typeof textMap] || type;
  };

  // 传感器数据列定义
  const sensorColumns = [
    {
      title: '传感器ID',
      dataIndex: 'sensorId',
      key: 'sensorId',
      width: 120,
      render: (sensorId: string) => (
        <Text code>{sensorId}</Text>
      ),
    },
    {
      title: '类型',
      dataIndex: 'sensorType',
      key: 'sensorType',
      width: 120,
      render: (type: string) => (
        <Space>
          {getSensorIcon(type)}
          {getSensorTypeText(type)}
        </Space>
      ),
    },
    {
      title: '数值',
      dataIndex: 'value',
      key: 'value',
      width: 100,
      render: (value: number, record: any) => (
        <Text strong>{value} {record.unit}</Text>
      ),
    },
    {
      title: '精度',
      dataIndex: 'accuracy',
      key: 'accuracy',
      width: 80,
      render: (accuracy: number) => (
        <Text type="secondary">±{accuracy}</Text>
      ),
    },
    {
      title: '电池电量',
      dataIndex: 'batteryLevel',
      key: 'batteryLevel',
      width: 120,
      render: (level: number) => (
        <Progress 
          percent={level} 
          size="small" 
          status={level < 20 ? 'exception' : level < 50 ? 'normal' : 'success'}
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
      title: '时间戳',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: any, record: any) => (
        <Button 
          type="link" 
          icon={<EyeOutlined />}
          onClick={() => handleViewSensor(record)}
        >
          详情
        </Button>
      ),
    },
  ];

  // 传输日志列定义
  const logColumns = [
    {
      title: '传输时间',
      dataIndex: 'transmissionTime',
      key: 'transmissionTime',
      width: 150,
    },
    {
      title: '设备ID',
      dataIndex: 'deviceId',
      key: 'deviceId',
      width: 100,
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
          retrying: 'orange'
        };
        const textMap = {
          success: '成功',
          failed: '失败',
          retrying: '重试中'
        };
        return <Tag color={colorMap[status as keyof typeof colorMap]}>{textMap[status as keyof typeof textMap]}</Tag>;
      },
    },
    {
      title: '数据大小',
      dataIndex: 'dataSize',
      key: 'dataSize',
      width: 100,
      render: (size: number) => (
        <Text>{size} bytes</Text>
      ),
    },
    {
      title: '耗时',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      render: (duration: number) => (
        <Text type={duration > 1000 ? 'danger' : duration > 500 ? 'warning' : 'secondary'}>
          {duration}ms
        </Text>
      ),
    },
    {
      title: '重试次数',
      dataIndex: 'retryCount',
      key: 'retryCount',
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
          onClick={() => handleViewLog(record)}
        >
          详情
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <RadarChartOutlined style={{ marginRight: 8 }} />
          感知传输管理
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
            onClick={() => message.success('传感器数据导出成功')}
          >
            导出数据
          </Button>
        </Space>
      </div>

      {/* 传输指标概览 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="传感器总数"
              value={transmissionMetrics.totalSensors}
              prefix={<RadarChartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="在线传感器"
              value={transmissionMetrics.onlineSensors}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="传输成功率"
              value={transmissionMetrics.transmissionSuccessRate}
              suffix="%"
              prefix={<ThunderboltOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="平均数据大小"
              value={transmissionMetrics.avgDataSize}
              suffix="bytes"
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="总传输次数"
              value={transmissionMetrics.totalTransmissions}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="活跃数据流"
              value={transmissionMetrics.activeStreams}
              prefix={<WifiOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="传感器数据" key="sensors">
            <div style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Search
                    placeholder="搜索传感器ID或位置"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col span={4}>
                  <Select
                    placeholder="传感器类型"
                    value={sensorTypeFilter}
                    onChange={setSensorTypeFilter}
                    style={{ width: '100%' }}
                    allowClear
                  >
                    <Option value="temperature">温度传感器</Option>
                    <Option value="humidity">湿度传感器</Option>
                    <Option value="pressure">压力传感器</Option>
                    <Option value="motion">运动传感器</Option>
                    <Option value="light">光照传感器</Option>
                    <Option value="sound">声音传感器</Option>
                  </Select>
                </Col>
              </Row>
            </div>
            <Table
              columns={sensorColumns}
              dataSource={filteredSensors}
              rowKey="id"
              pagination={{
                pageSize: 15,
                showSizeChanger: true,
                showQuickJumper: true
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="传输日志" key="logs">
            <div style={{ marginBottom: 16 }}>
              <Alert
                message="传输状态概览"
                description={`传输成功率: ${transmissionMetrics.transmissionSuccessRate}% | 总传输次数: ${transmissionMetrics.totalTransmissions} | 平均数据大小: ${transmissionMetrics.avgDataSize} bytes`}
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            </div>
            <Table
              columns={logColumns}
              dataSource={filteredLogs}
              rowKey="id"
              pagination={{
                pageSize: 15,
                showSizeChanger: true,
                showQuickJumper: true
              }}
              scroll={{ x: 1000 }}
            />
          </TabPane>

          <TabPane tab="实时监控" key="monitor">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="温度传感器实时数据" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '温度传感器实时数据',
                        left: 'center',
                        textStyle: { fontSize: 14 }
                      },
                      tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'cross' }
                      },
                      xAxis: {
                        type: 'category',
                        data: generateTimeData()
                      },
                      yAxis: {
                        type: 'value',
                        name: '温度 (°C)',
                        min: 15,
                        max: 35
                      },
                      series: [
                        {
                          name: '温度',
                          type: 'line',
                          smooth: true,
                          data: [22, 24, 26, 25.6, 24, 23, 21.5],
                          itemStyle: { color: '#ff4d4f' },
                          areaStyle: {
                            color: {
                              type: 'linear',
                              x: 0, y: 0, x2: 0, y2: 1,
                              colorStops: [
                                { offset: 0, color: 'rgba(255, 77, 79, 0.3)' },
                                { offset: 1, color: 'rgba(255, 77, 79, 0.1)' }
                              ]
                            }
                          }
                        }
                      ]
                    }}
                    style={{ height: 300 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="湿度传感器实时数据" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '湿度传感器实时数据',
                        left: 'center',
                        textStyle: { fontSize: 14 }
                      },
                      tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'cross' }
                      },
                      xAxis: {
                        type: 'category',
                        data: generateTimeData()
                      },
                      yAxis: {
                        type: 'value',
                        name: '湿度 (%)',
                        min: 40,
                        max: 80
                      },
                      series: [
                        {
                          name: '湿度',
                          type: 'line',
                          smooth: true,
                          data: [60, 62, 65, 65.2, 63, 61, 58],
                          itemStyle: { color: '#1890ff' },
                          areaStyle: {
                            color: {
                              type: 'linear',
                              x: 0, y: 0, x2: 0, y2: 1,
                              colorStops: [
                                { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
                                { offset: 1, color: 'rgba(24, 144, 255, 0.1)' }
                              ]
                            }
                          }
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
                <Card title="传感器网络拓扑" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '传感器网络拓扑',
                        left: 'center',
                        textStyle: { fontSize: 14 }
                      },
                      tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c}'
                      },
                      series: [
                        {
                          type: 'graph',
                          layout: 'force',
                          symbolSize: 30,
                          roam: true,
                          label: {
                            show: true
                          },
                          force: {
                            repulsion: 100,
                            edgeLength: 100
                          },
                          data: [
                            { name: '网关', x: 300, y: 100, itemStyle: { color: '#1890ff' } },
                            { name: '温度传感器', x: 200, y: 200, itemStyle: { color: '#ff4d4f' } },
                            { name: '湿度传感器', x: 400, y: 200, itemStyle: { color: '#1890ff' } },
                            { name: '压力传感器', x: 150, y: 300, itemStyle: { color: '#52c41a' } },
                            { name: '运动传感器', x: 450, y: 300, itemStyle: { color: '#faad14' } },
                            { name: '光照传感器', x: 300, y: 400, itemStyle: { color: '#722ed1' } }
                          ],
                          links: [
                            { source: '网关', target: '温度传感器' },
                            { source: '网关', target: '湿度传感器' },
                            { source: '网关', target: '压力传感器' },
                            { source: '网关', target: '运动传感器' },
                            { source: '网关', target: '光照传感器' }
                          ],
                          lineStyle: {
                            color: '#ccc',
                            width: 2
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

          <TabPane tab="数据分析" key="analysis">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="传感器类型分布" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '传感器类型分布',
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
                          name: '传感器类型',
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
                            { value: 1, name: '温度传感器', itemStyle: { color: '#ff4d4f' } },
                            { value: 1, name: '湿度传感器', itemStyle: { color: '#1890ff' } },
                            { value: 1, name: '压力传感器', itemStyle: { color: '#52c41a' } },
                            { value: 1, name: '运动传感器', itemStyle: { color: '#faad14' } },
                            { value: 1, name: '光照传感器', itemStyle: { color: '#722ed1' } }
                          ]
                        }
                      ]
                    }}
                    style={{ height: 300 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="传输成功率趋势" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '传输成功率趋势',
                        left: 'center',
                        textStyle: { fontSize: 14 }
                      },
                      tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'cross' }
                      },
                      xAxis: {
                        type: 'category',
                        data: generateTimeData()
                      },
                      yAxis: {
                        type: 'value',
                        name: '成功率 (%)',
                        min: 80,
                        max: 100
                      },
                      series: [
                        {
                          name: '传输成功率',
                          type: 'line',
                          smooth: true,
                          data: [95, 92, 98, 96, 94, 97, 99],
                          itemStyle: { color: '#52c41a' },
                          areaStyle: {
                            color: {
                              type: 'linear',
                              x: 0, y: 0, x2: 0, y2: 1,
                              colorStops: [
                                { offset: 0, color: 'rgba(82, 196, 26, 0.3)' },
                                { offset: 1, color: 'rgba(82, 196, 26, 0.1)' }
                              ]
                            }
                          }
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
                <Card title="数据质量分析" size="small">
                  <ReactECharts
                    option={{
                      title: {
                        text: '数据质量分析',
                        left: 'center',
                        textStyle: { fontSize: 14 }
                      },
                      tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'shadow' }
                      },
                      legend: {
                        data: ['数据完整性', '数据准确性', '数据及时性'],
                        bottom: 0
                      },
                      xAxis: {
                        type: 'category',
                        data: ['温度传感器', '湿度传感器', '压力传感器', '运动传感器', '光照传感器']
                      },
                      yAxis: {
                        type: 'value',
                        name: '质量评分',
                        min: 0,
                        max: 100
                      },
                      series: [
                        {
                          name: '数据完整性',
                          type: 'bar',
                          data: [98, 95, 92, 96, 94],
                          itemStyle: { color: '#52c41a' }
                        },
                        {
                          name: '数据准确性',
                          type: 'bar',
                          data: [96, 98, 95, 97, 93],
                          itemStyle: { color: '#1890ff' }
                        },
                        {
                          name: '数据及时性',
                          type: 'bar',
                          data: [94, 96, 98, 95, 97],
                          itemStyle: { color: '#faad14' }
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

      {/* 传感器详情模态框 */}
      <Modal
        title="传感器详情"
        visible={isSensorModalVisible}
        onCancel={() => setIsSensorModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedSensor && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="传感器ID">{selectedSensor.sensorId}</Descriptions.Item>
            <Descriptions.Item label="传感器类型">{getSensorTypeText(selectedSensor.sensorType)}</Descriptions.Item>
            <Descriptions.Item label="当前数值">{selectedSensor.value} {selectedSensor.unit}</Descriptions.Item>
            <Descriptions.Item label="精度">±{selectedSensor.accuracy}</Descriptions.Item>
            <Descriptions.Item label="电池电量">{selectedSensor.batteryLevel}%</Descriptions.Item>
            <Descriptions.Item label="信号强度">{selectedSensor.signalStrength}%</Descriptions.Item>
            <Descriptions.Item label="位置">{selectedSensor.location}</Descriptions.Item>
            <Descriptions.Item label="时间戳">{selectedSensor.timestamp}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* 传输日志详情模态框 */}
      <Modal
        title="传输日志详情"
        visible={isLogModalVisible}
        onCancel={() => setIsLogModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedLog && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="传输ID">{selectedLog.id}</Descriptions.Item>
            <Descriptions.Item label="传输时间">{selectedLog.transmissionTime}</Descriptions.Item>
            <Descriptions.Item label="设备ID">{selectedLog.deviceId}</Descriptions.Item>
            <Descriptions.Item label="数据类型">{selectedLog.dataType}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={selectedLog.status === 'success' ? 'green' : selectedLog.status === 'failed' ? 'red' : 'orange'}>
                {selectedLog.status === 'success' ? '成功' : selectedLog.status === 'failed' ? '失败' : '重试中'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="数据大小">{selectedLog.dataSize} bytes</Descriptions.Item>
            <Descriptions.Item label="耗时">{selectedLog.duration}ms</Descriptions.Item>
            <Descriptions.Item label="重试次数">{selectedLog.retryCount}</Descriptions.Item>
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

export default SensorTransmission; 