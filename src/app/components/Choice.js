import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import _ from 'lodash';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

const choiceSource = {
  beginDrag(props) {
    return {
      title: props.title
    };
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();
    const { index, selectChoice } = props;

    if (dropResult) {
      selectChoice({ choiceIndex: index });
    }
  }
};

const Choice = ({ title, isDragging, connectDragSource }) =>
  connectDragSource(
    <div style={{ ...style, opacity: isDragging ? 0.4 : 1 }}>
      {title}
    </div>
  );

export default _.flow(
  DragSource(ItemTypes.CHOICE, choiceSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Choice);