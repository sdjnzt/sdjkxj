import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Switch, 
  Slider, 
  Progress, 
  Tag, 
  Space, 
  Modal, 
  message, 
  Input, 
  Select, 
  Badge,
  Tooltip,
  Divider,
  Timeline,
  Alert,
  Tabs,
  Statistic,
  Popconfirm,
  InputNumber,
  Radio,
  Table
} from 'antd';
import { 
  ControlOutlined, 
  PoweroffOutlined, 
  SettingOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  ExclamationCircleOutlined,
  VideoCameraOutlined,
  LockOutlined,
  UnlockOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  EyeOutlined,
  HistoryOutlined,
  SafetyOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FireOutlined,
  SoundOutlined,
  WifiOutlined,
  BellOutlined,
  FileTextOutlined,
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import { devices } from '../data/mockData';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

interface ControlOperation {
  id: string;
  timestamp: string;
  device: string;
  action: string;
  value: any;
  operator: string;
  status: 'success' | 'failed' | 'pending';
}

interface DeviceGroup {
  id: string;
  name: string;
  devices: string[];
  color: string;
}

interface PresetScene {
  id: string;
  name: string;
  description: string;
  actions: Array<{
    deviceId: string;
    action: string;
    value: any;
  }>;
}

const RemoteControl: React.FC = () => {
  const [controlValues, setControlValues] = useState<{[key: string]: any}>({});
  const [isSecurityModalVisible, setIsSecurityModalVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);
  const [operationHistory, setOperationHistory] = useState<ControlOperation[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('control');
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  
  // 设备分组
  const [deviceGroups] = useState<DeviceGroup[]>([
    { id: 'all', name: '全部设备', devices: [], color: '#1890ff' },
    { id: 'cameras', name: '监控摄像', devices: devices.filter(d => d.type === 'camera').map(d => d.id), color: '#52c41a' },
    { id: 'controllers', name: '控制设备', devices: devices.filter(d => d.type === 'controller').map(d => d.id), color: '#faad14' },
    { id: 'sensors', name: '传感器', devices: devices.filter(d => d.type === 'sensor').map(d => d.id), color: '#722ed1' },
    { id: 'phones', name: '通讯设备', devices: devices.filter(d => d.type === 'phone').map(d => d.id), color: '#eb2f96' }
  ]);

  // 预设场景
  const [presetScenes] = useState<PresetScene[]>([
    {
      id: 'normal',
      name: '正常工作模式',
      description: '所有设备正常运行状态',
      actions: [
        { deviceId: 'all', action: 'power', value: true },
        { deviceId: 'all', action: 'light', value: true }
      ]
    },
    {
      id: 'night',
      name: '夜间模式',
      description: '夜间安全监控模式',
      actions: [
        { deviceId: 'cameras', action: 'recording', value: true },
        { deviceId: 'controllers', action: 'light', value: false }
      ]
    },
    {
      id: 'emergency',
      name: '紧急模式',
      description: '紧急情况下的安全配置',
      actions: [
        { deviceId: 'all', action: 'power', value: false },
        { deviceId: 'cameras', action: 'recording', value: true }
      ]
    }
  ]);

  // 获取筛选后的设备
  const getFilteredDevices = () => {
    const controllableDevices = devices.filter(d => d.type === 'controller' || d.type === 'camera');
    if (selectedGroup === 'all') return controllableDevices;
    const group = deviceGroups.find(g => g.id === selectedGroup);
    return controllableDevices.filter(d => group?.devices.includes(d.id));
  };

  // 安全验证
  const performSecurityCheck = (action: any) => {
    if (action.critical) {
      setPendingAction(action);
      setIsSecurityModalVisible(true);
    } else {
      executeAction(action);
    }
  };

  // 执行控制操作
  const executeAction = (action: any) => {
    const operation: ControlOperation = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      device: action.deviceName || action.deviceId,
      action: action.type,
      value: action.value,
      operator: '当前用户',
      status: 'success'
    };

    setOperationHistory(prev => [operation, ...prev.slice(0, 49)]);
    setControlValues(prev => ({
      ...prev,
      [`${action.deviceId}_${action.type}`]: action.value
    }));

    message.success(`${action.type}控制指令已发送`);
  };

  // 批量控制
  const handleBatchControl = (action: string, value: any) => {
    const filteredDevices = getFilteredDevices();
    filteredDevices.forEach(device => {
      if (device.status === 'online') {
        executeAction({
          deviceId: device.id,
          deviceName: device.name,
          type: action,
          value: value,
          critical: false
        });
      }
    });
    message.success(`批量${action}操作完成`);
  };

  // 应用预设场景
  const applyPresetScene = (scene: PresetScene) => {
    Modal.confirm({
      title: `确认应用场景：${scene.name}`,
      content: scene.description,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        scene.actions.forEach(action => {
          executeAction({
            deviceId: action.deviceId,
            deviceName: `场景-${scene.name}`,
            type: action.action,
            value: action.value,
            critical: false
          });
        });
        message.success(`场景 "${scene.name}" 应用成功`);
      }
    });
  };

  // 紧急停止
  const handleEmergencyStop = () => {
    performSecurityCheck({
      deviceId: 'all',
      deviceName: '所有设备',
      type: '紧急停止',
      value: false,
      critical: true
    });
  };

  // 系统状态统计
  const systemStats = {
    totalDevices: devices.length,
    onlineDevices: devices.filter(d => d.status === 'online').length,
    controlledDevices: Object.keys(controlValues).length,
    recentOperations: operationHistory.length
  };

  const filteredDevices = getFilteredDevices();

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>远程控制中心</h2>
        <Space>
          <Switch
            checked={isEmergencyMode}
            onChange={setIsEmergencyMode}
            checkedChildren={<FireOutlined />}
            unCheckedChildren={<SafetyOutlined />}
          />
          <span>紧急模式</span>
          <Button 
            type="primary" 
            danger={isEmergencyMode}
            icon={<PoweroffOutlined />}
            onClick={handleEmergencyStop}
          >
            紧急停止
          </Button>
        </Space>
      </div>

      {/* 系统状态概览 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="设备总数"
              value={systemStats.totalDevices}
              prefix={<ControlOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="在线设备"
              value={systemStats.onlineDevices}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix={`/ ${systemStats.totalDevices}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="受控设备"
              value={systemStats.controlledDevices}
              prefix={<ThunderboltOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="操作记录"
              value={systemStats.recentOperations}
              prefix={<HistoryOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 紧急告警 */}
      {isEmergencyMode && (
        <Alert
          message="紧急模式已激活"
          description="当前处于紧急模式，所有控制操作将需要额外验证"
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
          action={
            <Button 
              size="small" 
              onClick={() => setIsEmergencyMode(false)}
            >
              退出紧急模式
            </Button>
          }
        />
      )}

      {/* 主控制面板 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={<span><ControlOutlined />设备控制</span>} key="control">
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={12}>
                <Space>
                  <span>设备分组:</span>
                  <Select
                    value={selectedGroup}
                    onChange={setSelectedGroup}
                    style={{ width: 200 }}
                  >
                    {deviceGroups.map(group => (
                      <Option key={group.id} value={group.id}>
                        <Badge color={group.color} />
                        {group.name}
                      </Option>
                    ))}
                  </Select>
                </Space>
              </Col>
              <Col span={12}>
                <Space style={{ float: 'right' }}>
                  <Button 
                    icon={<PoweroffOutlined />}
                    onClick={() => handleBatchControl('power', true)}
                  >
                    批量开启
                  </Button>
                  <Button 
                    icon={<PoweroffOutlined />}
                    onClick={() => handleBatchControl('power', false)}
                  >
                    批量关闭
                  </Button>
                  <Button 
                    icon={<BulbOutlined />}
                    onClick={() => handleBatchControl('light', true)}
                  >
                    批量照明
                  </Button>
                </Space>
              </Col>
            </Row>

            <Row gutter={16}>
              {filteredDevices.map(device => (
                <Col span={8} key={device.id} style={{ marginBottom: 16 }}>
                  <Card
                    title={
                      <Space>
                        {device.type === 'camera' && <VideoCameraOutlined />}
                        {device.type === 'controller' && <ControlOutlined />}
                        {device.type === 'sensor' && <EnvironmentOutlined />}
                        {device.type === 'phone' && <SoundOutlined />}
                        {device.name}
                      </Space>
                    }
                    extra={
                      <Space>
                        <Badge 
                          status={device.status === 'online' ? 'success' : device.status === 'warning' ? 'warning' : 'error'} 
                          text={device.status === 'online' ? '在线' : device.status === 'warning' ? '告警' : '离线'}
                        />
                        {controlValues[`${device.id}_power`] && (
                          <Tag color="green">运行中</Tag>
                        )}
                      </Space>
                    }
                    size="small"
                    style={{
                      background: device.status === 'online' ? '#ffffff' : '#f5f5f5',
                      border: device.status === 'warning' ? '2px solid #faad14' : '1px solid #d9d9d9'
                    }}
                  >
                    <div style={{ marginBottom: 12, fontSize: 12, color: '#666' }}>
                      <div>位置: {device.location}</div>
                      <div>更新: {device.lastUpdate}</div>
                    </div>

                    {device.type === 'controller' && (
                      <div>
                        <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>电源控制</span>
                          <Switch
                            size="small"
                            checked={controlValues[`${device.id}_power`] || false}
                            onChange={(checked) => performSecurityCheck({
                              deviceId: device.id,
                              deviceName: device.name,
                              type: 'power',
                              value: checked,
                              critical: !checked
                            })}
                            disabled={device.status !== 'online'}
                          />
                        </div>

                        <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>照明控制</span>
                          <Switch
                            size="small"
                            checked={controlValues[`${device.id}_light`] || false}
                            onChange={(checked) => executeAction({
                              deviceId: device.id,
                              deviceName: device.name,
                              type: 'light',
                              value: checked,
                              critical: false
                            })}
                            disabled={device.status !== 'online'}
                          />
                        </div>

                        <div style={{ marginBottom: 8 }}>
                          <div style={{ fontSize: 12, marginBottom: 4 }}>
                            电压: {controlValues[`${device.id}_voltage`] || 220}V
                          </div>
                                                     <Slider
                             min={200}
                             max={240}
                             value={controlValues[`${device.id}_voltage`] || 220}
                             onChange={(value) => executeAction({
                               deviceId: device.id,
                               deviceName: device.name,
                               type: 'voltage',
                               value: value,
                               critical: false
                             })}
                             disabled={device.status !== 'online'}
                           />
                        </div>

                        {device.battery && (
                          <div style={{ marginBottom: 8 }}>
                            <div style={{ fontSize: 12, marginBottom: 4 }}>电池电量</div>
                            <Progress 
                              percent={device.battery} 
                              size="small"
                              status={device.battery < 20 ? 'exception' : 'normal'}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {device.type === 'camera' && (
                      <div>
                        <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>录制状态</span>
                          <Switch
                            size="small"
                            checked={controlValues[`${device.id}_recording`] || false}
                            onChange={(checked) => executeAction({
                              deviceId: device.id,
                              deviceName: device.name,
                              type: 'recording',
                              value: checked,
                              critical: false
                            })}
                            disabled={device.status !== 'online'}
                          />
                        </div>

                        <div style={{ marginBottom: 8 }}>
                          <div style={{ fontSize: 12, marginBottom: 4 }}>云台控制</div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                            <div></div>
                            <Button 
                              size="small"
                              onClick={() => executeAction({
                                deviceId: device.id,
                                deviceName: device.name,
                                type: 'pan',
                                value: 'up',
                                critical: false
                              })}
                              disabled={device.status !== 'online'}
                            >
                              ↑
                            </Button>
                            <div></div>
                            <Button 
                              size="small"
                              onClick={() => executeAction({
                                deviceId: device.id,
                                deviceName: device.name,
                                type: 'pan',
                                value: 'left',
                                critical: false
                              })}
                              disabled={device.status !== 'online'}
                            >
                              ←
                            </Button>
                            <Button 
                              size="small"
                              onClick={() => executeAction({
                                deviceId: device.id,
                                deviceName: device.name,
                                type: 'pan',
                                value: 'center',
                                critical: false
                              })}
                              disabled={device.status !== 'online'}
                            >
                              ●
                            </Button>
                            <Button 
                              size="small"
                              onClick={() => executeAction({
                                deviceId: device.id,
                                deviceName: device.name,
                                type: 'pan',
                                value: 'right',
                                critical: false
                              })}
                              disabled={device.status !== 'online'}
                            >
                              →
                            </Button>
                            <div></div>
                            <Button 
                              size="small"
                              onClick={() => executeAction({
                                deviceId: device.id,
                                deviceName: device.name,
                                type: 'pan',
                                value: 'down',
                                critical: false
                              })}
                              disabled={device.status !== 'online'}
                            >
                              ↓
                            </Button>
                            <div></div>
                          </div>
                        </div>

                        <div style={{ marginBottom: 8 }}>
                          <div style={{ fontSize: 12, marginBottom: 4 }}>
                            焦距: {controlValues[`${device.id}_zoom`] || 1}x
                          </div>
                                                     <Slider
                             min={1}
                             max={10}
                             step={0.1}
                             value={controlValues[`${device.id}_zoom`] || 1}
                             onChange={(value) => executeAction({
                               deviceId: device.id,
                               deviceName: device.name,
                               type: 'zoom',
                               value: value,
                               critical: false
                             })}
                             disabled={device.status !== 'online'}
                           />
                        </div>

                        {device.signal && (
                          <div style={{ marginBottom: 8 }}>
                            <div style={{ fontSize: 12, marginBottom: 4 }}>信号强度</div>
                            <Progress 
                              percent={device.signal} 
                              size="small"
                              status={device.signal < 50 ? 'exception' : 'normal'}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                      <Button size="small" icon={<SettingOutlined />} style={{ flex: 1 }}>
                        设置
                      </Button>
                      {device.type === 'camera' && (
                        <Button size="small" icon={<EyeOutlined />} style={{ flex: 1 }}>
                          查看
                        </Button>
                      )}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>

          <TabPane tab={<span><PlayCircleOutlined />预设场景</span>} key="scenes">
            <Row gutter={16}>
              {presetScenes.map(scene => (
                <Col span={8} key={scene.id} style={{ marginBottom: 16 }}>
                  <Card
                    title={scene.name}
                    extra={
                      <Button 
                        type="primary" 
                        size="small"
                        onClick={() => applyPresetScene(scene)}
                      >
                        应用
                      </Button>
                    }
                  >
                    <div style={{ marginBottom: 12, color: '#666' }}>
                      {scene.description}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
                        包含操作:
                      </div>
                      {scene.actions.map((action, index) => (
                        <Tag key={index} style={{ marginBottom: 4 }}>
                          {action.action}: {action.value.toString()}
                        </Tag>
                      ))}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>

          <TabPane tab={<span><HistoryOutlined />操作记录</span>} key="history">
            <Table
              dataSource={operationHistory}
              columns={[
                {
                  title: '时间',
                  dataIndex: 'timestamp',
                  key: 'timestamp',
                  width: 180
                },
                {
                  title: '设备',
                  dataIndex: 'device',
                  key: 'device',
                  width: 200
                },
                {
                  title: '操作',
                  dataIndex: 'action',
                  key: 'action',
                  width: 120
                },
                {
                  title: '数值',
                  dataIndex: 'value',
                  key: 'value',
                  width: 120,
                  render: (value) => {
                    if (typeof value === 'boolean') {
                      return <Tag color={value ? 'green' : 'red'}>{value ? '开启' : '关闭'}</Tag>;
                    }
                    return value;
                  }
                },
                {
                  title: '操作员',
                  dataIndex: 'operator',
                  key: 'operator',
                  width: 120
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  width: 100,
                                     render: (status: 'success' | 'failed' | 'pending') => {
                     const config = {
                       success: { color: 'green', text: '成功' },
                       failed: { color: 'red', text: '失败' },
                       pending: { color: 'orange', text: '等待' }
                     };
                     return <Tag color={config[status].color}>{config[status].text}</Tag>;
                   }
                }
              ]}
              size="small"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* 安全验证模态框 */}
      <Modal
        title={
          <Space>
            <LockOutlined />
            安全验证
          </Space>
        }
        visible={isSecurityModalVisible}
        onCancel={() => setIsSecurityModalVisible(false)}
        footer={null}
      >
        <Alert
          message="高危操作检测"
          description={`您即将执行 "${pendingAction?.type}" 操作，此操作可能影响系统安全，请确认您的身份。`}
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        
        <div style={{ marginBottom: 16 }}>
          <Input.Password 
            placeholder="请输入管理员密码"
            prefix={<LockOutlined />}
          />
        </div>

        <div style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={() => setIsSecurityModalVisible(false)}>
              取消
            </Button>
            <Button 
              type="primary" 
              onClick={() => {
                if (pendingAction) {
                  executeAction(pendingAction);
                  setIsSecurityModalVisible(false);
                  setPendingAction(null);
                }
              }}
            >
              确认执行
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default RemoteControl; 