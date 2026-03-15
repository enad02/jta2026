const roleTabs = document.querySelectorAll(".role-tab");
const rolePanels = {
  tutor: document.getElementById("panel-tutor"),
  mentor: document.getElementById("panel-mentor")
};

roleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedRole = tab.dataset.role;

    roleTabs.forEach((button) => {
      const isActive = button === tab;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    Object.entries(rolePanels).forEach(([role, panel]) => {
      const isVisible = role === selectedRole;
      panel.hidden = !isVisible;
      panel.classList.toggle("is-visible", isVisible);
    });
  });
});