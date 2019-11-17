import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

import api from '../../services/api';

import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';

function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    const localStorageRepositories = localStorage.getItem('repositories');

    if (localStorageRepositories) {
      setRepositories(JSON.parse(localStorageRepositories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setError(false);
  }

  function existRepositoryByName() {
    const existRepository = repositories.find(
      repository => repository.name.toLowerCase() === newRepo.toLowerCase()
    );

    if (existRepository) {
      setLoading(false);
      throw new Error('Repositório já cadastrado');
    }
  }

  function isEmptyRepositoryInput() {
    if (newRepo === '') {
      throw new Error('Repositório obrigatório');
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      isEmptyRepositoryInput();

      existRepositoryByName();

      setLoading(true);

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      setRepositories([...repositories, data]);
      setNewRepo('');
      setLoading(false);
    } catch (err) {
      setError(true);
      alert.error(err.message);
      setLoading(false);
    }
  }
  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>
      <Form onSubmit={handleSubmit} error={error}>
        <input
          type="text"
          placeholder="Adiciona repositório"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

export { Main };
