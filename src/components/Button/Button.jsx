import css from './button.module.css';

import React from 'react';

export default function Button({ click }) {
  return (
    <div>
      <button type="button" onClick={click} className={css.button}>
        Load more
      </button>
    </div>
  );
}
