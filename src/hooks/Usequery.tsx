import axios from 'axios';
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';

interface Superhero {
    id: number;
    name: string;
    alterEgo: string;
}
const Data = async (url: string): Promise<Superhero[]> => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    const response = await axios.get(url);
    return response.data;
};
const addSuperhero=((url: string,hero:Superhero)=>{
   return axios.post(url,hero);
})


const useGeneral = (key:string,url: string) => {
    return useQuery<Superhero[], Error>([key], ()=> Data(url), {
        enabled:false,
        onSuccess: () => {
            alert('Data fetched successfully');
        },
        onError: (error) => {
            alert(`Error in network: ${error.message}`);
        }, 
    });
};
export const useAddSuperHero=(url:string)=>{
    const queryClient=useQueryClient();
    return useMutation((hero: Superhero) => addSuperhero(url, hero),{
        onSuccess:()=>{
            queryClient.invalidateQueries(['super-hero']);
        }
    });
}

export default useGeneral;
