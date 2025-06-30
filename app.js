// app.js

// ✅ Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('✅ Service Worker registrado correctamente'))
    .catch(err => console.error('❌ Error al registrar el Service Worker:', err));
}

// 📲 Lógica para mostrar botón de instalación personalizado
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Detiene la mini barra automática
  deferredPrompt = e;

  const installBtn = document.createElement('button');
  installBtn.textContent = '📲 Instalar CarbonOut';
  installBtn.style.position = 'fixed';
  installBtn.style.top = '10px';
  installBtn.style.right = '10px';
  installBtn.style.padding = '10px 15px';
  installBtn.style.backgroundColor = '#4CAF50';
  installBtn.style.color = '#fff';
  installBtn.style.border = 'none';
  installBtn.style.borderRadius = '5px';
  installBtn.style.cursor = 'pointer';
  installBtn.style.zIndex = '1000';

  document.body.appendChild(installBtn);

  installBtn.addEventListener('click', () => {
    installBtn.remove();
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ El usuario instaló la PWA');
      } else {
        console.log('❌ El usuario canceló la instalación');
      }
      deferredPrompt = null;
    });
  });
});
