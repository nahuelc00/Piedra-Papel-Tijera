type Move = "piedra" | "papel" | "tijera";

const state = {
  data: {
    myMove: "",
    computerMove: "",
    history: { user: 0, computer: 0 },
  },

  listeners: [],

  getState() {
    return this.data;
  },

  setState(newState: object) {
    this.data = newState;

    for (const cb of this.listeners) {
      cb();
    }

    localStorage.setItem("data", JSON.stringify(newState));
  },

  setMove(myMove: Move, moveComputer: Move) {
    const cs = this.getState();
    cs.myMove = myMove;
    cs.computerMove = moveComputer;
    this.setState(cs);
  },

  whoWin(myMove: Move, moveComputer: Move) {
    /*myMove == PIEDRA*/
    if (myMove == "piedra" && moveComputer == "tijera") {
      return 1;
    }

    if (myMove == "piedra" && moveComputer == "papel") {
      return 0;
    }

    if (myMove == "piedra" && moveComputer == "piedra") {
      return -1;
    }

    /*myMove == PAPEL*/
    if (myMove == "papel" && moveComputer == "piedra") {
      return 1;
    }
    if (myMove == "papel" && moveComputer == "tijera") {
      return 0;
    }
    if (myMove == "papel" && moveComputer == "papel") {
      return -1;
    }

    /*myMove == TIJERA*/
    if (myMove == "tijera" && moveComputer == "papel") {
      return 1;
    }
    if (myMove == "tijera" && moveComputer == "piedra") {
      return 0;
    }
    if (myMove == "tijera" && moveComputer == "tijera") {
      return -1;
    }
  },

  pushToHistory(whoWin: number) {
    const cs = state.getState();
    if (whoWin == 1) {
      cs.history.user++;
    }
    if (whoWin == 0) {
      cs.history.computer++;
    }
    state.setState(cs);
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
