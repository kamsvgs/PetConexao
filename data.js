const form = document.getElementById('form-ong');

// Função para resetar os dados de ONGs no localStorage
function resetarDadosOng() {
  localStorage.removeItem('ongsCadastradas');
  alert('Dados de ONGs apagados!');
  window.location.reload();
}

// Cria o botão "Resetar dados" e adiciona ao formulário
const btnReset = document.createElement('button');
btnReset.type = 'button'; // evita submissão do form
btnReset.textContent = 'Resetar dados';
btnReset.style.marginLeft = '10px';
btnReset.addEventListener('click', resetarDadosOng);
form.appendChild(btnReset);

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const file = form.imagem.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const novaOng = {
      nome: form.elements['nome'].value.trim(),
      descricao: form.elements['descricao'].value.trim(),
      tipoAjuda: form.elements['tipoAjuda'].value.trim(),
      local: form.elements['local'].value.trim(),
      contato: form.elements['contato'].value.trim(),
      imagem: reader.result
    };

    let ongsCadastradas = JSON.parse(localStorage.getItem('ongsCadastradas')) || [];

    // Mantém só as últimas 3 ONGs cadastradas
    if (ongsCadastradas.length >= 4) {
      ongsCadastradas.shift(); // remove a ONG mais antiga
    }

    ongsCadastradas.push(novaOng);
    localStorage.setItem('ongsCadastradas', JSON.stringify(ongsCadastradas));

    alert('ONG cadastrada com sucesso!');
    window.location.href = 'index.html';
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    alert('Por favor, selecione uma imagem da ONG.');
  }
});

