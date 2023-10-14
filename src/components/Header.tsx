import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';

function Header() {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const response = await getUser();
      setUser(response);
      console.log(user);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) return <p>Carregando...</p>;

  return (
    <header data-testid="header-component">
      {user && <h1 data-testid="header-user-name">{user.name}</h1> }
      <nav>
        <NavLink data-testid="link-to-search" to="/search">
          Search
        </NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">
          Favorites
        </NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">
          Profile
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
