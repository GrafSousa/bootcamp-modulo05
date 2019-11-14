import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { Loading, Owner, IssueList, IssueStateFilter, Footer } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'Todas', active: true },
      { state: 'open', label: 'Abertas', active: false },
      { state: 'closed', label: 'Fechadas', active: false },
    ],
    activeIndex: 0,
    page: 1,
  };

  async componentDidMount() {
    const url = this.getUrl();
    const { filters } = this.state;
    const [repository, issues] = await Promise.all([
      this.loadRepositories(url),
      api.get(`${url}/issues`, {
        params: {
          state: filters.find(f => f.active).state,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  getUrl = () => {
    const url = '/repos';
    const { match } = this.props;

    const repositoryName = decodeURIComponent(match.params.repository);
    return `${url}/${repositoryName}`;
  };

  loadRepositories = url => {
    return api.get(`${url}`);
  };

  loadIssues = async () => {
    const url = this.getUrl();
    const { filters, activeIndex, page } = this.state;
    const response = await api.get(`${url}/issues`, {
      params: {
        state: filters[activeIndex].state,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handleFilterClick = async activeIndex => {
    await this.setState({ activeIndex });
    this.loadIssues();
  };

  handleFooterClick = async message => {
    const { page } = this.state;

    await this.setState({ page: message === 'back' ? page - 1 : page + 1 });

    this.loadIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      activeIndex,
      page,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <IssueStateFilter active={activeIndex}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.state}
                onClick={() => this.handleFilterClick(index)}
              >
                {filter.label}
              </button>
            ))}
          </IssueStateFilter>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <Footer>
            <button
              type="button"
              onClick={() => this.handleFooterClick('back')}
              disabled={page < 2}
            >
              Anterior
            </button>
            <span>Página {page}</span>
            <button
              type="button"
              onClick={() => this.handleFooterClick('next')}
            >
              Próximo
            </button>
          </Footer>
        </IssueList>
      </Container>
    );
  }
}
