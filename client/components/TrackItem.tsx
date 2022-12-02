import React from "react";
import { ITrack } from "../types/track";
import { Card, Grid, IconButton } from "@material-ui/core";
import styles from "../styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface TrackItemProps {
  track: ITrack;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    pauseTrack();
    playTrack();
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton onClick={play}>
        <PlayArrow />
      </IconButton>
      <img
        width={70}
        height={70}
        src={"http://localhost:5000/" + track.picture}
      />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
    </Card>
  );
};

export default TrackItem;
