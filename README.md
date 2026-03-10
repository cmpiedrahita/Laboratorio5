# Laboratorio 5 - Tablero Colaborativo

Aplicación de tablero de dibujo colaborativo en tiempo real usando React, p5.js, Spring Boot y WebSocket.

## Tecnologías Utilizadas

### Backend
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![p5.js](https://img.shields.io/badge/p5.js-ED225D?style=for-the-badge&logo=p5.js&logoColor=white)

## Características

- Dibujo en tiempo real compartido entre múltiples usuarios
- Cada usuario tiene un color aleatorio asignado
- Botón de borrado que limpia el tablero para todos
- Comunicación en tiempo real mediante WebSocket/STOMP

## Requisitos Previos

- Java 17 o superior
- Maven 3.6+
- Node.js 16+ y npm
- Git

## Cómo Probar Localmente

### 1. Backend (Spring Boot)

```bash
# Navegar al directorio backend
cd backend

# Compilar y ejecutar con Maven
mvn spring-boot:run

# O si prefieres compilar primero
mvn clean package
java -jar target/board-1.0.0.jar
```

El backend estará corriendo en `http://localhost:8080`

### 2. Frontend (React)

Abre una nueva terminal:

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias (si no lo has hecho)
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El frontend estará corriendo en `http://localhost:3000`

### 3. Probar la Aplicación

1. Abre `http://localhost:3000` en tu navegador
2. Abre la misma URL en otra ventana o navegador (incluso en otro dispositivo en la misma red)
3. Dibuja en una ventana y verás que aparece en todas las demás
4. Presiona "Borrar Tablero" y se limpiará para todos

## Estructura del Proyecto

```
Laboratorio5/
├── backend/
│   ├── src/main/java/com/drawing/board/
│   │   ├── DrawingBoardApplication.java  # Clase principal
│   │   ├── DrawPoint.java                # Modelo de datos
│   │   ├── DrawingController.java        # Controlador WebSocket
│   │   ├── WebSocketConfig.java          # Configuración WebSocket
│   │   └── CorsConfig.java               # Configuración CORS
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── App.jsx                       # Componente principal
    │   └── main.jsx                      # Punto de entrada
    ├── package.json
    └── vite.config.js
```

## Notas Técnicas

- El backend usa WebSocket con protocolo STOMP para comunicación bidireccional
- Cada cliente recibe un color aleatorio al conectarse
- Los mensajes se transmiten a través del topic `/topic/drawing`
- El canvas es de 700x500 píxeles
- CORS está habilitado para permitir conexiones desde cualquier origen en desarrollo

## Solución de Problemas

### El frontend no se conecta al backend
- Verifica que el backend esté corriendo en el puerto 8080
- Revisa la consola del navegador para errores de conexión

### Maven no encuentra las dependencias
```bash
mvn clean install -U
```

### Puerto ya en uso
- Backend: Cambia el puerto en `application.properties`
- Frontend: Cambia el puerto en `vite.config.js`

## Compilar para Producción

### Backend
```bash
cd backend
mvn clean package
# El JAR estará en target/board-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Los archivos estáticos estarán en dist/
```
