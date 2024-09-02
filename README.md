
# Aplicación de Búsqueda de Imágenes con Pixabay

Este proyecto es una aplicación web simple que permite a los usuarios buscar imágenes utilizando la API de Pixabay. La aplicación cuenta con validación de búsqueda, mensajes de alerta y paginación de los resultados.

## Características

- **Buscar Imágenes**: Los usuarios pueden buscar imágenes ingresando un término en el formulario de búsqueda. La aplicación obtiene imágenes de Pixabay basadas en el término de búsqueda.
- **Validación del Formulario**: El formulario verifica si el usuario ha ingresado un término de búsqueda antes de enviar la solicitud. Si no lo hace, se muestra una alerta.
- **Alertas**: Se muestran alertas informativas cuando el usuario intenta enviar el formulario sin un término de búsqueda.
- **Paginación**: La aplicación maneja la paginación para mostrar un número fijo de imágenes por página.


## API

El proyecto utiliza la API de Pixabay, que requiere una clave API. Reemplaza la variable `key` en `app.js` con tu propia clave de API de Pixabay.

```javascript
const key = 'TU_CLAVE_API';
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
