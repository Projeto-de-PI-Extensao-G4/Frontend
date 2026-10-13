export function getTema() {
  return localStorage.getItem('cris_tema') || 'acolhedor';
}

export function aplicarTema(tema) {
  localStorage.setItem('cris_tema', tema);
  if (tema === 'classico') {
    document.documentElement.setAttribute('data-tema', 'classico');
  } else {
    document.documentElement.removeAttribute('data-tema');
  }
}

export function inicializarTema() {
  const tema = getTema();
  aplicarTema(tema);
}
