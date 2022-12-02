import React, { useState } from "react";
import { ITrack } from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "../../hooks/useInput";

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");

  const addComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tracks/comment",
        {
          username: username.value,
          text: text.value,
          trackId: track._id,
        }
      );
      setTrack({ ...track, comments: [...track.comments, response.data] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout
      title={"Музична площадка - " + track.name + " - " + track.artist}
      keywords={"Музика, артисти, " + track.name + ", " + track.artist}
    >
      <Button
        variant={"outlined"}
        style={{ fontSize: 32 }}
        onClick={() => router.push("/tracks")}
      >
        До списку
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <img
          src={"http://localhost:5000/" + track.picture}
          width={200}
          height={200}
        />
        <div style={{ marginLeft: 30 }}>
          <h1>Назва трека - {track.name}</h1>
          <h1>Виконавець - {track.artist}</h1>
          <h1>Прослуховувань - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Слова в треці</h1>
      <p>{track.text}</p>
      <h1>Коментарі</h1>
      <Grid container>
        <TextField label="Ваше ім'я" fullWidth {...username} />
        <TextField label="Коментар" {...text} fullWidth multiline rows={4} />
        <Button onClick={addComment}>Відправити</Button>
      </Grid>
      <Grid>
        {track.comments.map((comment) => (
          <Grid key={comment._id}>
            <div>Автор - {comment.username}</div>
            <div>Коментар - {comment.text}</div>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get("http://localhost:5000/tracks/" + params.id);
  return {
    props: {
      serverTrack: response.data,
    },
  };
};
