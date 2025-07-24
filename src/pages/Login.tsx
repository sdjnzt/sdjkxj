import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Card, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { generateCaptcha, drawCaptcha } from '../utils/captcha';
import '../styles/login.css';

interface LoginForm {
  username: string;
  password: string;
  captcha: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // 生成验证码
  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptchaCode(newCaptcha);
    if (canvasRef.current) {
      drawCaptcha(canvasRef.current, newCaptcha);
    }
  };

  // 初始化验证码和表单数据
  useEffect(() => {
    refreshCaptcha();
    
    // 获取保存的登录信息
    const savedUsername = localStorage.getItem('rememberedUsername');
    const savedPassword = localStorage.getItem('rememberedPassword');
    if (savedUsername && savedPassword) {
      form.setFieldsValue({
        username: savedUsername,
        password: savedPassword,
        remember: true
      });
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
    }
  }, [form]);

  const onFinish = async (values: LoginForm) => {
    if (values.captcha.toUpperCase() !== captchaCode) {
      message.error('验证码错误！');
      refreshCaptcha();
      form.setFieldValue('captcha', '');
      return;
    }

    setLoading(true);
    try {
      // TODO: 这里替换为实际的登录API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (values.username === 'admin' && values.password === 'admin123456') {
        // 处理记住密码
        if (values.remember) {
          localStorage.setItem('rememberedUsername', values.username);
          localStorage.setItem('rememberedPassword', values.password);
        } else {
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberedPassword');
        }
        
        // 存储登录状态
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', values.username);
        
        message.success('登录成功！');
        navigate('/dashboard');
      } else {
        message.error('用户名或密码错误！');
        refreshCaptcha();
      }
    } catch (error) {
      message.error('登录失败，请稍后重试！');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <img 
            src="/images/logo.png" 
            alt="金科星机电" 
            className="login-logo"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <h1>融合通信管理平台</h1>
        </div>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          size="large"
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item
            name="captcha"
            rules={[{ required: true, message: '请输入验证码！' }]}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <Input
                prefix={<SafetyOutlined />}
                placeholder="验证码"
                style={{ flex: 1 }}
              />
              <div 
                style={{ cursor: 'pointer' }} 
                onClick={refreshCaptcha}
                title="点击刷新验证码"
              >
                <canvas
                  ref={canvasRef}
                  width="100"
                  height="40"
                  style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}
                />
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 