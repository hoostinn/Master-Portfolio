export interface ProjectData {
  title: string;
  description: string;
  role: string;
  team: string | null;
  stack: string[];
  github: string | null;
  demo: string | null;
  status: 'shipped' | 'in-progress' | 'archived';
  highlights: string[];
  tpmNote: string | null;
}

// ── Helpers ──────────────────────────────────────────────────────────────

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stackBadge(label: string): string {
  return `<span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-alt dark:bg-dark-surface-alt text-text dark:text-dark-text border border-border dark:border-dark-border">${esc(label)}</span>`;
}

function statusBadge(status: string): string {
  const classes: Record<string, string> = {
    shipped:       'bg-primary-muted dark:bg-dark-surface-alt text-text dark:text-dark-primary border border-primary dark:border-dark-primary',
    'in-progress': 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700',
    archived:      'bg-surface-alt dark:bg-dark-surface-alt text-text-faint dark:text-dark-text-faint border border-border dark:border-dark-border',
  };
  const labels: Record<string, string> = {
    shipped: 'Shipped', 'in-progress': 'In Progress', archived: 'Archived',
  };
  const cls = classes[status] ?? classes.archived;
  const lbl = labels[status] ?? status;
  return `<span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${cls}">${esc(lbl)}</span>`;
}

function set(id: string, html: string): void {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function toggle(id: string, show: boolean): void {
  document.getElementById(id)?.classList.toggle('hidden', !show);
}

// ── Populate ─────────────────────────────────────────────────────────────

function populate(data: ProjectData): void {
  set('modal-title',       esc(data.title));
  set('modal-description', esc(data.description));
  set('modal-role',        esc(data.role));
  set('modal-status',      statusBadge(data.status));

  const teamEl = document.getElementById('modal-team');
  if (teamEl) {
    teamEl.textContent = data.team ?? '';
    toggle('modal-team', !!data.team);
  }

  set('modal-stack', data.stack.map(stackBadge).join(''));

  set(
    'modal-highlights',
    data.highlights
      .map(
        (h) =>
          `<li class="flex gap-2.5 text-sm"><span class="text-primary dark:text-dark-primary mt-0.5 flex-shrink-0" aria-hidden="true">▸</span><span class="text-text-muted dark:text-dark-text-muted">${esc(h)}</span></li>`,
      )
      .join(''),
  );

  const tpmTextEl = document.getElementById('modal-tpm-text');
  if (tpmTextEl) tpmTextEl.textContent = data.tpmNote ?? '';
  toggle('modal-tpm', !!data.tpmNote);

  const ghEl = document.getElementById('modal-github') as HTMLAnchorElement | null;
  if (ghEl) {
    ghEl.href = data.github ?? '#';
    toggle('modal-github', !!data.github);
  }

  const demoEl = document.getElementById('modal-demo') as HTMLAnchorElement | null;
  if (demoEl) {
    demoEl.href = data.demo ?? '#';
    toggle('modal-demo', !!data.demo);
  }
}

// ── Open / Close ─────────────────────────────────────────────────────────

const dialog = document.getElementById('project-modal') as HTMLDialogElement | null;

function openModal(data: ProjectData): void {
  if (!dialog) return;
  populate(data);
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}

function closeModal(): void {
  if (!dialog) return;
  dialog.close();
  document.body.style.overflow = '';
}

// ── Wire up ───────────────────────────────────────────────────────────────

document.querySelectorAll<HTMLElement>('[data-modal-trigger]').forEach((el) => {
  el.addEventListener('click', () => {
    const raw = el.getAttribute('data-project');
    if (!raw) return;
    try {
      openModal(JSON.parse(raw) as ProjectData);
    } catch {
      console.error('ProjectModal: failed to parse project data');
    }
  });
});

// Backdrop click closes
dialog?.addEventListener('click', (e) => {
  if (e.target === dialog) closeModal();
});

// X button
document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);

// Native Escape restores scroll
dialog?.addEventListener('cancel', () => {
  document.body.style.overflow = '';
});
