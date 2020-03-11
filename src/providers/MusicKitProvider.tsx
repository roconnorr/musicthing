/**From https://github.com/Musish/Musish */
import React, { ReactNode } from 'react';
import { Spinner } from '@chakra-ui/core';

interface MusicKitProviderProps {
  children: ReactNode;
}

interface MusicKitProviderState {
  ready: boolean;
}

export default class MusicKitProvider extends React.Component<
  MusicKitProviderProps,
  MusicKitProviderState
> {
  constructor(props: MusicKitProviderProps) {
    super(props);

    this.state = {
      ready: false
    };
  }

  public componentDidMount() {
    // MusicKit.configure({
    //   developerToken: process.env.APPLE_TOKEN,
    //   app: {
    //     name: "Musish",
    //     icon:
    //       "https://raw.githubusercontent.com/Musish/Musish/assets/misc/authIcon.png",
    //     build: "1.0beta1",
    //     version: "1.0beta1"
    //   },
    //   bitrate: MusicKit.PlaybackBitrate.HIGH
    // });

    this.setState({
      ready: true
    });
  }

  render() {
    if (!this.state.ready) {
      return <Spinner />;
    }

    return this.props.children;
  }
}
