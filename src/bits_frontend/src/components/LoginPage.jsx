import React, { useState } from 'react';
import { Shield, Users, Zap, Lock, Globe, CheckCircle, ArrowRight, Github, Mail } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await onLogin();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Shield size={24} />,
      title: "Immutable Verification",
      description: "Every medicine record is stored on the Internet Computer blockchain, ensuring tamper-proof authenticity verification."
    },
    {
      icon: <Users size={24} />,
      title: "Role-Based Access",
      description: "Separate interfaces for manufacturers, distributors, pharmacies, and consumers with appropriate permissions."
    },
    {
      icon: <Zap size={24} />,
      title: "Instant Scanning",
      description: "Real-time QR code scanning with immediate blockchain verification and detailed medicine history."
    },
    {
      icon: <Globe size={24} />,
      title: "Global Supply Chain",
      description: "End-to-end tracking from manufacturer to consumer, creating a transparent pharmaceutical ecosystem."
    }
  ];

  const teamMembers = [
    {
      name: "Pranav Marwaha",
      role: "Team Leader & Lead Developer",
      specialty: "Blockchain & Frontend",
      github: "https://github.com/Pranav-Marwaha-73/Medi_Verify_Counterfeit-Drug-Detection",
      email: "pranavmarwaha73@gmail.com"
    },
    {
      name: "Tarandeep Singh",
      role: "Senior Developer",
      specialty: "QR/Barcode Integration",
      github: null,
      email: "taran3366@gmail.com"
    },
    {
      name: "Hargun Kaur",
      role: "Junior Developer",
      specialty: "Backend Development",
      github: null,
      email: "hargun0056@gmail.com"
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Manufacturer Registration",
      description: "Pharmaceutical companies register medicine batches with unique identifiers on the ICP blockchain."
    },
    {
      step: "02",
      title: "Supply Chain Transfer",
      description: "Ownership transfers are recorded immutably, creating an auditable trail of custody."
    },
    {
      step: "03",
      title: "Consumer Verification",
      description: "End users scan QR codes to instantly verify authenticity and view complete medicine history."
    }
  ];

  return (
    <div className="login-page">
      {/* Hero Section */}
      <div className="login-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="logo-section">
                <h1 className="hero-title">MediVerify</h1>
                <p className="hero-tagline">Blockchain-Secured Medicine Verification</p>
              </div>
              
              <div className="problem-solution">
                <div className="problem-section">
                  <h2>🎯 The Problem</h2>
                  <p>
                    Counterfeit medicines pose a significant and life-threatening risk to global health. 
                    It is incredibly challenging for pharmacies, hospitals, and consumers to reliably verify 
                    the authenticity of drugs. Existing systems are often manual or centralized, making them 
                    vulnerable to errors, manipulation, and security breaches.
                  </p>
                </div>

                <div className="solution-section">
                  <h2>💡 Our Solution — Medi-Verify</h2>
                  <p>
                    A decentralized platform on the Internet Computer (ICP) that ensures medicine authenticity 
                    and transparency across the supply chain. By scanning a unique code (QR/barcode/RFID), 
                    anyone can instantly verify:
                  </p>
                  <div className="verification-list">
                    <div className="verification-item">✅ Manufacturer Name</div>
                    <div className="verification-item">✅ Batch Number</div>
                    <div className="verification-item">✅ Manufacturing & Expiry Date</div>
                    <div className="verification-item">✅ Unique Blockchain Hash</div>
                  </div>
                </div>
              </div>

              <div className="login-section">
                <h3>Access the Verification Portal</h3>
                <p>Connect with Internet Computer Identity to start verifying medicines</p>
                <button 
                  className="login-btn"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner-small"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Lock size={20} />
                      Login with Internet Identity
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="verification-demo">
                <div className="demo-card">
                  <div className="demo-header">
                    <Shield size={32} />
                    <span>Live Verification</span>
                  </div>
                  <div className="demo-content">
                    <div className="demo-field">
                      <span className="field-label">Medicine ID</span>
                      <span className="field-value">8904045410416</span>
                    </div>
                    <div className="demo-field">
                      <span className="field-label">Status</span>
                      <span className="status-authentic">✓ AUTHENTIC</span>
                    </div>
                    <div className="demo-field">
                      <span className="field-label">Manufacturer</span>
                      <span className="field-value">Multani Pharmaceuticals</span>
                    </div>
                    <div className="demo-field">
                      <span className="field-label">Blockchain Hash</span>
                      <span className="field-value hash">86802fb7aba1c3f6ef784c7c9177d...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <h2 className="section-title">✨ Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Shield size={24} /></div>
              <h3>🔗 Immutable Records</h3>
              <p>Stored in ICP canister (On chain).</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Users size={24} /></div>
              <h3>🚚 End-to-End Tracking</h3>
              <p>Transparent product journey.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Zap size={24} /></div>
              <h3>✅ Instant Verification</h3>
              <p>Real-time authenticity checks.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Globe size={24} /></div>
              <h3>📋 Audit Trail</h3>
              <p>Every transaction is logged.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="workflow-section">
        <div className="container">
          <h2 className="section-title">⚙️ How It Works</h2>
          <div className="workflow-steps">
            <div className="workflow-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Manufacturer Registration</h3>
                <p>Medicines are added on-chain with verified details.</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Supply Chain Tracking</h3>
                <p>Transfers between manufacturer → distributor → pharmacy are logged immutably.</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Consumer Verification</h3>
                <p>End users scan the product to confirm authenticity in real time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="tech-section">
        <div className="container">
          <h2 className="section-title">🛠️ Tech Stack</h2>
          <div className="tech-grid">
            <div className="tech-category">
              <h3>Frontend</h3>
              <ul>
                <li>React.js + Vite</li>
                <li>Tailwind</li>
                <li>Lucide Icons</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Backend</h3>
              <ul>
                <li>Rust canister on ICP</li>
                <li>FastAPI bridge</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Storage</h3>
              <ul>
                <li>StableBTreeMap</li>
                <li>(on-chain persistence)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <div className="container">
          <h2 className="section-title">🧑‍💻 Team X Rankers</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-specialty">{member.specialty}</p>
                </div>
                <div className="member-contact">
                  {member.github ? (
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <Github size={18} />
                    </a>
                  ) : null}
                  <a href={`mailto:${member.email}`}>
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Secure the Pharmaceutical Supply Chain?</h2>
            <p>Join the revolution in medicine verification with blockchain technology</p>
            <button 
              className="cta-btn"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner-small"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Start Verifying Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;