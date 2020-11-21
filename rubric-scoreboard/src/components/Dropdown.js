import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'HK1', label: 'Hong Kong Center 1' },
  { value: 'SZ1', label: 'Zhenjiang Center 1' },
  { value: 'SZ2', label: 'Zhenjiang Center 2' },
  { value: 'SZ3', label: 'Zhenjiang Center 3' },
  { value: 'BK1', label: 'Bangkok Center 1' },
  { value: 'BK2', label: 'Bangkok Center 2' },
  { value: 'BK3', label: 'Bangkok Center 3' },
];

const divStyle = {
  margin: 30,
  width: 300
};

class Dropdown extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <div style={divStyle}>
        <Select value={selectedOption}
        onChange={this.handleChange}
        options={options}
      /></div>
    );
  }
}

export default Dropdown;