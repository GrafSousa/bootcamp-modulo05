import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueStateFilter = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
  button {
    font-size: 14px;
    border-radius: 4px;
    padding: 8px;
    border: 0;
    margin: 0 0.25rem;

    &:nth-child(${props => props.active + 1}) {
      background: #576574;
      color: white;
    }
  }
`;

export const Footer = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12;

  button {
    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
    color: #222;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const IssueList = styled.ul`
  padding-top: 15px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;
        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;
