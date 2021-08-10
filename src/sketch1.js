import CSanim from './CSanim';

export default function sketch1(p5) {
  const nodes = 10;
  const edges = [
    [1, 2],
    [3, 4],
    [5],
    [],
    [6],
    [7, 8],
    [],
    [],
    [9],
    []
  ];

  const size = 30;
  const [treeW, treeH, treeX, treeY] = CSanim.getTreeCoords(nodes, edges, size);
  const csa = new CSanim(treeW + 100, treeH + 100);

  const treeCoords = [];
  for (let i = 0; i < nodes; i++) {
    treeCoords[i] = [
      treeX[i] + csa.w / 2,
      treeY[i] + (csa.h - treeH + size) / 2
    ];
  }

  const circles = [];
  for (let i = 0; i < nodes; i++) {
    circles.push(new CSanim.Circle(csa, treeCoords[i], size));
    circles[i].text = i + 1;
    circles[i].color = CSanim.ORANGE;
  }

  const lines = [];
  for (let i = 0; i < nodes; i++) {
    lines.push([]);
    for (const j of edges[i]) {
      lines[i][j] = new CSanim.Line(csa, treeCoords[i], treeCoords[j]);
      lines[i][j].zIndex = -1;
    }
  }

  const showAnimation = [];
  for (let i = 0; i < nodes; i++) {
    showAnimation.push(circles[i].fadeIn().delay(i * .1));
    for (const j of edges[i]) {
      showAnimation.push(lines[i][j].fadeIn().delay(i * .1));
      showAnimation.push(lines[i][j].zoomIn().delay(i * .1));
    }
  }
  csa.play(showAnimation, .5);
  csa.saveScreen();
  csa.wait(3);

  const text = new CSanim.Text(csa, [50, csa.h - 100], '**DFS:**');
  text.align = 'left';
  csa.play(text.fadeIn(), .5);

  const dfs = node => {
    csa.play([
      circles[node].changeColorTo(CSanim.BLUE),
      circles[node].changeTextColorTo(CSanim.WHITE),
      text.changeTextTo(text.text + (node === 6 ? '\n' : ' ') + (node + 1))
    ], 1);
    if (edges[node].length === 0) {
      csa.wait(1);
    }
    for (const son of edges[node]) {
      csa.play(lines[node][son].zoomColorToEnd(CSanim.RED), 1);
      dfs(son);
      csa.play(lines[node][son].zoomColorToBeg(CSanim.WHITE), 1);
    }
    csa.play([
      circles[node].changeColorTo(CSanim.GREEN),
      circles[node].changeTextColorTo(CSanim.BLACK)
    ], 1);
  };
  dfs(0);
  csa.wait(3);

  const hideAnimation = [text.fadeOut()];
  for (let i = 0; i < nodes; i++) {
    hideAnimation.push(circles[i].rotate());
    hideAnimation.push(circles[i].zoomOut());
    for (const j of edges[i]) {
      hideAnimation.push(lines[i][j].fadeOut());
    }
  }
  csa.play(hideAnimation, 1);
  csa.run(p5);
};
