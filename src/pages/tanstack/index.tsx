
import Navbar from '../../components/Navbar';
import useGeneral from '@/hooks/Usequery';

const Tanstack = () => {
    const { data, error, isLoading, isFetching, refetch } = useGeneral('super-hero','http://localhost:4000/superheroes')
    const handleFetchData = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); 
        await refetch();
    };

    return (
        <div>
            <Navbar />
            <h1>TanStack Query Fetching</h1>
            {(isLoading || isFetching) && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <button onClick={handleFetchData}>fetch data</button>
            <ul>
                {data?.map(hero => (
                    <li key={hero.id}>
                        <strong>{hero.name}</strong> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tanstack;

