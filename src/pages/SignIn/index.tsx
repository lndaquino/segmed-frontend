/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import api from '../../services/api';
import {
  Container,
  Content,
  Title,
  Main,
  Image,
  ImageCard,
  ContainerBackground,
  WarningTitle,
} from './styles';

interface File {
  id: string;
  url: string;
  status: boolean;
  updated_at: Date;
}

const SignIn: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [apiRunning, setApiRunning] = useState(false);
  useEffect(() => {
    async function loadFiles(): Promise<void> {
      try {
        const getFiles = await api.get('/');
        setFiles(getFiles.data);
        setApiRunning(true);
      } catch (err) {
        console.log(err);
      }
    }
    loadFiles();
  }, []);

  const toogleTag = useCallback(
    async (id: string, oldStatus: boolean): Promise<void> => {
      const updatedFiles = files.map(file => {
        if (file.id !== id) {
          return file;
        }
        const updatedfile = {
          ...file,
          status: !oldStatus,
        } as File;
        return updatedfile;
      });

      try {
        await api.patch(`/${id}/?status=${!oldStatus}`);
        setFiles(updatedFiles);
      } catch (err) {
        console.log(err);
      }
    },
    [files],
  );

  return (
    <>
      {apiRunning ? (
        <Container>
          <Content>
            <Title>
              <h1>Segmed Image Gallery</h1>
            </Title>
            <Main>
              {files.map(file => (
                <ImageCard key={file.id}>
                  {file.status ? (
                    <AiFillStar style={{ color: 'orange', fontSize: '2em' }} />
                  ) : (
                    <AiOutlineStar
                      style={{ color: 'orange', fontSize: '2em' }}
                    />
                  )}

                  <Image
                    alt="galery"
                    src={file.url}
                    title={file.status ? 'Click to untag' : 'Click to tag'}
                    onClick={() => toogleTag(file.id, file.status)}
                  />
                  <h1>Metadata</h1>
                </ImageCard>
              ))}
            </Main>
          </Content>
        </Container>
      ) : (
        <ContainerBackground>
          <Content>
            <Title>
              <h1>Segmed Image Gallery</h1>
            </Title>

            <WarningTitle>
              <h1>Api not running. Start api backend and reload page</h1>
            </WarningTitle>
          </Content>
        </ContainerBackground>
      )}
    </>
  );
};

export default SignIn;
