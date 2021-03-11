import styled from 'styled-components';

import signUpBackgroundImg from '../../assets/background.jpg';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  background: url(${signUpBackgroundImg}) repeat center;
  background-size: auto;
  padding: 0 20px;
`;

export const ContainerBackground = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
  background: url(${signUpBackgroundImg}) repeat center;
  padding: 0 20px;
`;

export const Content = styled.div`
  display: block;
  margin: 10px auto 0;
  width: 100%;
  max-width: 1400px;
`;

export const Title = styled.div`
  width: 100%;
  background: rgb(256, 256, 256, 0.8);
  border-radius: 1em;
  padding: 5px 0;
  text-align: center;

  h1 {
    font-size: 2em;
    font-weight: bold;
  }
`;

export const WarningTitle = styled.div`
  width: 100%;
  background: rgb(256, 256, 256, 0.8);
  padding: 50px 0;
  margin-top: 100px;
  border-radius: 1em;
  padding: 5px 0;
  text-align: center;

  h1 {
    padding: 50px 0;
    font-size: 2em;
    font-weight: bold;
  }
`;

export const Main = styled.div`
  background: rgb(256, 256, 256, 0.8);
  border-radius: 1em;
  margin-top: 25px;
  padding: 20px;
  column-count: 4;

  @media (max-width: 1430px) {
    column-count: 3;
  }

  @media (max-width: 1000px) {
    column-count: 2;
  }

  @media (max-width: 600px) {
    column-count: 1;
  }
`;

export const ImageCard = styled.div`
  width: 100%;
  position: relative;

  svg {
    position: absolute;
    padding: 5px;
    margin: 8px;
    opacity: 1;
    z-index: 1;
    background: #5c5c5c;
    background: rgb(92, 92, 92, 0.5);
    border-radius: 5px;
  }

  h2 {
    position: absolute;
    padding: 5px;
    margin: -55px 5px;
    font-size: 18px;
    background: #5c5c5c;
    color: #ffffff;
    border-radius: 5px;
    opacity: 0;
    z-index: 1;
    transition: 0.25 ease-in-out;
  }

  :hover {
    h2 {
      opacity: 0.5;
    }

    svg {
      transform: scale(1.5);
      transition: 0.5s ease-in-out;
    }
  }

  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;

export const Image = styled.img`
  display: inline-block;
  margin-bottom: 10px;
  overflow: hidden;
  width: 100%;
  transition: 0.25s ease-in-out;

  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;
