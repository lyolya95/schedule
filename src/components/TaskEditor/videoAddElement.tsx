import React, {useState ,useEffect} from 'react';

//import { KeyboardEventListener } from 'src/share/var';
import { PluginProps, PluginComponent } from 'react-markdown-editor-lite';
import { PlayCircleOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player'

const VideoAddElement = (props:PluginProps) => {
  
//  const handleKeyboard: KeyboardEventListener;

 /* constructor(props: any) {
    super(props);

    this.handleKeyboard = {
      key: 'k',
      keyCode: 75,
      withKey: ['ctrlKey'],
      callback: () => this.editor.insertMarkdown('link'),
    };
  }

  componentDidMount() {
    if (this.editorConfig.shortcuts) {
      this.editor.onKeyboard(this.handleKeyboard);
    }
  }

  componentWillUnmount() {
    this.editor.offKeyboard(this.handleKeyboard);
  }*/

  const handleClick = () => {
    props.editor.insertMarkdown('link')
  }

  return (
    <span
      className="button button-type-link"
      title="Add video"
      onClick={handleClick}
    >
      <PlayCircleOutlined />
    </span>
  );
  
}

VideoAddElement.align = 'left';
VideoAddElement.pluginName = 'VideoAddElement'

export default VideoAddElement;
