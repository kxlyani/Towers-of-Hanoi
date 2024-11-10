const rods = {
  'A': document.getElementById('rodA'),
  'B': document.getElementById('rodB'),
  'C': document.getElementById('rodC')
};

let rodStacks = { 'A': [], 'B': [], 'C': [] };
let moves = [];
let delay = 800;

document.getElementById('speedControl').addEventListener('input', (event) => {
  delay = parseInt(event.target.value);
});

window.onload = function() {
  initializeTowers(3);
}

function startGame() {
  const diskCountInput = document.getElementById('diskCount');
  const diskCount = parseInt(diskCountInput.value) || 3;

  if (diskCount < 1 || diskCount > 10) {
    alert("Please enter a number between 1 and 10.");
    return;
  }
  
  resetGame();
  initializeTowers(diskCount);
  solveHanoi(diskCount, 'A', 'C', 'B');
  executeMoves();
}

function resetGame() {
  moves = [];
  rodStacks = { 'A': [], 'B': [], 'C': [] };
  Object.values(rods).forEach(rod => rod.innerHTML = '');
}

function initializeTowers(diskCount) {
  const baseWidth = 200;
  const widthStep = baseWidth / diskCount;

  for (let i = diskCount; i > 0; i--) {
    const disk = document.createElement('div');
    disk.className = 'disk';
    disk.setAttribute('data-disk', i); // Assign data-disk attribute
    disk.style.width = `${baseWidth - (diskCount - i) * widthStep}px`;
    rods['A'].appendChild(disk);
    rodStacks['A'].push(disk);
  }
}

function solveHanoi(n, source, target, auxiliary) {
  if (n === 0) return;
  solveHanoi(n - 1, source, auxiliary, target);
  moves.push([source, target]);
  solveHanoi(n - 1, auxiliary, target, source);
}

function executeMoves() {
  let currentDelay = 0;
  moves.forEach(([from, to]) => {
    setTimeout(() => {
      moveDisk(from, to);
    }, currentDelay);
    currentDelay += delay;
  });
}

function moveDisk(from, to) {
  const sourceStack = rodStacks[from];
  const targetStack = rodStacks[to];

  if (sourceStack.length === 0) return;

  const disk = sourceStack.pop();
  rods[to].appendChild(disk);
  targetStack.push(disk);
}
