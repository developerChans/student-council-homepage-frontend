import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'atoms/UserInfo';
import { PagingProps } from '../PageControl';
import { RuleProps } from '../RuleProps';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoardsContainer = styled.div`
  width: 100%;
`;

const BoardHead = styled.div`
  width: 100%;
  height: 70px;
  border-collapse: collapse;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  border-bottom: 2.5px solid ${({ theme }) => theme.colors.gray100};
  :nth-child(1) {
    height: 30px;
  }
`;

const Row = styled.div`
  width: 100%;
  height: 70px;
  display: grid;
  grid-template-columns: 1fr 3fr 1.3fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;
  div {
    display: flex;
    place-content: center;
    place-items: center;
  }
  :nth-child(1) {
    border-bottom: none;
  }
`;

const Title = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.gray100};
  height: 30px;
  :last-child {
    border-right: none;
  }
`;

const Content = styled.div`
  :nth-child(2) {
    width: 100%;
    margin: 30px auto;
    display: block;
    a {
      display: block;
    }
  }
  :last-child {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const Button = styled.button`
  all: unset;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 65px;
  height: 30px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  float: right;
  margin-top: 12px;
`;

interface BoardProps {
  posts: RuleProps[];
  pagingInfo: PagingProps;
  currentPage: number;
}

function RulesBoard({
  posts,
  pagingInfo,
  currentPage,
}: BoardProps): JSX.Element {
  const [board, setBoard] = useState<RuleProps[]>([]);
  const { admin } = useRecoilValue(userInfo);

  useEffect(() => {
    setBoard(posts);
  }, [posts]);

  return (
    <Container>
      <Wrapper>
        <BoardsContainer>
          <BoardHead>
            <Row>
              <Title>번호</Title>
              <Title>제목</Title>
              <Title>부서명</Title>
            </Row>
          </BoardHead>
          {board.map((post, index) => (
            <Row key={post.id}>
              <Content>
                {index + 1 + pagingInfo.page * pagingInfo.size}
              </Content>
              <Content>
                <Link to={`/rule?id=${post.id}`}>{post.title}</Link>
              </Content>
              <Content>{post.userName}</Content>
            </Row>
          ))}
          {admin && (
            <Link to="/rule/editor">
              <Button type="button">작성</Button>
            </Link>
          )}
        </BoardsContainer>
      </Wrapper>
    </Container>
  );
}

export default RulesBoard;
