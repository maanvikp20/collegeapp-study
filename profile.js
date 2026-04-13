// Profile page interactivity

// ── Edit Modal ───────────────────────────────────────────────────────────────

function openEdit() {
  document.getElementById('edit-modal').classList.remove('hidden');
  document.getElementById('edit-name').focus();
}

function closeEdit() {
  document.getElementById('edit-modal').classList.add('hidden');
}

function saveEdit(event) {
  event.preventDefault();

  const name  = document.getElementById('edit-name').value.trim();
  const major = document.getElementById('edit-major').value.trim();
  const year  = document.getElementById('edit-year').value;
  const bio   = document.getElementById('edit-bio').value.trim();

  if (name) {
    document.getElementById('display-name').textContent = name;
    document.getElementById('avatar').alt = name + ' avatar';
  }

  if (bio) {
    document.getElementById('bio-display').textContent = bio;
  }

  // Update the "About" detail list values
  const detailValues = document.querySelectorAll('.detail-list .value');
  if (detailValues.length >= 2) {
    if (major) detailValues[0].textContent = major;
    detailValues[1].textContent = year + ' (' + yearNumber(year) + ')';
  }

  // Update profile subtitle
  const gpa = document.querySelector('.profile-sub');
  if (gpa && major && year) {
    const currentGpa = gpa.textContent.match(/GPA [\d.]+/);
    gpa.textContent = major + ' · ' + year + (currentGpa ? ' · ' + currentGpa[0] : '');
  }

  closeEdit();
  showToast('Profile updated successfully!');
}

function yearNumber(year) {
  const map = {
    Freshman: '1st Year',
    Sophomore: '2nd Year',
    Junior: '3rd Year',
    Senior: '4th Year',
    Graduate: 'Graduate',
  };
  return map[year] || year;
}

// ── Avatar Preview ────────────────────────────────────────────────────────────

function previewAvatar(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('Please select an image file.', 'error');
    return;
  }
  const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
  if (file.size > maxSizeBytes) {
    showToast('Image must be smaller than 5 MB.', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('avatar').src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ── Toast Notification ────────────────────────────────────────────────────────

function showToast(message, type = 'success') {
  // Remove existing toast if any
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    background: type === 'success' ? '#4f46e5' : '#dc2626',
    color: '#fff',
    padding: '14px 22px',
    borderRadius: '10px',
    fontSize: '0.95rem',
    fontWeight: '600',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    zIndex: '200',
    opacity: '0',
    transform: 'translateY(12px)',
    transition: 'opacity 0.25s, transform 0.25s',
  });
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  // Auto-dismiss after 3 s
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Close modal on Escape key ─────────────────────────────────────────────────

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !document.getElementById('edit-modal').classList.contains('hidden')) {
    closeEdit();
  }
});
