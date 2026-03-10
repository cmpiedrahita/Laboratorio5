import { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import config from './config';

function App() {
  const [connected, setConnected] = useState(false);
  const stompClientRef = useRef(null);
  const myColorRef = useRef(null);
  const p5InstanceRef = useRef(null);

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  useEffect(() => {
    myColorRef.current = colors[Math.floor(Math.random() * colors.length)];

    const sketch = function (p) {
      p.setup = function () {
        p.createCanvas(700, 500);
        p.background(255);
      };

      p.draw = function () {
        if (p.mouseIsPressed && p.mouseX > 0 && p.mouseX < 700 && p.mouseY > 0 && p.mouseY < 500) {
          p.fill(myColorRef.current);
          p.noStroke();
          p.ellipse(p.mouseX, p.mouseY, 20, 20);
          
          if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.publish({
              destination: '/app/draw',
              body: JSON.stringify({
                x: p.mouseX,
                y: p.mouseY,
                color: myColorRef.current,
                action: 'draw'
              })
            });
          }
        }
      };
    };

    p5InstanceRef.current = new p5(sketch, 'container');

    const client = new Client({
      webSocketFactory: () => new SockJS(config.wsUrl),
      onConnect: () => {
        setConnected(true);
        client.subscribe('/topic/drawing', (message) => {
          const point = JSON.parse(message.body);
          if (point.action === 'clear') {
            p5InstanceRef.current.background(255);
          } else {
            p5InstanceRef.current.fill(point.color);
            p5InstanceRef.current.noStroke();
            p5InstanceRef.current.ellipse(point.x, point.y, 20, 20);
          }
        });
      },
      onStompError: (frame) => {
        console.error('Error STOMP:', frame);
      }
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
      p5InstanceRef.current.remove();
    };
  }, []);

  const clearBoard = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: '/app/clear',
        body: '{}'
      });
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Tablero Colaborativo</h1>
      <div style={{ marginBottom: '10px' }}>
        <span>Estado: {connected ? '🟢 Conectado' : '🔴 Desconectado'}</span>
        <span style={{ marginLeft: '20px' }}>Tu color: 
          <span style={{ 
            display: 'inline-block', 
            width: '20px', 
            height: '20px', 
            backgroundColor: myColorRef.current,
            marginLeft: '5px',
            verticalAlign: 'middle',
            border: '1px solid black'
          }}></span>
        </span>
      </div>
      <button 
        onClick={clearBoard} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '10px',
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Borrar Tablero
      </button>
      <div id="container" style={{ display: 'inline-block', border: '2px solid black' }}></div>
    </div>
  );
}

export default App;
