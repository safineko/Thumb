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
  // Limpa canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha imagem base esticada
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Estilo de texto polêmico
  const text = textInput.value.trim();
  if (!text) return;

  ctx.font = 'bold 40px Impact, Arial Black, sans-serif';
  ctx.fillStyle = '#ff2a2a';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 6;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Dividir texto em várias linhas, max 20 chars por linha
  const lines = [];
  let currentLine = '';
  text.split(' ').forEach(word => {
    if ((currentLine + ' ' + word).trim().length > 20) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += ' ' + word;
    }
  });
  if (currentLine) lines.push(currentLine.trim());

  // Posição vertical para texto centralizado
  const lineHeight = 50;
  const totalHeight = lineHeight * lines.length;
  let y = canvas.height / 2 - totalHeight / 2;

  lines.forEach(line => {
    ctx.strokeText(line, canvas.width / 2, y);
    ctx.fillText(line, canvas.width / 2, y);
    y += lineHeight;
  });
}

generateBtn.addEventListener('click', () => {
  if (!img.src) {
    alert('Escolha uma imagem antes!');
    return;
  }
  if (!textInput.value.trim()) {
    alert('Digite um texto para a thumb!');
    return;
  }

  drawThumb();
  generateComments();
});

function generateComments() {
  commentsList.innerHTML = '';

  const commentsPool = [
    'Isso é absurdo, ninguém aguenta mais!',
    'Mais uma polêmica inútil da internet...',
    'Parece que querem esconder a verdade!',
    'Só acho que isso vai dar ruim, viu?',
    'Alguém precisa falar a real!',
    'Essa aí vai gerar muita treta!',
    'Cuidado, fake news na área!',
    'O povo não merece isso!',
    'Tá todo mundo de olho, hein!',
    'É melhor ficar esperto com isso...'
  ];

  // Pega 5 comentários aleatórios sem repetir
  const shuffled = commentsPool.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  selected.forEach(comment => {
    const li = document.createElement('li');
    li.textContent = comment;
    commentsList.appendChild(li);
  });
}
