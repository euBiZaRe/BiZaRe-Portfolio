import React from 'react';
import { X, CheckCircle, RefreshCw, AlertCircle, FileText } from 'lucide-react';

export default function ScopeBoard({ 
  scope, 
  isOpen, 
  onClose, 
  onOpenWizard, 
  onCheckout, 
  onResetScope, 
  onReset, 
  currency, 
  formatPrice 
}) {
  if (!isOpen) return null;

  const handleOpenWizard = onOpenWizard || onCheckout;
  const handleResetScope = onResetScope || onReset;
  const isSubModel = scope && scope.billingModel === 'subscription';

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(4, 4, 9, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'all 0.3s ease-in-out'
      }}
      onClick={onClose}
    >
      {/* Drawer Container */}
      <div 
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          padding: '30px 24px',
          position: 'relative',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem', color: 'white' }}>Current Scope Board</h3>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Scope Content */}
        {!scope || !scope.packageId ? (
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'var(--text-muted)' }}>
            <AlertCircle size={40} color="var(--text-dark)" />
            <p style={{ textAlign: 'center', fontSize: '0.95rem' }}>No package scope selected yet.</p>
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                if (handleResetScope) handleResetScope();
                onClose();
              }}
            >
              Load Default Template
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flexGrow: 1 }}>
            
            {/* Core Package Details */}
            <div className="glass-card" style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                {isSubModel ? 'Subscription Plan' : 'Application Tier'}
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'white', fontWeight: 700 }}>{scope.packageName}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {isSubModel ? 'Flat rate recurring support tier.' : 'Value-based custom project package.'}
              </p>
            </div>

            {/* Spec breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'white', letterSpacing: '0.05em', fontWeight: 600 }}>
                Scope Details
              </h5>
              
              {!isSubModel ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Page Count:</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>{scope.pages} Views / Pages</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Target Timeline:</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>
                      {scope.timeline ? (scope.timeline.charAt(0).toUpperCase() + scope.timeline.slice(1)) : 'Standard'} Delivery
                    </span>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Support SLA:</span>
                  <span style={{ color: 'white', fontWeight: 600 }}>
                    {scope.sla ? (scope.sla.charAt(0).toUpperCase() + scope.sla.slice(1)) : 'Standard'} Response
                  </span>
                </div>
              )}
            </div>

            {/* Custom Features List */}
            <div>
              <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'white', letterSpacing: '0.05em', marginBottom: '12px', fontWeight: 600 }}>
                {isSubModel ? 'Subscription Add-Ons' : 'Selected Custom Integrations'}
              </h5>
              {(!scope.featuresText || scope.featuresText.length === 0) ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  No additions selected.
                </p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {scope.featuresText.map((feat, idx) => (
                    <div 
                      key={idx} 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: 'rgba(6, 182, 212, 0.08)',
                        border: '1px solid rgba(6, 182, 212, 0.15)',
                        fontSize: '0.8rem',
                        color: '#cffafe'
                      }}
                    >
                      <CheckCircle size={12} color="var(--secondary)" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price estimate block */}
            <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  {isSubModel ? 'Monthly Retainer:' : 'Est. Investment:'}
                </span>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-heading)' }}>
                  {formatPrice(scope.price, currency)}
                  {isSubModel && <span style={{ fontSize: '1rem', fontWeight: '500' }}>/mo</span>}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                *This represents estimated rates. Final scope specifications and retainers are locked post-consultation.
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '12px' }}
                  onClick={() => {
                    if (handleResetScope) handleResetScope();
                    onClose();
                  }}
                  title="Reset Scope"
                >
                  <RefreshCw size={18} />
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ flexGrow: 1, padding: '14px' }}
                  onClick={() => {
                    if (handleOpenWizard) handleOpenWizard();
                    onClose();
                  }}
                >
                  Confirm & Plan Project
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
