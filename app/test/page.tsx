'use client'
import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const App = () => {
    const [client, setClient] = useState<any>(null);


    useEffect(() => {
        const client = mqtt.connect('mqtt://test.mosquitto.org:8081', {
            username: '',
            password: '',
            clientId: 'nextjs',
            reconnectPeriod: 2000,
        });

        client.on('connect', () => {
            console.log('Connected to MQTT broker');
            client.subscribe('nguyet_doan');
            client.subscribe('nguyet_doan_send');
            client.subscribe('nguyet_doan_money');
        });

        client.on('message', (topic, message) => {
            console.log(`Received message from topic ${topic}: ${message.toString()}`);

        });

        setClient(client);

        return () => {
            client.end();
        };
    }, []);

    const handleMoneyData = (data: any) => {
        console.log(`Handling money data: ${data}`);
    };

    const sendMessage = () => {
        if (client) {
            client.publish('nguyet_doan', 'RELAY3OFF');
        }
    };

    return (
        <div>
            <h1>React App with MQTT</h1>
            <button onClick={sendMessage}>Send MQTT Message</button>
        </div>
    );
};

export default App;
