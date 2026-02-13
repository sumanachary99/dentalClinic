import { useState, useEffect, useCallback } from 'react';
import { APPOINTMENT_STATUS, CLINIC_INFO } from '../config/constants';
import { getAppointments, updateAppointmentStatus } from '../utils/googleSheets';
import { sendFollowUpMessage } from '../utils/whatsapp';
import { getTodayString, getRelativeDay } from '../utils/dateUtils';

const DEFAULT_PIN = '1234';

export default function DashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState(getTodayString());

  const loadAppointments = useCallback(async () => {
    const data = await getAppointments(dateFilter);
    setAppointments(Array.isArray(data) ? data : []);
  }, [dateFilter]);

  useEffect(() => {
    if (authenticated) loadAppointments();
  }, [authenticated, loadAppointments]);

  const handlePin = (e) => {
    e.preventDefault();
    if (pin === DEFAULT_PIN) {
      setAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Default: 1234');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateAppointmentStatus(id, newStatus);
    loadAppointments();
  };

  const handleFollowUp = (templateId, apt) => {
    sendFollowUpMessage(templateId, apt);
  };

  const filtered = appointments.filter(a => {
    if (!search) return true;
    const q = search.toLowerCase();
    return a.patientName?.toLowerCase().includes(q) || a.phoneNumber?.includes(q);
  });

  const stats = {
    total: appointments.length,
    booked: appointments.filter(a => a.status === 'Booked').length,
    visited: appointments.filter(a => a.status === 'Visited').length,
    noShow: appointments.filter(a => a.status === 'No-Show').length,
  };

  // PIN Modal
  if (!authenticated) {
    return (
      <div className="pin-modal-overlay">
        <div className="pin-modal">
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>🔒</div>
          <h2>Receptionist Login</h2>
          <p>Enter your 4-digit PIN to access the dashboard</p>
          <form onSubmit={handlePin}>
            <input
              type="password"
              className="form-input"
              maxLength={4}
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              style={{ textAlign: 'center', fontSize: 'var(--text-2xl)', letterSpacing: '0.5em', maxWidth: '200px', margin: '0 auto var(--space-lg)' }}
              autoFocus
            />
            {pinError && <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-md)' }}>{pinError}</p>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container">
          <h1>📊 Dashboard</h1>
          <p>{getRelativeDay(dateFilter)}'s Overview — {CLINIC_INFO.name}</p>
          <div className="dashboard-stats">
            <div className="dashboard-stat-card">
              <div className="value">{stats.total}</div>
              <div className="label">Total</div>
            </div>
            <div className="dashboard-stat-card">
              <div className="value">{stats.booked}</div>
              <div className="label">Booked</div>
            </div>
            <div className="dashboard-stat-card" style={{ background: 'rgba(16,185,129,0.2)' }}>
              <div className="value" style={{ color: '#6ee7b7' }}>{stats.visited}</div>
              <div className="label">Visited</div>
            </div>
            <div className="dashboard-stat-card" style={{ background: 'rgba(239,68,68,0.2)' }}>
              <div className="value" style={{ color: '#fca5a5' }}>{stats.noShow}</div>
              <div className="label">No-Show</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        <div className="container">
          {/* Toolbar */}
          <div className="dashboard-toolbar">
            <div className="dashboard-search">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
              <input
                type="date"
                className="form-input"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: 'var(--text-sm)' }}
              />
              <button className="btn btn-primary btn-sm" onClick={loadAppointments}>
                🔄 Refresh
              </button>
            </div>
          </div>

          {/* Appointment Table */}
          <div className="appointment-table">
            <div className="appointment-table-header">
              <span>Patient</span>
              <span>Service</span>
              <span>Time</span>
              <span>Status</span>
              <span>Follow-Up</span>
              <span>Actions</span>
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="icon">📋</div>
                <h3>No appointments found</h3>
                <p>{dateFilter === getTodayString() ? 'No appointments for today.' : 'No appointments for this date.'}</p>
              </div>
            ) : (
              filtered.map((apt) => (
                <div className="appointment-row" key={apt.id}>
                  <div className="patient-info">
                    <span className="name">{apt.patientName}</span>
                    <span className="phone">{apt.phoneNumber}</span>
                  </div>
                  <span>{apt.serviceType}</span>
                  <span>{apt.appointmentTime}</span>
                  <select
                    className="status-select"
                    value={apt.status}
                    onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                    style={{
                      background: apt.status === 'Visited' ? 'var(--color-success-light)' :
                        apt.status === 'No-Show' ? 'var(--color-danger-light)' :
                        apt.status === 'Booked' ? 'var(--color-info-light)' : 'var(--color-warning-light)'
                    }}
                  >
                    {Object.values(APPOINTMENT_STATUS).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <span className={`badge ${
                    apt.followUpStage === 'Completed' ? 'badge-success' :
                    apt.followUpStage === 'None' ? 'badge-info' : 'badge-warning'
                  }`}>
                    {apt.followUpStage || 'None'}
                  </span>
                  <div className="action-buttons">
                    <button
                      className="action-btn whatsapp"
                      title="Send WhatsApp"
                      onClick={() => handleFollowUp(
                        apt.status === 'No-Show' ? 'NOSHOW_RESCHEDULE' :
                        apt.followUpStage === 'Day-1' ? 'FOLLOWUP_DAY1' :
                        apt.followUpStage === 'Day-3' ? 'FOLLOWUP_DAY3' : 'FOLLOWUP_DAY7',
                        apt
                      )}
                    >
                      💬
                    </button>
                    <button
                      className="action-btn"
                      title="Call patient"
                      onClick={() => window.open(`tel:${apt.phoneNumber}`)}
                    >
                      📞
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
