export default class SidebarMenu {
  constructor(htmlMenu) {
    this.htmlMenu = newhtmlMenu;
    this.sidebarMenu = {};
    formatSidebarMenu();
  }

  htmlMenuParser() {
    try {
      const parser = new DOMParser();
      this.htmlMenu = parser.parseFromString(this.htmlMenu, "text/html");
      return true;
    } catch (e) {
      this.htmlMenu = null;
      console.log(
        "Failed to Parse: The HTML code that you provided is not a valid HTML."
      );
      return false;
    }
  }

  formatSidebarMenu() {
    if (this.htmlMenuParser()) {
      this.sidebarMenu.mainMenuEl = this.htmlMenu.querySelector("ul");
      this.sidebarMenu.menuItems =
        this.sidebarMenu.mainMenuEl.querySelectorAll("li > a");
    }
  }
}

const dropdowns = document.querySelectorAll(".sidebar-menu-item-dropdown");

function handleDropdownClick({ target }) {
  if (target.getAttribute("aria-expanded") === "false") {
    target.setAttribute("aria-expanded", "true");
    expandSubMenu(target, "expand");
  } else {
    target.setAttribute("aria-expanded", "false");
    expandSubMenu(target, "close");
  }
}
dropdowns.forEach((dropdown) => addEventListener("click", handleDropdownClick));

function expandSubMenu(dropdownEl, action) {
  const submenu = dropdownEl.nextElementSibling;

  if (submenu.tagName.toLowerCase() === "ul") {
    let parentSubmenu;
    while (submenu.parentElement.tagName.toLowerCase() === "ul")
      parentSubmenu = submenu.parentElement;
    parentSubmenu = parentSubmenu ? parentSubmenu : submenu;
    console.log(parentSubmenu);
    submenu.style.maxHeight =
      action === "expand" ? `${submenu.scrollHeight}px` : "0";
  }
}
