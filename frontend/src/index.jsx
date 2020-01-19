import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import convert from 'color-convert';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.mouseDown = false;
    this.color = `#${this.getRandomColor()}`;
  }

  handleMouseDown = (event) => {
    if (!this.mouseDown) {
      this.mouseDown = true;
      this.color = `#${this.getRandomColor()}`;
      const { x, y } = this.getCoords(event);
      const ctx = this.getContext2d();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  handleMouseUp = (event) => {
    if (this.mouseDown) {
      this.mouseDown = false;
      const { x, y } = this.getCoords(event);
      const ctx = this.getContext2d();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  };

  handleMouseMove = (event) => {
    if (this.mouseDown) {
      const { x, y } = this.getCoords(event);
      const ctx = this.getContext2d();
      ctx.lineTo(x, y);

      const size = 8;
      ctx.fillStyle = '#333333';
      ctx.fillRect(x - (size / 3), y - (size / 3), size, size);
      ctx.fillStyle = this.color;
      ctx.fillRect(x - (size / 2), y - (size / 2), size, size);
    }
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

  getRandomColor() {
    const rand = (lo, hi) => Math.floor(Math.random() * (hi - lo) + lo);
    return convert.hsv.hex(rand(0, 255), rand(128, 255), rand(64, 255));
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas
        ref={this.ref}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
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
