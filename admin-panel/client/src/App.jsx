import React, { useState, useEffect } from 'react';

export default function App() {
    const [channels, setChannels] = useState([]);
    const [form, setForm] = useState({ name: '', url: '' });

    const fetchChannels = async () => {
        const res = await fetch('/api/channels');
        setChannels(await res.json());
    };

    const addChannel = async (e) => {
        e.preventDefault();
        await fetch('/api/channels', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        fetchChannels();
    };

    useEffect(() => { fetchChannels(); }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>إدارة القنوات</h1>
            
            <form onSubmit={addChannel} style={{ marginBottom: '20px' }}>
                <input
                    placeholder="اسم القناة"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value}) 
                    style={{ marginRight: '10px', padding: '8px' }}
                />
                
                <input
                    placeholder="رابط البث الأصلي"
                    value={form.url}
                    onChange={e => setForm({...form, url: e.target.value}) 
                    style={{ marginRight: '10px', padding: '8px', width: '300px' }}
                />
                
                <button 
                    type="submit"
                    style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
                >
                    إضافة
                </button>
            </form>

            <div>
                {channels.map((channel, index) => (
                    <div key={index} style={{ 
                        padding: '10px', 
                        marginBottom: '10px', 
                        border: '1px solid #ddd',
                        borderRadius: '5px'
                    }}>
                        <h3>{channel.name}</h3>
                        <a
                            href={`/hls/${new URL(channel.url).hostname}${new URL(channel.url).pathname}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#2196F3' }}
                        >
                            رابط البروكسي
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
