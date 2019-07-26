import * as React from 'react';
import Input from 'material-ui/Input';
import InputAdornment from 'material-ui/Input/InputAdornment';

import './SearchBox.css';

interface SearchBoxProps {
  placeholder: string;
  value?: string;
  onSearch?: (string) => void;
}

interface SearchBoxState {
  value: string;
}

export default class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
  timeout = null;

  constructor(props) {
    super(props);
    this.state = { value: props.value || '' };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { value } = this.state;
    const { placeholder } = this.props;

    return (
      <div className="search-box-wrapper">
        <Input
          fullWidth
          placeholder={placeholder}
          value={value}
          onChange={this.handleChange}
          type="text"
          className="search-box"
          inputProps={{ 'aria-label': 'Description' }}
          endAdornment={
            value && (
              <InputAdornment position="end">
                <span className="search-box-clear" onClick={this.handleClear}>
                  ×
                </span>
              </InputAdornment>
            )
          }
        />
      </div>
    );
  }

  handleChange = event => {
    const { value } = event.target;

    this.setState({ value });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.onSearch(value);
    }, 200);
  };

  handleClear = () => {
    this.setState({ value: '' });
    clearTimeout(this.timeout);
    this.props.onSearch('');
  };
}
