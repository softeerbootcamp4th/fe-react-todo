import styled from '@emotion/styled';

export const LogBox = styled.div<{ isLogShow: boolean }>`
  position: relative;
  width: 25%;
  min-width: 350px;
  max-width: 700px;
  min-height: 600px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  box-shadow: 0 0 20px 10px gainsboro;
  left: ${({ isLogShow }) => (isLogShow ? '-30px' : '-20%')};
  opacity: ${({ isLogShow }) => (isLogShow ? '1' : '0.4')};
  padding: 60px 40px;
  padding-left: 70px;

  transition: all 0.8s ease-in-out;

  .title {
    font-size: 2.4rem;
    font-weight: 900;
    text-align: center;
  }
`;
