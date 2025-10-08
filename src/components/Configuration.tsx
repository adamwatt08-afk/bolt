import React, { useState } from 'react';
import {
  Settings,
  Database,
  Server,
  Shield,
  Bell,
  Users,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Eye,
  EyeOff,
  Key,
  Calendar,
  Package,
  Tag
} from 'lucide-react';
import TagManagement from './TagManagement';

const Configuration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      companyName: 'Cegal Oil & Gas',
      timezone: 'UTC',
      language: 'English',
      dateFormat: 'DD/MM/YYYY',
      currency: 'USD'
    },
    database: {
      connectionString: 'postgresql://localhost:5432/cenova',
      maxConnections: 100,
      queryTimeout: 30,
      backupFrequency: 'daily',
      retentionPeriod: 90
    },
    security: {
      apiKey: 'ck_live_51H7qYKJ2eZvKYlo2C...',
      sessionTimeout: 60,
      mfaEnabled: true,
      passwordPolicy: 'strong',
      auditLogging: true
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      slackIntegration: true,
      alertThreshold: 85,
      maintenanceWindow: '02:00-04:00'
    },
    users: {
      maxUsers: 50,
      defaultRole: 'viewer',
      autoProvisioning: false,
      ssoEnabled: true,
      ldapIntegration: false
    }
  });

  const configTabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'licenses', label: 'Licenses', icon: Key },
    { id: 'tags', label: 'Tags', icon: Tag },
  ];

  const handleSave = () => {
    // Save configuration logic
    console.log('Saving configuration:', settings);
  };

  const handleReset = () => {
    // Reset to defaults logic
    console.log('Resetting to defaults');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Company Name</label>
          <input
            type="text"
            value={settings.general.companyName}
            onChange={(e) => setSettings({
              ...settings,
              general: { ...settings.general, companyName: e.target.value }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => setSettings({
              ...settings,
              general: { ...settings.general, timezone: e.target.value }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="GMT">Greenwich Mean Time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => setSettings({
              ...settings,
              general: { ...settings.general, language: e.target.value }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          >
            <option value="English">English</option>
            <option value="Norwegian">Norwegian</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Date Format</label>
          <select
            value={settings.general.dateFormat}
            onChange={(e) => setSettings({
              ...settings,
              general: { ...settings.general, dateFormat: e.target.value }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div className="bg-cegal-primary/10 border border-cegal-primary/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Info className="h-5 w-5 text-cegal-primary" />
          <h4 className="font-medium text-cegal-green">Database Configuration</h4>
        </div>
        <p className="text-sm text-cegal-gray-300">
          Changes to database settings require system restart and may affect performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">Connection String</label>
          <input
            type="text"
            value={settings.database.connectionString}
            onChange={(e) => setSettings({
              ...settings,
              database: { ...settings.database, connectionString: e.target.value }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Max Connections</label>
          <input
            type="number"
            value={settings.database.maxConnections}
            onChange={(e) => setSettings({
              ...settings,
              database: { ...settings.database, maxConnections: parseInt(e.target.value) }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Query Timeout (seconds)</label>
          <input
            type="number"
            value={settings.database.queryTimeout}
            onChange={(e) => setSettings({
              ...settings,
              database: { ...settings.database, queryTimeout: parseInt(e.target.value) }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Backup Frequency</label>
          <select
            value={settings.database.backupFrequency}
            onChange={(e) => setSettings({
              ...settings,
              database: { ...settings.database, backupFrequency: e.target.value }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Retention Period (days)</label>
          <input
            type="number"
            value={settings.database.retentionPeriod}
            onChange={(e) => setSettings({
              ...settings,
              database: { ...settings.database, retentionPeriod: parseInt(e.target.value) }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <h4 className="font-medium text-red-800">Security Settings</h4>
        </div>
        <p className="text-sm text-red-700">
          These settings control access and security policies. Changes may affect user access.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">API Key</label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              value={settings.security.apiKey}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, apiKey: e.target.value }
              })}
              className="w-full px-3 py-2 pr-10 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white font-mono text-sm"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-cegal-gray-400 hover:text-white"
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => setSettings({
              ...settings,
              security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Password Policy</label>
          <select
            value={settings.security.passwordPolicy}
            onChange={(e) => setSettings({
              ...settings,
              security: { ...settings.security, passwordPolicy: e.target.value }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          >
            <option value="basic">Basic</option>
            <option value="strong">Strong</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="mfaEnabled"
            checked={settings.security.mfaEnabled}
            onChange={(e) => setSettings({
              ...settings,
              security: { ...settings.security, mfaEnabled: e.target.checked }
            })}
            className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary"
          />
          <label htmlFor="mfaEnabled" className="text-sm font-medium text-white">
            Enable Multi-Factor Authentication
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="auditLogging"
            checked={settings.security.auditLogging}
            onChange={(e) => setSettings({
              ...settings,
              security: { ...settings.security, auditLogging: e.target.checked }
            })}
            className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary"
          />
          <label htmlFor="auditLogging" className="text-sm font-medium text-white">
            Enable Audit Logging
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="emailAlerts"
              checked={settings.notifications.emailAlerts}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, emailAlerts: e.target.checked }
              })}
              className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary"
            />
            <label htmlFor="emailAlerts" className="text-sm font-medium text-white">
              Email Alerts
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="smsAlerts"
              checked={settings.notifications.smsAlerts}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, smsAlerts: e.target.checked }
              })}
              className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary"
            />
            <label htmlFor="smsAlerts" className="text-sm font-medium text-white">
              SMS Alerts
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="slackIntegration"
              checked={settings.notifications.slackIntegration}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, slackIntegration: e.target.checked }
              })}
              className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary"
            />
            <label htmlFor="slackIntegration" className="text-sm font-medium text-white">
              Slack Integration
            </label>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Alert Threshold (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={settings.notifications.alertThreshold}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, alertThreshold: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Maintenance Window</label>
            <input
              type="text"
              value={settings.notifications.maintenanceWindow}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, maintenanceWindow: e.target.value }
              })}
              placeholder="HH:MM-HH:MM"
              className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLicenseSettings = () => {
    const licenseModules = [
      {
        id: 'overview',
        name: 'Overview',
        status: 'active',
        expiryDate: '2026-12-31',
        users: 50,
        type: 'Enterprise'
      },
      {
        id: 'seismic',
        name: 'Seismic Data',
        status: 'active',
        expiryDate: '2026-12-31',
        users: 50,
        type: 'Enterprise'
      },
      {
        id: 'wells',
        name: 'Well Data',
        status: 'active',
        expiryDate: '2026-12-31',
        users: 50,
        type: 'Enterprise'
      },
      {
        id: 'projects',
        name: 'Projects',
        status: 'active',
        expiryDate: '2025-06-30',
        users: 25,
        type: 'Professional'
      },
      {
        id: 'seismic-map',
        name: 'Seismic Map',
        status: 'active',
        expiryDate: '2026-12-31',
        users: 50,
        type: 'Enterprise'
      },
      {
        id: 'well-map',
        name: 'Well Map',
        status: 'active',
        expiryDate: '2026-12-31',
        users: 50,
        type: 'Enterprise'
      },
      {
        id: 'insights',
        name: 'Insights',
        status: 'expiring',
        expiryDate: '2025-03-15',
        users: 30,
        type: 'Professional'
      },
      {
        id: 'impact',
        name: 'Impact Analysis',
        status: 'active',
        expiryDate: '2026-09-30',
        users: 40,
        type: 'Enterprise'
      },
      {
        id: 'management',
        name: 'Management',
        status: 'active',
        expiryDate: '2026-12-31',
        users: 50,
        type: 'Enterprise'
      },
      {
        id: 'cleanup',
        name: 'Cleanup',
        status: 'expired',
        expiryDate: '2024-12-31',
        users: 20,
        type: 'Professional'
      },
      {
        id: 'archive',
        name: 'Archive',
        status: 'active',
        expiryDate: '2026-12-31',
        users: 50,
        type: 'Enterprise'
      },
      {
        id: 'configuration',
        name: 'Configuration',
        status: 'active',
        expiryDate: '2026-12-31',
        users: 10,
        type: 'Enterprise'
      }
    ];

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'active':
          return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
        case 'expiring':
          return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
        case 'expired':
          return 'text-red-500 bg-red-500/10 border-red-500/30';
        default:
          return 'text-cegal-gray-400 bg-cegal-gray-800 border-cegal-gray-700';
      }
    };

    const activeCount = licenseModules.filter(m => m.status === 'active').length;
    const expiringCount = licenseModules.filter(m => m.status === 'expiring').length;
    const expiredCount = licenseModules.filter(m => m.status === 'expired').length;

    return (
      <div className="space-y-6">
        <div className="bg-cegal-primary/10 border border-cegal-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Info className="h-5 w-5 text-cegal-primary" />
            <h4 className="font-medium text-cegal-green">License Management</h4>
          </div>
          <p className="text-sm text-cegal-gray-300">
            Each feature module requires a valid license. Contact your administrator to renew or upgrade licenses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-cegal-gray-400">Active Licenses</span>
            </div>
            <div className="text-3xl font-bold text-white">{activeCount}</div>
          </div>

          <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span className="text-sm text-cegal-gray-400">Expiring Soon</span>
            </div>
            <div className="text-3xl font-bold text-white">{expiringCount}</div>
          </div>

          <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="text-sm text-cegal-gray-400">Expired</span>
            </div>
            <div className="text-3xl font-bold text-white">{expiredCount}</div>
          </div>
        </div>

        <div className="space-y-3">
          {licenseModules.map((module) => (
            <div
              key={module.id}
              className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-5 hover:border-cegal-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Package className="h-5 w-5 text-cegal-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-base font-semibold text-white">{module.name}</h4>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          module.status
                        )}`}
                      >
                        {module.status.charAt(0).toUpperCase() + module.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-cegal-gray-400">License Type:</span>
                        <span className="ml-2 text-white font-medium">{module.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-cegal-gray-500" />
                        <span className="text-cegal-gray-400">Expires:</span>
                        <span className="ml-1 text-white font-medium">{module.expiryDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-cegal-gray-500" />
                        <span className="text-cegal-gray-400">Users:</span>
                        <span className="ml-1 text-white font-medium">{module.users}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn-cegal-secondary text-xs px-3 py-1.5">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderUserSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Maximum Users</label>
          <input
            type="number"
            value={settings.users.maxUsers}
            onChange={(e) => setSettings({
              ...settings,
              users: { ...settings.users, maxUsers: parseInt(e.target.value) }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Default Role</label>
          <select
            value={settings.users.defaultRole}
            onChange={(e) => setSettings({
              ...settings,
              users: { ...settings.users, defaultRole: e.target.value }
            })}
            className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="autoProvisioning"
            checked={settings.users.autoProvisioning}
            onChange={(e) => setSettings({
              ...settings,
              users: { ...settings.users, autoProvisioning: e.target.checked }
            })}
            className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary"
          />
          <label htmlFor="autoProvisioning" className="text-sm font-medium text-white">
            Auto Provisioning
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="ssoEnabled"
            checked={settings.users.ssoEnabled}
            onChange={(e) => setSettings({
              ...settings,
              users: { ...settings.users, ssoEnabled: e.target.checked }
            })}
            className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary"
          />
          <label htmlFor="ssoEnabled" className="text-sm font-medium text-white">
            Single Sign-On (SSO)
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="ldapIntegration"
            checked={settings.users.ldapIntegration}
            onChange={(e) => setSettings({
              ...settings,
              users: { ...settings.users, ldapIntegration: e.target.checked }
            })}
            className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary"
          />
          <label htmlFor="ldapIntegration" className="text-sm font-medium text-white">
            LDAP Integration
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'database':
        return renderDatabaseSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'users':
        return renderUserSettings();
      case 'licenses':
        return renderLicenseSettings();
      case 'tags':
        return <TagManagement />;
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cegal-green">Configuration</h2>
          <p className="text-white mt-1">Manage system settings and preferences</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleReset}
            className="btn-cegal-secondary flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          <button 
            onClick={handleSave}
            className="btn-cegal-primary flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Configuration Tabs */}
      <div className="card-cegal bg-cegal-darker border-cegal-gray-700">
        <div className="border-b border-cegal-gray-600">
          <nav className="flex space-x-8 px-6">
            {configTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-cegal-primary text-cegal-green'
                      : 'border-transparent text-cegal-gray-400 hover:text-white hover:border-cegal-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-cegal p-4 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm font-medium text-white">System Status</p>
              <p className="text-xs text-cegal-gray-400">All systems operational</p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-4 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <Database className="h-6 w-6 text-cegal-primary" />
            <div>
              <p className="text-sm font-medium text-white">Database</p>
              <p className="text-xs text-cegal-gray-400">Connected • 47ms latency</p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-4 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <Server className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm font-medium text-white">API Status</p>
              <p className="text-xs text-cegal-gray-400">Healthy • 99.9% uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;