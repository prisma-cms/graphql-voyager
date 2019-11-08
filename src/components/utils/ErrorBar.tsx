import * as React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

// import { clearError } from '../../actions';

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
  };
}

interface ErrorBarProps {
  errorMessage?: string;
  dispatch: any;
}

class ErrorBar extends React.PureComponent<ErrorBarProps> {
  handleClose = () => {
    // this.props.dispatch(clearError());
    console.error("handleClose");
  };
  render() {
    const { errorMessage } = this.props;

    if (!errorMessage) return null;

    return (
      <Snackbar
        className="error-bar"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={errorMessage !== null}
        message={
          <span>
            {errorMessage}
            {errorMessage}
            {errorMessage}
          </span>
        }
        onClose={this.handleClose}
        action={
          <Button color="secondary" size="small" onClick={this.handleClose}>
            Dismiss
          </Button>
        }
      />
    );
  }
}

export default connect(mapStateToProps)(ErrorBar as any);
