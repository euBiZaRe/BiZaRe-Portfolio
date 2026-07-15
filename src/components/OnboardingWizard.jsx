import React, { useState } from 'react';
import { X, Send, ArrowLeft, ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function OnboardingWizard({ scope, isOpen, onClose, onSubmitSuccess, currency, formatPrice }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isSubModel = scope && scope.billingModel === 'subscription';

  // Form states
  const [formData, setFormData] = useState({
    projectName: '',
    projectDesc: '',
    startDate: 'asap',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    companyName: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) newErrors.projectName = 'Project or brand name is required';
    if (!formData.projectDesc.trim()) newErrors.projectDesc = 'Please describe your website/app goals';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.contactName.trim()) newErrors.contactName = 'Your name is required';
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setLoading(true);

    // Simulate developer analysis and portal submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onSubmitSuccess) {
        onSubmitSuccess({
          ...formData,
          scope
        });
      }
    }, 2000);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(4, 4, 9, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      {/* Modal Container */}
      <div 
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '40px',
          borderColor: 'rgba(99, 102, 241, 0.25)',
          backgroundColor: 'var(--bg-secondary)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Header */}
        {!success && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Onboarding Portal
              </span>
              <h3 style={{ fontSize: '1.4rem', color: 'white' }}>Plan Your Custom Build</h3>
            </div>
            <button 
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {!success && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                style={{
                  height: '4px',
                  flex: 1,
                  borderRadius: '2px',
                  backgroundColor: i <= step ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: i <= step ? '0 0 8px var(--primary-glow)' : 'none',
                  transition: 'var(--transition-fast)'
                }}
              />
            ))}
          </div>
        )}

        {/* Success View */}
        {success ? (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px 0' }}>
            <div style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              padding: '16px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)'
            }}>
              <CheckCircle2 size={44} color="#22c55e" />
            </div>
            
            <h3 style={{ fontSize: '1.8rem', color: 'white' }}>Project Scope Submitted!</h3>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '18px',
              borderRadius: '8px',
              maxWidth: '460px',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              lineHeight: '1.6'
            }}>
              <p>Thank you for submitting your brief. Your project has been registered under ID: <strong style={{ color: 'white', fontFamily: 'monospace' }}>APX-78342</strong>.</p>
              <p style={{ marginTop: '10px' }}>We will review your scope details and send a Zoom consultation link to <strong>{formData.contactEmail}</strong> within 24 hours.</p>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ marginTop: '12px' }}
              onClick={onClose}
            >
              Back to Home
            </button>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Step 1: Project overview */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="projectName">Project or Brand Name</label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    placeholder={isSubModel ? "e.g. Acme Startup Development Queue" : "e.g. Acme SaaS Startup"}
                    className="form-input"
                  />
                  {errors.projectName && <span style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.projectName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="projectDesc">What are you hoping to build / support?</label>
                  <textarea
                    id="projectDesc"
                    name="projectDesc"
                    value={formData.projectDesc}
                    onChange={handleInputChange}
                    placeholder="Describe your goals, tech stack preferences, and the key tasks you need completed..."
                    className="form-input"
                    rows={4}
                    style={{ resize: 'vertical' }}
                  />
                  {errors.projectDesc && <span style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.projectDesc}</span>}
                </div>
              </div>
            )}

            {/* Step 2: Timeline & Budget review */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="startDate">Preferred Start Date</label>
                  <select
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="form-input form-select"
                  >
                    <option value="asap">Immediately (Within 2 weeks)</option>
                    <option value="month">Within 1-2 months</option>
                    <option value="exploration">Just exploring / Pricing out options</option>
                  </select>
                </div>

                {/* Scope Preview Card */}
                <div className="glass-card" style={{ padding: '20px', border: '1px solid var(--border-glow)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Sparkles size={16} color="var(--secondary)" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'white' }}>
                      Scope Review Summary
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Model Type:</span>
                      <strong style={{ color: 'white' }}>{isSubModel ? 'Monthly Retainer' : 'Fixed Project'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Core Tier:</span>
                      <strong style={{ color: 'white' }}>{scope.packageName}</strong>
                    </div>
                    {!isSubModel ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Page Count:</span>
                          <strong style={{ color: 'white' }}>{scope.pages} Pages</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Timeline:</span>
                          <strong style={{ color: 'white' }}>{scope.timeline ? (scope.timeline.charAt(0).toUpperCase() + scope.timeline.slice(1)) : 'Standard'} Delivery</strong>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>SLA Support Grade:</span>
                        <strong style={{ color: 'white' }}>{scope.sla ? (scope.sla.charAt(0).toUpperCase() + scope.sla.slice(1)) : 'Standard'} Response</strong>
                      </div>
                    )}
                    
                    {scope.featuresText && scope.featuresText.length > 0 && (
                      <div style={{ marginTop: '4px' }}>
                        <span>Selected Additions:</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                          {scope.featuresText.map((f, idx) => (
                            <span 
                              key={idx} 
                              style={{ 
                                background: 'rgba(255, 255, 255, 0.05)', 
                                padding: '2px 8px', 
                                borderRadius: '4px', 
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)'
                              }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ color: 'white', fontWeight: 600 }}>
                        {isSubModel ? 'Monthly Retainer:' : 'Estimated Investment:'}
                      </span>
                      <strong style={{ color: 'var(--secondary)', fontSize: '1.25rem' }}>
                        {formatPrice(scope.price, currency)}
                        {isSubModel && '/mo'}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Submit */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactName">Your Name</label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="form-input"
                    />
                    {errors.contactName && <span style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.contactName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactEmail">Email Address</label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="e.g. john@acme.com"
                      className="form-input"
                    />
                    {errors.contactEmail && <span style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.contactEmail}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="companyName">Company / Organization</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. Acme Corp (Optional)"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactPhone">Phone Number</label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. +1 555-0199 (Optional)"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Direct Consultation Notice */}
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.01)', padding: '12px', borderRadius: '6px' }}>
                  <span>🔒</span>
                  <span>We value your privacy. Your information is stored securely and is only used to establish our Zoom session details and quote files.</span>
                </div>
              </div>
            )}

            {/* Form Footer Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginTop: '12px' }}>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-secondary"
                  style={{ padding: '10px 20px' }}
                  disabled={loading}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
              ) : (
                <div></div> // Placeholder to keep Next button right-aligned
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary"
                  style={{ padding: '10px 20px' }}
                >
                  <span>Next Step</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-accent"
                  style={{ padding: '10px 24px', opacity: loading ? 0.7 : 1 }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </form>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 600px) {
          .contact-row {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
      `}} />
    </div>
  );
}
