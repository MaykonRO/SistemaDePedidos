function enviarWhatsApp(ddi, telefone, mensagem) {
  const numero = telefone.replace(/\D/g, '');
  const texto = encodeURIComponent(mensagem);
  const url = `https://wa.me/${ddi}${numero}?text=${texto}`;
  window.open(url, '_blank');
}

// Exemplo de uso:
enviarWhatsApp('55', '13999990000', 'Olá! Tudo bem?');