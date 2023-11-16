import { useState, useEffect } from 'react';
import { database } from '../config/configGoogle';
import { ref, onValue } from 'firebase/database';
import Cards from './Cards';

function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dbref = ref(database, 'users');
    const unsubscribe = onValue(dbref, (snapshot) => {
      const updatedData = snapshot.val();
      setData(updatedData);
    });

    // Cleanup function to unsubscribe from the real-time updates
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
    {!data && <><h1 style={{ color: "#00043B", textAlign: "center" }}>welcome admin</h1>
    <h3>No new requests</h3></>}
      {data && <h1 style={{ color: "#00043B", textAlign: "center" }}>welcome admin</h1>}
      <div className='card-container'>
        {data && Object.entries(data).map(([key, value]) => (
          <Cards key={key} {...value} />
        ))}
      </div>
    </>
  );
}

export default AdminDashboard;
