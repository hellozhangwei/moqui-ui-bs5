document.addEventListener('DOMContentLoaded', () => {
  const appLayouts = document.querySelectorAll('.app-layout');
  const shellToggleButtons = document.querySelectorAll('[data-sidebar-shell-toggle]');

  shellToggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      appLayouts.forEach((layout) => layout.classList.toggle('sidebar-collapsed'));
    });
  });

  const setCaret = (toggle, expanded) => {
    const icon = toggle.querySelector('.sidebar-caret i');
    if (!icon) return;
    icon.classList.remove('bi-caret-right-fill', 'bi-caret-down-fill');
    icon.classList.add(expanded ? 'bi-caret-down-fill' : 'bi-caret-right-fill');
    icon.style.transform = expanded ? 'rotate(0deg)' : 'rotate(0deg)';
  };

  const expandSubmenu = (sub) => {
    sub.classList.remove('is-collapsed');
    sub.style.maxHeight = `${sub.scrollHeight}px`;
    window.setTimeout(() => {
      if (!sub.classList.contains('is-collapsed')) sub.style.maxHeight = '1000px';
    }, 220);
  };

  const collapseSubmenu = (sub) => {
    sub.style.maxHeight = `${sub.scrollHeight}px`;
    requestAnimationFrame(() => {
      sub.classList.add('is-collapsed');
      sub.style.maxHeight = '0px';
    });
  };

  document.querySelectorAll('.sidebar-item').forEach((item) => {
    const sub = item.nextElementSibling;
    if (!sub || !sub.classList.contains('sidebar-sub')) return;

    item.classList.add('has-children');
    const expanded = item.classList.contains('current');
    item.setAttribute('aria-expanded', String(expanded));

    if (expanded) {
      sub.classList.remove('is-collapsed');
      sub.style.maxHeight = '1000px';
    } else {
      sub.classList.add('is-collapsed');
      sub.style.maxHeight = '0px';
    }

    setCaret(item, expanded);

    item.addEventListener('click', (event) => {
      event.preventDefault();
      const nextExpanded = item.getAttribute('aria-expanded') !== 'true';
      item.setAttribute('aria-expanded', String(nextExpanded));
      setCaret(item, nextExpanded);

      if (nextExpanded) {
        expandSubmenu(sub);
      } else {
        collapseSubmenu(sub);
      }
    });
  });
});
