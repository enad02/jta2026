const LINKS = {
  tutorHandbook: 'pdfs/Tutor_Handbook.pdf',
  mentorHandbook: 'pdfs/Mentor_Handbook.pdf',
  tutorReflectionForm: 'https://docs.google.com/forms/d/e/1FAIpQLSf4hSHqVhnDqZNAk2rPJHCPchYpIloPMuTDeQdUhu02lwULCA/viewform?usp=sharing&ouid=101133882699783936705',
  mentorObservationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSfGeo7HxNdEvjEAjq2_OM6-lUJHpG79our0voNGfJpxqKHccg/viewform?usp=sharing&ouid=101133882699783936705',
  panelDashboard: 'https://docs.google.com/spreadsheets/d/1_zJiDDa3dCQSQDbuWzbGrStGD0DINAFp2TFXlFhomXI/edit?usp=sharing',
  skool: 'https://www.skool.com/full-ride-academy-6158/classroom',
  notebooklm: 'https://notebooklm.google.com/notebook/8c8f03b2-3019-46bd-a088-32e549f31f23?authuser=3',
  support: 'mailto:YOUR-EMAIL@EXAMPLE.COM?subject=JTA%20Support',
  escalation: 'mailto:YOUR-EMAIL@EXAMPLE.COM?subject=JTA%20Escalation',
};

const PRIORITY_TOOLS = [
  { label: 'Open Tutor Reflection', url: LINKS.tutorReflectionForm, variant: 'primary' },
  { label: 'Open Mentor Observation', url: LINKS.mentorObservationForm, variant: 'secondary' },
  { label: 'Open Panel Dashboard', url: LINKS.panelDashboard, variant: 'secondary' },
];

const HANDBOOK_DOCS = [
  { title: 'Tutor Handbook', url: LINKS.tutorHandbook, meta: 'Practical route for tutors' },
  { title: 'Mentor Handbook', url: LINKS.mentorHandbook, meta: 'Practical route for mentors' },
];

const FORMAL_DOCS = [
  { title: 'JF01 — Executive Foundation', url: 'pdfs/JF01.pdf' },
  { title: 'JF02 — The Jothi Trifecta', url: 'pdfs/JF02.pdf' },
  { title: 'JF03 — The 4T Teaching Engine', url: 'pdfs/JF03.pdf' },
  { title: 'JTD01 — Tutor Competency Framework', url: 'pdfs/JTD01.pdf' },
  { title: 'JTD02 — Tutor Lesson Reflection Standard', url: 'pdfs/JTD02.pdf' },
  { title: 'JTD03 — Tutor Residency Progress Framework', url: 'pdfs/JTD03.pdf' },
  { title: 'JTD04 — Mentor Observation Standard', url: 'pdfs/JTD04.pdf' },
  { title: 'JTD06 — Tutor Certification and Sign-Off Standard', url: 'pdfs/JTD06.pdf' },
  { title: 'JTS01 — Lesson Delivery Standard', url: 'pdfs/JTS01.pdf' },
  { title: 'JTS02 — Digital Board Teaching Standard', url: 'pdfs/JTS02.pdf' },
  { title: 'JTS03 — Assessment and Progress Monitoring Standard', url: 'pdfs/JTS03.pdf' },
  { title: 'JTS04 — Parent Communication Standard', url: 'pdfs/JTS04.pdf' },
  { title: 'JTS05 — Teaching Environment and Technology Standard', url: 'pdfs/JTS05.pdf' },
];

const QUICK_ACCESS = [
  { label: 'Tutor Reflection', url: LINKS.tutorReflectionForm, variant: 'secondary' },
  { label: 'Mentor Observation', url: LINKS.mentorObservationForm, variant: 'secondary' },
  { label: 'Panel Dashboard', url: LINKS.panelDashboard, variant: 'secondary' },
  { label: 'Tutor Handbook', url: LINKS.tutorHandbook, variant: 'primary' },
  { label: 'Mentor Handbook', url: LINKS.mentorHandbook, variant: 'secondary' },
  { label: 'SKOOL', url: LINKS.skool, variant: 'tertiary' },
  { label: 'NotebookLM', url: LINKS.notebooklm, variant: 'tertiary' },
  { label: 'Source Documents', url: '#documentsPanel', variant: 'secondary', scrollTarget: 'documentsPanel' },
  { label: 'Support', url: LINKS.support, variant: 'secondary' },
];

function createButton(label, url, variant = 'secondary', options = {}) {
  const el = document.createElement(options.isButton ? 'button' : 'a');
  el.className = `btn btn-${variant}`;
  el.textContent = label;

  if (options.isButton) {
    el.type = 'button';
  } else {
    el.href = url;
    if (url.startsWith('http') || url.startsWith('mailto:')) {
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    }
  }

  if (options.onClick) {
    el.addEventListener('click', options.onClick);
  }

  return el;
}

function createDocLink({ title, url, meta = 'Open PDF' }) {
  const link = document.createElement('a');
  link.className = 'doc-link';
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  const heading = document.createElement('span');
  heading.className = 'doc-title';
  heading.textContent = title;

  const text = document.createElement('span');
  text.className = 'doc-meta';
  text.textContent = meta;

  link.appendChild(heading);
  link.appendChild(text);
  return link;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function openDocsPanel() {
  const panel = document.getElementById('documentsPanel');
  const toggle = document.getElementById('toggleDocsBtn');
  if (!panel || !toggle) return;
  panel.classList.remove('hidden');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.textContent = 'Hide Documents';
  scrollToId('documentsPanel');
}

function mountPriorityTools() {
  const priorityTools = document.getElementById('priorityTools');
  if (!priorityTools) return;

  PRIORITY_TOOLS.forEach((tool) => {
    priorityTools.appendChild(createButton(tool.label, tool.url, tool.variant));
  });
}

function mountButtons() {
  const tutorButtons = document.getElementById('tutorButtons');
  if (tutorButtons) {
    tutorButtons.append(
      createButton('Open Tutor Handbook', LINKS.tutorHandbook, 'primary'),
      createButton('Open Tutor Reflection', LINKS.tutorReflectionForm, 'secondary'),
      createButton('Go to SKOOL', LINKS.skool, 'secondary'),
      createButton('Ask NotebookLM', LINKS.notebooklm, 'tertiary'),
      createButton('Open Source Documents', '#documentsPanel', 'secondary', {
        onClick: (event) => {
          event.preventDefault();
          openDocsPanel();
        },
      })
    );
  }

  const mentorButtons = document.getElementById('mentorButtons');
  if (mentorButtons) {
    mentorButtons.append(
      createButton('Open Mentor Handbook', LINKS.mentorHandbook, 'primary'),
      createButton('Open Mentor Observation', LINKS.mentorObservationForm, 'secondary'),
      createButton('Open Panel Dashboard', LINKS.panelDashboard, 'secondary'),
      createButton('Open Source Documents', '#documentsPanel', 'secondary', {
        onClick: (event) => {
          event.preventDefault();
          openDocsPanel();
        },
      }),
      createButton('Go to SKOOL', LINKS.skool, 'tertiary'),
      createButton('Ask NotebookLM', LINKS.notebooklm, 'tertiary')
    );
  }

  const supportButtons = document.getElementById('supportButtons');
  if (supportButtons) {
    supportButtons.append(
      createButton('Get Support', LINKS.support, 'primary'),
      createButton('Escalation Route', LINKS.escalation, 'secondary')
    );
  }

  const quickAccess = document.getElementById('quickAccess');
  if (quickAccess) {
    QUICK_ACCESS.forEach((item) => {
      const button = createButton(
        item.label,
        item.url,
        item.variant,
        item.scrollTarget
          ? {
              onClick: (event) => {
                event.preventDefault();
                openDocsPanel();
              },
            }
          : {}
      );
      quickAccess.appendChild(button);
    });
  }
}

function mountDocs() {
  const handbookDocs = document.getElementById('handbookDocs');
  if (handbookDocs) {
    HANDBOOK_DOCS.forEach((doc) => handbookDocs.appendChild(createDocLink(doc)));
  }

  const formalDocs = document.getElementById('formalDocs');
  if (formalDocs) {
    FORMAL_DOCS.forEach((doc) =>
      formalDocs.appendChild(createDocLink({ ...doc, meta: 'Official PDF document' }))
    );
  }
}

function toggleDocsPanel() {
  const panel = document.getElementById('documentsPanel');
  const toggle = document.getElementById('toggleDocsBtn');
  if (!panel || !toggle) return;

  const isHidden = panel.classList.contains('hidden');

  if (isHidden) {
    openDocsPanel();
    return;
  }

  panel.classList.add('hidden');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'Show Documents';
}

function mountEvents() {
  const toggleDocsBtn = document.getElementById('toggleDocsBtn');
  if (toggleDocsBtn) {
    toggleDocsBtn.addEventListener('click', toggleDocsPanel);
  }
}

mountPriorityTools();
mountButtons();
mountDocs();
mountEvents();
