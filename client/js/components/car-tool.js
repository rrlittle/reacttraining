/**
 * create car tool componsent 
 * 
 */
import React from "react";
import Header from "./tool-header";

export class CarTool extends React.PureComponent {
  state = {};
  render() {
    const { header, data, headers, deleteRow, updateItem, onAdd } = this.props;
    return (
      <div>
        <Header header="Car Tool" />

        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <Row rowType="Header" headers={headers} isEdit={false} />
          </thead>
          <tbody>
            {data.map((c, i) => (
              <Row
                rowType={c.id === this.state.edit ? "Edit" : "Display"}
                key={c.id}
                data={c}
                headers={headers}
                deleteRow={() => deleteRow(i)}
                setEdit={() => this.setState({ edit: c.id })}
                unsetEdit={() => this.setState({ edit: undefined })}
                updateItem={newData => {
                  this.setState({ edit: undefined });
                  updateItem(i, newData);
                }}
              />
            ))}
            <Row rowType="Add" data={{}} headers={headers} onAdd={onAdd} />
          </tbody>
        </table>
      </div>
    );
  }
}

class Row extends React.Component {
  state = { ...this.props.data };
  render() {
    const {
      data,
      headers,
      deleteRow,
      setEdit,
      unsetEdit,
      updateItem,
      rowType,
      onAdd
    } = this.props;
    return (
      <tr className={rowType}>
        {headers.map(
          (h, i) =>
            rowType === "Add" || rowType ==="Edit" ? (
              <Input
                key={i}
                value={this.state[h[0]] || ""}
                onChange={state => this.setState(state)}
                name={h[0]}
                type={h[1]}
              />
            ) : (
              <Cell
                key={i}
                header={rowType === "Header"}
                data={rowType === "Header" ? h[0] : data[h[0]]}
              />
            )
        )}
        {rowType === "Header" ? (
          <td />
        ) : (
          <td>
            {rowType === "Edit" ? (
              <div>
                <button type="button" onClick={unsetEdit}>
                  Cancel
                </button>
                <button type="button" onClick={() => updateItem(this.state)}>
                  Save
                </button>
              </div>
            ) : rowType === "Add" ? (
              <button type="button" onClick={() => onAdd(this.state)}>
                Add
              </button>
            ) : (
              <div>
                <button type="button" onClick={setEdit}>
                  Edit
                </button>
                <button type="button" onClick={deleteRow}>
                  Delete
                </button>
              </div>
            )}
          </td>
        )}
      </tr>
    );
  }
}

const Cell = props =>
  props.header ? <th>{props.data}</th> : <td>{props.data}</td>;

const Input = props => {
  const { value, name, onChange, type } = props;
  return (
    <td className="INPUT">
      <input
        name={name}
        type={type}
        value={value}
        onChange={e => {
          const { name, value } = e.target;
          const ret = {};
          ret[name] = value;
          onChange(ret);
        }}
      />
    </td>
  );
};
