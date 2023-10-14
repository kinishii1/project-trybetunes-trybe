import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';

function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsDisabled(event.target.value.length < 3);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const creatingUser = await createUser({ name });

    if (creatingUser) {
      setIsLoading(false);
      navigate('/search');
    }
  };

  if (isLoading) return <p>Carregando...</p>;

  return (
    <form onSubmit={ submitHandler }>
      <input
        data-testid="login-name-input"
        value={ name }
        type="text"
        onChange={ (e) => changeHandler(e) }
      />
      <button
        disabled={ isDisabled }
        data-testid="login-submit-button"
        type="submit"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
