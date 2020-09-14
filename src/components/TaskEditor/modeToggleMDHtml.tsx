import React, {useState ,useEffect} from 'react';
import { PluginProps } from 'react-markdown-editor-lite';
import {EyeFilled,EyeInvisibleFilled} from '@ant-design/icons';

interface ModeToggleState {
  view: {
    html: boolean;
    md: boolean;
  };
}

enum NEXT_ACTION {
  SHOW_ALL,
  SHOW_MD,
}

 const ModeToggleMDHtml =(props: PluginProps) =>{
 
  const isDisplay = () =>{
    if (props.editorConfig.canView) {
      return props.editorConfig.canView.html && props.editorConfig.canView.md;
    }
    return false;
  }

  const next = (): NEXT_ACTION  => {
    const { view } = state;
    if (view.html && view.md) {
      return NEXT_ACTION.SHOW_MD;
    } else {
      return NEXT_ACTION.SHOW_ALL;
    }
  }

  const [state,setState] = useState<ModeToggleState>({view: props.editor.getView()});

  const handleClick = () => {
     switch (next()) {
      case NEXT_ACTION.SHOW_ALL:
        props.editor.setView({
          html: true,
          md: true,
        });
        break;
      case NEXT_ACTION.SHOW_MD:
        props.editor.setView({
          html: false,
          md: true,
        });
        break;
    }
  }

 const handleChange = (view: { html: boolean; md: boolean }) => {
    setState({ view });
  }

  useEffect(()=>{
    props.editor.on('viewchange', handleChange);
    return  function cleanup() {
      props.editor.off('viewchange', handleChange);
    }
  });

  const  getDisplayInfo = ()=> {
    switch (next()) {
      case NEXT_ACTION.SHOW_ALL:
        return {
          icon: <EyeFilled/>,
          title: 'Preview changes',
        };
      default:
        return {
          icon: <EyeInvisibleFilled/>,
          title: 'Only Editor',
        };
    }
  }

      const display = getDisplayInfo();

      return (
          <div>
            { isDisplay()
                ? 
                    <span
                      className="button button-type-mode"
                      title={display.title}
                      onClick={handleClick}
                    >
                      {display.icon}
                    </span>
                
                : null
            }
          </div>
      );
    }
    
    ModeToggleMDHtml.align = 'right';
    ModeToggleMDHtml.pluginName = 'ModeToggleMDHtml'

export default ModeToggleMDHtml;