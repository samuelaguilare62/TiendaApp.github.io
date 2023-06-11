function toggleMenu() {
  var menuContainer = document.querySelector('.menu-container');
  menuContainer.classList.toggle('active');
}


 // Obtener referencia a la lista de aplicaciones 
    const appList = document.getElementById('app-list');

    // Función para renderizar la lista de aplicaciones
    function renderAppList() {
      appList.innerHTML = '';

      const apps = getStoredApps();

      apps.forEach((app, index) => {
        const appContainer = document.createElement('div');
        appContainer.className = 'app-container';

        const appImage = document.createElement('img');
        appImage.className = 'app-image';
        appImage.src = app.image;
        appContainer.appendChild(appImage);

        const appInfo = document.createElement('div');
        appInfo.className = 'app-info';
        appInfo.innerHTML = `
          <p><strong>Nombre:</strong> ${app.name}</p>
          <p><strong>Versión:</strong> ${app.version}</p>
          <p><strong>Etiquetas:</strong> ${app.tags}</p>
          <p><strong>Fecha de subida:</strong> ${app.uploadDate}</p>
        `;
        appContainer.appendChild(appInfo);

        const appActions = document.createElement('div');
        appActions.className = 'app-actions';

        const editButton = document.createElement('button');
        editButton.innerText = 'Editar';
        editButton.className = 'edit-button'; // Aplicar la clase edit-button
        editButton.addEventListener('click', () => editApp(index));
        appActions.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Eliminar';
        deleteButton.className = 'delete-button'; // Aplicar la clase delete-button
        deleteButton.addEventListener('click', () => deleteApp(index));
        appActions.appendChild(deleteButton);

        const downloadButton = document.createElement('a');
        downloadButton.href = app.file;
        downloadButton.innerText = 'Descargar';
      downloadButton.className = 'download-button'; // Aplicar la clase download-button
        downloadButton.download = app.name;
        appActions.appendChild(downloadButton);

        appContainer.appendChild(appActions);

        appList.appendChild(appContainer);
      });
    }

    // Función para obtener las aplicaciones almacenadas
    function getStoredApps() {
      const storedApps = localStorage.getItem('apps');
      return storedApps ? JSON.parse(storedApps) : [];
    }

    // Función para guardar las aplicaciones
    function saveApps(apps) {
      localStorage.setItem('apps', JSON.stringify(apps));
    }

    // Función para subir una nueva aplicación
    function uploadApp(event) {
      event.preventDefault();

      const appImageInput = document.getElementById('app-image');
      const appFileInput = document.getElementById('app-file');
      const appNameInput = document.getElementById('app-name');
      const appVersionInput = document.getElementById('app-version');
      const appTagsInput = document.getElementById('app-tags');

      const app = {
        image: URL.createObjectURL(appImageInput.files[0]),
        file: URL.createObjectURL(appFileInput.files[0]),
        name: appNameInput.value,
        version: appVersionInput.value,
        tags: appTagsInput.value,
        uploadDate: new Date().toLocaleString()
      };

      const apps = getStoredApps();
      apps.push(app);
      saveApps(apps);

      renderAppList();

      // Reiniciar el formulario
      document.getElementById('app-form').reset();
    }

    // Función para editar una aplicación existente
    function editApp(index) {
      const apps = getStoredApps();
      const app = apps[index];

      const appImageInput = document.getElementById('app-image');
      const appFileInput = document.getElementById('app-file');
      const appNameInput = document.getElementById('app-name');
      const appVersionInput = document.getElementById('app-version');
      const appTagsInput = document.getElementById('app-tags');

      appImageInput.value = '';
      appFileInput.value = '';
      appNameInput.value = app.name;
      appVersionInput.value = app.version;
      appTagsInput.value = app.tags;

      // Eliminar la aplicación original
      apps.splice(index, 1);
      saveApps(apps);

      renderAppList();
    }

    // Función para eliminar una aplicación
    function deleteApp(index) {
      const apps = getStoredApps();
      apps.splice(index, 1);
      saveApps(apps);

      renderAppList();
    }

    // Cargar aplicaciones almacenadas al cargar la página
    renderAppList();
    
    // Escuchar el evento submit del formulario
    document.getElementById('app-form').addEventListener('submit', uploadApp);
    
    const floatingButton = document.querySelector('.floating-button');
    const popupOverlay = document.querySelector('#popupOverlay');
    const closeButton = document.querySelector('#closeButton');
    
    floatingButton.addEventListener('click', function() {
      popupOverlay.style.display = 'flex'; // Mostrar el formulario emergente
    });
    
    closeButton.addEventListener('click', function() {
      popupOverlay.style.display = 'none'; // Ocultar el formulario emergente al hacer clic en el botón "Cerrar"
    });
    
       