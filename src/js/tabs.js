function initialize() {
  console.log('hi')
  console.log('hi', localStorage)

  const activeTabIdVic = localStorage.getItem('activeTabVic');
  const activeTabIdNSW = localStorage.getItem('activeTabNsw');
  const tabGrpVic = document.querySelector('#Vic');
  const tabGrpNSW = document.querySelector('#Nsw');
  const tabListVic = tabGrpVic.querySelectorAll('button');
  const tabListNSW = tabGrpNSW.querySelectorAll('button');
  const listBox = document.querySelectorAll('[role="listbox"]')[0];
  listBox.addEventListener("change", (event) => {
    const selectedTab = document.querySelector(`[id=${event.target.value}]`)
    activateTab(selectedTab, true)
  })

  generateArrays();

  function generateArrays() {
    panels = document.querySelectorAll('[role="tabpanel"]');
  };

  const keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46
  };

  
  const direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  };

  for (i = 0; i < tabListVic.length; ++i) {
    addListeners(tabGrpVic, tabListVic, i);
  };

  for (i = 0; i < tabListNSW.length; ++i) {
    addListeners(tabGrpNSW, tabListNSW, i);
  };

  function addListeners(tabGrp, tabs, index) {
    tabs[index].addEventListener('click', clickEventListener);
    tabs[index].addEventListener('keydown', keydownEventListener.bind(this, tabs, tabGrp));
    tabs[index].addEventListener('keyup', keyupEventListener.bind(this, tabs, tabGrp));    
    tabs[index].index = index;
  };

  function clickEventListener(event) {
    console.log('event', event);
    const tab = event.target;
    activateTab(tab, false);
  };

  function keydownEventListener(tabs, tabGrp, event) {
    const key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        activateTab(tabs[tabs.length - 1]);
        break;
      case keys.home:
        event.preventDefault();
        activateTab(tabs[0]);
        break;
      case keys.up:
      case keys.down:
        determineOrientation(tabs, tabGrp, event);
        break;
    };
  };

  function keyupEventListener(tabs, event) {
    const key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        determineOrientation(tabs, event);
        break;
      case keys.delete:
        determineDeletable(tabs, event);
        break;
    };
  };

  function determineOrientation(tabs, tabGrp, event) {
    const key = event.keyCode;
    const vertical = tabGrp.getAttribute('aria-orientation') == 'vertical';
    let proceed = false;

    if (vertical) {
      if (key === keys.up || key === keys.down) {
        event.preventDefault();
        proceed = true;
      };
    }
    else {
      if (key === keys.left || key === keys.right) {
        proceed = true;
      };
    };

    if (proceed) {
      switchTabOnArrowPress(tabs, event);
    };
  };

  function switchTabOnArrowPress(tabs, event) {
    const pressed = event.keyCode;
    const target = event.target;

    for (x = 0; x < tabs.length; x++) {
      tabs[x].addEventListener('focus', focusEventHandler);
    };

    if (direction[pressed]) {
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        else if (pressed === keys.left || pressed === keys.up) {
          focusLastTab(tabs);
        }
        else if (pressed === keys.right || pressed == keys.down) {
          focusFirstTab(tabs);
        };
      };
    };
  };

  function activateTab(tab, setFocus=true) {
    if(!tab) {
      return
    }
    const parent = tab.parentElement
    const tabs = parent.querySelectorAll('button');
    localStorage.setItem(`activeTab${parent.id}`, tab.id);
    deactivateTabs(tabs);
    tab.removeAttribute('tabindex');
    
    tab.setAttribute('aria-selected', 'true');
    const controls = tab.getAttribute('aria-controls');
    document.getElementById(controls).removeAttribute('hidden');
    if (setFocus) {
      tab.focus();
    };
  };

  function deactivateTabs(tabs) {
    for (t = 0; t < tabs.length; t++) {
      const controls = tabs[t].getAttribute('aria-controls');
      tabs[t].setAttribute('tabindex', '-1');
      tabs[t].setAttribute('aria-selected', 'false');
      tabs[t].removeEventListener('focus', focusEventHandler);
      document.getElementById(controls).setAttribute('hidden', 'hidden');
    };
  };

  function focusFirstTab(tabs) {
    tabs[0].focus();
  };

  function focusLastTab(tabs) {
    tabs[tabs.length - 1].focus();
  };

  function determineDeletable(tabList, event) {
    const tabs = tabList.querySelectorAll('button');
    target = event.target;
    if (target.getAttribute('data-deletable') !== null) {
      deleteTab(event, target);
      generateArrays();
      if (target.index - 1 < 0) {
        activateTab(tabs[0]);
      }
      else {
        activateTab(tabs[target.index - 1]);
      };
    };
  };

  function deleteTab(event) {
    const target = event.target;
    const panel = document.getElementById(target.getAttribute('aria-controls'));
    target.parentElement.removeChild(target);
    panel.parentElement.removeChild(panel);
  };


  function focusEventHandler(event) {
    const target = event.target;
    checkTabFocus(target);
  };

  function checkTabFocus(target) {
    focused = document.activeElement;
    if (target === focused) {
      activateTab(target, false);
    };
  };
  const activeTabVic = tabGrpVic.querySelector(`#${activeTabIdVic}`);
  const activeTabNsw = tabGrpNSW.querySelector(`#${activeTabIdNSW}`);
  activateTab(activeTabVic, false)
  activateTab(activeTabNsw, false)
  document.querySelector("h1").focus();
};