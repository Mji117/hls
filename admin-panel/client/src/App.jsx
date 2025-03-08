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
        <div className="container">
            <h1>لوحة تحكم البث</h1>
            
            <form onSubmit={addChannel}>
                <input
                    placeholder="اسم القناة"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                />
                
                <input
                    placeholder="رابط HLS الأصلي"
                    value={form.url}
                    onChange={e => setForm({...form, url: e.target.value})}
                />
                
                <button type="submit">إضافة قناة</button>
            </form>

            <div className="channels-list">
                {channels.map((channel, index) => (
                    <div key={index} className="channel-item">
                        <h3>{channel.name}</h3>
                        <a
                            href={`/hls/${new URL(channel.url).hostname}${new URL(channel.url).pathname}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            رابط البث عبر البروكسي
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
