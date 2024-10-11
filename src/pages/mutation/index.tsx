import Navbar from '@/components/Navbar'
import React from 'react'
import { useState } from 'react'
import useGeneral from '@/hooks/Usequery';
import { useAddSuperHero } from '@/hooks/Usequery';

interface Superhero {
    id: number;
    name: string;
    alterEgo: string;
}


function Mutation() {
    const [name, setName]=useState('');
    const { data, error, isLoading, isFetching, refetch } = useGeneral('super-hero','http://localhost:4000/superheroes')
    const handleFetchData = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); 
        await refetch();
    };
    const {mutate:addHero}= useAddSuperHero('http://localhost:4000/superheroes');
    const handleAddHeroClick=()=>{
        const hero:Superhero={
            name,
            id:Date.now(),
            alterEgo: ''
        }
        addHero(hero)
        setName('');
    }
    
  return (
    <>
      
       <Navbar/>
       <h1>Mutaion example</h1>
      <div>
        <input type="text"
        value={name}
        placeholder='enter data'
        onChange={(e)=>setName(e.target.value)}
         />
       <button onClick={handleAddHeroClick}> click to add</button>
      </div>
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
    </>
  
  )
}

export default Mutation
