
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

interface Superhero {
    id: number;
    name: string;
    alterEgo: string;
}

const Tradition = () => {
    const [data, setData] = useState<Superhero[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
               
                await new Promise((resolve) => setTimeout(resolve, 2000)); 
                const response = await axios.get<Superhero[]>('http://localhost:4000/superheroes');
                setData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <h1>Traditional Data Fetching</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {data.map(hero => (
                    <li key={hero.id}>
                        <strong>{hero.name}</strong> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tradition;
