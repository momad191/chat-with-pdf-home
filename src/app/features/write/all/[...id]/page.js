 

export default async function Page({ params }) {
  const id = (await params).id
  return (
    <div>All messages    {id}</div>
  )
}

 