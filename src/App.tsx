import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Layout, Menu, theme, Button, Avatar, Dropdown, Space, Typography } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  SafetyOutlined,
  ControlOutlined,
  BarChartOutlined,
  SettingOutlined,
  EnvironmentOutlined,
  AuditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined as SettingIcon,
  BellOutlined,
  ApiOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import Dashboard from './pages/Dashboard';
import CommandDispatch from './pages/CommandDispatch';
import StatusMonitor from './pages/StatusMonitor';
import SafetyManagement from './pages/SafetyManagement';
import RemoteControl from './pages/RemoteControl';
import DataReport from './pages/DataReport';
import DataAnalysis from './pages/DataAnalysis';
import OrganizationManagement from './pages/OrganizationManagement';
import InspectionManagement from './pages/InspectionManagement';
import ERPPlatform from './pages/ERPPlatform';
import SystemSettings from './pages/SystemSettings';
import ApiInterface from './pages/ApiInterface';
import FiveGSecurity from './pages/FiveGSecurity';
import SensorTransmission from './pages/SensorTransmission';
import Login from './pages/Login';

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: '总览仪表板',
  },
  {
    key: '/erp-platform',
    icon: <EnvironmentOutlined />,
    label: 'ERP平台',
  },
  {
    key: '/command-dispatch',
    icon: <TeamOutlined />,
    label: '指挥调度',
  },
  {
    key: '/status-monitor',
    icon: <VideoCameraOutlined />,
    label: '状态检测',
  },
  {
    key: '/safety-management',
    icon: <SafetyOutlined />,
    label: '安全管理',
  },
  {
    key: '/remote-control',
    icon: <ControlOutlined />,
    label: '远程控制',
  },
  {
    key: '/data-report',
    icon: <BarChartOutlined />,
    label: '数据上报',
  },
  {
    key: '/data-analysis',
    icon: <BarChartOutlined />,
    label: '数据分析',
  },
  {
    key: '/inspection-management',
    icon: <AuditOutlined />,
    label: '检查整改',
  },
  {
    key: '/organization',
    icon: <TeamOutlined />,
    label: '组织架构',
  },
  {
    key: '/api-interface',
    icon: <ApiOutlined />,
    label: '标准化接口',
  },
  {
    key: '/fiveg-security',
    icon: <SafetyOutlined />,
    label: '5G网络安全',
  },
  {
    key: '/sensor-transmission',
    icon: <RadarChartOutlined />,
    label: '感知传输',
  },
  {
    key: '/system-settings',
    icon: <SettingOutlined />,
    label: '系统设置',
  },
];

// 权限控制组件
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // 模拟通知数量
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 修改登录状态检查逻辑
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // 只有在未登录且不在登录页面时才重定向
    if (!isLoggedIn && location.pathname !== '/login') {
      navigate('/login');
    }
    // 如果已登录且在登录页面，重定向到仪表板
    else if (isLoggedIn && location.pathname === '/login') {
      navigate('/');
    }
  }, [navigate, location.pathname]);

  // 处理通知点击
  const handleNotificationClick = () => {
    console.log('查看系统通知');
    // 这里可以添加通知面板的逻辑
  };

  // 处理管理员菜单点击
  const handleAdminMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        console.log('查看个人资料');
        break;
      case 'settings':
        console.log('打开账户设置');
        break;
      case 'logout':
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        navigate('/login');
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          height: '100vh',
          zIndex: 1000,
          overflow: 'auto'
        }}
      >
        <div className="logo">
          {collapsed ? '金科星' : '金科星融合通信'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname === '/' ? '/' : location.pathname]}
          defaultSelectedKeys={['/']}
          items={menuItems}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer,
          position: 'fixed',
          top: 0,
          right: 0,
          left: collapsed ? 80 : 200,
          zIndex: 999,
          transition: 'left 0.2s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              山东金科星机电股份有限公司融合通信管理平台
            </div>
          </div>
          
          {/* 管理员组件 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* 通知图标 */}
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ fontSize: '16px', position: 'relative' }}
              title="系统通知"
              onClick={handleNotificationClick}
            >
              {notificationCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  minWidth: '16px',
                  textAlign: 'center',
                  lineHeight: 1
                }}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </Button>
            
            {/* 管理员下拉菜单 */}
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'profile',
                    icon: <UserOutlined />,
                    label: '个人资料',
                  },
                  {
                    key: 'settings',
                    icon: <SettingIcon />,
                    label: '账户设置',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    danger: true,
                  },
                ],
                onClick: handleAdminMenuClick,
              }}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer', padding: '8px 12px', borderRadius: 6 }}>
                <Avatar 
                  size="small" 
                  icon={<UserOutlined />}
                  style={{ backgroundColor: '#1890ff' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography.Text strong style={{ fontSize: '14px', lineHeight: 1 }}>
                    超级管理员
                  </Typography.Text>
                </div>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '88px 16px 24px',
            padding: 0,
            minHeight: 'calc(100vh - 112px)',
            background: 'transparent',
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/command-dispatch" element={<CommandDispatch />} />
            <Route path="/status-monitor" element={<StatusMonitor />} />
            <Route path="/safety-management" element={<SafetyManagement />} />
            <Route path="/remote-control" element={<RemoteControl />} />
            <Route path="/data-report" element={<DataReport />} />
            <Route path="/data-analysis" element={<DataAnalysis />} />
            <Route path="/inspection-management" element={<InspectionManagement />} />
            <Route path="/organization" element={<OrganizationManagement />} />
            <Route path="/erp-platform" element={<ERPPlatform />} />
            <Route path="/api-interface" element={<ApiInterface />} />
            <Route path="/fiveg-security" element={<FiveGSecurity />} />
            <Route path="/sensor-transmission" element={<SensorTransmission />} />
            <Route path="/system-settings" element={<SystemSettings />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router basename="/sdjkxj">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PrivateRoute element={<AppLayout />} />} />
      </Routes>
    </Router>
  );
};

export default App; 