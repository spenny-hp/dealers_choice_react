import React from "react";

const Input = ({ boroughs, addRestaurant }) => {
  return (
    <div id="inputRestaurant">
      <p>Are we missing any? Add one here:</p>

      <table>
        <tbody>
          <tr>
            <td className="label">
              <label htmlFor="name">Restaurant Name:</label>
            </td>
            <td className="input">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              ></input>
            </td>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="address">Street Address:</label>
            </td>
            <td className="input">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Street Address"
              ></input>
            </td>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="borough">Borough:</label>
            </td>
            <td className="input">
              <select name="borough" id="borough" placeholder="Borough">
                <option></option>
                {boroughs.map((borough) => {
                  return (
                    <option key={borough.id} value={borough.id}>
                      {borough.name}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="liquor_license">Liquor License:</label>
            </td>
            <td className="input">
              <select name="liquor_license" id="liquor_license">
                <option></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="sidewalk_seating">Sidewalk Seating:</label>
            </td>
            <td className="input">
              {" "}
              <select name="sidewalk_seating" id="sidewalk_seating">
                <option></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="roadway_seating">Roadway Seating:</label>
            </td>
            <td className="input">
              <select name="roadway_seating" id="roadway_seating">
                <option></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr>
          <tr id="lastRow">
            <td></td>
            <td align="right">
              <button id="add" onClick={() => addRestaurant()}>
                Submit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Input;
