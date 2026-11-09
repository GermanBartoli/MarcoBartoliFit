# Marco Bartoli · Entrená con propósito

**Sitio de coaching online con método de entrenamiento, asesoría, contenidos y contacto.**

[![Repositorio](https://img.shields.io/badge/GitHub-GermanBartoli-181717?logo=github)](https://github.com/GermanBartoli/MarcoBartoliFit)
[![Verificaciones](https://github.com/GermanBartoli/MarcoBartoliFit/actions/workflows/cloudflare.yml/badge.svg)](https://github.com/GermanBartoli/MarcoBartoliFit/actions/workflows/cloudflare.yml)

[Abrir sitio](https://marcobartolifit.pages.dev/) · [Empezar](#primeros-pasos) · [Mapa del repositorio](#mapa-del-repositorio) · [Autoría](#autoría-de-esta-documentación)

![Vista del proyecto: Marco Bartoli · Entrená con propósito](docs/images/vista-actual.jpg)

*Captura de la página publicada, tomada el 9 de noviembre de 2026. Conservada sin redimensionar ni recomprimir.*

## Primeros pasos

1. Recorré El método, Sobre mí y Asesoría para conocer el acompañamiento.
2. Explorá los videos y las imágenes de Lifestyle; los reproductores necesitan conexión a sus servicios.
3. Usá el formulario o WhatsApp para consultar. Los formularios de la web real envían mensajes reales.

## Enlaces

- [Sitio publicado en Cloudflare Pages](https://marcobartolifit.pages.dev/)
- [Repositorio en GitHub](https://github.com/GermanBartoli/MarcoBartoliFit)

Landing de coaching **100 % online**, con asesorías de **tres meses** y entrenamiento basado en ciencia. Identidad en negro, rojo oscuro y blanco, fotografías reales y una experiencia adaptable a celulares.

[Visitar el sitio](https://marcobartolifit.pages.dev/) · [Instagram](https://www.instagram.com/marcobartolifit/) · [YouTube](https://www.youtube.com/@MarcoBartoliFit) · [TikTok](https://www.tiktok.com/@marcobartolifit) · [WhatsApp](https://wa.me/5493516776352)

![Portada de la landing](docs/portada-desktop.png)

## Vista móvil

<img src="docs/portada-movil.png" alt="Portada en celular" width="300">

## La experiencia

- Presentación de Marco, cordobés de Argentina, coach y personal trainer.
- Método de trabajo, rutina estructurada y propuesta de tres meses exclusivamente online.
- Fotografías de entrenamiento y evolución personal, sin testimonios ni resultados inventados.
- Video «CAMBIÉ DE PREPARADOR | Road to UFA #1 ft. Benjamorano» y carrusel con los 24 Shorts públicos del canal, reproducibles en la página.
- Galería con acceso a Instagram, TikTok y Linktree.
- Reproductor de Spotify con la playlist **GYM LIFESTYLE**.
- Formulario inmediatamente debajo de Spotify, inspirado en el flujo de Cupido.
- WhatsApp flotante, preguntas frecuentes y frases motivadoras.

![Carrusel de Shorts](docs/carrusel-shorts.png)

## Diseño y accesibilidad

Tipografía Barlow Condensed y DM Sans, luces ambientales animadas, tarjetas con transparencia y movimiento 3D sutil, títulos escalonados y entradas al desplazarse. Se evita sobrecargar la página con partículas.

Las animaciones respetan `prefers-reduced-motion`. Incluye navegación por teclado, etiquetas de formulario, estado accesible del envío, enlaces alternativos para los reproductores y textos alternativos en las fotografías. Los reproductores se cargan de forma diferida.

## Fotografías

![Marco en el gimnasio](assets/fotos/img_6365.webp)

![Evolución personal de Marco](assets/fotos/img_6709.webp)

- `media/originales/`: las ocho imágenes entregadas por el usuario, conservadas sin cambios, incluidos dos HEIC.
- `assets/fotos/`: seis versiones WebP sin pérdida, verificadas píxel a píxel contra los originales. No se reduce la resolución; los recortes existentes solo quitan márgenes negros de las capturas, sin alterar el físico.
- `assets/redes/`: tres fotografías públicas y doce fotogramas recopilados previamente. Orígenes y limitaciones en [FUENTES.md](assets/redes/FUENTES.md).
- `assets/shorts/`: 24 miniaturas JPEG originales de YouTube, sin recompresión, y la lista verificada desde la pestaña pública de Shorts del canal el 18/10/2026.
- Los originales no se copian al sitio desplegado. Las imágenes siguen perteneciendo a sus titulares; recopilarlas no concede una licencia de reutilización a terceros.

## Desarrollo local

Se necesita Node.js 22 o posterior. No requiere dependencias de ejecución ni instalación de paquetes para construir.

```powershell
pnpm run check
pnpm test
pnpm run build
pnpm run dev
```

La vista local queda en `http://127.0.0.1:4173`. El formulario usa FormSubmit también en esta vista y una prueba puede enviar un correo real.

## Formulario y privacidad

El navegador envía el formulario directamente al endpoint AJAX de FormSubmit mediante el identificador opaco recibido en el correo de activación. FormSubmit confirmó una entrega de prueba con ese identificador el 18/10/2026. El correo real de destino no figura en el HTML, JavaScript ni en las solicitudes del navegador. `marco@gym.com` es el contacto visual solicitado, no un buzón configurado.

El endpoint anterior `/api/contact` permanece disponible como ruta heredada, pero la página ya no lo usa porque FormSubmit limitó con HTTP 429 los envíos originados desde Cloudflare. El Worker conserva sus validaciones y su secreto de destinatario para esa ruta. El formulario activo usa el campo trampa y las protecciones de FormSubmit. Una respuesta exitosa del proveedor no prueba por sí sola la entrega en la bandeja de entrada.

El formulario transmite los datos directamente a FormSubmit para responder la consulta. Spotify, YouTube y Google Fonts reciben las solicitudes necesarias para cargar su contenido. No hay analítica propia ni almacenamiento de consultas en una base de datos.

## Publicación

- Plataforma: Cloudflare Pages, proyecto `marcobartolifit`.
- Rama de producción: `main`.
- Salida: `dist/`.
- Configuración: `wrangler.jsonc` y secreto `CONTACT_RECIPIENT` para la ruta heredada.
- KV: binding `CONTACT_LIMITS` para la ruta heredada, separado del proyecto Cupido.

```powershell
pnpm run check
pnpm test
pnpm run build
pnpm dlx wrangler pages deploy dist --project-name marcobartolifit --branch main
```

Cada push a `main` ejecuta `.github/workflows/cloudflare.yml`: verifica la sintaxis, ejecuta las pruebas, compila y publica en el proyecto existente `marcobartolifit`, cuya rama de producción en Cloudflare es `main`. El token se guarda en el secreto de GitHub Actions `CLOUDFLARE_API_TOKEN`. También admite ejecución manual.

## Estructura

| Archivo o carpeta | Función |
| --- | --- |
| `index.html` | Contenido, secciones, SEO e integraciones |
| `styles.css` | Diseño adaptable, tipografía y animaciones |
| `script.js` | Entradas al scroll, tilt y formulario |
| `_worker.js` | Envío de consultas desde el servidor |
| `_headers` | Política de contenido y cabeceras de seguridad |
| `scripts/` | Construcción y servidor de vista local |
| `tests/contact.test.js` | Validación, límites y respuestas del proveedor |
| `docs/` | Capturas reales del sitio |

## Convención de commits

Mensajes en español: título descriptivo sin punto final, resumen de tres líneas y detalle concreto por archivo. No se usa Trello en este proyecto. Los archivos de texto mantienen CRLF mediante `.gitattributes`.

## Mapa del repositorio

- [package.json](<package.json>)
- [index.html](<index.html>)
- [docs/PUBLICACION.md](<docs/PUBLICACION.md>)

## Autoría de esta documentación

Repositorio mantenido por [Germán Bartoli](https://github.com/GermanBartoli). Guía revisada y actualizada con **Codex**, coautor de esta actualización documental. Los autores, colaboradores, licencias y recursos de terceros conservan sus créditos originales.

Los commits de esta revisión incluyen `Co-authored-by: Codex <noreply@openai.com>`; esta atribución no modifica la autoría del historial anterior.

<!-- firma-german-bartoli -->
<p align="center">
  <a href="https://germanbartoli.pages.dev/">
    <img src="docs/autor/german-bartoli.webp" alt="German Bartoli — Developer" width="96" height="96" /><br />
    Hecho por Germán Bartoli · Ver portfolio
  </a>
</p>
