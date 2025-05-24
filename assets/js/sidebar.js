
  function sidebar() {
    return {
      sidebarCollapsed: window.innerWidth < 768,

      init() {
        // Optional: update on resize
        window.addEventListener('resize', () => {
          if (window.innerWidth >= 768) {
            this.sidebarCollapsed = false;
          } else {
            this.sidebarCollapsed = true;
          }
        });
      }
    };
  }

 