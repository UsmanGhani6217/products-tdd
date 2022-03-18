import React from 'react';

type IProps = {
  changeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
};
function PreRender(props: IProps): JSX.Element {
  return (
    <div className="custom-select">
      <select
        onChange={(e) => props.changeHandler(e)}
        className="form-select mb-10"
        aria-label="Default select example"
      >
        <option value="">Select one color</option>
        <option value="Red">Red</option>
        <option value="Black">Black</option>
        <option value="Stone">Stone</option>
      </select>
    </div>
  );
}
export default PreRender;
