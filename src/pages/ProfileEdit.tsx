import { useState, useEffect } from 'react';
import { getUser, updateUser } from '../services/userAPI';
import { UserType } from '../types';

function ProfileEdit() {
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    description: '',
    image: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const returnedUser = await getUser();
      setUser(returnedUser);
    };
    getUserData();
  }, []);

  const validateForm = () => {
    const { name, email, description, image } = user;
    if (name && email && description && image) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else {
      setIsDisabled(true);
    }
  };

  const changeHandler = (e: any) => {
    setUser({ ...user, [e.target.id]: e.target.value });
    validateForm();
  };

  return (
    <form>
      <label htmlFor="name">Nome</label>
      <input
        data-testid="edit-input-name"
        type="text"
        id="name"
        value={ user?.name }
        onChange={ (e) => changeHandler(e) }
      />
      <label htmlFor="email">Email</label>
      <input
        data-testid="edit-input-email"
        type="email"
        id="email"
        value={ user?.email }
        onChange={ (e) => changeHandler(e) }
      />
      <label htmlFor="description">Descrição</label>
      <textarea
        data-testid="edit-input-description"
        id="description"
        value={ user?.description }
        onChange={ (e) => changeHandler(e) }
      />
      <label htmlFor="image">Imagem</label>
      <input
        data-testid="edit-input-image"
        type="text"
        id="image"
        value={ user?.image }
        onChange={ (e) => changeHandler(e) }
      />
      <button
        data-testid="edit-button-save"
        disabled={ isDisabled }
        type="submit"
        onClick={ () => updateUser({
          name: user.name,
          email: user.email,
          description: user.description,
          image: user.image,
        }) }
      >
        Editar perfil
      </button>
    </form>
  );
}

export default ProfileEdit;
