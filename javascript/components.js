const NavBar = {
    render: () => {
      return `
        <nav class="menu" id="menu">
          <ul class="menu__list">
            <li><a class="menu__link" href="#game">Play</a></li>
            <li><a class="menu__link" href="#records">Records</a></li>
            <li><a class="menu__link" href="#rules">Rules</a></li>
            <li><a class="menu__link btn-sound" href="#" data-playing="false"><img src="images/sound.png" alt="Sound"></a></li>
          </ul>
        </nav>
      `;
    }
};
  
const Content = {
    render: () => {
      return `<div class="content" id="content"></div>`;
    }
};