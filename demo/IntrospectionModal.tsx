import * as React from 'react';
import Tabs, {Tab} from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import Modal from 'material-ui/Modal';
import Clipboard from 'react-clipboard.js';

import { buildSchema, introspectionQuery, introspectionFromSchema } from 'graphql/utilities';
import { PRESETS, defaultPresetName } from './presets';
import * as classNames from 'classnames';

import './IntrospectionModal.css';

export interface IntrospectionModalProps {
  open: boolean;
  onClose: () => void;
  onChange: (introspectin: any) => void;
}

const Presets = 'Presets';
const SDL = 'SDL';
const Introspection = 'Introspection';
const tabNames = [Presets, SDL, Introspection];

const initialConfig = {
  inputType: Presets,
  activePreset: defaultPresetName,
  sdlText: null,
  jsonText: null,
};

export class IntrospectionModal extends React.Component<IntrospectionModalProps> {
  state = {
    submitted: initialConfig,
    current: initialConfig,
    recentlyCopied: false,
  };

  modalRef: React.RefObject<HTMLDivElement> = React.createRef();

  changeCurrent(diff) {
    this.setState({
      current: {
        ...this.state.current,
        ...diff,
      },
    });
  }

  handleTabChange = (_, activeTab) => {
    this.changeCurrent({ inputType: tabNames[activeTab] });
  };

  copy() {
    this.setState({ recentlyCopied: true });
    setTimeout(() => {
      this.setState({ recentlyCopied: false });
    }, 2000);
  }

  handleCancel = () => {
    this.setState({ current: { ...this.state.submitted } })
    this.props.onClose();
  };

  handleSubmit = () => {
    const { inputType, activePreset, jsonText, sdlText } = this.state.current;
    switch (inputType) {
      case Presets:
        this.props.onChange(PRESETS[activePreset]);
        break;
      case Introspection:
        this.props.onChange(JSON.parse(jsonText));
        break;
      case SDL:
        const data = introspectionFromSchema(buildSchema(sdlText));
        this.props.onChange({ data });
        break;
    }

    this.setState({ submitted: { ...this.state.current } })
    this.props.onClose();
  };

  handlePresetChange = (activePreset) => {
    this.changeCurrent({ activePreset });
  }

  handleSDLChange = (event) => {
    let sdlText = event.target.value;
    if (sdlText === '') sdlText = null;
    this.changeCurrent({ sdlText });
  }

  handleJSONChange = (event) => {
    let jsonText = event.target.value;
    if (jsonText === '') jsonText = null;
    this.changeCurrent({ jsonText });
  }

  public render() {
    const { open } = this.props;
    const { inputType } = this.state.current;

    return (
      <Modal open={open} onClose={this.handleCancel}>
        <div className="modal-paper" tabIndex={-1} ref={this.modalRef}>
          <Tabs
            value={tabNames.indexOf(inputType)}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleTabChange}
          >
            <Tab label={Presets} />
            <Tab label={SDL} />
            <Tab label={Introspection} />
          </Tabs>
          <div className="tab-container">
            {inputType === Presets && this.renderPresetsTab()}
            {inputType === SDL && this.renderSDLTab()}
            {inputType === Introspection && this.renderIntrospectionTab()}
          </div>

          <div className="model-footer">
            <Button onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button color="primary"  style={{color: 'white'}} onClick={this.handleSubmit}>
              Display
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  renderPresetsTab() {
    const presetNames = Object.keys(PRESETS);
    const { activePreset } = this.state.current;

    return (
      <div className="preset-cards">
        {presetNames.map(name => (
          <div
            key={name}
            className={classNames('preset-card', {
              '-active': name === activePreset,
            })}
            onClick={() => this.handlePresetChange(name)}
          >
            <h2>{name}</h2>
          </div>
        ))}
      </div>
    );
  }

  renderSDLTab() {
    const { sdlText } = this.state.current;
    return (
      <textarea
        value={sdlText || ''}
        placeholder="Paste SDL Here"
        onChange={this.handleSDLChange}
      />
    );
  }

  renderIntrospectionTab() {
    const { recentlyCopied } = this.state;
    const { jsonText } = this.state.current;
    return (
      <>
        <div>
          Run the introspection query against a GraphQL endpoint. Paste the result into the textarea
          below to view the model relationships.
        </div>
        <Clipboard
          component="a"
          className="copy-button"
          options={{ container: this.modalRef.current }}
          data-clipboard-text={introspectionQuery}
          onClick={() => this.copy()}
        >
          <Button color="primary" size="small">
            {recentlyCopied ? 'Copied!' : 'Copy Introspection Query'}
          </Button>
        </Clipboard>
        <textarea
          value={jsonText || ''}
          placeholder="Paste Introspection Here"
          onChange={this.handleJSONChange}
        />
      </>
    );
  }
}
