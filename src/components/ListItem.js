import React from "react";

const ListItem = props => {
  //props.highlight
    return (
      <li style={{backgroundColor: ( props.highlight ) ? "yellow":"white"}}>

          <button onChange={() => {props.handleCheck(props.itemIndex)}}>
              {"joe"}
          </button>

      </li>
    );
};

export default ListItem;
