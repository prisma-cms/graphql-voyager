import * as React from 'react';

import { isNode, getDefaultRoot } from '../../graph/';

import Select from 'material-ui/Select';
import MenuItem from 'material-ui/Menu/MenuItem';

import './RootSelector.css';

interface RootSelectorProps {
  rootType?: string;
  schema: any;
  onChange: any;
}

export default class RootSelector extends React.Component<RootSelectorProps> {
  render() {
    const { schema, onChange } = this.props;
    const rootType = this.props.rootType || getDefaultRoot(schema);

    const rootTypeNames = getRootTypeNames(schema);
    const otherTypeNames = Object.keys(schema.types)
      .map(id => schema.types[id])
      .filter(isNode)
      .map(type => type.name)
      .filter(name => rootTypeNames.indexOf(name) === -1)
      .sort();

    return (
      <Select className="root-selector" onChange={handleChange} value={rootType}>
        {rootTypeNames.map(name => (
          <MenuItem value={name} key={name}>
            <strong>{name}</strong>
          </MenuItem>
        ))}
        {otherTypeNames.map(name => (
          <MenuItem value={name} key={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    );

    function handleChange(event) {
      const newRootType = event.target.value;
      if (newRootType !== rootType) {
        onChange(newRootType);
      }
    }
  }
}

function getRootTypeNames(schema) {
  let { queryType, mutationType, subscriptionType } = schema;
  const names = [];
  if (queryType) {
    names.push(queryType.name);
  }
  if (mutationType) {
    names.push(mutationType.name);
  }
  if (subscriptionType) {
    names.push(subscriptionType.name);
  }
  return names;
}
