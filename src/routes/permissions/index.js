/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Permissions from './Permissions';
import fetch from '../../core/fetch';

export default {

  path: '/server/:serverId/permissions',
  auth: true,

  async action(context, params) {
    console.log(1);
    const options = {
      method: 'get',
      credentials: 'include',
    };
    if (context.headers) {
      options.headers = context.headers;
    }
    const permissionsResp = await fetch(`/api/v1/permissions/${params.serverId}`, options);

    const userResp = await fetch('/api/v1/user/', options);

    let permissions;
    if (permissionsResp.status === 200) {
      permissions = (await permissionsResp.json());
    }
    const user = await userResp.json();

    console.log(permissions);
    if (!permissions) throw new Error('Permissions Object missing.');
    if (!user) throw new Error('User Object missing.');

    return <Permissions user={user} serverId={params.serverId} permissions={permissions} />;
  },
};