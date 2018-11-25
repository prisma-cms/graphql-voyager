import * as React from 'react';
import { render } from 'react-dom';
import Modal from 'material-ui/Modal';
import { MuiThemeProvider } from 'material-ui/styles';

import { theme } from '../src/components/MUITheme';
import { GraphQLVoyager } from '../src';
import { Panel } from './components';

import { PRESETS } from './presets';
import { IntrospectionModal } from './IntrospectionModal';

export default class Demo extends React.Component {
  presetNames = Object.keys(PRESETS);

  state = {
    activePreset: this.presetNames[0],
    customPresetModalOpen: false,
    customPresetValue: null,
  };

  handlePresetChange = (activePreset: string) => {
    if (activePreset !== 'custom') {
      this.setState({ activePreset });
    } else {
      this.setState({ customPresetModalOpen: true });
    }
  };

  handleCustomPreset = (introspection: any) => {
    this.setState({
      activePreset: 'custom',
      customPresetValue: introspection,
      customPresetModalOpen: false,
    });
  };

  handlePanelClose = () => {
    this.setState({ customPresetModalOpen: false });
  };

  public render() {
    const { activePreset, customPresetModalOpen, customPresetValue } = this.state;
    const introspection = activePreset === 'custom'
      ? customPresetValue
      : PRESETS[activePreset];

    return (
      <MuiThemeProvider theme={theme}>
        <GraphQLVoyager introspection={introspection}>
          <GraphQLVoyager.PanelHeader>
            <Panel
              presets={this.presetNames}
              activePreset={activePreset}
              onChange={this.handlePresetChange}
            />
          </GraphQLVoyager.PanelHeader>
        </GraphQLVoyager>
        <Modal open={customPresetModalOpen} onClose={this.handlePanelClose}>
          <IntrospectionModal onClose={this.handlePanelClose} onChange={this.handleCustomPreset} />
        </Modal>
      </MuiThemeProvider>
    );
  }
}

render(<Demo />, document.getElementById('panel_root'));
