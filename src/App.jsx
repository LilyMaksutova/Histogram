import './App.css'
import { useEffect, useState } from "react";
import Container from './component/Container';
import Histogram from './component/Histogram';

function App() {
  const [userPostsData, setUserPostsData] = useState({});
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => data.reduce((acc, elem) => {

        // return acc[elem.userId] 
        // ? {...acc, [elem.userId] : acc[elem.userId]+1} 
        // : {...acc, [elem.userId] : 1};
        const prop = elem.userId; // здесь лежит номер, поэтому мы не можем использовать оператор . 
        if (acc[prop]) {
          acc[prop] += 1;
        } 
        else {
          acc[prop] = 1;
        }
        return acc;
      }, {}))
      .then((userPostsCount) => {
        console.log('userPosts', userPostsCount)
        return fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then(userData => userData.reduce((acc, value) =>  {
          return {...acc, [value.name]: userPostsCount[value.id]};
  
      }, {}))
      .then(data => setUserPostsData(data))
  })   
}, []);
  return (
    <>
      <Container data={userPostsData} />
      <Histogram data={Object.entries(userPostsData)}/>
      
    </>
  )
}

export default App
