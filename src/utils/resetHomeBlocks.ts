// Утилита для сброса блоков главной страницы до значений по умолчанию
// Используйте в консоли браузера: localStorage.removeItem('homeBlocks')
// или просто перезагрузите страницу после очистки localStorage

export const defaultHomeBlocks = [
  { id: 'hero', type: 'hero', data: {} },
  { id: 'about-cards', type: 'about-cards', data: {} },
  { id: 'quote', type: 'quote', data: {} },
  { id: 'features', type: 'features', data: {} },
  { id: 'materials', type: 'materials', data: {} },
  { id: 'cta', type: 'cta', data: {} }
];

export function resetHomeBlocks() {
  localStorage.setItem('homeBlocks', JSON.stringify(defaultHomeBlocks));
  window.location.reload();
}
