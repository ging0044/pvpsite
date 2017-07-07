/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';

function Layout({ children, user }) {
  return (
    <div>
      {React.Children.only(children)}
    </div>
  );
}

Layout.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default withStyles(s)(Layout);
