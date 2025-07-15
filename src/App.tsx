import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, theme, Button } from 'antd';
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
    key: '/system-settings',
    icon: <SettingOutlined />,
    label: '系统设置',
  },
  
];

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer,
          position: 'fixed',
          top: 0,
          right: 0,
          left: collapsed ? 80 : 200,
          zIndex: 999,
          transition: 'left 0.2s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center'
        }}>
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
            <Route path="/system-settings" element={<SystemSettings />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App; 