import React, { useState, useEffect, useMemo } from 'react';
import { 
  Card, 
  Table, 
  Tag, 
  Space, 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  Tabs,
  DatePicker,
  Select,
  Button,
  Input,
  Space as AntSpace
} from 'antd';
import { 
  ApiOutlined, 
  SyncOutlined, 
  BarChartOutlined,
  SearchOutlined,
  ReloadOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { apiLogs, dataSyncs, chartData } from '../data/mockData';
import type { ApiLog, DataSync } from '../data/mockData';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

// 生成过去时间戳的辅助函数
const getPastTimestamp = (minutesAgo: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date.toISOString();
};

const ApiInterface: React.FC = () => {
  // 状态管理
  const [activeTab, setActiveTab] = useState('logs');
  const [filteredLogs, setFilteredLogs] = useState(apiLogs);
  const [filteredSyncs, setFilteredSyncs] = useState(dataSyncs);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  // 生成时间数据
  const generateTimeData = () => {
    const now = new Date();
    const times = [];
    const values = [];
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      times.push(time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
      values.push(Math.floor(Math.random() * 50) + 10);
    }
    
    return { times, values };
  };

  // 过滤当天数据
  const filterTodayData = (data: ApiLog[] | DataSync[]) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    if (data.length > 0 && 'timestamp' in data[0]) {
      // 处理ApiLog数组
      return (data as ApiLog[]).filter((item: ApiLog) => {
        const itemDate = new Date(item.timestamp);
        const itemDateStr = itemDate.toISOString().split('T')[0];
        return itemDateStr === todayStr;
      });
    } else {
      // 处理DataSync数组
      return (data as DataSync[]).filter((item: DataSync) => {
        const itemDate = new Date(item.syncTime);
        const itemDateStr = itemDate.toISOString().split('T')[0];
        return itemDateStr === todayStr;
      });
    }
  };

  // 根据日期范围过滤数据
  const filterByDateRange = (data: ApiLog[] | DataSync[], startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (data.length > 0 && 'timestamp' in data[0]) {
      // 处理ApiLog数组
      return (data as ApiLog[]).filter((item: ApiLog) => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= start && itemDate <= end;
      });
    } else {
      // 处理DataSync数组
      return (data as DataSync[]).filter((item: DataSync) => {
        const itemDate = new Date(item.syncTime);
        return itemDate >= start && itemDate <= end;
      });
    }
  };

  // 生成更多数据用于显示
  const generateDisplayData = (originalData: ApiLog[] | DataSync[]) => {
    if (originalData.length === 0) return originalData;
    
    const targetCount = 1263;
    const result = [];
    
    for (let i = 0; i < targetCount; i++) {
      const originalItem = originalData[i % originalData.length];
      
      if ('timestamp' in originalItem) {
        // 处理ApiLog
        const apiLog = originalItem as ApiLog;
        const newItem: ApiLog = {
          ...apiLog,
          id: `LOG-${String(i + 1).padStart(3, '0')}`,
          timestamp: getPastTimestamp(i),
          responseTime: Math.floor(Math.random() * 200) + 50, // 50-250ms
          responseStatus: Math.random() > 0.05 ? 200 : 500, // 95%成功率
          success: Math.random() > 0.05,
          ipAddress: `192.168.1.${100 + (i % 100)}`,
          user: `user${String(i % 20 + 1).padStart(2, '0')}`,
          endpoint: apiLog.endpoint.replace(/\d+/, String(i % 10 + 1))
        };
        result.push(newItem);
      } else {
        // 处理DataSync
        const dataSync = originalItem as DataSync;
        const newItem: DataSync = {
          ...dataSync,
          id: `SYNC-${String(i + 1).padStart(3, '0')}`,
          syncTime: getPastTimestamp(i),
          recordCount: Math.floor(Math.random() * 500) + 100, // 100-600条记录
          duration: Math.floor(Math.random() * 200) + 50, // 50-250ms
          status: Math.random() > 0.02 ? 'success' : 'failed' // 98%成功率
        };
        result.push(newItem);
      }
    }
    
    return result;
  };

  // 初始化时显示所有数据（不进行日期过滤）
  useEffect(() => {
    const displayLogs = generateDisplayData(apiLogs) as ApiLog[];
    const displaySyncs = generateDisplayData(dataSyncs) as DataSync[];
    setFilteredLogs(displayLogs);
    setFilteredSyncs(displaySyncs);
  }, []);

  // 处理日期范围变化
  const handleDateRangeChange = (dates: any) => {
    if (dates) {
      const [start, end] = dates;
      const startStr = start.format('YYYY-MM-DD');
      const endStr = end.format('YYYY-MM-DD');
      setDateRange([startStr, endStr]);
      
      const displayLogs = generateDisplayData(apiLogs) as ApiLog[];
      const displaySyncs = generateDisplayData(dataSyncs) as DataSync[];
      
      const filteredLogs = filterByDateRange(displayLogs, startStr, endStr) as ApiLog[];
      const filteredSyncs = filterByDateRange(displaySyncs, startStr, endStr) as DataSync[];
      setFilteredLogs(filteredLogs);
      setFilteredSyncs(filteredSyncs);
    } else {
      // 重置为所有数据
      const displayLogs = generateDisplayData(apiLogs) as ApiLog[];
      const displaySyncs = generateDisplayData(dataSyncs) as DataSync[];
      setFilteredLogs(displayLogs);
      setFilteredSyncs(displaySyncs);
      setDateRange(null);
    }
  };

  // 重置筛选
  const handleReset = () => {
    setSearchText('');
    setStatusFilter('all');
    setMethodFilter('all');
    setDateRange(null);
    const displayLogs = generateDisplayData(apiLogs) as ApiLog[];
    const displaySyncs = generateDisplayData(dataSyncs) as DataSync[];
    setFilteredLogs(displayLogs);
    setFilteredSyncs(displaySyncs);
  };

  // 搜索和筛选
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handleMethodFilter = (value: string) => {
    setMethodFilter(value);
  };

  // 应用筛选
  const applyFilters = () => {
    const displayLogs = generateDisplayData(apiLogs) as ApiLog[];
    
    let filtered = dateRange 
      ? filterByDateRange(displayLogs, dateRange[0], dateRange[1]) as ApiLog[]
      : displayLogs; // 如果没有选择日期范围，显示所有数据

    if (searchText) {
      filtered = filtered.filter((log: ApiLog) => 
        log.endpoint.toLowerCase().includes(searchText.toLowerCase()) ||
        log.user.toLowerCase().includes(searchText.toLowerCase()) ||
        log.ipAddress.includes(searchText)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((log: ApiLog) => 
        statusFilter === 'success' ? log.success : !log.success
      );
    }

    if (methodFilter !== 'all') {
      filtered = filtered.filter((log: ApiLog) => log.method === methodFilter);
    }

    setFilteredLogs(filtered);
  };

  // 监听筛选条件变化
  useEffect(() => {
    applyFilters();
  }, [searchText, statusFilter, methodFilter, dateRange]);

  // 统计数据
  const stats = useMemo(() => {
    const total = filteredLogs.length;
    const success = filteredLogs.filter(log => log.success).length;
    const avgResponseTime = filteredLogs.reduce((acc, log) => acc + log.responseTime, 0) / total || 0;
    const successRate = total > 0 ? (success / total) * 100 : 0;
    
    return { total, success, avgResponseTime, successRate };
  }, [filteredLogs]);

  const syncStats = useMemo(() => {
    const total = filteredSyncs.length;
    const success = filteredSyncs.filter(sync => sync.status === 'success').length;
    const avgDuration = filteredSyncs.reduce((acc, sync) => acc + sync.duration, 0) / total || 0;
    const totalRecords = filteredSyncs.reduce((acc, sync) => acc + sync.recordCount, 0);
    const lastSync = filteredSyncs.sort((a, b) => new Date(b.syncTime).getTime() - new Date(a.syncTime).getTime())[0];

    return { total, success, avgDuration, totalRecords, lastSync };
  }, [filteredSyncs]);

  // 表格列定义
  const logColumns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
      render: (text: string) => new Date(text).toLocaleString('zh-CN')
    },
    {
      title: '接口',
      dataIndex: 'endpoint',
      key: 'endpoint',
      width: 200,
      render: (text: string) => (
        <Text code style={{ fontSize: '12px' }}>{text}</Text>
      )
    },
    {
      title: '方法',
      dataIndex: 'method',
      key: 'method',
      width: 80,
      render: (method: string) => {
        const colorMap: { [key: string]: string } = {
          GET: 'green',
          POST: 'blue',
          PUT: 'orange',
          DELETE: 'red'
        };
        return <Tag color={colorMap[method]}>{method}</Tag>;
      }
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
      width: 120
    },
    {
      title: '状态码',
      dataIndex: 'responseStatus',
      key: 'responseStatus',
      width: 100,
      render: (status: number) => {
        const color = status >= 200 && status < 300 ? 'green' : 
                     status >= 400 && status < 500 ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '响应时间(ms)',
      dataIndex: 'responseTime',
      key: 'responseTime',
      width: 120,
      render: (time: number) => {
        const color = time < 100 ? 'green' : time < 500 ? 'orange' : 'red';
        return <Text type={color === 'red' ? 'danger' : undefined}>{time}</Text>;
      }
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 140
    },
    {
      title: '状态',
      dataIndex: 'success',
      key: 'success',
      width: 80,
      render: (success: boolean) => (
        <Tag color={success ? 'green' : 'red'}>
          {success ? '成功' : '失败'}
        </Tag>
      )
    }
  ];

  const syncColumns = [
    {
      title: '同步时间',
      dataIndex: 'syncTime',
      key: 'syncTime',
      width: 180,
      render: (text: string) => new Date(text).toLocaleString('zh-CN')
    },
    {
      title: '源系统',
      dataIndex: 'sourceSystem',
      key: 'sourceSystem',
      width: 150
    },
    {
      title: '目标系统',
      dataIndex: 'targetSystem',
      key: 'targetSystem',
      width: 150
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const colorMap: { [key: string]: string } = {
          success: 'green',
          failed: 'red',
          pending: 'orange'
        };
        return <Tag color={colorMap[status]}>{status === 'success' ? '成功' : status === 'failed' ? '失败' : '进行中'}</Tag>;
      }
    },
    {
      title: '记录数',
      dataIndex: 'recordCount',
      key: 'recordCount',
      width: 100
    },
    {
      title: '耗时(ms)',
      dataIndex: 'duration',
      key: 'duration',
      width: 100
    }
  ];

  // 图表配置
  const timeData = generateTimeData();

  const callTrendOption = {
    title: {
      text: '接口调用趋势',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: timeData.times,
      axisLabel: { rotate: 45 }
    },
    yAxis: {
      type: 'value',
      name: '调用次数'
    },
    series: [{
      data: timeData.values,
      type: 'line',
      smooth: true,
      areaStyle: {
        opacity: 0.3
      },
      itemStyle: {
        color: '#1890ff'
      }
    }]
  };

  const responseTimeOption = {
    title: {
      text: '响应时间分布',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [{
      name: '响应时间',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 65, name: '< 100ms' },
        { value: 25, name: '100-500ms' },
        { value: 10, name: '> 500ms' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  const dataFlowOption = {
    title: {
      text: '系统间数据流',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [{
      type: 'sankey',
      layout: 'none',
      data: [
        { name: 'ERP系统' },
        { name: 'MES系统' },
        { name: 'WMS系统' },
        { name: 'SCM系统' },
        { name: 'CRM系统' },
        { name: '融合通信平台' }
      ],
      links: [
        { source: 'ERP系统', target: '融合通信平台', value: 156 },
        { source: 'MES系统', target: 'WMS系统', value: 89 },
        { source: 'WMS系统', target: 'SCM系统', value: 234 },
        { source: 'SCM系统', target: 'CRM系统', value: 67 },
        { source: 'CRM系统', target: 'ERP系统', value: 178 }
      ],
      emphasis: {
        focus: 'adjacency'
      },
      lineStyle: {
        color: 'gradient',
        curveness: 0.5
      }
    }]
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <ApiOutlined style={{ marginRight: 8 }} />
        标准化接口模块
      </Title>
      <Text type="secondary" style={{ fontSize: '14px', marginBottom: '16px', display: 'block' }}>
        提供与融合通信管理平台的标准化接口，实现数据的实时传输和同步，确保两个平台之间的数据交互准确、高效
      </Text>

      {/* 筛选器 */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Text strong>时间范围：</Text>
            <RangePicker 
              style={{ width: '100%', marginTop: 8 }}
              placeholder={['开始日期', '结束日期']}
              onChange={handleDateRangeChange}
              allowClear
            />
          </Col>
          <Col span={4}>
            <Text strong>搜索：</Text>
            <Input
              placeholder="搜索接口/用户/IP"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ marginTop: 8 }}
            />
          </Col>
          <Col span={3}>
            <Text strong>状态：</Text>
            <Select
              value={statusFilter}
              onChange={handleStatusFilter}
              style={{ width: '100%', marginTop: 8 }}
            >
              <Option value="all">全部</Option>
              <Option value="success">成功</Option>
              <Option value="failed">失败</Option>
            </Select>
          </Col>
          <Col span={3}>
            <Text strong>方法：</Text>
            <Select
              value={methodFilter}
              onChange={handleMethodFilter}
              style={{ width: '100%', marginTop: 8 }}
            >
              <Option value="all">全部</Option>
              <Option value="GET">GET</Option>
              <Option value="POST">POST</Option>
              <Option value="PUT">PUT</Option>
              <Option value="DELETE">DELETE</Option>
            </Select>
          </Col>
          <Col span={2}>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleReset}
              style={{ marginTop: 24 }}
            >
              重置
            </Button>
          </Col>
        </Row>
      </Card>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={
            <span>
              <ApiOutlined />
              接口日志 ({filteredLogs.length})
            </span>
          } 
          key="logs"
        >
          {/* 统计卡片 */}
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="总调用次数"
                  value={stats.total}
                  prefix={<ApiOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="成功率"
                  value={Number(stats.successRate.toFixed(2))}
                  suffix="%"
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="平均响应时间"
                  value={Number(stats.avgResponseTime.toFixed(0))}
                  suffix="ms"
                  prefix={<BarChartOutlined />}
                  valueStyle={{ color: '#13c2c2' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="成功/失败比例"
                  value={stats.success}
                  suffix={`/${stats.total - stats.success}`}
                  prefix={<Progress 
                    type="circle" 
                    percent={Number(stats.successRate.toFixed(1))} 
                    size={24}
                    strokeColor={{
                      '0%': '#722ed1',
                      '100%': '#9254de',
                    }}
                    strokeWidth={4}
                    format={() => null}
                    style={{ margin: 0 }}
                  />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
          </Row>

          {/* 接口规范说明 */}
          <Card title="标准化接口规范" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small" title="接口类型">
                  <Text>RESTful API</Text>
                  <br />
                  <Text type="secondary">基于HTTP/HTTPS协议</Text>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="数据格式">
                  <Text>JSON</Text>
                  <br />
                  <Text type="secondary">统一的数据交换格式</Text>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="认证方式">
                  <Text>Token认证</Text>
                  <br />
                  <Text type="secondary">JWT Token + 二次认证</Text>
                </Card>
              </Col>
            </Row>
          </Card>

          {/* 接口监控状态 */}
          <Card title="接口监控状态" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="ERP系统接口"
                    value="正常"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="融合通信平台接口"
                    value="正常"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="5G网络安全接口"
                    value="正常"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="感知传输接口"
                    value="正常"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </Card>

          {/* 接口日志表格 */}
          <Card title="接口调用日志">
            <Table
              columns={logColumns}
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
          </Card>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <SyncOutlined />
              数据同步 ({filteredSyncs.length})
            </span>
          } 
          key="sync"
        >
          {/* 统计卡片 */}
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="同步任务数"
                  value={syncStats.total}
                  prefix={<SyncOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="成功同步"
                  value={syncStats.success}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="平均耗时"
                  value={Number(syncStats.avgDuration.toFixed(0))}
                  suffix="ms"
                  prefix={<BarChartOutlined />}
                  valueStyle={{ color: '#13c2c2' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small">
                <Statistic
                  title="总记录数"
                  value={syncStats.totalRecords}
                  prefix={<DatabaseOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
          </Row>

          {/* 数据上报状态 */}
          <Card title="数据上报状态" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="生产数据上报"
                    value="正常"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<CheckCircleOutlined />}
                  />
                  <Text type="secondary">最后上报: 2分钟前</Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="销售数据上报"
                    value="正常"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<CheckCircleOutlined />}
                  />
                  <Text type="secondary">最后上报: 5分钟前</Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="库存数据上报"
                    value="正常"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<CheckCircleOutlined />}
                  />
                  <Text type="secondary">最后上报: 1分钟前</Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="设备状态上报"
                    value="正常"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<CheckCircleOutlined />}
                  />
                  <Text type="secondary">最后上报: 实时</Text>
                </Card>
              </Col>
            </Row>
          </Card>

          {/* 数据分析结果 */}
          <Card title="数据分析结果" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small" title="生产趋势分析">
                  <Text strong>本月生产量: 1,234台</Text>
                  <br />
                  <Text type="secondary">较上月增长: +12.5%</Text>
                  <br />
                  <Progress percent={85} size="small" />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="销售趋势分析">
                  <Text strong>本月销售额: ¥2,567万</Text>
                  <br />
                  <Text type="secondary">较上月增长: +8.3%</Text>
                  <br />
                  <Progress percent={78} size="small" />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="库存周转分析">
                  <Text strong>库存周转率: 6.8次/月</Text>
                  <br />
                  <Text type="secondary">较上月提升: +0.5次</Text>
                  <br />
                  <Progress percent={92} size="small" />
                </Card>
              </Col>
            </Row>
          </Card>

          {/* 数据同步表格 */}
          <Card title="数据同步记录">
            <Table
              columns={syncColumns}
              dataSource={filteredSyncs}
              rowKey="id"
              pagination={{
                pageSize: 20,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <BarChartOutlined />
              接口统计
            </span>
          } 
          key="stats"
        >
          {/* 图表展示 */}
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <Card title="接口调用趋势">
                <ReactECharts option={callTrendOption} style={{ height: '300px' }} />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="响应时间分布">
                <ReactECharts option={responseTimeOption} style={{ height: '300px' }} />
              </Card>
            </Col>
          </Row>
          
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="系统间数据流">
                <ReactECharts option={dataFlowOption} style={{ height: '400px' }} />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ApiInterface; 