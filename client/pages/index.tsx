import React from "react";
import MainLayout from "../layouts/MainLayout";
import TrackList from "../components/TrackList";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "../store";
import { fetchTracks } from "../store/actions-creators/track";

const Index = () => {
  const { tracks } = useTypedSelector((state) => state.track);
  const mostPopularTracks = tracks
    .filter((track) => track.comments.length)
    .sort((a, b) => {
      return b.listens + b.comments.length - (a.listens + a.comments.length);
    });

  return (
    <>
      <MainLayout>
        <div className="center">
          <h1>Ласкаво просимо</h1>
          <h3>Тут зібрано найкращі пісні!</h3>
        </div>
        <TrackList tracks={mostPopularTracks} />
      </MainLayout>

      <style jsx>
        {`
                    .center {
                        margin-top: 150px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                `}
      </style>
    </>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
  }
);
