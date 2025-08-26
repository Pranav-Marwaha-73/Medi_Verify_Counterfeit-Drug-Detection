
import React, { useState, useEffect } from 'react';
import { Shield, Scan, FileText, Settings, LogOut, User } from 'lucide-react';

import LoginPage from './components/LoginPage';
import ScanSection from './components/ScanSection';
import VerifySection from './components/VerifySection';
import LogsSection from './components/LogsSection';
import AdminSection from './components/AdminSection';
import LoadingModal from './components/LoadingModal';
import AlertContainer from './components/AlertContainer';
import { authService } from './services/auth';
import { loadTransactionLogs, saveTransactionLogs } from './utils/storage';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentSection, setCurrentSection] = useState('scan');
  const [verificationResult, setVerificationResult] = useState(null);
  const [transactionLogs, setTransactionLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    initializeAuth();
    const logs = loadTransactionLogs();
    setTransactionLogs(logs);
  }, []);

  const initializeAuth = async () => {
    try {
      const authenticated = await authService.init();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        setCurrentUser({
          id: authService.getUserId(),
          fullId: authService.getFullUserId(),
          principal: authService.getPrincipalText()
        });
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleLogin = async () => {
    try {
      await authService.login();
      setIsAuthenticated(true);
      setCurrentUser({
        id: authService.getUserId(),
        fullId: authService.getFullUserId(),
        principal: authService.getPrincipalText()
      });
    } catch (error) {
      showAlert('Login failed. Please try again.', 'error');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setCurrentUser(null);
      setCurrentSection('scan');
      showAlert('Logged out successfully', 'success');
    } catch (error) {
      showAlert('Logout failed', 'error');
    }
  };

  const showAlert = (message, type = 'info') => {
    const alert = {
      id: Date.now().toString(),
      message,
      type
    };
    setAlerts(prev => [...prev, alert]);
    
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== alert.id));
    }, 5000);
  };

  const addTransactionLog = (result) => {
    const transaction = {
      id: `TXN${Date.now().toString(36).toUpperCase()}`,
      timestamp: Date.now(),
      medicineId: result.id,
      medicineName: result.name,
      status: result.status === "Counterfeit" ? "counterfeit" : result.status,
      manufacturer: result.manufacturer,
      batchNumber: result.batchNumber,
      manufacturingDate: result.manufacturingDate,
      expiryDate: result.expiryDate,
      user: currentUser ? currentUser.id : 'Anonymous',
      userPrincipal: currentUser ? currentUser.fullId : 'anonymous',
      verificationHash: result.blockchainHash
    };
    
    const updatedLogs = [transaction, ...transactionLogs];
    setTransactionLogs(updatedLogs);
    saveTransactionLogs(updatedLogs);
  };

  const clearLogs = () => {
    if (window.confirm('Are you sure you want to clear all transaction logs? This action cannot be undone.')) {
      setTransactionLogs([]);
      saveTransactionLogs([]);
      showAlert('All logs cleared successfully', 'success');
    }
  };

  const navItems = [
    { id: 'scan', label: 'Scan Medicine', icon: Scan },
    { id: 'verify', label: 'Verify Results', icon: Shield },
    { id: 'logs', label: 'Transaction Logs', icon: FileText },
    { id: 'admin', label: 'Admin Portal', icon: Settings }
  ];

  if (isInitializing) {
    return (
      <div className="app">
        <div className="loading-screen">
          <div className="container">
            <div className="loading-content">
              <div className="spinner"></div>
              <h2>Initializing MediVerify</h2>
              <p>Connecting to Internet Computer...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>MediVerify</h1>
              <span className="tagline">Blockchain-Secured Medicine Verification</span>
            </div>
            <nav className="nav">
              <div className="user-info">
                <User size={18} />
                <span className="user-id" title={currentUser?.fullId}>
                  {currentUser?.id}
                </span>
              </div>
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`nav-btn ${currentSection === item.id ? 'active' : ''}`}
                    onClick={() => setCurrentSection(item.id)}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
              <button
                className="nav-btn logout-btn"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {currentSection === 'scan' && (
            <ScanSection
              onVerificationComplete={(result) => {
                setVerificationResult(result);
                addTransactionLog(result);
                setCurrentSection('verify');
                showAlert('Verification completed successfully', 'success');
              }}
              setIsLoading={setIsLoading}
              showAlert={showAlert}
            />
          )}
          
          {currentSection === 'verify' && (
            <VerifySection verificationResult={verificationResult} />
          )}
          
          {currentSection === 'logs' && (
            <LogsSection 
              transactionLogs={transactionLogs}
              showAlert={showAlert}
            />
          )}
          
          {currentSection === 'admin' && (
            <AdminSection
              transactionLogs={transactionLogs}
              onClearLogs={clearLogs}
              setIsLoading={setIsLoading}
              showAlert={showAlert}
            />
          )}
        </div>
      </main>

      <LoadingModal isVisible={isLoading} />
      <AlertContainer alerts={alerts} />
    </div>
  );
}


export default App;