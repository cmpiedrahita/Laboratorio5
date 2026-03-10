// Configuración de entorno
const config = {
  development: {
    wsUrl: 'http://localhost:8080/ws'
  },
  production: {
    wsUrl: 'http://YOUR_EC2_IP:8080/ws' // Cambiar por tu IP de EC2
  }
};

const env = import.meta.env.MODE || 'development';
export default config[env];
