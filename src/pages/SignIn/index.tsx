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

interface Metadata {
  originalWidth: number;
  originalHeight: number;
  msg: string;
}
interface File {
  id: string;
  url: string;
  status: boolean;
  updated_at: Date;
  metadata: Metadata;
}

const SignIn: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [apiRunning, setApiRunning] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadFiles(): Promise<void> {
      try {
        const getFiles = await api.get('/');
        setFiles(getFiles.data);
        setApiRunning(true);
        setLoading(false);
      } catch (err) {
        setApiRunning(false);
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

  const getMetadata = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>, currentFile: File) => {
      const updatedFiles = files.map(file => {
        if (file.id !== currentFile.id) {
          return file;
        }
        const metadata = {
          originalWidth: e.currentTarget.naturalWidth,
          originalHeight: e.currentTarget.naturalHeight,
          msg: `${e.currentTarget.naturalWidth}px X ${e.currentTarget.naturalHeight}px`,
        } as Metadata;
        const updatedFile = {
          ...file,
          metadata,
        } as File;
        return updatedFile;
      });
      setFiles(updatedFiles);
    },
    [files],
  );

  return (
    <>
      {apiRunning ? (
        <>
          {loading ? (
            <ContainerBackground>
              <Content>
                <Title>
                  <h1>Segmed Image Gallery</h1>
                </Title>
                <WarningTitle>
                  <h1>Loading images and metadata...</h1>
                </WarningTitle>
              </Content>
            </ContainerBackground>
          ) : (
            <Container>
              <Content>
                <Title>
                  <h1>Segmed Image Gallery</h1>
                </Title>
                <Main>
                  {files.map(file => (
                    <ImageCard key={file.id}>
                      {file.status ? (
                        <AiFillStar
                          style={{ color: 'orange', fontSize: '2em' }}
                        />
                      ) : (
                        <AiOutlineStar
                          style={{ color: 'orange', fontSize: '2em' }}
                        />
                      )}

                      <Image
                        alt="galery"
                        src={file.url}
                        title={file.status ? 'Click to untag' : 'Click to tag'}
                        onLoad={e => getMetadata(e, file)}
                        onClick={() => toogleTag(file.id, file.status)}
                      />
                      <h2>
                        Original size:{' '}
                        {file.metadata ? file.metadata.msg : 'loading...'}
                      </h2>
                    </ImageCard>
                  ))}
                </Main>
              </Content>
            </Container>
          )}
        </>
      ) : (
        <ContainerBackground>
          <Content>
            <Title>
              <h1>Segmed Image Gallery</h1>
            </Title>

            <WarningTitle>
              <h1 style={{ color: 'red' }}>
                Api not running. Start api backend and reload page
              </h1>
            </WarningTitle>
          </Content>
        </ContainerBackground>
      )}
    </>
  );
};

export default SignIn;
