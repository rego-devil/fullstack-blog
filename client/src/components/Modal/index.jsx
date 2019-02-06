/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';


export const Modal = ({ id, body, footer }) => (
  <div id={id} className="modal">
    <div className="modal-content">
      <h4>Создать новый пост</h4>
      {body}
    </div>
    <div className="modal-footer">
      {footer}
    </div>
  </div>
);

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.element,
  footer: PropTypes.element,
};
