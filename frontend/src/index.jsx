import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  handleClick = (event) => {
    event.preventDefault();
    const { x, y } = this.getCoords(event);
    const ctx = this.getContext2d();

    const size = 8;
    ctx.fillStyle = '#ccff66';
    ctx.fillRect(x - (size / 2), y - (size / 2), size, size);
  };

  getCoords(event) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  }

  getContext2d() {
    return this.ref.current.getContext('2d');
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas
        ref={this.ref}
        onClick={this.handleClick}
        width={width}
        height={height}
        style={{ border: '1px solid #ccc' }}
      />
    );
  }
}
Canvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const App = () => (
  <Canvas width={800} height={600} />
);

ReactDOM.render(<App />, document.querySelector('#main'));
