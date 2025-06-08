const imageInput = document.getElementById('imageInput');
const textInput = document.getElementById('textInput');
const generateBtn = document.getElementById('generateBtn');
const canvas = document.getElementById('thumbCanvas');
const ctx = canvas.getContext('2d');
const commentsList = document.getElementById('commentsList');

let img = new Image();

imageInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

img.onload = () => {
  drawThumb();
};

function drawThumb() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fundo preto intenso
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Desenha a imagem com corte central para preencher o canvas sem distorcer
  let iw = img.width;
  let ih = img.height;
  let canvasRatio = canvas.width / canvas.height;
  let imgRatio = iw / ih;
  let sx, sy, sw, sh;

  if(imgRatio > canvasRatio){
    // imagem mais larga que canvas
    sh = ih;
    sw = ih * canvasRatio;
    sx = (iw - sw) / 2;
    sy = 0;
  } else {
    // imagem mais alta que canvas
    sw = iw;
    sh = iw / canvasRatio;
    sx = 0;
    sy = (ih - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

  // Overlay vermelho degradê do topo pra metade da thumb
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.5);
  gradient.addColorStop(0, 'rgba(255, 0, 0, 0.7)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height * 0.5);

  // Faixa vermelha no topo com texto "OPINIÃO POLÊMICA"
  const faixaHeight = 50;
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(0, 0, canvas.width, faixaHeight);

  ctx.font = 'bold 28px Impact, Arial Black, sans-serif';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('OPINIÃO POLÊMICA', canvas.width / 2, faixaHeight / 2);

  // Texto principal da thumb
  const text = textInput.value.trim();
  if (!text) return;

  ctx.font = 'bold 54px Impact, Arial Black, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Contorno branco grosso para destacar
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'white';

  // Cor vermelho sangue com sombra preta forte
  ctx.fillStyle = '#ff0000';
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;

  // Quebrar texto em linhas de até 22 caracteres
  const words = text.split(' ');
  const lines = [];
  let line = '';

  words.forEach(word => {
    if ((line + ' ' + word).trim().length > 22) {
      lines.push(line.trim());
      line = word;
    } else {
      line += ' ' + word;
    }
  });
  if (line) lines.push(line.trim());

  // Começar texto a uns 150px abaixo do topo, alinhando verticalmente no centro do canvas (menos faixa)
  const lineHeight = 60;
  let yStart = faixaHeight + 60;

  lines.forEach((lineText, i) => {
    let y = yStart + i * lineHeight;
    ctx.strokeText(lineText, canvas.width / 2, y);
    ctx.fillText(lineText, canvas.width / 2, y);
  });

  // Borda vermelha agressiva (opcional para reforçar visual)
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#ff0000';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Gerar comentário polêmico aleatório só pra dar aquela esquentada
const comments = [
  "Isso aí é fogo na roupa! 🔥",
  "Quem discordar que se pronuncie! 💥",
  "Esse papo vai dar o que falar...",
  "Deu match com a realidade? Kkkkk",
  "Chocante, mas é a verdade nua e crua!",
  "Acorda, galera! Isso tá pegando fogo!",
  "Quem aguenta mais esse papo? Só quem tem coragem!",
  "Papel e caneta na mão, porque esse é histórico.",
];

generateBtn.addEventListener('click', () => {
  if (!img.src) {
    alert('Escolha uma imagem primeiro, né!');
    return;
  }
  if (!textInput.value.trim()) {
    alert('Coloca um texto polêmico pra bombar!');
    return;
  }

  drawThumb();

  // Mostrar comentário aleatório
  const randomIndex = Math.floor(Math.random() * comments.length);
  commentsList.innerHTML = `<li>${comments[randomIndex]}</li>`;
});
