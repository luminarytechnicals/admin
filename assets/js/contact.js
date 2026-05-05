/* contact.js — Dynamic Contact System for Luminary Technicals
 * Handles multi-channel contact (WhatsApp, Email, Telegram)
 * with formatted message forwarding.
 */

const CONTACT = {
  email: "luminarytechnicals@gmail.com",
  whatsapp: "+918294721929",   // Update with real number
  telegram: "luminarytechnicalsinternational", // Update with real username

  // Format message for forwarding
  formatMessage(data) {
    const lines = [];
    if (data.name) lines.push(`Name: ${data.name}`);
    if (data.email) lines.push(`Email: ${data.email}`);
    if (data.type) lines.push(`Project Type: ${data.type}`);
    if (data.message) lines.push(`Message: ${data.message}`);
    lines.push(`Sent via: luminarytechnicals.com`);
    lines.push(`Date: ${new Date().toLocaleDateString('en-IN')}`);
    return lines.join('\n');
  },

  // Get WhatsApp URL with formatted message
  getWhatsAppURL(data) {
    const text = encodeURIComponent(this.formatMessage(data));
    return `https://wa.me/${this.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`;
  },

  // Get Email mailto URL with formatted message
  getEmailURL(data) {
    const subject = encodeURIComponent(`Collab Request — ${data.name || 'Luminary Technicals'}`);
    const body = encodeURIComponent(this.formatMessage(data));
    return `mailto:${this.email}?subject=${subject}&body=${body}`;
  },

  // Get Telegram URL with formatted message
  getTelegramURL(data) {
    const text = encodeURIComponent(this.formatMessage(data));
    return `https://t.me/${this.telegram}?text=${text}`;
  },

  // Collect form data from collab form
  collectFormData() {
    return {
      name: document.getElementById('collab-name')?.value || '',
      email: document.getElementById('collab-email')?.value || '',
      type: document.getElementById('collab-type')?.value || '',
      message: document.getElementById('collab-message')?.value || ''
    };
  },

  // Validate form
  validateForm(data) {
    if (!data.name.trim()) return { valid: false, field: 'collab-name', msg: 'Please enter your name.' };
    if (!data.email.trim() || !data.email.includes('@')) return { valid: false, field: 'collab-email', msg: 'Please enter a valid email.' };
    if (!data.type) return { valid: false, field: 'collab-type', msg: 'Please select a project type.' };
    if (!data.message.trim()) return { valid: false, field: 'collab-message', msg: 'Please enter your message.' };
    return { valid: true };
  },

  // Initialize contact channel buttons
  init() {
    // Handle channel buttons on collab form
    document.querySelectorAll('.contact-channel-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const channel = btn.dataset.channel;
        const data = this.collectFormData();
        const validation = this.validateForm(data);

        if (!validation.valid) {
          const field = document.getElementById(validation.field);
          if (field) {
            field.focus();
            field.style.borderColor = '#ef4444';
            setTimeout(() => field.style.borderColor = '', 2000);
          }
          // Show inline error
          this.showToast(validation.msg, 'error');
          return;
        }

        let url = '';
        switch (channel) {
          case 'whatsapp': url = this.getWhatsAppURL(data); break;
          case 'email': url = this.getEmailURL(data); break;
          case 'telegram': url = this.getTelegramURL(data); break;
        }

        if (url) window.open(url, '_blank');
      });
    });

    // Quick contact buttons (footer/contact section — no form needed)
    document.querySelectorAll('.quick-contact-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const channel = btn.dataset.channel;
        const data = { name: 'Visitor', message: 'Hello, I would like to get in touch.' };
        let url = '';
        switch (channel) {
          case 'whatsapp': url = this.getWhatsAppURL(data); break;
          case 'email': url = this.getEmailURL(data); break;
          case 'telegram': url = this.getTelegramURL(data); break;
        }
        if (url) window.open(url, '_blank');
      });
    });
  },

  // Toast notification
  showToast(msg, type = 'info') {
    const existing = document.getElementById('contact-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'contact-toast';
    toast.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);padding:14px 28px;border-radius:12px;font-size:0.9rem;font-weight:500;z-index:9000;backdrop-filter:blur(12px);border:1px solid;transition:opacity 0.3s ease;font-family:var(--font-body);`;

    if (type === 'error') {
      toast.style.background = 'rgba(239,68,68,0.15)';
      toast.style.borderColor = 'rgba(239,68,68,0.3)';
      toast.style.color = '#fca5a5';
    } else {
      toast.style.background = 'rgba(245,197,24,0.15)';
      toast.style.borderColor = 'rgba(245,197,24,0.3)';
      toast.style.color = '#F5C518';
    }

    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => CONTACT.init());
