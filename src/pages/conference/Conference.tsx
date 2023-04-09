import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { ConferenceProps } from 'pages/conference/components/ConferenceProps';
import { useSearchParams } from 'react-router-dom';
import PageControl from 'pages/conference/components/PageControl';
import ConferenceBoard from 'pages/conference/components/ConferenceBoard';
import qs from 'qs';
import { PagingProps } from 'components/PageControl';

const Container = styled.div`
  padding-top: 4%;
  background-color: ${(props) => props.theme.colors.white};
`;


function Conference(): JSX.Element {
  const [board, setBoard] = useState<ConferenceProps[]>([]);
  const [boardsCount, setBoardsCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [pagingInfo, setPagingInfo] = useState<PagingProps>({
    first: true,
    hasNext: false,
    last: true,
    page: 1,
    size: 6,
    totalElements: 0,
    totalPages: 1,    
  });
  
  const getPosts = async () => {
    let { page } = qs.parse(searchParams.toString());
    if (!page) page = '1';
    const { data } = await axios({
      method: 'get',
      url: `/post/conference?sort=date&page=${Number(page) - 1}&size=6`,
    });
    console.log(data);
    setBoardsCount(data.totalElements - 12);
    setBoard([...data.content]);
    setPagingInfo(data);
  };

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
    console.log(Number(searchParams.get('page')) || 1);
    getPosts();
  }, [searchParams, boardsCount]);


  // useEffect(() => {
  //   axios
  //     .get('/post/conference')
  //     .then(function (response) {
  //       const result = response.data;
  //       setBoard(result.content.slice((page - 1) * 6, page * 6));
  //       setBoardsCount(result.totalElements);
  //     })
  //     .catch(function (error) {
  //       // 에러 핸들링
  //       console.log(error);
  //     });
  // }, [page]);

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  return (
    <Container>
      <ConferenceBoard
        posts={board}
        totalBoards={boardsCount}
        currentPage={page}
      />
      <PageControl postCount={boardsCount} currentPage={page} />
    </Container>
  );
}

export default Conference;
