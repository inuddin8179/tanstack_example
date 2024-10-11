import Navbar from '@/components/Navbar';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Superhero {
  id: number;
  name: string;
  alterEgo: string;
}

interface Friends {
  id: number;
  name: string;
}

const fetchSuperHeroes = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    const response = await axios.get<Superhero[]>('http://localhost:4000/superheroes');
    return response.data;
};
const fetchFriends = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000)); 
    const response = await axios.get<Superhero[]>('http://localhost:4000/friends');
    return response.data;
};

const ParallelQuery = () => {
  const { data: superheroes, isLoading: loadingSuperheroes, error: errorSuperheroes } = useQuery<Superhero[], Error>(['superheroes'], fetchSuperHeroes);
  const { data: friends, isLoading: loadingFriends, error: errorFriends } = useQuery<Friends[], Error>(['friends'], fetchFriends);
  
  return (
    <div>
      <Navbar />
      <h1>Parallel Query Fetching</h1>
      
     
      {loadingSuperheroes && <p>Loading superheroes...</p>}
      {errorSuperheroes && <p>Error fetching superheroes: {errorSuperheroes.message}</p>}
      <ul>
        {superheroes?.map(({ id, name }) => (
          <li key={id}>
            <strong>{name}</strong> 
          </li>
        ))}
      </ul>

      <br />

     
      {loadingFriends && <p>Loading friends...</p>}
      {errorFriends && <p>Error fetching friends: {errorFriends.message}</p>}
      <ul>
        {friends?.map(({ id, name }) => (
          <li key={id}>
            <strong>{name}</strong> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParallelQuery;

