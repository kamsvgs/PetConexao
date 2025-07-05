const form = document.getElementById('form-ong');

// Cria o botão "Resetar dados"
const btnReset = document.createElement('button');
btnReset.type = 'button'; // para não enviar o formulário
btnReset.textContent = 'Resetar dados';
btnReset.style.marginLeft = '10px';

// Adiciona funcionalidade para limpar o localStorage
btnReset.addEventListener('click', () => {
  localStorage.removeItem('ongsCadastradas');
  alert('Dados de ONGs apagados!');
  window.location.reload();
});

// Insere o botão no final do formulário
form.appendChild(btnReset);

form.addEventListener('submit', function(event) {
  event.preventDefault();

  console.log('tipoAjuda element:', form.elements['tipoAjuda']); // Verifica se o elemento existe
  console.log('tipoAjuda value:', form.elements['tipoAjuda'].value); // Valor digitado

  const file = form.imagem.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const imagemBase64 = reader.result;

    const novaOng = {
      nome: form.elements['nome'].value.trim(),
      descricao: form.elements['descricao'].value.trim(),
      tipoAjuda: form.elements['tipoAjuda'].value.trim(),
      local: form.elements['local'].value.trim(),
      contato: form.elements['contato'].value.trim(),
      imagem: imagemBase64
    };

    console.log('novaOng:', novaOng);

    let ongsCadastradas = JSON.parse(localStorage.getItem('ongsCadastradas')) || [];
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



