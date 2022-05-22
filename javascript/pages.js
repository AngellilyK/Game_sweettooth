const Game= {
    id: "game",
    render: () => {
      return `
        <canvas id="field"></canvas>
      `;
    }
};

const Rules= {
    id: "rules",
    render: () => {
      return `
        <img src='images/BG_rules.png' alt="Stars" class="bg-game">
        <div class="rules">
            <div class="character">
                <svg width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 30 a 75 120 -60 1 1 180 150" id="first-line" />
                    <text fill="#340404" style="font-size:20px; font-family: Arial, sans-serif;" textLength="120">
                        <textPath xlink:href="#first-line" startOffset="90">I want a sweet</textPath>
                    </text>
                    <path d="M 0 55 a 70 100 -60 1 1 160 140" id="second-line" />
                    <text fill="#340404" style="font-size:20px; font-family: Arial, sans-serif;" textLength="110">
                        <textPath xlink:href="#second-line" startOffset="80">Get me one!</textPath>
                    </text>
                </svg>       
                <img src='images/unicorn1.png' alt="Unicorn" class="unicorn-page-rules">
            </div>
            <img src='images/donut.png' alt="Donut" class="donut">
            <p>When the sweets appear on the screen, swipe the mouse to cut it in half and earn points</p>
            <img src='images/bomb.png' alt="Bomb" class="bomb" >
            <p>If you cut the bomb the game is over</p>
            <img src='images/lives.png' alt="Lives" class="lives">
            <p> If three cumulative sweets are missed, the game ends, but upon reaching scores that are multiples of one hundred and the player has lost at least a life, the player will gain an extra life</p>
        </div>
      `;
    }
};

const Records= {
  id: "records",
  render: () => {
    return `
    <img src='images/BG_records.png' alt="Stars" class="bg-game">
    <h1 class="title">Records</h1>
    <form class="form" id="addNewUser">
      <input id="username" placeholder="Your name" type="text" class="input">
      <button id="addBtn" class="btn-add">+</button>
    </form>
    <div id="users" class="users">
    </div>
    `;
  }
};