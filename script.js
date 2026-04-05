const LINKS = {
  tutorHandbook: 'pdfs/Tutor_Handbook.pdf',
  mentorHandbook: 'pdfs/Mentor_Handbook.pdf',
  skool: 'https://YOUR-SKOOL-URL',
  notebooklm: 'https://YOUR-NOTEBOOKLM-URL',
  support: 'mailto:YOUR-EMAIL@EXAMPLE.COM?subject=JTA%20Support',
  escalation: 'mailto:YOUR-EMAIL@EXAMPLE.COM?subject=JTA%20Escalation',
};

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

function mountButtons() {
  const tutorButtons = document.getElementById('tutorButtons');
  tutorButtons.append(
    createButton('Open Tutor Handbook', LINKS.tutorHandbook, 'primary'),
    createButton('Go to SKOOL', LINKS.skool, 'secondary'),
    createButton('Ask NotebookLM', LINKS.notebooklm, 'tertiary'),
    createButton('Open Source Documents', '#documentsPanel', 'secondary', {
      onClick: (event) => {
        event.preventDefault();
        openDocsPanel();
      },
    })
  );

  const mentorButtons = document.getElementById('mentorButtons');
  mentorButtons.append(
    createButton('Open Mentor Handbook', LINKS.mentorHandbook, 'primary'),
    createButton('Open Source Documents', '#documentsPanel', 'secondary', {
      onClick: (event) => {
        event.preventDefault();
        openDocsPanel();
      },
    }),
    createButton('Go to SKOOL', LINKS.skool, 'tertiary'),
    createButton('Ask NotebookLM', LINKS.notebooklm, 'tertiary')
  );

  const supportButtons = document.getElementById('supportButtons');
  supportButtons.append(
    createButton('Get Support', LINKS.support, 'primary'),
    createButton('Escalation Route', LINKS.escalation, 'secondary')
  );

  const quickAccess = document.getElementById('quickAccess');
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

function mountDocs() {
  const handbookDocs = document.getElementById('handbookDocs');
  HANDBOOK_DOCS.forEach((doc) => handbookDocs.appendChild(createDocLink(doc)));

  const formalDocs = document.getElementById('formalDocs');
  FORMAL_DOCS.forEach((doc) =>
    formalDocs.appendChild(createDocLink({ ...doc, meta: 'Official PDF document' }))
  );
}

function openDocsPanel() {
  const panel = document.getElementById('documentsPanel');
  const toggle = document.getElementById('toggleDocsBtn');
  panel.classList.remove('hidden');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.textContent = 'Hide Documents';
  scrollToId('documentsPanel');
}

function toggleDocsPanel() {
  const panel = document.getElementById('documentsPanel');
  const toggle = document.getElementById('toggleDocsBtn');
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
  document.getElementById('toggleDocsBtn').addEventListener('click', toggleDocsPanel);
}

mountButtons();
mountDocs();
mountEvents();