import React, { FC } from "react";
import MyPlayer from "react-player";

type Props = {
    videoUrl?: string;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    width?: number | string;
    height?: number | string;
};

const Player: FC<Props> = ({
    videoUrl,
    autoplay,
    controls,
    height,
    loop,
    muted,
    width,
}) => {
    return (
        <MyPlayer
            url={videoUrl}
            playing={autoplay}
            controls={controls}
            loop={loop}
            muted={muted}
            width={width || "100%"}
            height={height || "100%"}
        />
    );
};

export default Player;
