

function Container({data}) {
  
return (
  <table>
    <thead>
    <tr>
      <th>Имя пользователя</th>
      <th>Количество постов</th>
    </tr>
    </thead>
    <tbody>
    {
      Object.entries(data).map(([key, value])=> 
      <tr key={key+value}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
      )
    }
    </tbody>
  </table>
)
}

export default Container;