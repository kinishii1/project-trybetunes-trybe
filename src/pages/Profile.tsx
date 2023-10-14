import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';

function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const returnedUser = await getUser();
      console.log(returnedUser);
      setUser(returnedUser);
      setLoading(false);
    };
    getUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img src={ user?.image } data-testid="profile-image" alt="profile" />
      <Link to="/profile/edit">Editar perfil</Link>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.description}</p>
    </div>
  );
}

export default Profile;
